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
