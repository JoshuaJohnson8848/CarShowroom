const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.post('/signup', adminController.signup);

router.post('/login', adminController.login);

module.exports = router;
