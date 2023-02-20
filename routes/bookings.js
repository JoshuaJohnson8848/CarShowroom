const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookings');

router.post('/:id', bookController.book);

router.get('/', bookController.fetchAll);

module.exports = router;
