const express = require('express')
const route = express.Router();
const Controller = require('./NtrController')

route.get('/',Controller.index);
route.post('/',Controller.store);
route.post('/bulk',Controller.bulkStore);
route.get('/fields',Controller.fields);
route.get('/session',Controller.session);
route.get('/:id/field-value',Controller.fieldValue);
route.get('/:id',Controller.show);
route.put('/:id',Controller.update);
route.delete('/:id',Controller.destroy);
module.exports = route
