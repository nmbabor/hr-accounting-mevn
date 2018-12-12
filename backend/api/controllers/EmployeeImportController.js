const Employee=require('../modules/hr/employee/Employee')
const csv=require('fast-csv')
const path=require('path')
var mongoose = require('mongoose');

class EmployeeImportController{
    index(req,res,next){
        Employee.find()
            .then(data=>{
                res.status(200).json({
                    message:'Employees Info List',
                    data
                })
            })
            .catch(error=>{
                res.status(500).json({
                    message:'Error occured to save data',
                    error
                })
            })
    }


    // Bulk Employee Input ----------------------------------------
    store(req,res,next){
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        var employeeFiles = req.files.csv_file;
        var employees = [];
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

    destroy(req,res,next){
        let id=req.params.id
        Employee.findByIdAndRemove(id)
            .then(response=>{
                res.status(200).json({
                    message:'This Data Successfully Delete'
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something went wrong',
                    err
                })
            })
    }
}

module.exports = new EmployeeImportController