const mongoose=require('mongoose')
const Schema=mongoose.Schema

const NewSchema=new Schema({
    designation:{
        type:String,
        require:true,
        trim: true,
    },
    details:{
      type:String,
      require:false
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Designation=mongoose.model('Designation',NewSchema)
module.exports=Designation


