const PrimaryInfo = require('../../models/PrimaryInfo')
const Employee = require('../../modules/hr/employee/Employee')
const Sms = require('../../sms')
let readXlsxFile = require('read-excel-file/node');

class SmsController{

//View all Data
    async index(req,res,next){

        // File path.
        let myFile = []
        let rows  = await readXlsxFile('upload/number.xlsx')
        for(let i=1;i<rows.length;i++){
            if(rows[i][0].length>10 && rows[i][0].length<14){
                myFile.push(rows[i][0])
            }
        }
        res.json(myFile)

    }
    multiple(req,res,next){
        let input = req.body
        let i;
        let s=0;
        let e=0;
        for(i=0;i<input.number.length;i++){
            let number = input.number[i].replace('88','');
            number = '88'+number
            Sms.send(number,input.text).then(response=>{
               s+=1;
            }).catch(error=>{
                e+=1;
            })
        }

        res.status(200).json({
            success:s,
            error:e
        });

    }
    send(req,res,next){
        let input = req.body
        let number = input.number.replace('88','');
        number = '88'+number
        Sms.send(number,input.text).then(response=>{
            res.status(200).json('SMS Sent');
        }).catch(error=>{
            res.status(500).json('There was an error sending the number');
        })
    }
    employee(req,res,next){
        let match = {status: 1, regiment_id: req.decoded.regiment_id}
        if(req.params.id && req.params.id!==''){
            match = {status: 1, regiment_id: req.params.id}
        }
        Employee.find(match,'_id name_english personal_id official_mobile')
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
module.exports = new SmsController;