const express = require('express');
const router = express();
const carController = require('../controller/cars');

router.post('', carController.create);

router.get('', carController.fetchAll);

router.get('/:id', carController.fetchById);

router.put('/:id', carController.update);

router.delete('/:id', carController.deleteById);

router.delete('', carController.deleteAll);

module.exports = router;
