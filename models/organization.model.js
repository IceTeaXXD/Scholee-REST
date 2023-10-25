module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define(
        "Organization",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            tableName: "Organization",
            timestamps: false,
        }
    );

    Organization.associate = function (models) {
        Organization.belongsTo(models.User, { foreignKey: "user_id" });
    };
    
    return Organization;
};
