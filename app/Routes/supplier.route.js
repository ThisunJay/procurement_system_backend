const suppliers = require("../Controllers/supplier.controller");
const router = require("express").Router();

/*
*  POST
*  add a new supplie
*  @route_name :api/supplier/add
*/
router.post('/add', suppliers.create);
/*
*  GET
*  get all suppliers
*  @route_name :api/supplier/get
*/
router.get('/get', suppliers.get)
/*
*  GET
*  get one supplier
*  @route_name :api/supplier/getone/:id
*/
router.get('/getone/:id', suppliers.get_one);

module.exports = router;