const suppliers = require("../Controllers/supplier.controller");
const router = require("express").Router();

//add a new supplier
router.post('/add', suppliers.create);

//get all suppliers
router.get('/get', suppliers.get )

module.exports = router;