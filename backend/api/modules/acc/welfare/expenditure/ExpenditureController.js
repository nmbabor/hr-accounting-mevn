const Expenditure = require('./Expenditure')
const Employee = require('../../../hr/employee/Employee')
const Session = require('../../budget/session/Session')
const Regiment = require('../../../regiment/Regiment')
const Welfare = require('../Welfare')
const mongoose = require('mongoose')

class ExpenditureController{

//View all Data
    edit(req,res,next){
        Expenditure.findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//single user show
    async show(req,res,next){
        let input  = req.body
        let regiment_id = req.decoded.regiment_id
        let matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(regiment_id)}

        let data = await Expenditure.aggregate([
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            {$unwind:"$employee" },
            {"$match":matchQuery }
        ])
        let info = {}
        let sess = await Session.findById(input.session_id)
        info = {session: sess.name}

        let regi = await Regiment.findById(regiment_id)
        info = {
            session: sess.name,
            regiment:regi.name,
            code:regi.code
        }

        res.status(200).json({data,info})
    }
//Store Data into DB
    async store(req,res,next){
        let input = req.body;
        input.regiment_id = req.decoded.regiment_id
        const newData = new Expenditure(input)
        newData.save().then(data=>{
            res.status(201).json({
                message:'Data successfully inserted.'
            })
        }).catch(error => {
            res.status(500).json(error)
        })
    }
    // Update single data
    async update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;
        inputData.updated_at = new Date()
        let expenditure = await Expenditure.findById(id)
        Expenditure.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something error found!',
                    error:err
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
        let regiment_id = req.decoded.regiment_id
        Employee.find({regiment_id:regiment_id})
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

    async totalAmount(req,res,next){
        let session_id = req.params.id
        let regiment_id = req.decoded.regiment_id
        let total = await Welfare.aggregate([
            {"$match": {"regiment_id": mongoose.Types.ObjectId(regiment_id),"session_id": mongoose.Types.ObjectId(session_id)}},
            {
                $group:
                    {
                        _id:'$regiment_id',
                        total_amount: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
            }
        ])
        let amount = 0;
        if(total!='' && total[0].total_amount){
            amount = total[0].total_amount
        }

        let expense = await Expenditure.aggregate([
            {"$match": {"regiment_id": mongoose.Types.ObjectId(regiment_id),"session_id": mongoose.Types.ObjectId(session_id)}},
            {
                $group:
                    {
                        _id:'$regiment_id',
                        total_amount: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
            }
        ])
        let expenseAmount = 0;
        if(expense!='' && expense[0].total_amount){
            expenseAmount = expense[0].total_amount
        }
        res.json(amount-expenseAmount)
    }
}
module.exports = new ExpenditureController;