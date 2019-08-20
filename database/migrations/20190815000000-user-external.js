'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.resolve();
//         return queryInterface.createTable('user_providers', {
//             provider: {
//                 type: Sequelize.STRING,
//             },
//             internalId: {
//                 type: Sequelize.INTEGER,
//             },
//             externalId: {
//                 type: Sequelize.STRING,
//             },
//             username: {
//                 type: Sequelize.STRING,
//             },
//             profileUrl: {
//                 type: Sequelize.STRING,
//             },
//         });
    },
    down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('user_providers');
    }
};
