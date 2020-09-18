//IMPORTS
const mongoose = require("mongoose");
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

//SCHEMA DATA
const subcategorySchema = new mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
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

subcategorySchema.pre("findOne", async function (next) {
  OnlyNotDeleted(this)
  next();
});
subcategorySchema.pre("find", async function (next) {
  OnlyNotDeleted(this)
  next();
});

//EXPORT
module.exports = mongoose.model("subcategory", subcategorySchema);
