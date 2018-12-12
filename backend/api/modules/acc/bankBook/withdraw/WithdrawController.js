const Withdraw = require('./Withdraw')
const Session = require('../../budget/session/Session')
const Regiment = require('../../../regiment/Regiment')
const Head = require('../../budget/head/Head')
const Budget = require('../../budget/Budget')
const BankBook = require('../BankBook')
const Distribution = require('../../budget/distribution/Distribution')
const mongoose = require('mongoose')

class WithdrawController{

//View all Data
    async edit(req,res,next){
        let data = await Withdraw.aggregate([
            {
                $lookup: {
                    from: "budgetheads", // collection name in db
                        localField: "head_id",
                        foreignField: "_id",
                        as: "head"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$head", 0]}, "$$ROOT"]}}
            },
            {$project: {head: 0}}
        ])
        if(data){
            res.status(200).json(data[0])
        }else{
            res.json('Data Not Found')
        }
    }
//single user show
    async show(req,res,next){
        let input  = req.body
        let regiment_id = req.decoded.regiment_id
        let matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(regiment_id)}

        let data = await Withdraw.aggregate([
            {
                $lookup: {
                    from: "budgetheads", // collection name in db
                    localField: "head_id",
                    foreignField: "_id",
                    as: "budgethead"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$budgethead", 0]}, "$$ROOT"]}}
            },
            {$project: {budgethead: 0}},
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
        let budget = await Budget.findOne({session_id:input.session_id,distribution_status:1})
        if(budget && budget!=''){
            input.budget_id = budget._id
        }
        const newData = new Withdraw(input)
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
        let expenditure = await Withdraw.findById(id)
        Withdraw.findByIdAndUpdate(id,{$set:inputData})
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
    //Delete data
    destroy(req, res,next) {
        Withdraw.remove({
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
    heads(req,res,next){
        Head.find().then(allData => {
            res.status(200).json(allData)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
    async totalBankBook(req,res,next){
        let session_id = req.params.id
        let regiment_id = req.decoded.regiment_id
        let total = await BankBook.aggregate([
            {
                $lookup: {
                    from: "expenditures", // collection name in db
                    localField: "expenditure_id",
                    foreignField: "_id",
                    as: "expenditure"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$expenditure", 0]}, "$$ROOT"]}}
            },
            {$project: {expenditure: 0}},
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

        let expense = await Withdraw.aggregate([
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
module.exports = new WithdrawController;