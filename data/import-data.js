const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Car = require('../model/carModel');

dotenv.config({ path: './config.env' });
// TODO: Get the connection string from env file
// TODO: Replace the <PASSWORD> string to actual password

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

console.log(DB);

// TODO: connect to the database using mongoose module
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// TODO: Read data from cars.json
const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, 'utf-8'));

// TODO: Check the data for null values and clean them
const newCars = cars.filter((car) => car.Miles_per_Gallon !== null);

const importData = async () => {
  try {
    await Car.create(newCars);
    console.log('Data successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Car.deleteMany();
    console.log('Data sucessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
