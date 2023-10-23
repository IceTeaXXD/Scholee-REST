// Library and module imports
const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();

// Port
const port = process.env.PORT || 6969;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers
const router = require('./routes/router.js');
app.use('/', router);

// Listen
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});