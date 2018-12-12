const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
   expenditure_id:{
       type:Schema.Types.ObjectId,
       required:true,
       ref: 'Expenditure'
   },
    amount:{
        type:Number,
        required:true,
        default: 0
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

const Model = mongoose.model('BankBook',newSchema)
module.exports = Model;
