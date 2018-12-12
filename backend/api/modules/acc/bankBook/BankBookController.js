const BankBook = require('./BankBook')
const Session = require('../budget/session/Session')
const Regiment = require('../../regiment/Regiment')
const mongoose = require('mongoose')

class BankBookController{

//View all Data
    async index(req,res,next){
        let input  = req.body
        let regiment_id = req.decoded.regiment_id
        let data = await BankBook.aggregate([
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
            {"$match": {"regiment_id": mongoose.Types.ObjectId(regiment_id),"session_id": mongoose.Types.ObjectId(input.session_id)}},
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
//single user show
   async show(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let data = await BankBook.aggregate([
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
            {"$match": {"regiment_id": mongoose.Types.ObjectId(regiment_id),"_id": mongoose.Types.ObjectId(req.params.id)}},
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
        ])
       if(data){
            res.status(200).json(data[0])
       }else{
           res.json('Data Not Found')
       }
    }
    sessions(req,res,next){
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
}
module.exports = new BankBookController;