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
db.scholarshipadmin = require('./scholarshipadmin.model.js')(sequelize, DataTypes);
db.scholarship = require('./scholarship.model.js')(sequelize, DataTypes);
db.scholarshiptype = require('./scholarshiptype.model.js')(sequelize, DataTypes);

// Sync database
db.sequelize.sync( {force: false} ).then(() => {
    console.log("Drop and re-sync db.");
})

module.exports = db;