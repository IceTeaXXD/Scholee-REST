module.exports = (sequelize, DataTypes) => {
    const ScholarshipType = sequelize.define(
        "ScholarshipType",
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
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            tableName: "ScholarshipType",
            timestamps: false,
        }
    );

    ScholarshipType.associate = function (models) {
        ScholarshipType.belongsTo(models.Scholarship, {
            foreignKey: { name: "user_id", allowNull: false },
            onDelete: "CASCADE",
        });
    };

    return ScholarshipType;
};
