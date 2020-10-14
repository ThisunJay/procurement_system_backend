const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new mongoose.Schema({
    item_id:{
        type:String,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('items', Item);