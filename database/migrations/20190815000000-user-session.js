'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.resolve();
//         return queryInterface.createTable('user_sessions', {
//             owner: {
//                 type: Sequelize.INTEGER,
//             },
//             hash: {
//                 type: Sequelize.STRING,
//                 primaryKey: true,
//             },
//         });
    },
    down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('user_sessions');
    }
};
