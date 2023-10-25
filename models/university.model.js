module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define(
        "university",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        {
            tableName: "university",
            timestamps: false,
        }
    );
    University.associations = (models) => {
        University.belongsTo(models.user, {
            foreignKey: "user_id",
            as: "user",
        });
    }
    return University;
};
