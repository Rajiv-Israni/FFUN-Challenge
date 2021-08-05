const fs = require('fs');

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Car = require('../models/car');

const getCars = async (req, res, next) => {
  let cars;
  try {
    cars = await Car.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!cars) {
    const error = new HttpError(
      'Could not find place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ cars: cars.map(car => car.toObject({ getters: true })) });
};

const getCarById = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      'Could not find place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ car: car.toObject({ getters: true }) });
};

const createCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { year, make, model, price, status } = req.body;

  const createdCar = new Car({
    make,
    make_model: model,
    year,
    price,
    status
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCar.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ car: createdCar });
};

const updateCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { year, make, model, price, status } = req.body;
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  car.make = make;
  car.make_model = model;
  car.year = year;
  car.price = price;
  car.status = status;

  try {
    await car.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ car: car.toObject({ getters: true }) });
};

const deleteCar = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await car.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted Car.' });
};

exports.getCars = getCars;
exports.createCar = createCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
exports.getCarById = getCarById;
