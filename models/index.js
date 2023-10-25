// Import Modules
const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

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
db.company = require('./company.model.js')(sequelize, DataTypes);
db.administrator = require('./administrator.model.js')(sequelize, DataTypes);
db.scholarship = require('./scholarship.model.js')(sequelize, DataTypes);

// Set up associations
db.user.associations(db);
db.company.associations(db);
db.administrator.associations(db);
db.scholarship.associations(db);

// Sync database
sequelize.sync({ force: false }).then(() => {
    console.log('Drop and Resync DB');
});

module.exports = db;
