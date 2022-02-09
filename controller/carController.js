const Car = require('../model/carModel');

const getAllCars = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    const excludeFilters = ['sort', 'fields', 'limit', 'page'];
    excludeFilters.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Creating a queryObject
    let query = Car.find(JSON.parse(queryStr));

    // SORT
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    // Limit Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Add Pagination
    const page = Number(req.query.page * 1) || 1;
    const limit = Number(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const cars = await query;

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
