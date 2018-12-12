const OfficeSchedule=require('./OfficeSchedule')
const mongoose=require('mongoose')
const Regiment = require('./../../regiment/Regiment')
const unit=require('util')
class OfficeScheduleController{
    // all office schedule --------------------
    index(req,res,next){
        OfficeSchedule.aggregate([
            {
                $lookup:{
                    from: 'regiments',
                    localField: 'regiment_id',
                    foreignField: '_id',
                    as: 'regimentData'
                }
            },
            {
                $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ["$regimentData", 0]}, "$$ROOT"]}}
            },
            {$project: {regimentData: 0}},
        ]).then(resData=>{
            res.status(200).json(resData)
        }).catch(err=>{
            res.status(500).json(err)
        })
    }

    //save office schedule -------------------
    store(req,res,next){
        // input validation ------------------
        req.checkBody('in_time', 'In Time is required').notEmpty()
        req.checkBody('out_time','Out Time is required').notEmpty()
        req.checkBody('regiment_id','Regiment is required').notEmpty()
        let errors=req.validationErrors()
        if (errors) {
            let newError = unit.inspect(errors)
            let newOne = {}
            errors.forEach(nerr=>{
                newOne[nerr.param] = []
                newOne[nerr.param].push(nerr.msg)
            })
            return res.status(422).json(newOne);
        }

        // checking regiment office schedule ----------
        function officeScheduleCheck(model,keyValue) {
            return new Promise((resolve,reject)=>{
                model.findOne(keyValue,(err,employee)=>{
                    if (err) throw err;
                    if(employee === null) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }

        officeScheduleCheck(OfficeSchedule,{regiment_id:req.body.regiment_id})
            .then(success=>{
                let input=req.body
                res.status(200).json(console.log(input))
                let scheduleData= new OfficeSchedule(input)
                scheduleData.save()
                    .then(success=>{
                        res.status(201).json(success)
                    })
                    .catch(err=>{
                        res.status(500).json(console.log(err))
                    })
            })
            .catch(error=>{
                return res.status(422).json({scheduleExist:'This Regiment Office Schedule Already Exist !'+error})
            })
    }

    //single office schedule show
    show(req,res,next){
        OfficeSchedule.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
         .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }

    //single office schedule show
    edit(req,res,next){
        OfficeSchedule.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }

    update(req,res,next){
        let id = req.params.id
        // input validation ------------------
        req.checkBody('in_time', 'In Time is required').notEmpty()
        req.checkBody('out_time','Out Time is required').notEmpty()
        req.checkBody('regiment_id','Regiment is required').notEmpty()
        let errors=req.validationErrors()
        if (errors) {
            let newError = unit.inspect(errors)
            let newOne = {}
            errors.forEach(nerr=>{
                newOne[nerr.param] = []
                newOne[nerr.param].push(nerr.msg)
            })
            return res.status(422).json(newOne);
        }

        // checking regiment office schedule ----------
        function officeScheduleCheck(model,keyValue) {
            return new Promise((resolve,reject)=>{
                model.findOne(keyValue,(err,employee)=>{
                    if (err) throw err;
                    if(employee === null) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }
        officeScheduleCheck(OfficeSchedule, {$and:[{regiment_id: req.body.regiment_id},{_id:{$ne:id}}]})
            .then(success=>{
                let inputData = req.body;
                // inputData.in_time=new Date(req.body.in_time).toLocaleTimeString()
                // inputData.out_time=new Date(req.body.out_time).toLocaleTimeString()


                OfficeSchedule.findByIdAndUpdate(id,{$set:inputData})
                    .then(data=>{
                        OfficeSchedule.findById(data.id).then(newData=>{
                            res.status(200).json({data:newData})
                        })
                    })
                    .catch(err=>{
                        res.status(500).json(err)
                    })
            })
            .catch(error=>{
                return res.status(422).json({scheduleExist:'This Regiment Office Schedule Already Exist !'+error})
            })
    }

    destroy(req, res,next) {

        OfficeSchedule.findByIdAndRemove({_id: req.params.id})
            .then(deleteData=>{
                res.status(200).josn('delete')
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    //  active regimen --------------------
    activeRegiments (req, res,next){
        Regiment.aggregate([
            { $sort : { serial_num : 1 } },{$match:{ status: 1}}
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
module.exports= new OfficeScheduleController