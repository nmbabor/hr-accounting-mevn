const PrimaryInfo = require('../../models/PrimaryInfo')
const Employee = require('../../modules/hr/employee/Employee')
const Mail = require('../../mail')

class MailController{

//View all Data
     index(req,res,next){
        res.json("Email Index")
    }
    send(req,res,next){
        let input = req.body
        let i;
        for(i=0;i<input.email.length;i++){
            Mail.sendMail({
                to: input.email[i], // REQUIRED
                subject: input.subject,
                html: input.message
            }, function (err) {
                if (err) {
                    // handle error
                    console.log(err);
                    res.status(500).json('There was an error sending the email');
                    return;
                }
            });
        }
        res.status(200).json('Email Sent');

    }
    singleMail(req,res,next){
        let input = req.body
        Mail.sendMail({
            to: input.email, // REQUIRED
            subject: input.subject,
            html: input.message
        }, function (err) {
            if (err) {
                res.status(500).json('There was an error sending the email');
                return;
            }
            res.status(200).json('Email Sent');
        });

    }
    employee(req,res,next){
        let match = {status: 1, regiment_id: req.decoded.regiment_id}
        if(req.params.id && req.params.id!==''){
            match = {status: 1, regiment_id: req.params.id}
        }
        Employee.find(match,'_id name_english personal_id email')
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
module.exports = new MailController;