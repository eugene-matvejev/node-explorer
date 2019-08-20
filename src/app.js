#!/usr/bin/env node
import express from 'express';
import session from 'express-session';
import { typeDefs, resolvers } from './graphql';
import orm from './orm';
import compose from './dataloader/status.dataloader';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = req.user;

        console.log({ user, 'req.session': req.session });

        return {
            user,
            orm,
            dataloader: compose(orm),
        };
    },
});

app.use(helmet());

passport.use(new BearerStrategy(
    async (hash, done) => {
        const user = await orm.User.findOne({
            include: [
                {
                    attributes: [],
                    model: orm.UserSession,
                    where: {
                        hash,
                    },
                },
            ],
            raw: true,
        });

        done(null, user, { scope: 'all' });
    }
));
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const { provider, id: externalId, profileUrl, username, displayName, photos } = profile;
            const photo = photos && photos[0] && photos[0].value;
            console.log({ accessToken, refreshToken });
            const user = await orm.User.findOne({
                include: [
                    {
                        attributes: [],
                        model: orm.UserProvider,
                        where: {
                            provider,
                            externalId,
                        },
                    },
                ],
                raw: true,
            }).then(async (v) => {
                if (null !== v) {
                    return v;
                }

                v = await orm.User.create({
                    displayName,
                    photo,
                });

                await orm.UserProvider.create({
                    provider,
                    internalId: v.id,
                    externalId,
                    username,
                    profileUrl,
                });

                return v;
            })

            const session = await orm.UserSession.create({
                internalId: user.id,
                hash: accessToken,
            });

            return done(null, session);
        }
    )
);

passport.serializeUser(({ hash }, done) => {
    console.log({ hash });

    done(null, hash);
});
passport.deserializeUser(async (hash, done) => {
    console.log({ hash });

    const user = await orm.User.findOne({
        include: [
            {
                attributes: [],
                model: orm.UserSession,
                where: {
                    hash,
                },
            },
        ],
        raw: true,
    });

    done(null, user);
});

app.use(
    cors({
        origin: "*",
        methods: "GET,POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })
);
app.use(session({
    secret: 'test',
}));
app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/auth/github',
    passport.authenticate('github')
);
app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
        res.redirect(`//localhost:8080?token=${req.session.passport.user}`)
    },
);
app.get(
    '/auth/me',
    (req, res) => {
        res.send({
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            user: req.user,
            sessionID: req.sessionID,
            session: req.session,
            cookie: JSON.stringify(req.cookie),
        });
    },
);
app.use('/graphql', (req, res, next) => {
    console.log({
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        user: req.user,
        sessionID: req.sessionID,
        session: req.session,
        cookie: JSON.stringify(req.cookie),
    });

    return next();
});
server.applyMiddleware({ app, path: '/graphql' });
app
    .listen(process.env.PORT, () => {
        console.log(`GraphQL ready on: http://localhost:${process.env.PORT}/graphql`);
    });
