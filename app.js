const express = require('express');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const carRouter = require('./routes/carRoutes');

// Middlewares
app.use(express.json()); // Parses the req body
app.use('/api/v1/cars', carRouter);

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
