// Library and module imports
const express = require("express");
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require("dotenv").config();

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Scholee API Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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