import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import fs from 'fs';
import orm from './orm';
import { typeDefs, resolvers } from './graphql';
import compose from './dataloader';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({}),
    context: () => ({ orm, dataloader: compose(orm) }),
});

const { query, mutate } = createTestClient(server);

const databaseReset = async () => {
    await orm
        .sequelize
        .drop()
        .then(
            async () => {
                const proxyRequire = (path) => {
                    const resolvedPath = require.resolve(path);
                    const m = require(resolvedPath);

                    return m;
                };

                const executeFiles = async (path) => {
                    const files = fs.readdirSync(path);
                    for (const file of files) {
                        const f = `${path}/${file}`;

                        const obj = proxyRequire(f);
                        await obj.up(orm.sequelize.queryInterface, orm.Sequelize);
                    }
                }

                await executeFiles(`${__dirname}/../database/migrations`);
                await executeFiles(`${__dirname}/../database/fixtures`);
            }
        )
};

global.server = server;
global.query = query;
global.mutate = mutate;
global.databaseReset = databaseReset;

beforeAll(databaseReset);
