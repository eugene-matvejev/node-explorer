'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('statuses', 'state', 'seq');
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('statuses', 'seq', 'state');
    }
};

