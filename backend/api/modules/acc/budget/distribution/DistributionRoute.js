const express = require('express')
const route = express.Router();
const Controller = require('./DistributionController')

route.post('/',Controller.store);
route.get('/regiment',Controller.regiment);
route.get('/:id',Controller.show);
module.exports = route
