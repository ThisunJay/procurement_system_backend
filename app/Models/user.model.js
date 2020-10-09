const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    site_location: {
        type: String,
    },
    site_code: {
        type: String,
    },
    contact_number: {
        type: String,
      
    }
});

module.exports = mongoose.model('users', User);