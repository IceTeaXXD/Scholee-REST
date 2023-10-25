module.exports = (sequelize, DataTypes) => {
    const Scholarship = sequelize.define(
        "Scholarship",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
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

    Scholarship.associate = function (models) {
        Scholarship.belongsTo(models.Administrator, {
            foreignKey: "user_id",
            onDelete: "CASCADE",
        });
    };

    return Scholarship;
};
