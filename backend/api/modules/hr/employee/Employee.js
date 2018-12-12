const mongoose = require('mongoose')
const Schema = mongoose.Schema
const employeeSchema = new Schema({
    regiment_id:{required:true, type:Schema.Types.ObjectId,ref: 'Regiment'},

    photo:String,
    hr_category:String,

    personal_id:{type:String,required:true, trim:true,unique:true},

    name_bengali:{ type:String},

    name_english:{ type:String},

    gender:{ type:String},

    grade:{type:String},

    nid:{type:String,required:true, trim:true,unique:true},

    rank:{type:String},

    dob:{type: Date},

    place_of_birth:{type: String},

    doj_in_bncc:{type: Date},

    doj_in_po:{type: Date},

    do_promotion:{type: Date},

    designation:{type: String},

    salary_grade:{type: String},

    salary_step:{type: String},

    blood_group:{ type:String},

    visible_mark:{ type:String},

    religion: { type: String},

    address:{type: [],default: undefined},

    major_illness:{type:String},

    chronic_disease:{type:String},

    passport_details:{type: [],default:undefined},

    tin_number:{type:String},

    driving_licence_no:{type:String},

    visited_countries:{type: [],default:undefined},

    edu_qualification:{type:String},

    personal_telephone:{type:String},

    official_telephone:{type:String},

    personal_mobile:{type:String},

    official_mobile:{type:String},

    email:{type:String},

    facebook:{type:String},

    other_electornic_id:{type:String},

    father_name:{type:String},

    father_profession:{type:String},

    father_mobile:{type:String},

    mother_name:{type:String},

    mother_profession:{type:String},

    mother_mobile:{type:String},

    spouses:{type: [],default:undefined},

    childrenes:{type:[],default:undefined},

    nominees:{type:[],default:undefined},

    service_record:{type:[],default:undefined},

    special_skill:{type:String},

    punishment:{type:[],default:undefined},

    created_by:{type:Schema.Types.ObjectId,ref: 'User',default: '5bbdcd6a7219a7242c58ccfb'},

    status:{type:Number,  default: 0},

    created_at:{type: Date, default: Date.now},

    updated_at:{type: Date, default: Date.now}
})

const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee;
