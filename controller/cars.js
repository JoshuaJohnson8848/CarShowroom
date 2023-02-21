const Car = require('../models/cars');

exports.create = async (req, res, next) => {
  try {
    const carName = req.body.carName;
    const segment = req.body.segment;
    const brand = req.body.brand;

    const car = await new Car({
      carName: carName,
      segment: segment,
      brand: brand,
    });
    const createdCar = await car.save();
    if (!car) {
      const error = new Error('Car Not Created');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Car Created', car: createdCar });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.fetchAll = async (req, res, next) => {
  try {
    const cars = await Car.find();
    if (!cars) {
      const error = new Error('Cars Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Cars Fetched', cars });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) {
      const error = new Error('Car Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Car Fetched', car });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const carName = req.body.carName;
    const segment = req.body.segment;
    const brand = req.body.brand;

    const existingCar = await Car.findById(carId);
    if (!existingCar) {
      const error = new Error('Car Not Found');
      error.status = 422;
      throw error;
    }
    existingCar.carName = carName;
    existingCar.segment = segment;
    existingCar.brand = brand;

    const updatedCar = await existingCar.save();
    if (!updatedCar) {
      const error = new Error('Car Not Updated');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Car Updated', car: updatedCar });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const carId = req.params.id;

    const car = await Car.findByIdAndRemove(carId);
    if (!car) {
      const error = new Error('Car Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'car Deleted' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const deleteAll = await Car.deleteMany();
    if (!deleteAll) {
      const error = new Error('Car Not Deleted');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Cars Deleted' });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
