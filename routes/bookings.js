const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookings');

router.post('/:id', bookController.book);

router.get('/', bookController.fetchAll);

router.put('/:id', bookController.status);

router.get('/:id', bookController.fetchById);

module.exports = router;
