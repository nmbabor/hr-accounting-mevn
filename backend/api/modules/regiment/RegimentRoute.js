const express = require('express')
const route = express.Router();
const RegimentController = require('./RegimentController')

route.get('/',RegimentController.index);
route.post('/',RegimentController.store);
route.get('/active',RegimentController.activeRegiments);
route.get('/:id',RegimentController.show);
route.put('/:id',RegimentController.update);
route.delete('/:id',RegimentController.destroy);
module.exports = route
