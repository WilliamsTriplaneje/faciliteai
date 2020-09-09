const User = require("../models/user");
const Company = require("../models/company");
const { APP_URL, PUBLIC_URL } = require("../config/Constants");

const { comparePasswords, generateToken } = require("../utils/AuthUtils");

function getUrlFromFilename(filename) {
  return path.join(APP_URL, PUBLIC_URL, filename);
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
      isActive,
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
      isActive,
    });
    return res.json(data);
  },
  async uploads(req, res) {
    const { id } = req.params;

    const cpfFile = req.files.find((value) => value.fieldname === "cpfFile");
    const cnpjFile = req.files.find((value) => value.fieldname === "cnpjFile");
    const rgFile = req.files.find((value) => value.fieldname === "rgFile");

    const cpfUrl = getUrlFromFilename(cpfFile.filename);
    const cnpjUrl = getUrlFromFilename(cnpjFile.filename);
    const rgUrl = getUrlFromFilename(rgFile.filename);

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
};
