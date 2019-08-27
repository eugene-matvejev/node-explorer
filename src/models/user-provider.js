export default (sequelize, DataTypes) => {
    const model = sequelize.define(
        'UserProvider',
        {
            provider: {
                type: DataTypes.STRING,
            },
            internalId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            externalId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
            },
            profileUrl: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: 'user_providers',
            timestamps: false,
        }
    );

    model.associate = ({ User, UserProvider }) => {
        User.hasMany(UserProvider, { foreignKey: 'internalId', sourceKey: 'id' });

        UserProvider.belongsTo(User, { foreignKey: 'internalId', targetKey: 'id' });
    }

    return model;
};
