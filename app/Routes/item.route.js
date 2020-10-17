const items = require('../Controllers/item.controller');
const router = require("express").Router();

/*
*  POST
*  create item
*  @route_name :api/items/create
*/
router.post('/create', items.create);
/*
*  GET
*  get one order
*  @route_name :api/items/get_one
*/
router.get('/get_one', items.get_one);
/*
*  GET
*  get all order
*  @route_name :api/items/get_all
*/
router.get('/get_all', items.get_all);
/*
*  DELETE
*  delete one order
*  @route_name :api/items/delete
*/
router.delete('/delete/:id', items.delete);
/*
*  PATCH
*  update one order
*  @route_name :api/items/update
*/
router.patch('/update', items.update);

module.exports = router;