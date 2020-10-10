const items = require('../Controllers/item.controller');
const router = require("express").Router();

//create item
//api/items/create
router.post('/create', items.create);

//create item
//api/items/get_one
router.get('/get_one', items.get_one);

//create item
//api/items/get_all
router.get('/get_all', items.get_all);

//create item
//api/items/delete
router.delete('/delete/:id', items.delete);

//create item
//api/items/update
router.patch('/update', items.update);

module.exports = router;