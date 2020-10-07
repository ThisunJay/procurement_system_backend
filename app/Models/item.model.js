const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'suppliers',
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('items', Item);