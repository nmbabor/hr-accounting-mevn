const express = require('express')
const route = express.Router();
const SalaryGradeController = require('./SalaryGradeController')

route.get('/',SalaryGradeController.index);
route.post('/',SalaryGradeController.store);
route.get('/active',SalaryGradeController.activeSalaryGrades);
route.post('/bulk-salary-grade',SalaryGradeController.bulkSalaryGradesSave);
route.get('/:id',SalaryGradeController.show);
route.put('/:id',SalaryGradeController.update);
route.delete('/:id',SalaryGradeController.destroy);

module.exports = route
