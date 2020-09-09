const User = require("../models/user");
const Company = require("../models/company");
const { APP_URL, PUBLIC_URL, AWS_BUCKET_URL } = require("../config/Constants");
const path = require('path')
const { comparePasswords, generateToken } = require("../utils/AuthUtils");

function getLocalUrlFromFilename(filename) {
  return (APP_URL + '/' + PUBLIC_URL + '/' + filename)
}

module.exports = {
  async store(req, res) {
    const { _id } = res.locals.user;
    const {
      nameFantasy,
      rSocial,
      cnpj,
      assignment,
      responsible,
      address,
      contact,
      description,
    } = req.body;

    const data = await Company.create({
      userId: _id,
      nameFantasy,
      rSocial,
      cnpj,
      assignment,
      responsible,
      address,
      contact,
      description,
    });
    return res.json(data);
  },
  async uploads(req, res) {
    const { id } = req.params;
    console.log(req.files)
    const cpfFile = req.files.find((value) => value.fieldname === "cpfFile");
    const cnpjFile = req.files.find((value) => value.fieldname === "cnpjFile");
    const rgFile = req.files.find((value) => value.fieldname === "rgFile");

    // const cpfUrl = getUrlFromFilename(cpfFile.originalname);
    // const cnpjUrl = getUrlFromFilename(cnpjFile.originalname);
    // const rgUrl = getUrlFromFilename(rgFile.originalname);

    const cpfUrl = cpfFile.location;
    const cnpjUrl = cnpjFile.location;
    const rgUrl = rgFile.location;

    await Company.findOneAndUpdate(id, {
      cpfUrl,
      cnpjUrl,
      rgUrl,
    });
  },
  async show(req, res) {
    const { _id } = res.locals.user;
    const data = await Company.findOne({
        userId: _id
    });
    return res.json(data)
  },
  async index(req,res){
    const data = await Company.find()
    return res.json(data)
  },
  async getCompany(req,res){
    const data = await Company.findById(req.params.id)
    return res.json(data)
  },
  async approval(req, res) {
    const approval = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(approval)
  },
};
