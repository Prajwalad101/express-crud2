const Car = require('../model/carModel');
const APIFeatures = require('../utils/apiFeatures');

const getMostPowerFul = (req, res, next) => {
  req.query.sort = '-Horsepower,-Cylinders,-Displacement';
  req.query.limit = '5';
  next();
};

const getFastest = (req, res, next) => {
  req.query.sort = 'Acceleration';
  req.query.limit = '5';
  next();
};

const getAllCars = async (req, res) => {
  try {
    const features = new APIFeatures(Car.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const cars = await features.query;

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

module.exports = {
  getMostPowerFul,
  getFastest,
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
};
