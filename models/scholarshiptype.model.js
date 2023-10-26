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
                type: DataTypes.TEXT,
                allowNull: false,
                get() {
                    return JSON.parse(this.getDataValue('type'));
                },
                set(value) {
                    this.setDataValue('type', JSON.stringify(value));
                },
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
            onDelete: "CASCADE",
        });
    }
    return ScholarshipType;
};