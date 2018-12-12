
const Ntr = require('../Ntr')
const NtrAmount = require('../NtrAmount')
const NtrFields = require('../ntrFields/NtrFields')
const Regiment = require('../../../regiment/Regiment')
const Session = require('../../budget/session/Session')
const mongoose = require('mongoose')

class NtrFindController{
    async showData(req,res,next){
        let session_id = req.body.session_id
        let fields = await NtrFields.find({status:1})
        let regiments =await Regiment.aggregate([
            { $sort : { serial_num : 1 } },
            { $match : { status : 1 } },
        ])
        let i,j
        let info  = await Session.findById(session_id)
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

        res.status(200).json({allData,info,totalAmount})
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
module.exports = new NtrFindController;