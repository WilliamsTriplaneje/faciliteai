//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const subcategorySchema = new mongoose.Schema({
  name: String,
  categoryName: {
    type: String
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//EXPORT
module.exports = mongoose.model("subcategory", subcategorySchema);
