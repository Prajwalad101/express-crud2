const mongoose = require('mongoose');

// TODO: Create a schema for the model

const carSchema = new mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: [true, 'A car must have a name'],
    trim: true,
  },
  Miles_per_Gallon: {
    type: Number,
    required: [true, 'A car must have an mpg value'],
  },
  Cylinders: {
    type: Number,
    required: [true, 'A car must have number of cylinders'],
  },
  Displacement: {
    type: Number,
    required: [true, 'A car must have a displacement value'],
  },
  Horsepower: {
    type: Number,
    required: [true, 'A car must have a horsepower value'],
  },
  Weight_in_lbs: {
    type: Number,
    required: [true, 'A car must have a weight value'],
  },
  Acceleration: {
    type: Number,
    required: [true, 'A car must have an acceleration'],
  },
  Year: {
    type: Date,
    required: [true, 'A car must have a date'],
  },
  Origin: {
    type: String,
    required: [true, 'A car must have an origin '],
  },
});

// TODO: Create a model from the schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
