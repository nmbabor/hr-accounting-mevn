
const User = require('../models/User')
const Role = require('../models/Role')
const Regiment = require('../modules/regiment/Regiment')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util=require('util')
//const validationResult=require('express-validator')

class UserController{

//View all users
    index(req,res,next){
        User.find()
            .then(allData => {
                res.status(200).json({
                    allData
                })

            })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//single user show
    show(req,res,next){
        User.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }
//register user into DB
    store(req,res,next){
        req.checkBody('name', 'Name is required').notEmpty()
        req.checkBody('email').notEmpty().isEmail().withMessage('Valid email is required')
        req.checkBody('mobile').notEmpty().isNumeric().isLength({min:11,max:11}).withMessage('Mobile must be 11 numeric digit')
        let errors=req.validationErrors()
        if (errors) {
            let newError = util.inspect(errors)
            let newOne = {}
            errors.forEach(nerr=>{
                newOne[nerr.param] = []
                newOne[nerr.param].push(nerr.msg)
            })
            return res.status(422).json(newOne);
        }

        // unique email validation -------------------------------------------------
        function uniqueEmailCheck(model,keyValue) {
            return new Promise((resolve,reject)=>{
                model.findOne(keyValue,(err,user)=>{
                    if (err) throw err;
                    if(user === null) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }
        uniqueEmailCheck(User,{email:req.body.email})
            .then(result=>{
            })
            .catch(error=>{
                res.status(422).json({emailExist:'Email Already Exist'})
            })

        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err){
                res.json({
                    error:err
                })
            }
            let user =new User({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                address:req.body.address,
                password:hash
            })
            user.save()
                .then(result => {
                    res.status(200).json(console.log({
                        message: 'Registration successfully done',
                        data:result
                    }))
                })
                .catch(err=>{
                    res.status(500).json(console.log(err))
                })
        });
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;
        // unique email validation ------------------------
        function uniqueEmailCheck(model,keyValue) {
            return new Promise((resolve,reject)=>{
                model.findOne(keyValue,(err,user)=>{
                    if (err) throw err;
                    if(user === null) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }
        uniqueEmailCheck(User,{$and:[{email: req.body.email},{_id:{$ne:id}}]})
            .then(result=>{
            })
            .catch(error=>{
                res.status(303).json({emailExist:'Email Already Exist'})
            })

        User.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                User.findById(data.id).then(newData=>{
                    res.json({data:newData})
                })
            })
            .catch(err=>{
                res.status(500).json(console.log(err))
            })
    }
    //Delete data
    delete(req, res,next) {
        User.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    /* All Active Role */
    roles(req,res,next){
        Role.find({status:1})
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
    /* All Active Regiment */
    regiments(req,res,next){
        Regiment.aggregate([
            {$sort: {serial_num: 1}},
            {$match: {status: 1}},
        ])
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
module.exports = new UserController;