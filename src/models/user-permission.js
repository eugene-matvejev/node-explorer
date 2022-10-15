export default (sequelize, DataTypes) => {
    const model = sequelize.define(
        'UserPermission',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            statusId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            seq: {
                type: DataTypes.INTEGER,
            },
        },
        {
            tableName: 'user_permissions',
            timestamps: false,
        }
    );

    model.associate = ({ User, UserPermission }) => {
        User.hasMany(UserPermission, { foreignKey: 'userId', sourceKey: 'id' });

        UserPermission.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
    }

    return model;
};
