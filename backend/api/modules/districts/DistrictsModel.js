const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DistrictSchema=new Schema({
    district:{type:String,required:true},
    details:{type:String},
    created_by:{type:Schema.Types.ObjectId,required:true,ref: 'User',default: '5bbdcd6a7219a7242c58ccfb'},
    status:{type:Number, required:true, default: 1},
    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})

const District = mongoose.model('District',DistrictSchema)
module.exports=District