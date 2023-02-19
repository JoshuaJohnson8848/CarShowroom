const express = require('express');
const router = express();
const carController = require('../controller/cars');

router.post('', carController.create);

router.get('', carController.fetchAll);

router.delete('/:id', carController.deleteById);

module.exports = router;
