const users = require("../Controllers/user.controller");
const router = require("express").Router();


/*
*  POST
*  user registration
*  @route_name :api/user/signup
*/
router.post('/signup', users.create);
/*
*  POST
*  user sign in
*  @route_name :api/user/signin
*/
router.post('/signin', users.signin);
/*
*  POST
*  reset user password
*  @route_name :api/user/resetPassword
*/
router.post('/resetPassword', users.resetPwd);
/*
*  GET
*  get_all_users
*  @route_name :api/user/sitemanagers
*/
router.get('/sitemanagers', users.get_all_site_managers);
/*
*  POST
*  register user
*  @route_name :api/user/register
*/
router.post('/register', users.register);
/*
*  GET
*  return all the users
*  @route_name :api/user/all
*/
router.get('/all', users.get_all);

module.exports = router;
