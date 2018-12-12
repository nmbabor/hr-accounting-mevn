const Budget = require('../budget/Budget')
const Distribution = require('../budget/distribution/Distribution')
const Regiment = require('../../regiment/Regiment')
const HeadWiseBudget = require('../budget/HeadWiseBudget')
const Expenditure = require('../expenditure/Expenditure')
const Session = require('../budget/session/Session')
const Welfare = require('../welfare/Welfare')
const WelfareExpenditure = require('../welfare/expenditure/Expenditure')
const NtrFields = require('../ntr/ntrFields/NtrFields')
const NtrAmount = require('../ntr/NtrAmount')
const Ntr = require('../ntr/Ntr')
const mongoose = require('mongoose')

class BudgetReportController {

    async totalReceived(req,res,next){
        let session = await Session.findOne({active:1})

        let bdgt =await Budget.aggregate([
            { "$match" : { "session_id" : mongoose.Types.ObjectId(session._id) } },
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" }
        ])

        if(bdgt.length>0){
            let budget = bdgt[0]
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
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$head", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { head: 0 } },
                { $sort : { head_id : 1 } },
                { "$match" : { "budget_id" : mongoose.Types.ObjectId(budget._id) } }
            ])
            res.status(200).json({budget,heads})
        }
        res.json('')

    }
    async budgetReg(req,res,next){
        let session = await Session.findOne({active:1})
        let input  = {
            regiment_id: req.params.id,
            session_id: session._id
        }

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
    async expenditure(req,res,next){
        let session = await Session.findOne({active:1})
        let bdgt =await Budget.aggregate([
            { "$match" : { "session_id" : mongoose.Types.ObjectId(session._id) } },
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" }
        ])

        if(bdgt.length>0) {
            let budget = bdgt[0]
            let heads = await Expenditure.aggregate([
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
                {"$match": {"session_id": mongoose.Types.ObjectId(session._id)}},
                {$sort: {head_id: 1}},
                {
                    $group:
                        {
                            _id: '$head_id',
                            name: {$first: '$name'},
                            code: {$first: '$code'},
                            amount: {$sum: "$amount"}
                        }
                }
            ])
            res.status(200).json({heads,budget})
        }else{
            res.json('')
        }
    }
    async regExpenditure(req,res,next){
        let session = await Session.findOne({active:1})
        let regiment_id = req.params.id
        let bdgt =await Budget.aggregate([
            { "$match" : { "session_id" : mongoose.Types.ObjectId(session._id) } },
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" }
        ])
        let regiment  = await Regiment.findById(regiment_id)
        let info = {
            amount: bdgt[0].amount,
            budget_date: bdgt[0].budget_date,
            session: session.name,
            regiment: regiment.name,
            code: regiment.code
        }
        if(bdgt.length>0) {
            let budget = bdgt[0]
            let heads = await Expenditure.aggregate([
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
                {"$match": {"session_id": mongoose.Types.ObjectId(session._id),"regiment_id" : mongoose.Types.ObjectId(regiment_id),"budget_id" : mongoose.Types.ObjectId(budget._id)}},
                {$sort: {head_id: 1}},
                {
                    $group:
                        {
                            _id: '$head_id',
                            name: {$first: '$name'},
                            code: {$first: '$code'},
                            amount: {$sum: "$amount"}
                        }
                }
            ])
            res.status(200).json({heads,info})
        }else{
            res.json('')
        }
    }
    async welfare(req,res,next){
        let session = await Session.findOne({active:1})
        let input  = {
            regiment_id: req.params.id,
            session_id: session._id
        }

           let matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(input.regiment_id)}

        let data = await Welfare.aggregate([
            {
                $lookup: {
                    from: "regiments", // collection name in db
                    localField: "regiment_id",
                    foreignField: "_id",
                    as: "regiment"
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$regiment", 0]}, "$$ROOT"]}}
            },
            {$project: {regiment: 0}},
            {"$match":matchQuery }
        ])

        let regi =await Regiment.findById(input.regiment_id)
        let info = {
            session: session.name,
            regiment:regi.name,
            code:regi.code
        }

        res.status(200).json({data,info})

    }
    async welfareExpenditure(req,res,next){
        let session = await Session.findOne({active:1})
        let input  = {
            regiment_id: req.params.id,
            session_id: session._id
        }
        let matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(input.regiment_id)}

        let data = await WelfareExpenditure.aggregate([
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
        let regi = await Regiment.findById(input.regiment_id)
        let info = {
            session: session.name,
            regiment:regi.name,
            code:regi.code
        }

        res.status(200).json({data,info})
    }
    async ntrTotal(req,res,next){
        let session = await Session.findOne({active:1})
        let session_id = session._id
        let fields = await NtrFields.find({status:1})
        let regiments =await Regiment.aggregate([
            { $sort : { serial_num : 1 } },
            { $match : { status : 1 } },
        ])
        let i,j
        let allData = {}
        for(i=0;i<fields.length;i++){
            allData[i]={
                field_name: fields[i].name,
                field_code: fields[i].code,
                _id: fields[i]._id,
                regiments:{}
            }
            for(j=0;j<regiments.length;j++) {
                let ntr_amount = await NtrAmount.aggregate([
                    {
                        $lookup: {
                            from: "ntrs", // collection name in db
                            localField: "ntr_id",
                            foreignField: "_id",
                            as: "ntr"
                        }
                    },
                    {
                        $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$ntr", 0]}, "$$ROOT"]}}
                    },
                    {$project: {ntr: 0}},
                    {"$match": {"session_id": mongoose.Types.ObjectId(session_id),"regiment_id": mongoose.Types.ObjectId(regiments[j]._id),"field_id": mongoose.Types.ObjectId(fields[i]._id)}}
                ])
                let amount = 0
                if(ntr_amount[0] && ntr_amount[0].amount){
                    amount = ntr_amount[0].amount
                }
                allData[i].regiments[j]={
                    _id:regiments[j]._id,
                    name: regiments[j].name,
                    short_name: regiments[j].short_name,
                    amount: amount
                }
            }
        }
        let totalAmount = {}
        for(j=0;j<regiments.length;j++) {
            let ntr_amount = await NtrAmount.aggregate([
                {
                    $lookup: {
                        from: "ntrs", // collection name in db
                        localField: "ntr_id",
                        foreignField: "_id",
                        as: "ntr"
                    }
                },
                {
                    $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$ntr", 0]}, "$$ROOT"]}}
                },
                {$project: {ntr: 0}},
                {"$match": {"session_id": mongoose.Types.ObjectId(session_id),"regiment_id": mongoose.Types.ObjectId(regiments[j]._id)}},
                {
                    $group:
                        {
                            _id: "$regiment_id",
                            total_amount: { $sum: "$amount" },
                            count: { $sum: 1 }
                        }
                }
            ])
            let amount = 0
            if(ntr_amount[0] && ntr_amount[0].total_amount){
                amount = ntr_amount[0].total_amount
            }
            totalAmount[j] = {
                name:regiments[j].name,
                _id:regiments[j]._id,
                total_amount: amount
            }

        }

        res.status(200).json({allData,info:session,totalAmount})
    }
    async ntrDeposit(req,res,next){
        let session = await Session.findOne({active:1})
        let ntr = await Ntr.findOne({session_id:session._id,regiment_id:req.params.id})
        if(ntr!=''){
            let ntrAmount = await NtrAmount.aggregate([
                {
                    $lookup: {
                        from: "ntrfields", // collection name in db
                        localField: "field_id",
                        foreignField: "_id",
                        as: "field"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$field", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { field: 0 } },
                { $sort : { field_id : 1 } },
                { "$match" : { "ntr_id" : mongoose.Types.ObjectId(ntr._id) } }
            ])
            let regiment  = await Regiment.findById(req.params.id)
            let info = {
                amount: ntr.amount,
                ntr_date: ntr.ntr_date,
                session: session.name,
                regiment: regiment.name,
                code: regiment.code
            }
            res.status(200).json({info,ntr_amount:ntrAmount})
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

}
module.exports = new BudgetReportController;