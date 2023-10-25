module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define(
        "Administrator",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,

            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "Administrator",
            timestamps: false,
        }
    );

    Administrator.associations = (models) => {
        Administrator.belongsTo(models.company, {
            foreignKey: "company_id",
            as: "company",
        });
    };

    return Administrator;
};
