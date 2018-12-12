const express=require('express')
const route=express.Router()
const Controller=require('./MailController')

route.get('/', Controller.index)
route.post('/', Controller.send)
route.post('/single', Controller.singleMail)
route.get('/employee/:id?',Controller.employee);

module.exports = route