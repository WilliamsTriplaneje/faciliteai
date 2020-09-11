const User = require("../models/user");
const Company = require("../models/company");
const { APP_URL, PUBLIC_URL } = require("../config/Constants");
const path = require('path')
const { comparePasswords, generateToken } = require("../utils/AuthUtils");

function getLocalUrlFromFilename(filename) {
  return (APP_URL + '/' + PUBLIC_URL + '/' + filename)
}

const CONTROLLER_NAME = 'COMPANIES'

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
    console.log(`${CONTROLLER_NAME} Cadastrando empresa ${nameFantasy}`)

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
  async list(req, res) {
    console.log(`Listando empresas`)
    const companies = await Company.find()
    return res.status(200).json(companies)
  },

  async index(req, res) {
    const { id } = req.params
    console.log(`${CONTROLLER_NAME} listando empresa ${id}`)
    const company = await Company.findById(id)
    if(!company){
      return res.status(400).json({
          message: "Empresa não encontrada"
      })
    }

    console.log(company)
    return res.status(200).json(company)
  },

  async uploads(req, res) {
    const { id } = req.params;
    console.log(`${CONTROLLER_NAME} Atualizando ${req.files ? req.files.length : 0} imagens da empresa ${id}`)
    const cpfFile = req.files.find((value) => value.fieldname === "cpfFile");
    const cnpjFile = req.files.find((value) => value.fieldname === "cnpjFile");
    const rgFile = req.files.find((value) => value.fieldname === "rgFile");
    const logoFile = req.files.find((value) => value.fieldname === "logoFile");
    const proofOfResidenceFile = req.files.find((value) => value.fieldname === "proofOfResidenceFile");


    // const cpfUrl = getUrlFromFilename(cpfFile.originalname);
    // const cnpjUrl = getUrlFromFilename(cnpjFile.originalname);
    // const rgUrl = getUrlFromFilename(rgFile.originalname);

    const cpfUrl = cpfFile.location;
    const cnpjUrl = cnpjFile.location;
    const rgUrl = rgFile.location;
    const logoUrl = logoFile.location;
    const proofOfResidenceUrl = proofOfResidenceFile.location;

    await Company.updateOne({
      _id: id
    }, { $set: 
        { 
          cpfUrl,
          cnpjUrl,
          rgUrl,
          logoUrl,
          proofOfResidenceUrl
        } 
      }
    );

    return res.status(200).json({
      cpfUrl,
      cnpjUrl,
      rgUrl,
      logoUrl,
      proofOfResidenceUrl
    })
  },
  async show(req, res) {
    const { _id } = res.locals.user;
    const data = await Company.findOne({
        userId: _id
    });
    return res.json(data)
  },
  async getByUserId(req, res) {
    const { userId } = req.params
    console.log(`Listando a empresa do usuário ${userId}`)
    const data = await Company.findOne({
      userId
    });
    return res.json(data)
  },
  async getCompany(req,res){
    const data = await Company.findById(req.params.id)
    return res.json(data)
  },
  //APROVAÇÃO
  async approval(req, res) {
    const approval = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(approval)
  },

  async approve(req, res) {
    const { id } = req.params;
    const {
        isApproved
    } = req.body

    const company = await Company.findByIdAndUpdate(id, {
        isActive: isApproved,
        isInAnalysis: false
    })

    if(!company){
        return res.status(500).json({})
    }
    return res.status(201).json({})
},
};
