const mongoose = require("mongoose");
const { getHashPassword } = require('../utils/AuthUtils')

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    emailIsConfirmed: {
        type: Boolean,
        required: false,
        default: false,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    roles: [{
        type: String
    }],
    stripeId: {
        type: String,
        unique: false,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//PRE SAVE INCRYPT PASSWORD
userSchema.pre("save", async function (next) {
  this.password = await getHashPassword(this.password)
  next();
});
module.exports = mongoose.model("user", userSchema);
