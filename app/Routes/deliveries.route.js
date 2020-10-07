const deliveries = require('../Controllers/deliveries.controller');
const router = require('express').Router();

//create new deliveries
//api/deliveries/create
router.post('/create', deliveries.create);

//delete a delivery
//api/deliveries/delete
router.delete('/delete', deliveries.delete);

//update approval
//api/deliveries/approve
router.patch('/approve', deliveries.approve);

//update state
//api/deliveries/state
router.patch('/state', deliveries.update_state);

module.exports = router;