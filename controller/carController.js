const Car = require('../model/carModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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

const getAllCars = catchAsync(async (req, res) => {
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
});

const createCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      car: newCar,
    },
  });
});

const getCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      car: newCar,
    },
  });
});

const updateCar = catchAsync(async (req, res, next) => {
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
});

const deleteCar = catchAsync(async (req, res, next) => {
  Car.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getMostPowerFul,
  getFastest,
  getAllCars,
  createCar,
  getCar,
  updateCar,
  deleteCar,
};
