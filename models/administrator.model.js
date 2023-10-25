module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define(
        "Administrator",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                references : {
                    model : 'User',
                    key : 'user_id',
                    ondDelete : 'CASCADE'
                }
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references : {
                    model : 'Company',
                    key : 'user_id',
                    onDelete : 'CASCADE'
                }
            },
        },
        {
            tableName: "Administrator",
            timestamps: false,
        }
    );

    return Administrator;
};
