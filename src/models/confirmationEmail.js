const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

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
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    }
});
confirmationEmailSchema.virtual('isValid').get(function() {
    return this.expiresAt >= Date.now()
});

confirmationEmailSchema.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
confirmationEmailSchema.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});

module.exports = mongoose.model("confirmationEmail", confirmationEmailSchema);
