const express = require('express')
const route = express.Router();
const Controller = require('./NtrFindController')

route.get('/regiments',Controller.regiment);
route.get('/sessions',Controller.sessions);
route.post('/',Controller.showData);
module.exports = route
