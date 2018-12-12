const express = require('express')
const route = express.Router();
const PermissionRoleController = require('../controllers/acl/PermissionRoleController')

route.get('/',PermissionRoleController.index);
route.post('/',PermissionRoleController.store);
route.get('/:id',PermissionRoleController.show);
route.delete('/:id',PermissionRoleController.delete);
module.exports = route
