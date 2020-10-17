const orders = require('../Controllers/order.controller');
const router = require('express').Router();

/*
*  POST
*  place an order
*  @route_name :api/orders/create
*/
router.post('/create', orders.create);
/*
*  DELETE
*  delete an order
*  @route_name :api/orders/delete
*/
router.delete('/delete', orders.delete);
/*
*  PATCH
*  update the state of the order
*  @route_name :api/orders/update_state
*/
router.patch('/update_state', orders.update_state);
/*
*  PATCH
*  update the order items and total
*  @route_name :api/orders/update_order
*/
router.patch('/update_order', orders.update_order);
/*
*  GET
*  get all orders
*  @route_name :api/orders/get_all
*/
router.get('/get_all', orders.get_all);
/*
*  GET
*  get one orders
*  @route_name :api/orders/get_one
*/
router.get('/get_one/:id', orders.get_one);
/*
*  GET
*  get orders by supplier id
*  @route_name :api/getbysupp
*/
router.get('/getbysupp/:id', orders.get_by_supplier);
/*
*  GET
*  get orders by supplier id
*  @route_name :api/getbysite
*/
router.get('/getbysite/:id', orders.get_by_site);

module.exports = router;