const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('suppliers', SupplierSchema);