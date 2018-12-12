const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    ntr_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Ntr',
    },
    field_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'NtrField'
    },
    amount:{
        type:Number,
        required:true,
        default: '0'
    },
    created_at:{
        type: Date, default: Date.now
    },
    updated_at:{
        type: Date, default: Date.now
    }
})

const Model = mongoose.model('NtrAmount',newSchema)
module.exports = Model;
