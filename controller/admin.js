const Admin = require('../models/admin');

exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const admin = await new Admin({
      name: name,
      email: email,
      password: password,
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
