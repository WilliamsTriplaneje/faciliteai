const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("charge", chargeSchema);
