const Award = require('./Award')
const Session = require('../../../acc/budget/session/Session')
const Employee = require('../Employee')
const mongoose = require('mongoose')
const fs = require('fs');
const sharp=require('sharp')
const path = require('path')

class AwardController{

//View all Data
    index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let match = { "regiment_id" : mongoose.Types.ObjectId(regiment_id)}
        if(req.decoded.role==='superadmin'){
            match = {}
        }
        Award.aggregate([
            {
                $lookup: {
                    from: "budgetsessions", // collection name in db
                    localField: "session_id",
                    foreignField: "_id",
                    as: "session"
                }
            },
            { "$unwind": "$session" },
            {
                $lookup: {
                    from: "employees", // collection name in db
                    localField: "employee_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { "$unwind": "$employee" },
            { $sort : { _id : -1 } },
            { "$match" : match}
        ]).exec(function(err, allData) {
            res.status(200).json(allData)
        });
    }
//single user show
    show(req,res,next){
        Award.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//Store Data into DB
    async store(req,res,next){
        let input = req.body;
        const data = new Award(input)
        data.save().then(data=>{
            res.status(201).json(data)
        }).catch(err => {
            res.status(500).json({
                message:'Some Error found!',
                error:err
            })
        })


    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;
        inputData.updated_at = new Date()

        Award.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Award.findById(data.id).then(newData=>{
                    res.json(newData)
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something error found!',
                    error:err
                })
            })
    }
    //Delete data
    async destroy(req, res,next) {
        let deltePhoto= await Award.findOne({_id:req.params.id})
        if(deltePhoto!==''){
            try {
                if (fs.existsSync('upload/'+deltePhoto.photo)) {
                    fs.unlink('upload/'+deltePhoto.photo, function (errs) {
                        if (errs){
                            console.log(errs)
                        }else{
                            Award.deleteOne({
                                _id: req.params.id
                            }, function (err, result) {
                                if (err)
                                    res.send(err)
                                res.send({
                                    success: true
                                })
                            })
                        }
                        // if no error, file has been deleted successfully
                        //console.log('File deleted!');
                    });
                }
            } catch(err) {
                console.log(err)
                res.status(200).json('147')
            }
        }

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
    employee(req,res,next){
        let match = {status: 1, regiment_id: req.decoded.regiment_id}
        if(req.params.id && req.params.id!==''){
            match = {status: 1, regiment_id: req.params.id}
        }
        Employee.find(match,'_id name_english')
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
    async photoUpload (req, res,next){

        // file upload ------------------------
        let photoPath=''
        if (req.files!==null){
            let file=req.files.photo
            let dirName='upload/images/award/'
            let randName=Math.random().toString(36).substring(2, 15)
            let ext = path.extname(file.name)
            sharp(req.files.photo.data)
            //.toFile(photoPath=dirName+Math.random().toString(36).substring(2, 15)+'-'+file.name)
                .toFile(dirName+randName+ext)
            photoPath='images/award/'+randName+ext
            // end file upload


            // update photo field ---------------------

            let id=req.body.id
            // check file/img exist or not AND if exist then delete file/img ----------
            let deltePhoto= await Award.findOne({_id:id})
            if(deltePhoto!==''){
                try {
                    if (fs.existsSync('upload/'+deltePhoto.photo)) {
                        fs.unlink('upload/'+deltePhoto.photo, function (errs) {
                            if (errs){
                                console.log(errs)
                            }else{
                                console.log('Deleted')
                            }
                            // if no error, file has been deleted successfully
                            //console.log('File deleted!');
                        });
                    }
                } catch(err) {
                    console.log(err)
                    res.status(200).json('147')
                }
            }


            Award.findByIdAndUpdate({_id:id},{$set:{photo:photoPath}})
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(err=>{
                    res.status(500).json(err)
                })

        }
        // end file upload -----------------------------
        // let input = req.body
        // res.status(200).json(console.log(input))
    }

}
module.exports = new AwardController;