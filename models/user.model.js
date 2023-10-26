module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("company", "university", "administrator"),
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
    }, {
        tableName: "user",
        timestamps: false,
    });

    User.associations = (models) => {
        User.hasOne(models.company, {
            foreignKey: "user_id",
            as: "company",
            onDelete: "CASCADE",
        });
        User.hasOne(models.verification, {
            foreignKey: "user_id",
            as: "verification",
            onDelete: "CASCADE",
        });
        User.hasOne(models.university, {
            foreignKey: "user_id",
            as: "university",
            onDelete: "CASCADE",
        });
    };

    return User;
}