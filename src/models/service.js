//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const serviceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
  },
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
  isInAnalysis: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  typePay: String
});

//EXPORT
module.exports = mongoose.model("service", serviceSchema);
