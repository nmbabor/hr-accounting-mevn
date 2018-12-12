const express = require('express')
const route = express.Router();
const FrontendController = require('../controllers/FrontendController')

route.get('/',FrontendController.module);
route.get('/info',FrontendController.primaryInfo);
route.get('/regiment',FrontendController.regiment);
route.get('/budget',FrontendController.newBudget);
module.exports = route
