const UploadProvider = require("../../models/Provider/uploadsProvider");
const DataProvider = require("../../models/Provider/dataProvider");
const { json } = require("express");
const path = require('path');

function getUrlFromFilename(filename){
  return path.join(process.env.APP_URL, process.env.PUBLIC_URL, filename);
}
module.exports = {
  async store(req, res) {
    try{
      const { provider } = req.body;
      
      const cpfFile  = req.files.find((value) => value.fieldname === 'cpfFile')
      const cnpjFile  = req.files.find((value) => value.fieldname === 'cnpjFile')
      const rgFile  = req.files.find((value) => value.fieldname === 'rgFile')

      const cpfUrl = getUrlFromFilename(cpfFile.filename)
      const cnpjUrl = getUrlFromFilename(cnpjFile.filename)
      const rgUrl = getUrlFromFilename(rgFile.filename)

      const dataProvider = await DataProvider.findOneAndUpdate(provider, 
        {
          cpfUrl,
          cnpjUrl,
          rgUrl
        });
      return res.json(dataProvider)

    }catch(e){
      console.log(e)
      return res.status(500).json({})
    }
    
  },
  async index(req, res) {
    const uploadsProvider = await UploadProvider.find();
    return res.json(uploadsProvider);
  },
  async delete(req, res) {
    const uploadsProvider = await UploadProvider.findByIdAndDelete(
      req.params.id
    );
    res.send("Removido com sucesso");
  },
};
