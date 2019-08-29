export default (sequelize, DataTypes) => {
    const model = sequelize.define(
        'UserSession',
        {
            internalId: {
                type: DataTypes.INTEGER,
            },
            hash: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            device: {
                type: DataTypes.STRING,
            },
            providerId: {
                type: DataTypes.STRING,
            }
        },
        {
            tableName: 'user_sessions',
            timestamps: false,
        }
    );

    model.associate = ({ User, UserSession }) => {
        User.hasMany(UserSession, { foreignKey: 'internalId', sourceKey: 'id' });

        UserSession.belongsTo(User, { foreignKey: 'internalId', targetKey: 'id' });
    }

    return model;
};
