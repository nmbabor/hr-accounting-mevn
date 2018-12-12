const express = require('express')
const route = express.Router();
const Controller = require('./BankBookController')

route.post('/',Controller.index);
route.get('/sessions',Controller.sessions);
route.get('/:id',Controller.show);
module.exports = route
