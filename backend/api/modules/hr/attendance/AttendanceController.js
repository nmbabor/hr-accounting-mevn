const Attendance = require('./Attendance')
const Department = require('../department/Department')
const Employee = require('../employee/Employee')
const Regiment = require('./../../regiment/Regiment')
const OfficeSchedule = require('../office-schedule/OfficeSchedule')
const unit=require('util')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
var moment = require('moment');

class AttendanceController{
//View all Data
    async index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id)}
        if(req.decoded.role==='superadmin'){
            match = {}
        }
        let attendance = await Attendance.aggregate([
            {
                $group: {
                        _id: {attendance_date: "$attendance_date", regiment_id: "$regiment_id"},
                    attendance_date:{$first: '$attendance_date'},
                    regiment_id:{$first: '$regiment_id'},
                        count: { $sum: 1 }
                    }
            },
            {
                $lookup:{
                    from:'regiments',
                    localField:'regiment_id',
                    foreignField:  '_id',
                    as:'regiment'
                }
            },
            {$unwind:'$regiment'},
            {$sort:{_id: -1}},
            { "$match" : match },
            {"$project":{
                "regiment.name":1,
                "regiment.code":1,
                "attendance_date":1,
                "regiment_id":1
            }}
        ])

        res.json(attendance)
    }
//single user show
   async show(req,res,next){
        let input = req.query;
        let attendance = await Attendance.aggregate([
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "regiment_id",
                    foreignField: "_id",
                    as: "regiment"
                }
            },
            { "$unwind": "$regiment" },
            { $sort : { _id : 1 } },
            { "$match" : { "regiment_id" : mongoose.Types.ObjectId(input.reg),"attendance_date" : new Date(input.date) } }
        ])
        let regiment = await Regiment.findById(input.reg)
        let info={
            regiment_name:regiment.name,
            regiment_code:regiment.code,
            regiment_id:regiment._id,
            attendance_date:input.date,
        }
        res.status(200).json({attendance,info})
    }
