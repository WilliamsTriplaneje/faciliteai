//IMPORTS
const mongoose = require("mongoose");
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

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
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false,
  }
});

serviceSchema.pre("findOne", async function (next) {
  OnlyNotDeleted(this)
  next();
});
serviceSchema.pre("find", async function (next) {
  OnlyNotDeleted(this)
  next();
});

//EXPORT
module.exports = mongoose.model("service", serviceSchema);
