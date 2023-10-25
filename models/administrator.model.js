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

    Administrator.associate = function (models) {
        Administrator.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
        Administrator.belongsTo(models.Company, { 
            foreignKey: "company_id",
            onDelete: "CASCADE",
        });
    };

    return Administrator;
};
