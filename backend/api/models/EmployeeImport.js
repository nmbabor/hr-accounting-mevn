const mongoose=require('mongoose')

const Schema=mongoose.Schema

const EmployeesSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    address:{
        type:String
    },
})

const Employees=mongoose.model('Employees',EmployeeSchema)

module.exports=Employees