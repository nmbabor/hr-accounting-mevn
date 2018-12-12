const mongoose = require('mongoose')
const Schema = mongoose.Schema
const newSchema = new Schema({
    //var a =['attendance','day_status','in_time','out_time','late','late_in','early_out','overtime','employee_id','created_by','updated_by','company_id'];
    attendance_date:{ type: Date, required:true },
    attendance:{ type: Number, required:true, default: 0 },//comment('1=Present, 0=Absence, 2=Leave')
    day_status:{ type: Number, required:true, default: 1 },//comment('1=Working Day, 0=Off Day')
    in_time:{ type: Date, required:true},
    out_time:{ type: Date, required:false},
    late_in:{ type: Number, required:false},
    early_out:{ type: Number, required:false},
    late:{ type: Number, required:false}, // late amount in munite
    overtime:{ type: Number, required:false}, // overtime amount in munite
    employee_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Employee'
    },
    regiment_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'Regiment'
    },
    created_by:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    created_at:{ type: Date, default: Date.now },
    updated_at:{ type: Date, default: Date.now }
})

const Model = mongoose.model('Attendance',newSchema)
module.exports = Model;
