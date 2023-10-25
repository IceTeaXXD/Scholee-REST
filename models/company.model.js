module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define(
        "company",
        {},
        {
            tableName: "company",
            timestamps: false,
        }
    );

    Company.associations = (models) => {
        Company.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
        Company.hasMany(models.administrator, {
            foreignKey: "company_id",
            as: "administrators",
        });
    };

    return Company;
};
