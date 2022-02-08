const express = require('express');

const app = express();

const carRouter = require('./routes/carRoutes');

// Middlewares
app.use(express.json()); // Parses the req body
app.use('/api/v1/cars', carRouter);

module.exports = app;
