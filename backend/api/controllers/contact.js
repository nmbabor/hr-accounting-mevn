const Contact = require('../models/contact');
//Get All data
const index = (req,res,next) =>{
  Contact.find().select("name email phone")
      .then(allData => {
          const respond={
              count:allData.length,
              contact:allData.map(Data=>{
                  return{
                      name:Data.name,
                      email:Data.email,
                      phone:Data.phone,
                      _id:Data._id,
                      request:{
                          type:"GET",
                          url:"http://localhost:8000/api/contacts/"+Data._id
                      }
                  }

              })
          }
        res.status(200).json({
          message:'All Contacts',
            respond
        })

      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message:'Some Error found!',
          error:err
        })
      })
}
// Insert new data into database
const store = (req,res,next) => {
    //res.status(201).json(req.body)
  const contact = new Contact({
     name: req.body.name,
     email: req.body.email,
     phone: req.body.phone,
  })
  contact.save()
      .then(data=>{
        res.status(201).json({
          message:'Data successfully inserted.',
          result:data
        })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message:'Some Error found!',
          error:err
        })
      })
      })
}
// Show single data
const show = (req,res,next) => {
  let id = req.params.id
  Contact.findById(id)
      .then(data=>{
        res.status(200).json({data})
      })
      .catch(err=>{
        res.status(500).json({
          message:'Something error found!',
          error:err
        })
      })
}
// Update single data
const update = (req,res,next) => {
  let id = req.params.id
  let inputData = {
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
  }
  Contact.findByIdAndUpdate(id,{$set:inputData})
      .then(data=>{
        Contact.findById(data.id).then(newData=>{
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
// Delete single data
const destroy = (req,res,next) => {
  let id = req.params.id
  Contact.findByIdAndRemove(id)
      .then(data=>{
        res.status(200).json({
          message:'Delete successfully.',
          data
        })
      })
      .catch(err=>{
        res.status(500).json({
          message:'Error Occured',
          error:err
        })
      })
}
module.exports = {
  index,store,show,destroy,update
}
