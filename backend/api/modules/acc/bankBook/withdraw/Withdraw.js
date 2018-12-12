const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    withdraw_date:{
        type:Date,
        required:true
    },
    voucher_no:{
        type:String,
        required:true,
        trim:true,
        unique: true
    },
    head_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetHead'
    },
    session_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetSession',
    },
    budget_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Budget'
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Regiment'
    },
    amount:{
        type:Number,
        required:true,
        default: 1
    },
    month:{
        type:String,
        required:true
    },
    details:{
        type:String
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

const Model = mongoose.model('BankWithdraw',newSchema)
module.exports = Model;
