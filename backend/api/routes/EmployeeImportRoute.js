const express=require('express')
const EmployeeImportController = require('../controllers/EmployeeImportController')

const route=express.Router()

route.get('/',EmployeeImportController.index)
route.post('/',EmployeeImportController.store)
route.delete('/:id',EmployeeImportController.destroy)

module.exports=route