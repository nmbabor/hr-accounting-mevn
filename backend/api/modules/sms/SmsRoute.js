const express=require('express')
const route=express.Router()
const Controller=require('./SmsController')

route.get('/', Controller.index)
route.post('/', Controller.send)
route.post('/multiple', Controller.multiple)
route.get('/employee/:id?',Controller.employee);

module.exports = route