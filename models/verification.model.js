module.exports = (sequelize, DataTypes) => {
    const Verification = sequelize.define(
        "Verification",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                references : {
                    model : 'User',
                    key : 'user_id',
                    onDelete : 'CASCADE'
                }
            },
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
            tableName: "Verification",
            timestamps: false,
        }
    );
    
    return Verification;
};
