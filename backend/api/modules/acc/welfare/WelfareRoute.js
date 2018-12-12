const express = require('express')
const route = express.Router();
const Controller = require('./WelfareController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.get('/session',Controller.session);
route.get('/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.destroy);
module.exports = route
