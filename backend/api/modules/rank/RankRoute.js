const express = require('express')
const route = express.Router();
const RankController = require('./RankController')

route.get('/',RankController.index);
route.post('/',RankController.store);
route.get('/active',RankController.activeRanks);
route.post('/bulk-rank',RankController.bulkRanksSave);
route.get('/:id',RankController.show);
route.put('/:id',RankController.update);
route.delete('/:id',RankController.destroy);

module.exports = route
