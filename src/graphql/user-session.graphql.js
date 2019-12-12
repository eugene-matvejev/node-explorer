export default {
    typeDefs: `
        extend type Query {
            sessions: [UserSession]
        }

        extend type Mutation {
            logout(hash: ID): ID
            logoutEverywhere: Int
        }

        type UserSession {
            hash: ID!
            device: String!
            provider: UserProvider!
        }
    `,
    resolvers: {
        Mutation: {
            logout: async (entity, { hash }, { user, orm }, info) => {
                hash = hash || user.session

                await orm.UserSession.destroy({
                    where: {
                        internalId: user.id,
                        hash,
                    },
                    paranoid: true,
                });

                return hash;
            },
            logoutEverywhere: async (entity, args, { user, orm }, info) => {
                const { Op } = orm.Sequelize;

                return orm.UserSession.destroy({
                    where: {
                        internalId: user.id,
                        hash: {
                            [Op.not]: user.session,
                        },
                    },
                    logging: true,
                    paranoid: true,
                });
            },
        },
        Query: {
            sessions: (entity, args, { user, orm }, info) => {
                return orm.UserSession.findAll({
                    where: {
                        internalId: user.id,
                    },
                    raw: true,
                });
            },
        },
        UserSession: {
            provider: async (entity, args, { user, orm }, info) => {
                return orm.UserProvider.findOne({
                    where: {
                        externalId: entity.providerId,
                        internalId: user.id,
                    },
                    raw: true,
                });
            },
        }
    },
}
