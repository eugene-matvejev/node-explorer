#!/usr/bin/env node
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import orm from './orm';
import compose from './dataloader/status.dataloader';

const app = express();
app.use(helmet());
app.use(
    cors({
        origin: "*",
        methods: "GET,POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const { provider, id: externalId, profileUrl, username, displayName, photos } = profile;

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
                    photo: photos && photos[0] && photos[0].value,
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

            return done(null, { ...user, session });
        }
    )
);
passport.serializeUser(({ session }, done) => done(null, session.hash));
passport.use(new BearerStrategy(
    async (token, done) => {
        try {
            const { data: hash } = jwt.verify(token, process.env.SECRET);

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

            if (null === user) {
                return done(null, false);
            }

            return done(null, user, { scope: 'all' });
        } catch (e) {
            return done(e.message, false);
        }
    }
));
app.use(passport.initialize());
app.get('/auth/github', passport.authenticate('github'));
app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
        const token = jwt.sign({ data: req.session.passport.user }, process.env.SECRET, { expiresIn: '60d' });

        return res.redirect(`//localhost:8080?token=${token}&session=${req.session.passport.user}`);
    },
);
app.get('/auth/me', passport.authenticate('bearer', { session: false }), (req, res) => {
    // console.log('/auth/me', { user: req.user });

    return res.send(req.user);
});
app.post('/graphql', passport.authenticate('bearer', { session: false }), (req, res, next) => next());
app.get('/graphql', (req, res, next) => next());

new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        user: req.user,
        orm,
        dataloader: compose(orm),
    }),
    playground: {
        settings: {
            'schema.polling.enable': false,
        },
    },
}).applyMiddleware({ app, path: '/graphql' });

app
    .listen(process.env.PORT, () => {
        console.log(`GraphQL ready on: http://localhost:${process.env.PORT}/graphql`);
    });
