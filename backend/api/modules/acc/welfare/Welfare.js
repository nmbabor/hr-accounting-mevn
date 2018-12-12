const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    details:String,
    session_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'BudgetSession'
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Regiment'
    },
    submit_date:{
        type: Date, required: true
    },
    amount:{
        type:Number,
        required:true,
        default: 0
    },
    month:{
        type:Number,
        required:true
    },
    voucher_no:{
        type:String,
        required:true
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

const Model = mongoose.model('WelfareFund',newSchema)
module.exports = Model;
