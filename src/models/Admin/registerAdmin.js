const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  adminPassword: {
    type: String,
    select: false,
    required: true,
  },
  isAdmin: Boolean,
  createdAt: {
    type: Date,
    defalut: Date.now,
  },
});
//PRE SAVE INCRYPT PASSWORD
adminSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.adminPassword, 10);
  this.adminPassword = hash;
  next();
});
module.exports = mongoose.model("registerAdmin", adminSchema);
