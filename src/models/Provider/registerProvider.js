//IMPORTS
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

//SCHEMA DATA
const registerProviderSchema = new mongoose.Schema({
  providerEmail: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  providerPassword: {
    type: String,
    required: true,
    select: false,
  },
})
//PRE SAVE INCRYPT PASSWORD
registerProviderSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.providerPassword, 10)
  this.providerPassword = hash
  next()
})
//EXPORT
module.exports = mongoose.model('registerProvider', registerProviderSchema)