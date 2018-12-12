const express = require('express')
const route = express.Router();
const RoleController = require('../controllers/acl/RoleController')

route.get('/',RoleController.index);
route.post('/',RoleController.store);
route.get('/:id',RoleController.show);
route.put('/:id',RoleController.update);
route.delete('/:id',RoleController.delete);
module.exports = route
