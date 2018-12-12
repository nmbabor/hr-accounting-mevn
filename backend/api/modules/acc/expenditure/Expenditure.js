const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    expenditure_date:{
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
    distribution_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetDistribution'
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
    transection_type:{
        type:Number,
        required:true,
        default: 0 //0 EFT, 1 = Cheque Paid, 2= Cheque Stor to Bank Book
    },
    cheque_no:{
        type:String,
        required:false,
    },
    cheque_date:{
        type:Date,
        required:false,
    },
    issuing_bank:{
        type:String,
        required:false,
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

const Model = mongoose.model('Expenditure',newSchema)
module.exports = Model;
