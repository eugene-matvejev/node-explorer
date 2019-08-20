'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.resolve();
        // return queryInterface.createTable('user_permissions', {
        //     userId: {
        //         type: Sequelize.INTEGER,
        //         primaryKey: true,
        //     },
        //     statusId: {
        //         type: Sequelize.INTEGER,
        //         primaryKey: true,
        //     },
        //     seq: {
        //         type: Sequelize.INTEGER,
        //     },
        // });
    },
    down: (queryInterface, Sequelize) => {
//         return queryInterface.dropTable('user_permissions');
    }
};
