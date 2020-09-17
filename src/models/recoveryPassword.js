const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')

const confirmationEmailSchema = new mongoose.Schema({
    userId: String,
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
confirmationEmailSchema.virtual('isValid').get(function() {
    return this.expiresAt >= Date.now()
});

module.exports = mongoose.model("confirmationEmail", confirmationEmailSchema);
