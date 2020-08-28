//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const categorySchema = new mongoose.Schema({
 category: String,
});

//EXPORT
module.exports = mongoose.model("Category", categorySchema);