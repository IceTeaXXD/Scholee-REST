module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define(
        "administrator",
        {},
        {
            tableName: "administrator",
            timestamps: false,
        }
    );

    Administrator.associations = (models) => {
        Administrator.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
            onDelete: "CASCADE",
        });
        Administrator.belongsTo(models.company, {
            foreignKey: "company_id",
            as: "company",
            onDelete: "CASCADE",
        });
    };

    return Administrator;
};
