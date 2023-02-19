const express = require('express');
const router = express();
const carController = require('../controller/cars');

router.post('', carController.create);

module.exports = router;
