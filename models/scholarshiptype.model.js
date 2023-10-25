module.exports = (sequelize, DataTypes) => {
    const ScholarshipType = sequelize.define(
        "ScholarshipType",
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
            tableName: "ScholarshipType",
            timestamps: false,
        }
    );

    return ScholarshipType;
};
