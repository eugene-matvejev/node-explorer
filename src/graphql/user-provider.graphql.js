export default {
    typeDefs: `
        extend type Mutation {
            disconnectProvider(provider: String!): UserProvider!
        }

        type UserProvider {
            externalId: ID!
            name: String!
            user: User!
            username: String!
            profileUrl: String!
        }
    `,
    resolvers: {
        Mutation: {
            disconnectProvider: (entity, { provider }, { user, orm }, info) => {
                return orm.UserProvider.destroy({
                    where: {
                        internalId: user.id,
                        provider,
                    }
                });
            },
        },
        // Query: {
        //     userProvider: (entity, { id: externalId }, { user, orm }, info) => {
        //         return orm.UserProvider.findOne({
        //             where: {
        //                 externalId: id,
        //                 internalId: user.id,
        //             },
        //             raw: true,
        //         });
        //     },
        //     userProviders: (entity, args, { user, orm }, info) => {
        //         return orm.UserProvider.findAll({
        //             where: {
        //                 internalId: user.id,
        //             },
        //             raw: true,
        //         });
        //     },
        // },
        UserProvider: {
            user: (entity, args, { user, orm }, info) => {
                return orm.User.findOne({
                    where: {
                        id: entity.internalId,
                    },
                    raw: true,
                })
            },
            name: (entity, args, context, info) => entity.provider,
        }
    },
}
