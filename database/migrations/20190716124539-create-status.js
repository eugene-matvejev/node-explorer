'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('statuses', {
            id: {
                // type: DataTypes.UUID,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            state: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            parent: {
                type: Sequelize.INTEGER
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('statuses');
    }
};

