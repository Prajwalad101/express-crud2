const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`The server is listening on port ${port}`);
});
