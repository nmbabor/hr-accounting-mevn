const express = require('express')
const route = express.Router();
const EmployeeController = require('./EmployeeController')
route.get('/',EmployeeController.index);
route.get('/active-regiment',EmployeeController.activeRegiments);
route.post('/emp-data-save',EmployeeController.empDataSave);
route.post('/',EmployeeController.store);
route.get('/:id',EmployeeController.show);
route.post('/photo-upload',EmployeeController.employeePhotoUpload);
route.put('/:id',EmployeeController.update);
route.delete('/:id',EmployeeController.destroy);
route.post('/',EmployeeController.employeeImport);
module.exports = route