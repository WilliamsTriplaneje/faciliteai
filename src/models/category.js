//IMPORTS
const mongoose = require("mongoose");
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

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
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    }
});

categorySchema.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
categorySchema.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});

//EXPORT
module.exports = mongoose.model("category", categorySchema);