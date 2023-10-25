module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define(
        "Organization",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references : {
                    model : 'User',
                    key : 'user_id'
                }
            },
            type: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            tableName: "Organization",
            timestamps: false,
        }
    );
    
    return Organization;
};
