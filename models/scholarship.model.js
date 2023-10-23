module.exports = (sequelize, DataTypes) => {
    const Scholarship = sequelize.define("Scholarship", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'ScholarshipAdmin',
                key: 'user_id',
            },
            onDelete: 'CASCADE',
        },
        scholarship_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
        },
        short_description: {
            type: DataTypes.STRING(255),
        },
        coverage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contact_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        contact_email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        tableName: 'Scholarship',
        timestamps: false,
    });

    Scholarship.associate = function(models) {
        Scholarship.belongsTo(models.ScholarshipAdmin, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    };

    return Scholarship;
};