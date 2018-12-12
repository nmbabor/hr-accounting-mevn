const Ntr = require('./Ntr')
const NtrAmount = require('./NtrAmount')
const NtrFields = require('./ntrFields/NtrFields')
const Session = require('../budget/session/Session')
const mongoose = require('mongoose')

class NtrController{

//View all Data
    index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        Ntr.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            { $sort : { _id : -1 } },
            { "$match" : { "regiment_id" : mongoose.Types.ObjectId(regiment_id) } }
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
//single user show
    show(req,res,next){
        Ntr.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
    fieldValue(req,res,next){
        NtrAmount.aggregate([
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
            { "$match" : { "ntr_id" : mongoose.Types.ObjectId(req.params.id) } }
        ]).exec(function(err, heads) {
            res.json(heads)
        });
    }
//Store Data into DB
    async store(req,res,next){
        let input = req.body;
        let regiment_id = req.decoded.regiment_id;
        input.ntr_date = new Date(req.body.ntr_date);
        let oldData = await Ntr.find({session_id: input.session_id,regiment_id: regiment_id})
        if(oldData.length>0){
            res.status(300).json('Already Exists')
        }else{
            const newData = new Ntr({session_id: input.session_id,ntr_date: input.ntr_date, amount: input.amount, regiment_id: regiment_id})
            newData.save().then(data=>{
                let i = 0
                let bug = 1
                let ntr_id = data._id
                for(i=0;i<input.head_value.length;i++){
                    let headInput = new NtrAmount({
                        ntr_id:data._id,
                        field_id:input.head_value[i].field_id,
                        amount:input.head_value[i].amount
                    })
                    headInput.save().then(result=>{
                    }).catch(error=>{
                        res.status(500).json({
                            message:'Some Error found!',
                            error:error
                        })
                    })
                }
                if(bug===1){
                    res.status(201).json({
                        message:'Data successfully inserted.',
                        result:data
                    })
                }else{
                    res.status(500).json({
                        message:'Some Error found!',
                    })
                }

            }).catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
        }

    }
    // Update single data
    async update (req,res,next) {
        let regiment_id = req.decoded.regiment_id;
        let bug = 1
        let id = req.params.id
        let input = req.body;
        if (input.ntr_date !== '') {
            input.ntr_date = new Date(req.body.ntr_date);
        }
        const inputData = {session_id: input.session_id,ntr_date: input.ntr_date, amount: input.amount}
        let oldData = await Ntr.find({$and:[{session_id: input.session_id,regiment_id: regiment_id},{_id:{$ne:id}}]})
        if(oldData.length>0){
            res.status(300).json('Already Exists')
        }else {
            await Ntr.findByIdAndUpdate(id, {$set: inputData})
            let del = await NtrAmount.deleteMany({ntr_id: req.params.id})
            let i = 0
            for (i = 0; i < input.head_value.length; i++) {
                let headInput = new NtrAmount({
                    ntr_id: req.params.id,
                    field_id: input.head_value[i].field_id,
                    amount: input.head_value[i].amount
                })
                headInput.save().then(result => {
                }).catch(error => {
                    res.status(500).json({
                        message: 'Some Error found!',
                        error: error
                    })
                })
            }
            if (bug === 1) {
                res.status(201).json({
                    message: 'Data successfully inserted.',
                })
            } else {
                res.status(500).json({
                    message: 'Some Error found!',
                })
            }
        }
    }
    //Delete data
    destroy(req, res,next) {
        NtrAmount.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    bulkStore(req,res,next){
        let input = req.body;
        const data = new NtrAmount(input)
        NtrAmount.collection.insert(input, function (err, docs) {
            if (err){
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            } else {
                res.status(201).json({
                    message:'Bulk Data successfully inserted.',
                })
            }
        });
    }
    fields(req,res,next){
        NtrFields.find({status:1})
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
}
module.exports = new NtrController();