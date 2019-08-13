#!/usr/bin/env node

import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import orm from './orm';
import compose from './dataloader/status.dataloader';

new ApolloServer({
    cors: {
        origin: "*",
        methods: "POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    },
    typeDefs,
    resolvers,
    context: {
        orm,
        dataloader: compose(orm),
    },
    /** if you want console.log */
    formatError: (r) => {
        return r;
    },
    /** if you want console.log */
    formatResponse: (r) => {
        return r;
    },
})
    .listen(process.env.PORT)
    .then(({ url }) => {
        console.log(`GraphQL ready on: ${url}`);
    });
