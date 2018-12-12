const SalaryGrade = require('./SalaryGradeModel')
const path=require('path')
const mongoose = require('mongoose')

class SalaryGradeController{
    // all ranks -------------------list
    index(req,res,next){
        SalaryGrade.find()
            .then(ranks=>{
                res.status(200).json(ranks)
            })
            .catch(err=>{
                res.status(500).json(err)
            })

    }

    // save ranks info to database---------------------
    store(req,res,next){
        let input = req.body;
        const rank = new SalaryGrade(input)
        rank.save()
            .then(data=>{
                res.status(201).json(data)
            }).catch(err=>{
                res.status(500).json(err)
        })
    }

    //single user show
    show(req,res,next){
        SalaryGrade.findById(req.params.id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }

    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;

        SalaryGrade.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                SalaryGrade.findById(data.id).then(newData=>{
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
    destroy(req, res,next) {
        SalaryGrade.findByIdAndRemove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    // active salaryGradees list -------------------------------
    activeSalaryGrades (req, res,next) {
        SalaryGrade.find({ status: "1" })
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    // bulk entry --------------------------
    bulkSalaryGradesSave(req,res,next){
        let input = req.body;
        const data = new SalaryGrade(input)
        SalaryGrade.collection.insert(input, function (err, docs) {
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
}

module.exports = new SalaryGradeController
