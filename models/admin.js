const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
