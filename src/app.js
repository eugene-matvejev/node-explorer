#!/usr/bin/env node
import express from 'express';
import expressCookie from 'cookie-parser';
import expressSession from 'express-session';
import expressSessionSequelizeStore from 'express-session-sequelize';
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

passport.use(new BearerStrategy(
    async (token, done) => {
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

passport.serializeUser(({ session }, done) => {
    console.log({ hash: session.hash });

    done(null, session.hash);
});
// passport.deserializeUser(async (hash, done) => {

//     console.log('passport.deserializeUser(async (hash, done) => {', { hash });

//     debugger;
//     const user = await orm.User.findOne({
//         include: [
//             {
//                 attributes: [],
//                 model: orm.UserSession,
//                 where: {
//                     hash,
//                 },
//             },
//         ],
//         raw: true,
//     });

//     done(null, user);
// });

// app.use(expressCookie());
// app.use(expressSession({
//     secret: process.env.SECRET,
//     cookie: {
//         // domain: '.localhost',
//         path: '/',
//         secure: false,
//     },
//     // store: new (expressSessionSequelizeStore(expressSession.Store))({
//     //     db: orm.sequelize,
//     // })
// }));
app.use(passport.initialize());
// app.use(passport.session());
app.get('/auth/github', passport.authenticate('github'));
app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
        const token = jwt.sign({ data: req.session.passport.user }, process.env.SECRET, { expiresIn: 60 * 60 * 60 });
        debugger;
        return res.redirect(`//localhost:8080?token=${token}&session=${req.session.passport.user}`);
        return res.redirect(`//localhost:8081/graphql`);
    },
);
app.get(
    '/auth/me',
    (req, res) => {
        res.send({
            headers: req.headers,
            TOKEN: req.headers.authorization && req.headers.authorization.split(' ')[1],
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            user: req.user,
            sessionID: req.sessionID,
            session: req.session,
            cookie: JSON.stringify(req.cookie),
        });
    },
);
app.use('/graphql',passport.authenticate('bearer', { session: false }), (req, res, next) => {
    return res.send({
        headers: req.headers,
        TOKEN: req.headers.authorization && req.headers.authorization.split(' ')[1],
        user: req.user,
    });

    // return res.redirect(`/auth/me`);

    // return next();
});

// new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//         const user = req.user;

//         console.log({ user, 'req.session': req.session });

//         return {
//             user,
//             orm,
//             dataloader: compose(orm),
//         };
//     },
// }).applyMiddleware({ app, path: '/graphql' });

app
    .listen(process.env.PORT, () => {
        console.log(`GraphQL ready on: http://localhost:${process.env.PORT}/graphql`);
    });
