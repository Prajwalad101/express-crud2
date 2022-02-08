const express = require('express');

const carController = require('../controller/carController');

const router = express.Router();

router.route('/').get(carController.getAllCars);

router.route('/:id').post(carController.createCar);

module.exports = router;
