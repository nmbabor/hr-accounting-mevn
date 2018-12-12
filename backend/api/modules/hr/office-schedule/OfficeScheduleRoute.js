const express=require('express')
const route=express.Router();

const controller=require('./OfficeScheduleController')
route.get('/',controller.index)
route.post('/',controller.store)
route.get('/active-regiment',controller.activeRegiments)
route.get('/:id',controller.show)
route.get('/:id/edit',controller.edit)
route.put('/:id',controller.update)
route.delete('/:id',controller.destroy)
module.exports=route
