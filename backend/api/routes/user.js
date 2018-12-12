const express = require('express')
const route = express.Router();
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const auth = require('../middleware/auth')

route.get('/',UserController.index);
route.get('/roles',UserController.roles);
route.get('/regiments',UserController.regiments);
route.post('/',UserController.store);
route.post('/login',AuthController.login);
route.get('/:id',UserController.show);
route.put('/:id',UserController.update);
route.delete('/:id',UserController.delete);
module.exports = route
