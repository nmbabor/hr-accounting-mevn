const Designation=require('../models/Designation')
class DesignationController{
    index(req,res,next){
        Designation.find()
            .then(allData=>{
                res.status(200).json(allData)
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error Found, Please Try again",
                    err
                })
            })
    }

    store(req,res,next){
        let inputData=req.body
        let designation=new Designation(inputData)
        designation.save()
            .then(data=>{
                res.status(200).json({
                    message:"Designation info saved successfully",
                    data
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error Found, Please Try again",
                    err
                })
            })

    }

    show(req,res,next){
        let id=req.params.id
        Designation.findById(id)
            .then(data=>{
                res.status(200).json({
                    message:"Designation info by id",
                    data
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Error Found, Please Try again",
                    err
                })
            })
    }

    update(req,res,next){
        let inputData=req.body
        let id = req.params.id
        Designation.findByIdAndUpdate(id,{$set:inputData})
            .then(result=>{
                res.status(200).json({
                    message:"Update Success",
                    result
                })
            })
            .catch(err=>{
                res.status(500).json(console.log(err))
            })

    }

    destroy(req,res,next){
        let id=req.params.id
        Designation.findByIdAndRemove(id)
            .then(data=>{
                res.status(200).json({
                    message:"Designation info delete",
                    data
                })
            })
            .catch(err=>{
                res.status(500).json(console.log(err))
            })
    }

    activeDesignations (req, res,next) {
        Designation.find({ status: "1" })
            .then(result=>{
                res.status(201).json(result)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }


}

module.exports = new DesignationController;