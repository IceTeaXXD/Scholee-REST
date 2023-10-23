module.exports = (sequelize, DataTypes) => {
    const ScholarshipAdmin = sequelize.define("ScholarshipAdmin", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'placeholder.jpg',
        },
        reset_token: {
            type: DataTypes.STRING(64),
            defaultValue: null,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verify_token: {
            type: DataTypes.STRING(64),
            defaultValue: null,
        },
        organization: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        tableName: 'ScholarshipAdmin',
        timestamps: false,
    });

    return ScholarshipAdmin;
};