const mongoose = require("mongoose");
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

const chargeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
    },
    price: Number,
    date: {
        type: Date,
        default: Date.now,
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

chargeSchema.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
chargeSchema.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});

module.exports = mongoose.model("charge", chargeSchema);
