const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    budget_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Budget'
    },
    head_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetHead'
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Regiment'
    },
    amount:{
        type:Number,
        required:true,
        default: 0
    },
    expense_amount:{
        type:Number,
        default: 0
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('BudgetDistribution',newSchema)
module.exports = Model;
