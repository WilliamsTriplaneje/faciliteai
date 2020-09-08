//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const categorySchema = new mongoose.Schema({
 name: {
    type: String,
    required: true
 },
 createdBy: {
     type: String,
     required: true
 },
 createdAt: {
     type: Date,
     default: Date.now
 }
});

//EXPORT
module.exports = mongoose.model("category", categorySchema);