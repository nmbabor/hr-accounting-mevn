const Performance = require('./Performance')
const Session = require('../../../acc/budget/session/Session')
const Employee = require('../Employee')
const mongoose = require('mongoose')

class PerformanceController{

//View all Data
    index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id)}
        if(req.decoded.role==='superadmin'){
            match = {}
        }
        Performance.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match  }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
//single user show
    show(req,res,next){
        Performance.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : { "_id" : mongoose.Types.ObjectId(req.params.id) } }
        ]).exec(function(err, data) {
            if(err){
                res.status(500)
            }else{
                res.status(200).json(data[0])
            }
        });
    }
    edit(req,res,next){
        Performance.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//Store Data into DB
    async store(req,res,next){
        let input = req.body;
         let oldData = await Performance.find({employee_id:input.employee_id,session_id:input.session_id,month:input.month})
        console.log(oldData)
        if(oldData==''){
            const data = new Performance(input)
            data.save().then(data=>{
                res.status(201).json(data)
            }).catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
        }else{
            res.status(500).json('Already added')
        }

    }
    // Update single data
    async update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;
        inputData.updated_at = new Date()
        let oldData = await Performance.find({employee_id:inputData.employee_id,session_id:inputData.session_id,month:inputData.month,_id:{$ne:id}})
        if(oldData=='') {
            Performance.findByIdAndUpdate(id, {$set: inputData})
                .then(data => {
                    Performance.findById(data.id).then(newData => {
                        res.json({data: newData})
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Something error found!',
                        error: err
                    })
                })
        }else{
            res.status(500).json('Already added')
        }
    }
    //Delete data
    destroy(req, res,next) {
        Performance.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    session(req,res,next){
        Session.find({status:1})
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
    employee(req,res,next){
        let match = {status: 1, regiment_id: req.decoded.regiment_id}
        if(req.params.id && req.params.id!==''){
            match = {status: 1, regiment_id: req.params.id}
        }
        Employee.find(match,'_id name_english')
            .then(allData => {
                res.status(200).json(allData)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }

}
module.exports = new PerformanceController;