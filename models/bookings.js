const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
