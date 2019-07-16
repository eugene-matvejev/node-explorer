#!/usr/bin/env node

import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql';
import orm from './orm';

orm
    .sequelize
    .sync({
        // force: true
    })
    .then(() => {
        new ApolloServer({
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
                // console.log(response);
                return response;
            },
        })
            .listen(process.env.PORT)
            .then(({ url }) => {
                console.log(`🚀 Server ready at ${url}`);
            });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
