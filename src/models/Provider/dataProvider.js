//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const dataProviderSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerProvider',
  },
  nameFantasy: String,
  rSocial: String,
  cnpj: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    number: String,
    city: String,
    state: String,
    cep: String,
  },
  contact: {
    phone: String,
    email: String,
  },
  description: {
    type: String,
    maxlength: 150
  }
});

//EXPORT
module.exports = mongoose.model("dataProvider", dataProviderSchema);
