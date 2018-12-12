const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    session_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetSession',
        unique: true
    },
    amount:{
        type:Number,
        required:true,
        default: 1
    },
    budget_date:{
        type: Date, required: true
    },
    status:{
        type:Number,
        required:true,
        default: 1 // 1=Active, 0= Inactive, 2= Distributed
    },
    distribution_status:{
        type:Number,
        required:true,
        default: 0 //0= Not Distributed 1=Complete, 2= InComplete, 3= used
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('Budget',newSchema)
module.exports = Model;
