//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const workProviderSchema = new mongoose.Schema({
  workProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dataProvider",
  },
  workName: String,
  workCategory: {
    type: String,
    required: true
  },
  workSubcategory:{
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  workDescription: {
      type: String,
      required: true
  },
  typePay: String,
  isActive: Boolean
});

//EXPORT
module.exports = mongoose.model("workProvider", workProviderSchema);
