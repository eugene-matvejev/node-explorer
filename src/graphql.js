import { gql } from 'apollo-server';
import { merge } from 'lodash';

import user from './graphql/status';

export const typeDefs = gql`
    type Query {
        version: String!
    }
`;

export const resolvers = merge(
    {
        Query: {
            version: () => `1.0`,
        }
    },
);
