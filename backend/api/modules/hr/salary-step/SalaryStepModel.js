const mongoose=require('mongoose')
const Schema=mongoose.Schema

const SalaryStepSchema=new Schema({
    salary_step:{type:String,required:true},
    details:{type:String},
    created_by:{type:Schema.Types.ObjectId,required:true,ref: 'User',default: '5bbdcd6a7219a7242c58ccfb'},
    status:{type:Number, required:true, default: 1},
    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})

const SalaryStep = mongoose.model('SalaryStep',SalaryStepSchema)
module.exports=SalaryStep