const Car = require('../model/carModel');

const getAllCars = async (req, res) => {
  const queryObj = { ...req.query };

  const excludeFilters = ['sort', 'find', 'limit', 'page'];
  excludeFilters.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  try {
    const cars = await Car.find(JSON.parse(queryStr));

    res.status(200).json({
      status: 'success',
      results: cars.length,
      data: {
        cars,
      },
    });
  } catch (err) {
    console.log(err);
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

const getCar = async (req, res) => {
  try {
    const newCar = await Car.findById(req.params.id);
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

const updateCar = async (req, res) => {
  try {
    const newCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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

const deleteCar = async (req, res) => {
  try {
    Car.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

module.exports = { getAllCars, createCar, getCar, updateCar, deleteCar };
