const sites = require("../Controllers/site.controller");
const router = require("express").Router();

//create site
//api/sites/create
router.post('/create', sites.create);

//get all sites
//api/sites/get_all
router.get('/get_all', sites.get_all);

//get one site
//api/sites/get_one
router.get('/get_one', sites.get_one);

//update site
//api/sites/update
router.patch('/update', sites.update);

//need to create the delete route

module.exports = router;