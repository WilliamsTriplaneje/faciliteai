const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')
const { OnlyNotDeleted } = require("../utils/MongooseUtils");

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
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    }
});
recoveryPasswordSchemas.virtual('isValid').get(function() {
    return this.expiresAt >= Date.now()
});

recoveryPasswordSchemas.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
recoveryPasswordSchemas.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});

module.exports = mongoose.model("recoveryPassword", recoveryPasswordSchemas);
