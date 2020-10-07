const mongoose = require('mongoose');

const Site = new mongoose.Schema({
    site_manager: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('sites', Site);