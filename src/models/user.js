export default (sequelize, DataTypes) => {
    const model = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            displayName: {
                type: DataTypes.STRING,
            },
            photo: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );

    return model;
};
