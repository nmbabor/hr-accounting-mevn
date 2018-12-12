const express=require('express')
const route=express.Router()

const CompanyController=require('../controllers/PrimaryInfoController')
route.get('/', CompanyController.edit)
route.put('/', CompanyController.update)
route.post('/',CompanyController.store)

module.exports=route