const express = require('express')
const route = express.Router();
const Controller = require('./BudgetReportController')

route.get('/regiment',Controller.regiment);
route.get('/budget',Controller.totalReceived);
route.get('/expenditure',Controller.expenditure);
route.get('/budget-distribute/:id',Controller.budgetReg);
route.get('/expenditure/:id',Controller.regExpenditure);
route.get('/welfare/:id',Controller.welfare);
route.get('/welfare-expenditure/:id',Controller.welfareExpenditure);
route.get('/ntr-total',Controller.ntrTotal);
route.get('/ntr-deposit/:id',Controller.ntrDeposit);

module.exports = route