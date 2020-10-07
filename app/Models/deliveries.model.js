const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Delivery = new mongoose.Schema({
    items: {
        type: [],
        required: true,
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'suppliers',
        required: true,
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: 0,
    },
    notes: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('deliveries', Delivery);