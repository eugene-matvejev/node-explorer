import { gql } from 'apollo-server';
import { merge } from 'lodash';

import status from './graphql/status.graphql';
import userProvider from './graphql/user-provider.graphql';
import userSession from './graphql/user-session.graphql';
import user from './graphql/user.graphql';

export const typeDefs = gql`
    type Query
    type Mutation
    ${status.typeDefs}
    ${userProvider.typeDefs}
    ${userSession.typeDefs}
    ${user.typeDefs}
`;

export const resolvers = merge(
    status.resolvers,
    userProvider.resolvers,
    userSession.resolvers,
    user.resolvers,
);
