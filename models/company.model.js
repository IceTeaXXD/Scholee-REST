module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        "Company",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            tableName: "Company",
            timestamps: false,
        }
    );

    Company.associate = function (models) {
        Company.belongsTo(models.Organization, { foreignKey: "user_id" });
    };

    return Company;
};
