//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const serviceSchema = new mongoose.Schema({
  name: String,
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  typePay: String,
  isActive: Boolean
});

//EXPORT
module.exports = mongoose.model("service", serviceSchema);
