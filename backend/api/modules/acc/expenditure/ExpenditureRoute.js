const express = require('express')
const route = express.Router();
const Controller = require('./ExpenditureController')

route.post('/',Controller.store);
route.post('/info',Controller.headInformation);
route.get('/session',Controller.session);
route.get('/heads',Controller.heads);
route.get('/:id',Controller.edit);
route.post('/show',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.destroy);
module.exports = route
