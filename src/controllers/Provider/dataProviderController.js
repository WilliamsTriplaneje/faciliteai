const dataProvider = require("../../models/Provider/dataProvider");

module.exports = {
  async store(req, res) {
    const {
      provider,
      nameFantasy,
      rSocial,
      cnpj,
      address: { street, number, city, state, cep },
      contact: { phone, email },
      work: { category, subcategory },
    } = req.body;

    const data = await dataProvider.create({
      provider,
      nameFantasy,
      rSocial,
      cnpj,
      address: { street, number, city, state, cep },
      contact: { phone, email },
      work: { category, subcategory }
    });
    return res.json(data);
  },
  async show(req, res) {
    const data = await dataProvider.find({ provider: req.params.id });
    return res.json(data);
  },
};
