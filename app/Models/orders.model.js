const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new mongoose.Schema({
    items: {
        type: [],
        required: true,
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'suppliers',
        required: true,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'sites',
        required: true,
    },
    state: {
        type: [],
        required: true,
    },
    current_state: {
        type: String,
        default: 1
    }
});

module.exports = mongoose.model('orders', Order);