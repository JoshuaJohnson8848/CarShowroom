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
