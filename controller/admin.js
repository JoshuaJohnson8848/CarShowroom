const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      const error = await new Error('Admin Not Found');
      error.status = 422;
      throw error;
    }
    let loadedAdmin = admin;
    const decodedPass = await bcrypt.compare(password, loadedAdmin.password);
    if (!decodedPass) {
      const error = await new Error('Incorrect Password');
      error.status = 422;
      throw error;
    }
    const token = await jwt.sign(
      {
        email: loadedAdmin.email,
        adminId: loadedAdmin._id,
      },
      process.env.SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'LoggedIn Successfully',
      token: token,
      adminId: loadedAdmin._id,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};
