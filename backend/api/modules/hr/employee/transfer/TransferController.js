const Transfer = require('./Transfer')
const Session = require('../../../acc/budget/session/Session')
const Regiment = require('../../../regiment/Regiment')
const Employee = require('../Employee')
const mongoose = require('mongoose')

class TransferController{

//View all Data
    index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id)}
        if(req.decoded.role==='superadmin'){
            match = {}
        }
        Transfer.aggregate([
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
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "regiment_id",
                    foreignField: "_id",
                    as: "regiment"
                }
            },
            { "$unwind": "$regiment" },
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "transferred_regiment_id",
                    foreignField: "_id",
                    as: "transferred"
                }
            },
            { "$unwind": "$transferred" },
            { $sort : { _id : -1 } },
            { "$match" : match },
            {
                "$project": {
                    "_id": 1,
                    "transferred_regiment_id": 1,
                    "employee_id": 1,
                    "submit_date": 1,
                    "month": 1,
                    "status": 1,
                    "session_id": 1,
                    "session._id": 1,
                    "session.name": 1,
                    "employee.name_english": 1,
                    "employee._id": 1,
                    "regiment.name": 1,
                    "transferred.name": 1
                }
            }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
//single user show
    show(req,res,next){
        Transfer.aggregate([
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
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "regiment_id",
                    foreignField: "_id",
                    as: "regiment"
                }
            },
            { "$unwind": "$regiment" },
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "transferred_regiment_id",
                    foreignField: "_id",
                    as: "transferred"
                }
            },
            { "$unwind": "$transferred" },
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
    //single user show
    edit(req,res,next){
        Transfer.findById(req.params.id).then(data => {
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
        const data = new Transfer(input)
        data.save().then(data=>{
            Employee.findByIdAndUpdate(input.employee_id, {$set: {regiment_id:input.transferred_regiment_id}})
                .then(d => {
                    res.status(201).json(data)
                })
                .catch(e => {
                    res.status(500).json(e)
                })

        }).catch(err => {
            res.status(500).json(err)
        })

    }
    // Update single data
    async update (req,res,next) {
        let id = req.params.id
        let transfer = await Transfer.findOne({_id:req.params.id})
        let inputData = req.body;
        inputData.updated_at = new Date()
        Transfer.findByIdAndUpdate(id, {$set: inputData})
            .then(data => {
                Employee.findByIdAndUpdate(transfer.employee_id, {$set: {regiment_id:transfer.regiment_id}})
                    .then(d => {
                        Employee.findByIdAndUpdate(inputData.employee_id, {$set: {regiment_id:inputData.transferred_regiment_id}})
                            .then(d => {
                                res.status(201).json(data)
                            })
                            .catch(e => {
                                res.status(500).json(e)
                            })
                    })
                    .catch(e => {
                        res.status(500).json(e)
                    })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Something error found!',
                    error: err
                })
            })
    }
    //Delete data
   async destroy(req, res,next) {
        let transfer = await Transfer.findOne({_id:req.params.id})
       Employee.findByIdAndUpdate(transfer.employee_id, {$set: {regiment_id:transfer.regiment_id}})
           .then(d => {
               Transfer.deleteOne({
                   _id: req.params.id
               }, function (err, result) {
                   if (err)
                       res.send(err)
                   res.send({
                       success: true
                   })
               })
           })
           .catch(e => {
               res.status(500).json(e)
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
    regiment(req,res,next){
        Regiment.aggregate([
            { $sort : { serial_num : 1 } },
            { $match : { status : 1 } },
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
module.exports = new TransferController;