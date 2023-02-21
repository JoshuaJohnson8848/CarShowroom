const Booking = require('../models/bookings');

exports.book = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const fullName = req.body.fullName;
    const address = req.body.address;
    const phone = req.body.phone;
    const status = req.body.status;
    const location = req.body.location;
    const date = req.body.date;

    const book = new Booking({
      fullName: fullName,
      address: address,
      phone: phone,
      car: carId,
      status: status,
      location: location,
      date: date,
    });

    const booked = await book.save();
    if (!booked) {
      const error = new Error('Booking Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Booked', booked });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.fetchAll = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('car').exec();
    if (!bookings) {
      const error = new Error('Bookings Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Bookings Fetched', bookings });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.status = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const status = req.body.status;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      const error = new Error('Booking Not Found');
      error.status = 422;
      throw error;
    }
    booking.status = status;
    const updatedBooking = await booking.save();
    if (!updatedBooking) {
      const error = new Error('Booking Not Updated');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Status Updated', booking: updatedBooking });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.fetchById = async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      const error = new Error('Booking Not Found');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Booking Fetched', booking });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.filter = async (req, res, next) => {
  try {
    const location = req.body.location;
    const date = req.body.date;

    const filteredBookings = await Booking.find({
      location: location,
      date: date,
    })
      .populate('car')
      .exec();

    if (!filteredBookings) {
      const error = new Error('Bookings Not Found');
      error.status = 422;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Bookings Filtered', bookings: filteredBookings });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
