const suppliers = require("../Controllers/supplier.controller");
const router = require("express").Router();

//add a new supplier
router.post('/add', suppliers.create);

module.exports = router;