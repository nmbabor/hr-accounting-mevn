const express = require('express');
const route = express.Router();
const contactController = require('../controllers/contact');
//get
route.get('/',contactController.index);
//Post
route.post('/',contactController.store);

//show
route.get('/:id',contactController.show);
//put
route.put('/:id',contactController.update);
//delete
route.delete('/:id',contactController.destroy);


module.exports = route
