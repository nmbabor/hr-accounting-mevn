const Session = require('./Session')

class SessionController{

//View all Data
    index(req,res,next){
        Session.find()
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
        Session.findById(req.params.id).then(data => {
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
    store(req,res,next){
        let input = req.body;
        const department = new Session(input)
        department.save().then(data=>{
            res.status(201).json({
                message:'Data successfully inserted.',
                result:data
            }).catch(err => {
                res.status(500).json({
                    message:'Some Error found!',
                    error:err
                })
            })
        })
    }
    // Update single data
    update (req,res,next) {
        let id = req.params.id
        let inputData = req.body;

        Session.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Session.findById(data.id).then(newData=>{
                    res.json({data:newData})
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
        Session.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }

    activeData (req, res,next) {
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
    makeActive (req,res,next) {
        let id = req.params.id
        Session.update({ active: 1 }, { $set:{ active: 0 }}, function(err, res) {
        });
        Session.findByIdAndUpdate(id,{$set:{active: 1 }})
            .then(data=>{
                res.json(data)
            })
            .catch(err=>{
                res.status(500).json({
                    message:'Something error found!',
                    error:err
                })
            })
    }
}
module.exports = new SessionController;