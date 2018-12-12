const Expenditure = require('./Expenditure')
const Session = require('../budget/session/Session')
const Regiment = require('../../regiment/Regiment')
const Head = require('../budget/head/Head')
const Budget = require('../budget/Budget')
const BankBook = require('../bankBook/BankBook')
const Distribution = require('../budget/distribution/Distribution')
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

        let distribution = ''
        if(budget && budget!=''){
            input.budget_id = budget._id
            distribution = await Distribution.findOne({
                budget_id: budget._id,
                head_id:input.head_id,
                regiment_id: input.regiment_id
            })
            input.distribution_id = distribution._id
        }
        const newData = new Expenditure(input)
        newData.save().then(data=>{
            let totalExpense = distribution.expense_amount+parseFloat(input.amount)
            Distribution.findByIdAndUpdate(distribution._id,{$set:{expense_amount:totalExpense}})
                .then(dd=>{
                })
                .catch(err=>{
                    res.status(500).json({
                        message:'Something error found in distribution Update',
                        error:err
                    })
                })
            if(input.transection_type && input.transection_type==2){

                const bankBook = new BankBook({
                    expenditure_id:data._id,
                    amount: input.amount
                })
                bankBook.save().then(d=>{
                }).catch(errr=>{
                    res.status(500).json(errr)
                })
            }
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
                Distribution.findById(data.distribution_id).then(dist=>{
                    let totalExpense = dist.expense_amount+parseFloat(inputData.amount)-expenditure.amount
                    Distribution.findByIdAndUpdate(data.distribution_id,{$set:{expense_amount:totalExpense}})
                        .then(dd=>{
                        })
                        .catch(err=>{
                            res.status(500).json(err)
                        })
                }).catch(er=>{
                    res.status(500).json(er)
                })

                if(inputData.transection_type && inputData.transection_type==2){

                    const bankBook = {
                        expenditure_id:data._id,
                        amount: inputData.amount
                    }
                    BankBook.updateOne({ expenditure_id: data._id },bankBook, function(err, re) {
                        if(err){
                            res.status(500).json(err)
                        }
                    });
                }
                res.json(data)
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
        Expenditure.remove({
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
    async headInformation(req,res,next){
        let input = req.body
        let regiment_id = req.decoded.regiment_id
        let budget = await Budget.findOne({session_id:input.session_id,distribution_status:1})
        if(budget && budget!=''){
            let distribution = await Distribution.aggregate([
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
                {$project: {head: 0}},
                {$sort: {head_id: 1}},
                {"$match": {"budget_id": mongoose.Types.ObjectId(budget._id),"head_id": mongoose.Types.ObjectId(input.head_id), "regiment_id": mongoose.Types.ObjectId(regiment_id)}}
            ])
            let dist = ''
            if(distribution){
                dist = distribution[0]
            }
            res.status(200).json(dist)
        }else{
            res.status(400).json('Budget not found!')
        }
    }


}
module.exports = new ExpenditureController;