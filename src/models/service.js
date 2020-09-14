//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const serviceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true
  },
  name: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subcategory',
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
  typePay: String,
  createdAt: {
    type: Date,
    defalut: Date.now,
  },
});

//EXPORT
module.exports = mongoose.model("service", serviceSchema);
