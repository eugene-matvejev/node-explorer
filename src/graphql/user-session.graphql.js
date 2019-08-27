export default {
    typeDefs: `
        extend type Query {
            session(hash: ID!): UserSession
            sessions: [UserSession]
        }

        extend type Mutation {
            logout: UserSession
            logoutEverywhere: [UserSession]
        }

        type UserSession {
            hash: ID!
        }
    `,
    resolvers: {
        Mutation: {
            logout: (entity, { hash }, { user, orm }, info) => {
                return null;
            },
            logoutEverywhere: (entity, { hash }, { user, orm }, info) => {
                return null;
            },
        },
        Query: {
            session: (entity, { hash }, { user, orm }, info) => {
                return orm.UserSession.findOne({
                    where: {
                        internalId: user.id,
                        hash,
                    },
                    raw: true,
                });
            },
            sessions: (entity, args, { user, orm }, info) => {
                return orm.UserSession.findAll({
                    where: {
                        internalId: user.id,
                    },
                    raw: true,
                });
            },
        },
    },
}
