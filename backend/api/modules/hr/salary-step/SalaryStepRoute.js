const express = require('express')
const route = express.Router();
const SalaryStepController = require('./SalaryStepController')

route.get('/',SalaryStepController.index);
route.post('/',SalaryStepController.store);
route.get('/active',SalaryStepController.activeSalaryStep);
route.post('/bulk-salary-grade',SalaryStepController.bulkSalaryStepSave);
route.get('/:id',SalaryStepController.show);
route.put('/:id',SalaryStepController.update);
route.delete('/:id',SalaryStepController.destroy);

module.exports = route
