//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const dataProviderSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerProvider',
  },
  firstName: String,
  lastname: String,
  pessoalEmail: {
    type: String,
    unique: true
  },
  pessoalPhone: String,
  rg: String,
  cpf: String,

  nameFantasy: String,
  rSocial: String,
  cnpj: {
    type: String,
    required: true,
  },
  assignment: String,
  address: {
    street: String,
    number: String,
    neighborhood: String,
    city: String,
    state: String,
    cep: String,
    lat: String,
    long: String
  },
  contact: {
    phone: String,
    email: String,
    instaPerfil: String,
    facebookPage: String
  },
  description: {
    type: String,
    maxlength: 150
  },
  isActive: Boolean,
});

//EXPORT
module.exports = mongoose.model("dataProvider", dataProviderSchema);
