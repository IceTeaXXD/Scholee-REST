module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("organization","administrator"),
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            image: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: "placeholder.jpg",
            },
        },
        {
            tableName: "User",
            timestamps: false,
        }
    );
    
    return User;
};
