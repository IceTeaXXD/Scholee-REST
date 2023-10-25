module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define(
        "University",
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
        },
        {
            tableName: "University",
            timestamps: false,
        }
    );

    return University;
};
