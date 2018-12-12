const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Number,
        required:true,
        default: 1
    },
    active:{
        type:Number,
        required:true,
        default: 0
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('BudgetSession',newSchema)
module.exports = Model;
