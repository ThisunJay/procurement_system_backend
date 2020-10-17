const sites = require("../Controllers/site.controller");
const router = require("express").Router();

/*
*  POST
*  create site
*  @route_name :api/sites/create
*/
router.post('/create', sites.create);
/*
*  GET
*  get all sites
*  @route_name :api/sites/get_all
*/
router.get('/get_all', sites.get_all);
/*
*  GET
*  get one site
*  @route_name :api/sites/get_one
*/
router.get('/get_one', sites.get_one);
/*
*  GET
*  get one site by id
*  @route_name :api/sites/getone/:id
*/
router.get('/getone/:id', sites.get_one_id);
/*
*  PATCH
*  update site
*  @route_name :api/sites/update
*/
router.patch('/update', sites.update);
module.exports = router;