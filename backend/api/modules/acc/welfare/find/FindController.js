const Regiment = require('../../../regiment/Regiment')
const Session = require('../../budget/session/Session')
const Welfare = require('../Welfare')
const mongoose = require('mongoose')

class FindController{
    async show(req,res,next){
        let input  = req.body
        //let dist = await Distribution.find({budget_id: req.params.id})
        let matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id)}
        if(input.regiment_id){
            matchQuery = {"session_id": mongoose.Types.ObjectId(input.session_id),"regiment_id": mongoose.Types.ObjectId(input.regiment_id)}
        }
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
        let info = {}
        let sess =await Session.findById(input.session_id)
        info = {session: sess.name}
        if(input.regiment_id){
            let regi =await Regiment.findById(input.regiment_id)
            info = {
                session: sess.name,
                regiment:regi.name,
                code:regi.code
            }
        }
        res.status(200).json({data,info})

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
module.exports = new FindController;