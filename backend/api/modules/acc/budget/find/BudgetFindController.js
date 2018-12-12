const Budget = require('../Budget')
const Distribution = require('../distribution/Distribution')
const Regiment = require('../../../regiment/Regiment')
const Session = require('../session/Session')
const HeadWiseBudget = require('../HeadWiseBudget')
const mongoose = require('mongoose')

class BudgetFindController{
    async show(req,res,next){
        let input  = req.body
        //let dist = await Distribution.find({budget_id: req.params.id})
        let dist = await Distribution.aggregate([
            {
                $lookup: {
                    from: "budgets", // collection name in db
                    localField: "budget_id",
                    foreignField: "_id",
                    as: "budget"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$budget", 0]}, "$$ROOT"]}}
            },
            {$project: {budget: 0}},
            {"$match": {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(input.regiment_id)}}
        ])
        if(dist.length>0) {
            let budget_id = dist[0].budget_id
            let session  = await Session.findById(dist[0].session_id)
            let regiment  = await Regiment.findById(dist[0].regiment_id)
            let info = {
                amount: dist[0].amount,
                budget_date: dist[0].budget_date,
                session: session.name,
                regiment: regiment.name,
                code: regiment.code

            }
            let heads = await HeadWiseBudget.aggregate([
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
                {"$match": {"budget_id": mongoose.Types.ObjectId(budget_id)}}
            ])

            let i, j
            let allData = {}
            for (i = 0; i < heads.length; i++) {
                let regiment = await Distribution.findOne({
                    budget_id: budget_id,
                    head_id: heads[i].head_id,
                    regiment_id: input.regiment_id
                })
                allData[i] = {
                    head_id: heads[i].head_id,
                    name: heads[i].name,
                    code: heads[i].code,
                    budget_amount: heads[i].amount,
                    amount: regiment.amount
                }

            }
            res.json({info:info,budget:allData})
        }else{
            res.json('')
        }
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
    sessions (req, res,next) {
        Session.aggregate([
            { $sort : { _id : -1 } },
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
module.exports = new BudgetFindController;