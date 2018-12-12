const Employee = require('./Employee')
const Regiment = require('./../../regiment/Regiment')
const file=require('fast-csv')
const path=require('path')
const fs = require('fs');
const sharp=require('sharp')
const mongoose = require('mongoose')

class EmployeeController{

//View all Data
    index(req,res,next){
        let regiment_id = req.decoded.regiment_id
        let match = {}
        if(req.decoded.role!='superadmin'){
            match = {regiment_id:regiment_id}
        }
        Employee.find(match)
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

//single user show
    show(req,res,next){
        Employee.findById(req.params.id).then(data => {
            res.status(200).json(data)
        })
            .catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
    }

    empDataSave(req,res,next){
        let id=req.body.id

        if (id.length<=0){ // create  ---------------------------
            // // unique service/personal id validation ----------------
            function uniqueServiceIdCheck(model,keyValue) {
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
            // unique NID  check/validation -------------------------------------------------
            function uniqueNationalIdCheck(model,keyValue) {
                return new Promise((resolve,reject)=>{
                    model.findOne(keyValue,(err,nidData)=>{
                        if (err) throw err;
                        if(nidData === null) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                })
            }

            uniqueServiceIdCheck(Employee,{personal_id:req.body.personal_id})
                .then(serviceIdOk=>{
                    uniqueNationalIdCheck(Employee,{nid:req.body.nid})
                        .then(nidOk=>{

                            let input = req.body
                            //res.status(200).json(console.log(input))
                            let employeeData= new Employee(input)
                            employeeData.save()
                                .then(success=>{
                                    res.status(201).json(success)
                                })
                                .catch(err=>{
                                    res.status(500).json(console.log(err))
                                })

                        })
                        // if National Id error --------
                        .catch(error=>{
                            return res.status(422).json({nidExist:'National Id Already Exist !'+error})
                            //return res.status(422).json(console.log('1147'))
                        })
                })
                // if service id error --------
                .catch(error=>{
                    return res.status(422).json({serviceIdExist:'Personal Number Already Exist !'})
                })
        }else{ // update -----------------------------------------
            //let id = req.params.id

            // unique service/personal id validation ----------------
            function uniqueServiceIdCheck(model,keyValue) {
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
            // unique NID  check/validation -------------------------------------------------
            function uniqueNationalIdCheck(model,keyValue) {
                return new Promise((resolve,reject)=>{
                    model.findOne(keyValue,(err,nidData)=>{
                        if (err) throw err;
                        if(nidData === null) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                })
            }

            uniqueServiceIdCheck(Employee,{$and:[{personal_id: req.body.personal_id},{_id:{$ne:id}}]})
                .then(serviceIdOk=>{
                    // uniqueNationalIdCheck(Employee,{nid:req.body.nid})
                    uniqueNationalIdCheck(Employee,{$and:[{nid: req.body.nid},{_id:{$ne:id}}]})
                        .then(nidOk=>{

                            let inputData = req.body
                            Employee.findByIdAndUpdate(id,{$set:inputData})
                                .then(data=>{
                                    Employee.findById(data.id).then(newData=>{
                                        res.status(200).json(newData)
                                    })
                                })
                                .catch(err=>{
                                    res.status(500).json(res.status(500).json(err))
                                })

                        })
                        // if National Id error --------
                        .catch(error=>{
                            return res.status(422).json({nidExist:'National Id Already Exist !'+error})
                            //return res.status(422).json(console.log('1147'))
                        })
                })
                // if service id error --------
                .catch(error=>{
                    return res.status(422).json({serviceIdExist:'Personal Number Already Exist !'})
                })
        }
    } // end employeeDataSave --------------------------------------

//Store Data into DB -----------------------------------------------
    store(req,res,next){
        let id=req.body.id

        if (id.length<=0){ // create  ---------------------------
            // // unique service/personal id validation ----------------
            function uniqueServiceIdCheck(model,keyValue) {
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
            // unique NID  check/validation -------------------------------------------------
            function uniqueNationalIdCheck(model,keyValue) {
                return new Promise((resolve,reject)=>{
                    model.findOne(keyValue,(err,nidData)=>{
                        if (err) throw err;
                        if(nidData === null) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                })
            }

            uniqueServiceIdCheck(Employee,{personal_id:req.body.personal_id})
                .then(serviceIdOk=>{
                    uniqueNationalIdCheck(Employee,{nid:req.body.nid})
                        .then(nidOk=>{

                            let input = req.body
                            //res.status(200).json(console.log(input))
                            input.status=1
                            let employeeData= new Employee(input)
                            employeeData.save()
                                .then(success=>{
                                    res.status(201).json(success)
                                })
                                .catch(err=>{
                                    res.status(500).json(console.log(err))
                                })
                        })
                        // if National Id error --------
                        .catch(error=>{
                            return res.status(422).json({nidExist:'National Id Already Exist !'+error})
                            //return res.status(422).json(console.log('1147'))
                        })
                })
                // if service id error --------
                .catch(error=>{
                    return res.status(422).json({serviceIdExist:'Personal Number Already Exist !'})
                })
        }else{ // update -----------------------------------------
            //let id = req.params.id

            // unique service/personal id validation ----------------
            function uniqueServiceIdCheck(model,keyValue) {
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
            // unique NID  check/validation -------------------------------------------------
            function uniqueNationalIdCheck(model,keyValue) {
                return new Promise((resolve,reject)=>{
                    model.findOne(keyValue,(err,nidData)=>{
                        if (err) throw err;
                        if(nidData === null) {
                            resolve();
                        } else {
                            reject();
                        }
                    })
                })
            }

            uniqueServiceIdCheck(Employee,{$and:[{personal_id: req.body.personal_id},{_id:{$ne:id}}]})
                .then(serviceIdOk=>{
                    // uniqueNationalIdCheck(Employee,{nid:req.body.nid})
                    uniqueNationalIdCheck(Employee,{$and:[{nid: req.body.nid},{_id:{$ne:id}}]})
                        .then(nidOk=>{

                            let inputData = req.body
                            inputData.status=1
                            Employee.findByIdAndUpdate(id,{$set:inputData})
                                .then(data=>{
                                    Employee.findById(data.id).then(newData=>{
                                        res.status(200).json(newData)
                                    })
                                })
                                .catch(err=>{
                                    res.status(500).json(res.status(500).json(err))
                                })

                        })
                        // if National Id error --------
                        .catch(error=>{
                            return res.status(422).json({nidExist:'National Id Already Exist !'+error})
                            //return res.status(422).json(console.log('1147'))
                        })
                })
                // if service id error --------
                .catch(error=>{
                    return res.status(422).json({serviceIdExist:'Personal Number Already Exist !'})
                })
        }
    } // end store --------

    // Update single data ------------------------------------
    update (req,res,next) {
        let id = req.params.id

        // unique service/personal id validation ----------------
        function uniqueServiceIdCheck(model,keyValue) {
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
        // unique NID  check/validation -------------------------------------------------
        function uniqueNationalIdCheck(model,keyValue) {
            return new Promise((resolve,reject)=>{
                model.findOne(keyValue,(err,nidData)=>{
                    if (err) throw err;
                    if(nidData === null) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            })
        }

        uniqueServiceIdCheck(Employee,{$and:[{personal_id: req.body.personal_id},{_id:{$ne:id}}]})
            .then(serviceIdOk=>{
                // uniqueNationalIdCheck(Employee,{nid:req.body.nid})
                uniqueNationalIdCheck(Employee,{$and:[{nid: req.body.nid},{_id:{$ne:id}}]})
                    .then(nidOk=>{

                        let inputData = req.body
                        Employee.findByIdAndUpdate(id,{$set:inputData})
                            .then(data=>{
                                Employee.findById(data.id).then(newData=>{
                                    res.json(newData)
                                })
                            })
                            .catch(err=>{
                                res.status(500).json(res.status(500).json(err))
                            })

                    })
                    // if National Id error --------
                    .catch(error=>{
                        return res.status(422).json({nidExist:'National Id Already Exist !'+error})
                        //return res.status(422).json(console.log('1147'))
                    })
            })
            // if service id error --------
            .catch(error=>{
                return res.status(422).json({serviceIdExist:'Personal Number Already Exist !'})
            })

        // let id = req.params.id
        // let inputData = req.body;
        //
        //
        //
        // Employee.findByIdAndUpdate(id,{$set:inputData})
        //     .then(data=>{
        //         Employee.findById(data.id).then(newData=>{
        //             res.json({data:newData})
        //         })
        //     })
        //     .catch(err=>{
        //         res.status(500).json({
        //             message:'Something error found!',
        //             error:err
        //         })
        //     })
    }
    //Delete data
    async destroy(req, res,next) {
        let deltePhoto= await Employee.findOne({_id:req.params.id})
        if(deltePhoto!==''){
            try {
                if (fs.existsSync('upload/'+deltePhoto.photo)) {
                    fs.unlink('upload/'+deltePhoto.photo, function (errs) {
                        if (errs){
                            console.log(errs)
                        }else{
                            Employee.deleteOne({
                                _id: req.params.id
                            }, function (err, result) {
                                if (err)
                                    res.send(err)
                                res.send({
                                    success: true
                                })
                            })
                        }
                    });
                }
            } catch(err) {
                console.log(err)
                res.status(200).json('147')
            }
        }
    }


    // employee photo upload -----------------------
    async employeePhotoUpload (req, res,next){

         // file upload ------------------------
         let photoPath=''
         if (req.files!==null){
             let file=req.files.photo
             let dirName='upload/images/employees/'
             let randName=Math.random().toString(36).substring(2, 15)
             sharp(req.files.photo.data).resize(
                 {width: 200,height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy}
             )
                 //.toFile(photoPath=dirName+Math.random().toString(36).substring(2, 15)+'-'+file.name)
                 .toFile(dirName+randName+'-'+file.name)
             photoPath='images/employees/'+randName+'-'+file.name
             // end file upload


             // update photo field ---------------------

             let id=req.body.id
             // check file/img exist or not AND if exist then delete file/img ----------
             let deltePhoto= await Employee.findOne({_id:id})
                 if(deltePhoto!==''){
                     try {
                         if (fs.existsSync('upload/'+deltePhoto.photo)) {
                             fs.unlink('upload/'+deltePhoto.photo, function (err) {
                                 if (err){
                                     res.status(500).json(console.log(err))
                                 }
                                 // if no error, file has been deleted successfully
                                 //console.log('File deleted!');
                             });
                         }
                     } catch(err) {
                         res.status(200).json('147')
                     }
                 }


             Employee.findByIdAndUpdate({_id:id},{$set:{photo:photoPath}})
                 .then(data=>{
                     Employee.findById(data._id).then(newData=>{
                         res.status(200).json(newData)
                     })
                 })
                 .catch(err=>{
                     res.status(500).json(console.log(err))
                 })

         }
         // end file upload -----------------------------
        // let input = req.body
        // res.status(200).json(console.log(input))
    }
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


    employeeImport (req, res,next){
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let employeeFiles = req.files.csv_file;
        let employees = [];
        csv
            .fromString(employeeFiles.data.toString(), {
                headers: true,
                ignoreEmpty: true
            })
            .on("data", function(data){
                data['_id'] = new mongoose.Types.ObjectId();

                employees.push(data);
            })
            .on("end", function(){
                Employee.create(employees, function(err, documents) {
                    if (err) throw err;
                });

                res.send(employees.length + ' Employees have been successfully uploaded.');
            });
    }
}
module.exports = new EmployeeController