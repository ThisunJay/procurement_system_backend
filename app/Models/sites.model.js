const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Site = new mongoose.Schema({
    site_manager: {
        type: Schema.ObjectId,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    site_code: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('sites', Site);