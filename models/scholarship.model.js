module.exports = (sequelize, DataTypes) => {
    const Scholarship = sequelize.define(
        "Scholarship",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,

            },
            scholarship_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            short_description: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            coverage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            contact_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            contact_email: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            tableName: "Scholarship",
            timestamps: false,
        }
    );

    Scholarship.associations = (models) => {
        Scholarship.belongsTo(models.company, {
            foreignKey: "company_id",
            as: "company",
        });
    }

    return Scholarship;
};
