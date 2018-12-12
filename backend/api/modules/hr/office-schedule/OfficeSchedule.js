const mongoose=require('mongoose')

const Schema=mongoose.Schema
const officeSchedule=new  Schema({
    in_time:{type:Date,require:true},

    out_time:{type:Date,require:true},

    day_off:{type:[],require:true},

    regiment_id:{type:Schema.Types.ObjectId,ref:'Regiment',require:true},

    created_by:{type:Schema.Types.ObjectId,ref: 'User'},

    status:{type:Number,  default: 1},

    created_at:{type: Date, default: Date.now},

    updated_at:{type: Date, default: Date.now}
})

const OfficeSchedule=mongoose.model('OfficeSchedule',officeSchedule)
module.exports=OfficeSchedule