//Store Data into DB
    store(req,res,next){
        let input = req.body;
        input.created_by=req.decoded._id

        if (input.attendance.length>0){
            let personalNul=[]
            let actualInTime=''
            let actualOutTime=''
            // actual in time & out time ----------------finding -
            OfficeSchedule.findOne({regiment_id:req.body.regiment_id})
                .then(scheduleTiem=>{
                    actualInTime=scheduleTiem.in_time
                    actualOutTime=scheduleTiem.out_time
                    let i=0
                    for (i=0;i<input.attendance.length;i++){
                        let attendnceInfo=[]
                        attendnceInfo.attendance_date=input.attendance_date
                        attendnceInfo.created_by=input.created_by
                        attendnceInfo.regiment_id=input.regiment_id
                        attendnceInfo.employee_id=input.employee_id[i]
                        attendnceInfo.attendance=input.attendance[i]
                        attendnceInfo.day_status=input.day_status[i]
                        attendnceInfo.in_time=input.in_time[i]
                        attendnceInfo.out_time=input.out_time[i]

                        // late calculation ----------------
                        let scheduleInTime = moment(new Date(actualInTime).toLocaleTimeString(), 'HH:mm:ss');
                        let empInTime = moment(new Date(input.in_time[i]).toLocaleTimeString(), 'HH:mm:ss');
                        let lateDuration = moment.duration(empInTime.diff(scheduleInTime));
                        let late = lateDuration.asHours(); // return hours
                        attendnceInfo.late=late*60

                        // overtime calculation -------------
                        let scheduleOutTime = moment(new Date(actualOutTime).toLocaleTimeString(), 'HH:mm:ss');
                        let empOutTime = moment(new Date(input.out_time[i]).toLocaleTimeString(), 'HH:mm:ss');
                        let extraTime = moment.duration(empOutTime.diff(scheduleOutTime));
                        let overTime = extraTime.asHours(); // return hours
                        attendnceInfo.overtime=overTime*60

                        let attendnceData=new Attendance(attendnceInfo)
                        attendnceData.save()
                            .then(saved=>{
                                saved
                                }
                            )
                            .catch(error=>{
                                console.log(console.log(error))
                                // Employee.findOne(input.employee_id[i])
                                //     .then(employee=>{
                                //         personalNul=employee.personal_id
                                //     })
                        })
                    } // end for ----------------
                    if (personalNul.length>0){
                        return res.status(500).json(personalNul)
                    }else{
                        res.status(201).json({message:'All Attendance Successfully Saved !'})
                    }

                })
                .catch(err=>{ // regiment wise intime & out time finding error
                    res.status(500).json(console.log(err))
                })

        } //end if -----------
    }
    // Update single data
    async update (req,res,next) {
        let input = req.body;
        input.created_by=req.decoded._id

        if (input.attendance.length>0){
            let personalNul=0
            let actualInTime=''
            let actualOutTime=''
            // actual in time & out time ----------------finding -
           let schedule = await OfficeSchedule.findOne({regiment_id:input.regiment_id})
                if(schedule!=='') {
                    actualInTime = schedule.in_time
                    actualOutTime = schedule.out_time
                    let i = 0
                    let inputAttn = input.attendance
                    for (i = 0; i < inputAttn.length; i++) {
                        let attendnceInfo = {
                            attendance: inputAttn[i].attendance,
                            day_status: inputAttn[i].day_status,
                            in_time: inputAttn[i].in_time,
                            out_time: inputAttn[i].out_time,
                            attendance_date: input.attendance_date,
                            employee_id: inputAttn[i].employee_id,
                            regiment_id: input.regiment_id,
                        }
                        // late calculation ----------------
                        let scheduleInTime = moment(new Date(actualInTime).toLocaleTimeString(), 'HH:mm:ss');
                        let empInTime = moment(new Date(attendnceInfo.in_time).toLocaleTimeString(), 'HH:mm:ss');
                        let lateDuration = moment.duration(empInTime.diff(scheduleInTime));
                        let late = lateDuration.asHours(); // return hours
                        attendnceInfo.late = late * 60

                        // overtime calculation -------------
                        let scheduleOutTime = moment(new Date(actualOutTime).toLocaleTimeString(), 'HH:mm:ss');
                        let empOutTime = moment(new Date(attendnceInfo.out_time).toLocaleTimeString(), 'HH:mm:ss');
                        let extraTime = moment.duration(empOutTime.diff(scheduleOutTime));
                        let overTime = extraTime.asHours(); // return hours
                        attendnceInfo.overtime = overTime * 60
                        res.json(attendnceInfo)
                        let attendance = await Attendance.findOne({attendance_date:attendnceInfo.attendance_date,employee_id:attendnceInfo.employee_id,regiment_id:attendnceInfo.regiment_id})
                        if(attendance!==''){
                            Attendance.findByIdAndUpdate(attendance._id, {$set: attendnceInfo})
                                .then(data => {
                                })
                                .catch(err => {
                                    personalNul+=1
                                })
                        }

                    } // end for ----------------
                    if (personalNul > 0) {
                        return res.status(500).json('Some error found!')
                    } else {
                        res.status(201).json({message: 'All Attendance Successfully Saved !'})
                    }

                }else{ // regiment wise intime & out time finding error
                    res.status(500).json('Schedule not found!')
                }

        } //end if -----------
    }
    //Delete data
    destroy(req, res,next) {
        let input  = req.query
        Attendance.remove({
            regiment_id: input.regiment_id,attendance_date:input.attendance_date
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    //View all Department
    department(req,res,next){
        Department.find({status:1})
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    employee(req,res,next){
        let id = req.params.regiment
        Employee.find({regiment_id:id, status:1})
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json(console.log(err))
            })
    }

    attnCheck(req,res,next){
        let ids = req.query.regiment_id
        let myDate = new Date(req.query.attendance_date)
        Attendance.aggregate([
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {
                $unwind: "$employee"
            },
            {
                $match: { "employee.regiment_id": mongoose.Types.ObjectId(ids),attendance_date: myDate}
            }
        ]).exec(function(err, attendance) {
            if(attendance!=''){
                res.status(303).json('Attendance Already Exists')
            }else{
                res.status(200).json('You can Submit attendace')
            }
        });
    }

    //  Office Schedule  --------------------
    officeScheduleToAttendance (req, res,next){

        OfficeSchedule.findOne({regiment_id:req.query.regiment_id})
            .then(scheduleData => { //promise return office schedule data ------
                let attendance_date=''
                if (req.query.attendance_date){
                     attendance_date= new Date(req.query.attendance_date)
                }else {
                     attendance_date=new Date()
                }
               let dayStatus=scheduleData.day_off[attendance_date.getDay()] // match today day from day_off array
                console.log(Object.values(dayStatus)[0])
                let day_staus=''
                if (Object.values(dayStatus)[0]===''){
                    day_staus=1
                }else {
                    day_staus=0
                }
                res.status(200).json({scheduleData,day_staus})
            })
            .catch(err => {
                res.status(500).json(console.log(err))
            })
    }

    //  active regimen --------------------
    activeRegiments (req, res,next){
        Regiment.aggregate([
            { $sort : { serial_num : 1 } },{$match:{ status: 1}}
        ]).exec(function(err, allData) {
            if(err){
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            }else{
                res.status(200).json(allData)
            }
        });
    }
}
module.exports = new AttendanceController;