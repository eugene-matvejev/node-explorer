import { gql } from 'apollo-server';
import { merge } from 'lodash';

import status from './graphql/status';

export const typeDefs = gql`
    type Query
    type Mutation
    extend type Mutation {
        flushStatuses: [Status]
    }

    ${status.typeDefs}
`;

export const resolvers = merge(
    status.resolvers,
    {
        Mutation: {
            /** endpoint is done only for demo-purposes, will be dropped later */
            flushStatuses: async (entity, { input }, { orm }, info) => {
                const statuses = await orm.Status.findAll({ raw: true });

                const hashmap = {};
                const roots = [];

                for (const status of statuses) {
                    hashmap[status.id] = status;
                }

                for (const status of statuses) {
                    if (null === status.parent) {
                        roots.push(status);
                        continue;
                    }

                    if (undefined === hashmap[status.parent].nodes) {
                        hashmap[status.parent].nodes = [];
                    }

                    hashmap[status.parent].nodes.push(status);
                }

                const getRandomIntInclusive = (min, max) => {
                    min = Math.ceil(min);
                    max = Math.floor(max);

                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                // const primary = [];
                const states = {
                    1: 0x0010, //Success
                    2: 0x0100, //Amber
                    3: 0x1000, //Red
                }

                for (const statusId in hashmap) {
                    const status = hashmap[statusId];
                    status.seq = 0;

                    if (undefined === status.nodes) {
                        // primary.push(status);

                        status.seq = states[getRandomIntInclusive(1, 3)];
                    }
                }

                const resolveSequence = (nodes) => {
                    let seq = 0;
                    for (const node of nodes) {
                        if (undefined === node.nodes) {
                            seq |= node.seq;
                            continue;
                        }

                        node.seq = resolveSequence(node.nodes);
                    }

                    return seq;
                };
                resolveSequence(roots);

                await Promise.all(
                    Object
                        .keys(hashmap)
                        .map((id) =>
                            orm.Status.update(
                                { seq: hashmap[id].seq },
                                {
                                    where: {
                                        id,
                                    }
                                }
                            )
                        )
                );

                return statuses;
            },
        }
    }
);
