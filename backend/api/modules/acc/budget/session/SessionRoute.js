const express = require('express')
const route = express.Router();
const Controller = require('./SessionController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.get('/active',Controller.activeData);
route.get('/:id',Controller.show);
route.get('/active/:id',Controller.makeActive);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.destroy);

module.exports = route
