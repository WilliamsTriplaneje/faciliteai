const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')

const recoveryPasswordSchemas = new mongoose.Schema({
    userId: String,
    isUsed: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        default: () => {
            var date = new Date();
            date.setDate(date.getDate() + 1);
            return date
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
recoveryPasswordSchemas.virtual('isValid').get(function() {
    return this.expiresAt >= Date.now()
});

module.exports = mongoose.model("recoveryPassword", recoveryPasswordSchemas);
