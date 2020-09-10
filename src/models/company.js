//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  responsible: {
    name: String,
    lastname: String,
    phone: String,
    rg: String,
    cpf: String,
    email: {
        type: String
    },
  },
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
  rgUrl: {
    type: String
  },
  cnpjUrl: {
    type: String
  },
  cpfUrl: {
    type: String
  },
  logoUrl: {
    type: String
  },
  proofOfResidenceUrl: {
    type: String
  },
  isInAnalysis: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'service' 
  }],
});

//EXPORT
module.exports = mongoose.model("company", companySchema);
