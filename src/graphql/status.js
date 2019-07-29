export default {
    typeDefs: `
        extend type Query {
            status(id: ID!): Status
            statuses: [Status]
        }

        extend type Mutation {
            addStatus(input: CreateStatusInput!): Status
            updateStatus(input: UpdateStatusInput!): Status
        }

        type Status {
            id: ID!
            name: String!
            seq: Int!
            parent: Status
        }

        input CreateStatusInput {
            name: String!
            parent: ID
        }

        input UpdateStatusInput {
            id: ID!
            name: String!
            parent: ID
        }
    `,
    resolvers: {
        Mutation: {
            addStatus: (entity, { input }, { orm }, info) => {
                const { state, ...values } = input;

                return orm.Status.create(
                    { ...input },
                    {}
                );
            },
            updateStatus: async (entity, { input }, { orm }, info) => {
                const { id, ...values } = input;

                await orm.Status.update(
                    { ...values },
                    {
                        where: {
                            id,
                        }
                    }
                );

                return orm.Status.findOne({
                    where: {
                        id,
                    },
                    raw: true,
                });
            },
        },
        Query: {
            status: (entity, args, { orm }, info) => {
                return orm.Status.findOne({
                    where: {
                        id: args.id,
                    },
                    raw: true,
                });
            },
            statuses: (entity, args, { orm }, info) => {
                return orm.Status.findAll({
                    raw: true,
                });
            },
        },
        Status: {
            parent: (entity, args, { orm }, info) => {
                return orm.Status.findOne({
                    include: [
                        {
                            attributes: [],
                            model: orm.Status,
                            as: 'children',
                            where: {
                                id: entity.id,
                            },
                        },
                    ],
                    raw: true,
                });
            },
        }
    },
}
