const express = require('express')
const route = express.Router();
const Controller = require('./ExpenditureController')

route.post('/',Controller.store);
route.get('/total/:id',Controller.totalAmount);
route.get('/session',Controller.session);
route.get('/employee',Controller.employee);
route.get('/:id',Controller.edit);
route.post('/show',Controller.show);
route.put('/:id',Controller.update);
module.exports = route
