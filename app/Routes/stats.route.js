const stats = require('../Controllers/stats.controller');
const router = require("express").Router();
/*
*  GET
*  all stats
*  @route_name :api/stats/all
*/
router.get('/all', stats.counts);
/*
*  GET
*  lates  stats
*  @route_name :api/stats/latest
*/
router.get('/latest', stats.latest_orders);
/*
*  GET
*  stats month wise
*  @route_name :api/stats/bymonth
*/
router.get('/bymonth', stats.by_month);
/*
*  GET
*  suppliers month wise
*  @route_name :api/stats/supbymonth
*/
router.get('/supbymonth', stats.sup_by_month);
/*
*  GET
*  recent stats
*  @route_name :api/stats/recen
*/
router.get('/recent', stats.recent_orders);

module.exports = router;

