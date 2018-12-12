const express = require('express')
const route = express.Router();
const DepartmentController = require('./DepartmentController')

route.get('/',DepartmentController.index);
route.post('/',DepartmentController.store);
route.get('/active',DepartmentController.activeDepartments);
route.get('/:id',DepartmentController.show);
route.put('/:id',DepartmentController.update);
route.delete('/:id',DepartmentController.destroy);

module.exports = route
