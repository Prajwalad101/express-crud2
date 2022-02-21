const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational/trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // Log the error
    console.error('ERROR:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  const nodeEnvironment = process.env.NODE_ENV;

  // Send different responses depending upon the node environment
  if (nodeEnvironment === 'development') {
    sendErrorDev(err, res);
  } else if (nodeEnvironment === 'production') {
    sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
