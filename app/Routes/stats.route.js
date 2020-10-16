const stats = require('../Controllers/stats.controller');
const router = require("express").Router();

//api/stats/all
router.get('/all', stats.counts);

//api/stats/latest
router.get('/latest', stats.latest_orders);

//api/stats/bymonth
router.get('/bymonth', stats.by_month);

//api/stats/supbymonth
router.get('/supbymonth', stats.sup_by_month);

module.exports = router;

