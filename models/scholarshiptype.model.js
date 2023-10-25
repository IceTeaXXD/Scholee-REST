module.exports = (sequelize, DataTypes) => {
    const ScholarshipType = sequelize.define(
        "scholarshiptype",
        {
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
            tableName: "scholarshiptype",
            timestamps: false,
        }
    );
    ScholarshipType.associations = (models) => {
        ScholarshipType.belongsTo(models.scholarship, {
            foreignKey: "scholarship_id",
            as: "scholarship",
        });
    }
    return ScholarshipType;
};
