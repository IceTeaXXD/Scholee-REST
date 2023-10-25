// Import Modules
const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes} = require("sequelize");

// Establish Sequelize Connection
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

// Check Connection
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

// Create Databases
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.user = require('./user.model.js')(sequelize, DataTypes);
db.organization = require('./organization.model.js')(sequelize, DataTypes);
db.company = require('./company.model.js')(sequelize, DataTypes);
db.university = require('./university.model.js')(sequelize, DataTypes);
db.administrator = require('./administrator.model.js')(sequelize, DataTypes);
db.verification = require('./verification.model.js')(sequelize, DataTypes);
db.scholarship = require('./scholarship.model.js')(sequelize, DataTypes);
db.scholarshiptype = require('./scholarshiptype.model.js')(sequelize, DataTypes);

// Sync database
db.user.sync().then(() => {
    return db.organization.sync();
}).then(() => {
    return db.company.sync();
}).then(() => {
    return db.university.sync();
}).then(() => {
    return db.administrator.sync();
}).then(() => {
    return db.verification.sync();
}).then(() => {
    return db.scholarship.sync();
}).then(() => {
    return db.scholarshiptype.sync();
}).then(() => {
    console.log("All models were synchronized successfully.");
});


module.exports = db;