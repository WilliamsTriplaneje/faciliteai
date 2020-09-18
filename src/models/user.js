const mongoose = require("mongoose");
const { getHashPassword } = require("../utils/AuthUtils");

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

// TODO Encriptar automanticamente a senha do usuário antes de dar um update nele

module.exports = mongoose.model("user", userSchema);
