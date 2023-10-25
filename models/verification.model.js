module.exports = (sequelize, DataTypes) => {
    const Verification = sequelize.define("verification",
{
            reset_token: {
                type: DataTypes.STRING(64),
                allowNull: true,
                defaultValue: null,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            verify_token: {
                type: DataTypes.STRING(64),
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            tableName: "verification",
            timestamps: false,
        }
    );
    Verification.associations = (models) => {
        Verification.belongsTo(models.user, {
            foreignKey: "user_id",
            as : "user",
            onDelete : "CASCADE",
        });
    };
    return Verification;
};
