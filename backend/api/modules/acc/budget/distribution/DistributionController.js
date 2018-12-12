const Budget = require('../Budget')
const Distribution = require('./Distribution')
const Regiment = require('../../../regiment/Regiment')
const Head = require('../head/Head')
const HeadWiseBudget = require('../HeadWiseBudget')
const mongoose = require('mongoose')

class DistributionController{

//single user show
    async show(req,res,next){
        let dist = await Distribution.find({budget_id: req.params.id})
        if(dist.length>0) {
            let regiments = await Distribution.aggregate([
                {
                    $lookup: {
                        from: "regiments", // collection name in db
                        localField: "regiment_id",
                        foreignField: "_id",
                        as: "regiment"
                    }
                },
                { "$unwind": "$regiment" },
                {"$match": {"budget_id": mongoose.Types.ObjectId(req.params.id),"regiment.status":1}},
                {
                    $group:
                        {
                            _id: '$regiment_id',
                            name: {$first: '$regiment.name'},
                            code: {$first: '$regiment.code'},
                            short_name: {$first: '$regiment.short_name'},
                            serial_num: {$first: '$regiment.serial_num'},
                        }
                },
                {$sort: {"serial_num": 1}}
            ])
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
                {"$match": {"budget_id": mongoose.Types.ObjectId(req.params.id)}}
            ])
            let i, j
            let allData = {}
            for (i = 0; i < heads.length; i++) {
                allData[i] = {
                    head_id: heads[i].head_id,
                    name: heads[i].name,
                    code: heads[i].code,
                    amount: heads[i].amount,
                    regiment: []
                }
                for (j = 0; j < regiments.length; j++) {
                    let regiment = await Distribution.findOne({
                        budget_id: req.params.id,
                        head_id: heads[i].head_id,
                        regiment_id: regiments[j]._id
                    })
                    if(regiment!==null){
                        allData[i].regiment[j] = {
                            name: regiments[j].name,
                            regiment_id: regiment.regiment_id,
                            amount: regiment.amount
                        }
                    }

                }
            }
            res.json({allData,regiments})
        }else{
            let regiments = await Regiment.aggregate([
                {$sort: {serial_num: 1}},
                {$match: {status: 1}},
            ])
            res.json({allData:'',regiments})
        }
    }
//Store Data into DB
     async store(req,res,next){
        let input = req.body;
        let del = await Distribution.deleteMany({
             budget_id: input.budget_id
         })
        Budget.findOne({_id: input.budget_id}).then(data => {
            let headCount = Object.keys(input.head_value).length;
            let i,j;
            for(i=0;i<headCount;i++){
                let regCount = Object.keys(input.head_value[i].regiment).length;
                for(j=0;j<regCount;j++){
                    let dist = {
                        budget_id: input.budget_id,
                        head_id: input.head_value[i].head_id,
                        regiment_id: input.head_value[i].regiment[j].regiment_id,
                        amount: input.head_value[i].regiment[j].amount
                    }
                    let data = new Distribution(dist)
                    data.save().then(allData=>{
                    }).catch(err => {
                        res.status(500).json({
                            message:'Some Error found!',
                            error:err
                        })
                    })
                }
            }
            Budget.findByIdAndUpdate(input.budget_id,{$set:{distribution_status:input.distribution_status}}).then(data=>{})
                .catch(err=>{
                    res.status(500).json(err)
                })
            res.status(200).json('Successfully Distributed')
        }).catch(err => {
            res.status(500).json({
                message:'Some Error found!',
                error:err
            })
        })


    }

    async regiment(req,res,next){
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

module.exports = new DistributionController;