const express = require('express');

const carController = require('../controller/carController');

const router = express.Router();

router
  .route('/5-most-powerful')
  .get(carController.getMostPowerFul, carController.getAllCars);

router
  .route('/5-fastest')
  .get(carController.getFastest, carController.getAllCars);

router.route('/').get(carController.getAllCars).post(carController.createCar);

router
  .route('/:id')
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;
