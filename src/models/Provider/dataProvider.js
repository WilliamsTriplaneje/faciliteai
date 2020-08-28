//IMPORTS
const mongoose = require("mongoose");

//SCHEMA DATA
const dataProviderSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dataProvider",
  },
  nameFantasy: String,
  rSocial: String,
  cnpj: {
    type: String,
    unique: true,
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
});

//EXPORT
module.exports = mongoose.model("dataProvider", dataProviderSchema);
