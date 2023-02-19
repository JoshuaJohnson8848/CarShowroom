const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  carName: {
    type: String,
    required: true,
  },
  segment: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Car', carSchema);
