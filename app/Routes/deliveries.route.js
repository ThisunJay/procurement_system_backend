const deliveries = require('../Controllers/deliveries.controller');
const router = require('express').Router();


/*
*  POST
*  create new deliveries
*  @route_name : api/deliveries/create
*/
router.post('/create', deliveries.create);
/*
*  DELETE
*  delete a delivery
*  @route_name : api/deliveries/delete
*/
router.delete('/delete', deliveries.delete);
/*
*  PATCH
*  update approval
*  @route_name : api/deliveries/approve
*/
router.patch('/approve', deliveries.approve);
/*
*  PATCH
*  update state
*  @route_name : api/deliveries/state
*/
router.patch('/state', deliveries.update_state);

module.exports = router;