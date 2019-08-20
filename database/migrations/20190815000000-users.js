'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('users', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                displayName: {
                    type: Sequelize.STRING,
                },
                photo: {
                    type: Sequelize.STRING,
                },
            }),
            queryInterface.createTable('user_sessions', {
                internalId: {
                    type: Sequelize.INTEGER,
                },
                hash: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                },
            }),
            queryInterface.createTable('user_providers', {
                provider: {
                    type: Sequelize.STRING,
                },
                internalId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                externalId: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                },
                username: {
                    type: Sequelize.STRING,
                },
                profileUrl: {
                    type: Sequelize.STRING,
                },
            }),
            queryInterface.createTable('user_permissions', {
                userId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                statusId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                seq: {
                    type: Sequelize.INTEGER,
                },
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable('users'),
            queryInterface.dropTable('user_sessions'),
            queryInterface.dropTable('user_providers'),
            queryInterface.dropTable('user_permissions'),
        ]);
    },
};
