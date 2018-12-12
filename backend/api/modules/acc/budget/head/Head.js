const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    code:{
        type:Number,
        required:true,
        trim:true
    },
    type:{
        type:Number,
        required:true,
        default: 0 //0=Cheque, 1 = EFT
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

const Model = mongoose.model('BudgetHead',newSchema)
module.exports = Model;
