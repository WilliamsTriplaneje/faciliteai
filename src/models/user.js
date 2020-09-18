const mongoose = require("mongoose");
const { getHashPassword } = require("../utils/AuthUtils");
const { OnlyNotDeleted } = require("../utils/MongooseUtils");


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
  roles: [
    {
      type: String,
    },
  ],
  stripeId: {
    type: String,
    unique: false,
    required: false,
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
//PRE SAVE INCRYPT PASSWORD
userSchema.pre("save", async function (next) {
  console.log("Salvando usuário....");
  this.password = await getHashPassword(this.password);
  next();
});
userSchema.pre("updateOne", async function (next) {
  const { password } = this.getUpdate().$set;
  if (password) {
    this.setUpdate({
      $set: {
        ...this.getUpdate().$set,
        password: await getHashPassword(password),
      },
    });
  }
  next();
});

userSchema.pre("findOne", async function (next) {
    OnlyNotDeleted(this)
    next();
});
userSchema.pre("find", async function (next) {
    OnlyNotDeleted(this)
    next();
});


module.exports = mongoose.model("user", userSchema);
