const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => console.log('Error while connecting to the database'));

const port = process.env.PORT || 3000;
const server = app.listen(port, (req, res) => {
  console.log(`The server is listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection. Shutting down.....');
  server.close(() => {
    process.exit(1);
  });
});
