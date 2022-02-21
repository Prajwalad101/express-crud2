const express = require('express');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const carRouter = require('./routes/carRoutes');

// Middlewares
app.use(express.json()); // Parses the req body
app.use('/api/v1/cars', carRouter);

// TODO: IMPLEMENT ERROR HANDLING

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);

  next(err);
});

// TODO: 6. Handle errors in database (validation, fields, id's)
// TODO: 7. Handle unhandled rejections
// TODO: 8. Handle uncaught exceptions

app.use(globalErrorHandler);

module.exports = app;
