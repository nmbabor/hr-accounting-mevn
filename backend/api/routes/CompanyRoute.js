const express=require('express')
const route=express.Router()
const CompanyController=require('../controllers/CompanyController')

route.get('/', CompanyController.index)
route.post('/', CompanyController.store)
route.get('/:id', CompanyController.edit)
route.put('/:id', CompanyController.update)
route.delete('/:id', CompanyController.destroy)

module.exports = route