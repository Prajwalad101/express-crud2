const express = require('express');

const app = express();

const carRouter = require('./routes/carRoutes');

// Middlewares
app.use(express.json()); // Parses the req body
app.use('/api/v1/cars', carRouter);

module.exports = app;

// TODO: IMPLEMENT ERROR HANDLING

app.all('*', (req, res, next) => {
  // send an error response back to the client
  // create a new error from Error constructor
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = 'fail';

  next(err);
});

// TODO: 2. Implement a global error middleware function
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || fail;

  // send a response back to the user
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
// TODO: 3. Refactor try/catch blocks by catching errors in a seperate async function
// TODO: 4. Add 404 (Not found) errors
// TODO: 5. Seperate development vs production errors
// TODO: 6. Handle errors in database (validation, fields, id's)
// TODO: 7. Handle unhandled rejections
// TODO: 8. Handle uncaught exceptions
