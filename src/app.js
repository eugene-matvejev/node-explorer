#!/usr/bin/env node

import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import orm from './orm';

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
    },
    formatError: (error) => {
        console.log(error);
        return error;
    },
    formatResponse: (response) => {
        return response;
    },
})
    .listen(process.env.PORT)
    .then(({ url }) => {
        console.log(`GraphQL ready on: ${url}`);
    });
