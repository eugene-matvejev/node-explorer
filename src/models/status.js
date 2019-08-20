export default (sequelize, DataTypes) => {
    const model = sequelize.define(
        'Status',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            seq: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            parent: {
                type: DataTypes.INTEGER
            },
        },
        {
            tableName: 'statuses',
            timestamps: false,
        }
    );

    model.hasMany(model, { as: 'children', foreignKey: 'parent' });
    model.belongsTo(model, { foreignKey: 'parent' });

    return model;
};
