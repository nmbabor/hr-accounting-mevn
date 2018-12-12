const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    short_name:{
        type:String,
        trim:true
    },
    code:{
        type:String,
        trim:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    serial_num:{
        type:Number
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

const Model = mongoose.model('Regiment',newSchema)
module.exports = Model;
