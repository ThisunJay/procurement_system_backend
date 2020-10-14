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
    contact_number: {
        type: String,
      
    },
    designation: {
        type: String,
    }
});

module.exports = mongoose.model('users', User);