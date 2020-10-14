const users = require("../Controllers/user.controller");
const router = require("express").Router();

//user registration
//api/user/signup
router.post('/signup', users.create);

//user sign in
//api/user/signin
router.post('/signin', users.signin);

//reset user password
//api/user/resetPassword
router.post('/resetPassword', users.resetPwd);

//get_all_users
//api/user/sitemanagers
router.get('/sitemanagers', users.get_all_site_managers);

//register user
//api/user/register
router.post('/register', users.register);

module.exports = router;
