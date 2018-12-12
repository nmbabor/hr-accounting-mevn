const express=require('express')
const route=express.Router()
const DesignationController = require('../controllers/DesignationController')

route.get('/',DesignationController.index)
route.post('/',DesignationController.store)
route.get('/active',DesignationController.activeDesignations)
route.get('/:id',DesignationController.show)
route.put('/:id',DesignationController.update)
route.delete('/:id',DesignationController.destroy)

module.exports=route

