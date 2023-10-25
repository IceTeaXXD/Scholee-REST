module.exports = (sequelize, DataTypes) => {
    const ScholarshipType = sequelize.define(
        "ScholarshipType",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Administrator',
                    key: 'user_id',
                    onDelete: 'CASCADE',
                },
            },
            scholarship_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Scholarship',
                    key: 'scholarship_id',
                    onDelete: 'CASCADE',
                },
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