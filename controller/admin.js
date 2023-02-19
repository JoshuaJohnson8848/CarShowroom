const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existingEmail = await Admin.findOne({ email: email });
    if (existingEmail) {
      const error = new Error('Email Already Exist');
      error.status = 422;
      throw error;
    }

    const hashedPass = await bcrypt.hash(password, 12);
    if (!hashedPass) {
      const error = new Error('Password Error');
      error.status = 422;
      throw error;
    }

    const admin = await new Admin({
      name: name,
      email: email,
      password: hashedPass,
    });
    const createdAdmin = await admin.save();
    if (!createdAdmin) {
      const error = new Error('Admin Not Created');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Admin Created', admin: createdAdmin });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
