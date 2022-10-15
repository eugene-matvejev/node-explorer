export default {
    typeDefs: `
        extend type Query {
            me: User
        }

        type User {
            displayName: String!
            photo: String
            id: ID!
            providers: [UserProvider]
            sessions: [UserSession]
        }
    `,
    resolvers: {
        Query: {
            me: (entity, args, { user }, info) => user,
        },
        User: {
            providers: (entity, { hash }, { user, orm }, info) => {
                return orm.UserProvider.findAll({
                    where: {
                        internalId: entity.id,
                    },
                    raw: true,
                });
            },
            sessions: (entity, { hash }, { user, orm }, info) => {
                return orm.UserSession.findAll({
                    where: {
                        internalId: entity.id,
                    },
                    raw: true,
                });
            },
        }
    },
}
