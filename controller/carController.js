// TODO: Get the Car model
const Car = require('../model/carModel');

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      status: 'success',
      results: cars.length,
      data: {
        cars,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        car: newCar,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = { getAllCars, createCar };
