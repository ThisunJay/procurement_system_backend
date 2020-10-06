const users = require("../Controllers/user.controller");
const router = require("express").Router();

//user registration
//api/user/signup
router.post('/signup', users.create);

//user sign in
//api/user/signin
router.post('/signin', users.signin);

module.exports = router;
