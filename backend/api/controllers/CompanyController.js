const Company=require('../models/Company')
class CompanyController{
    index(req,res,next){
        Company.find()
            .then(allCompany=>{
                res.status(200).json(allCompany)
            })
            .catch(error=>{
                res.status(500).json({
                    message:'Errro Occoured',
                    error
                })
            })
    }

    store (req,res,next){
        let companyData=req.body
        res.json(companyData)

        const company= new Company(companyData)
        company.save()
            .then(data=>{
                res.status(200).json({
                    message:'Company Info Saved',
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

    edit(req,res,next){
        let id=req.params.id
        Company.findById(id)
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(error=>{
                res.status(500).json({
                    message:'Error occured to save data',
                    error
                })
            })
    }

    update(req,res,next){
        let id=req.params.id
        let updatedInfo=req.body
        Company.findByIdAndUpdate(id,{$set:updatedInfo})
            .then(data=>{
                Company.findById(data._id)
                    .then(updateData=>{
                        res.status(200).json(updateData)
                    })
            })
            .catch(error=>{
                res.status(500).json({
                    message:'Error occured to save data',
                    error
                })
            })
    }

    destroy(req, res,next){
        let id=req.params.id
        Company.findByIdAndRemove(id)
            .then(result=>{
                res.status(200).json('Company has been deleted successfully')
            })
            .catch(err=>{
                res.status(500).json('Error occoured during delete company info')
            })
    }
}

module.exports = new CompanyController