//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const subcategorySchema = new mongoose.Schema({
  subcategory: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

//EXPORT
module.exports = mongoose.model("Subcategory", subcategorySchema);
