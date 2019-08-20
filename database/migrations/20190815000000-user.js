'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.resolve();
//         return queryInterface.createTable('users', {
//             id: {
//                 type: Sequelize.INTEGER,
//                 primaryKey: true,
//                 autoIncrement: true,
//             },
//             displayName: {
//                 type: Sequelize.STRING,
//             },
//             photo: {
//                 type: Sequelize.STRING,
//             },
//         });
    },
    down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('users');
    }
};
