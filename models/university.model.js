module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define(
        "University",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            tableName: "University",
            timestamps: false,
        }
    );

    University.associate = function (models) {
        University.belongsTo(models.Organization, { foreignKey: "user_id" });
    };

    return University;
};
