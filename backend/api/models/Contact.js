const mongoose = require('mongoose')
const valid = require('validator')
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name:{
    type:String,
    required:true,
    trim: true,
    minLength:3
  },
  email:{
    type:String,
    required:true,
    trim: true,
    minLength:5,
    unique:true,
    index:true,
    validate:{
      validator: (v)=>{
        return valid.isEmail(v)
      },
      message:`{VALUE} is not valid`
    }
  },
  phone:{
    type:String,
    required:true,
    trim: true,
    minLength:5,
    unique:true,
    index:true
  }
})
const Contact = mongoose.model('Contact',contactSchema)
module.exports = Contact;
