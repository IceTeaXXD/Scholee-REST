module.exports = (sequelize, DataTypes) => {
    const Scholarship = sequelize.define(
        "scholarship",
        {
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
            tableName: "scholarship",
            timestamps: false,
        }
    );

    Scholarship.associations = (models) => {
        Scholarship.belongsTo(models.administrator, {
            foreignKey: "administrator_id",
            as: "administrator",
            onDelete: "CASCADE",
        });
        Scholarship.hasMany(models.scholarshiptype, {
            foreignKey: "scholarship_id",
            as: "scholarshiptype",
        });
    }

    return Scholarship;
};
