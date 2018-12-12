const Regiment = require('./Regiment')

class RegimentController{

//View all Data
    index(req,res,next){
        Regiment.aggregate([
            { $sort : { serial_num : 1 } },
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
//single user show
    show(req,res,next){
        Regiment.findById(req.params.id).then(data => {
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
        const department = new Regiment(input)
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

        Regiment.findByIdAndUpdate(id,{$set:inputData})
            .then(data=>{
                Regiment.findById(data.id).then(newData=>{
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
        Regiment.remove({
            _id: req.params.id
        }, function (err, result) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    }
    activeRegiments (req, res,next) {
        Regiment.find({ status: "1" })
            .then(result=>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

}
module.exports = new RegimentController;