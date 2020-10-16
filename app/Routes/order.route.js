const orders = require('../Controllers/order.controller');
const router = require('express').Router();

//place an order
//api/orders/create
router.post('/create', orders.create);

//delete an order
//api/orders/delete
router.delete('/delete', orders.delete);

//update the state of the order
//api/orders/update_state
router.patch('/update_state', orders.update_state);

//update the order items and total
router.patch('/update_order', orders.update_order);

//get all orders
//api/orders/get_all
router.get('/get_all', orders.get_all);

//get one orders
//api/orders/get_one
router.get('/get_one/:id', orders.get_one);

module.exports = router;