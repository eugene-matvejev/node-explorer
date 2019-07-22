import { gql } from 'apollo-server';
import { merge } from 'lodash';

import status from './graphql/status';

export const typeDefs = gql`
    type Query
    type Mutation
    ${status.typeDefs}
`;

export const resolvers = merge(
    status.resolvers,
);
