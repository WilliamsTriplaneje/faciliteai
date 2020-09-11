const mongoose = require("mongoose");

const chargeSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
    },
    price: Number,
    date: {
        type: Date,
        defalut: Date.now,
    },
    createdAt: {
        type: Date,
        defalut: Date.now,
    },
});

module.exports = mongoose.model("charge", chargeSchema);
