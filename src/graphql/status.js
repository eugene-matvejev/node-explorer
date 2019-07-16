// export default {
//     typeDefs: `
//         extend type Query {
//             status(id: ID!): Status
//             statuses: [Status]
//         }

//         type Status {
//             id: ID!
//             name: String
//             state: RAGEnum
//             parent: Status
//         }

//         enum RAGEnum {
//             RED
//             AMBER
//             GREEN
//         }
//     `,
//     resolvers: {
//         Query: {
//             status: (entity, args, { orm }, info) => {
//                 return orm.Status.findOne({
//                     where: {
//                         id: args.id,
//                     },
//                     raw: true,
//                 });
//             },
//             statuses: (entity, args, { orm }, info) => {
//                 return orm.Status.findAll({
//                     raw: true,
//                 });
//             },
//         },
//         User: {
//             parent: (entity, args, { orm }, info) => {
//                 return orm.Status.findOne({
//                     include: [
//                         {
//                             attributes: [],
//                             model: orm.User,
//                             as: 'friendship_owner',
//                             where: {
//                                 id: entity.id,
//                             },
//                         },
//                     ],
//                     raw: true,
//                 });
//             },
//         }
//     },
// }
