//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const workProviderSchema = new mongoose.Schema({
  workProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dataProvider",
  },
  workCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  nameCategory: String,
  workSubcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  workDescription: {
      type: String,
      required: true
  }
});

//EXPORT
module.exports = mongoose.model("workProvider", workProviderSchema);
