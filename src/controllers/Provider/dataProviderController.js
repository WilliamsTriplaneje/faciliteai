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
    } = req.body;

    if (!cnpj) {
      try {
        const data = await dataProvider.create({
          provider,
          nameFantasy,
          rSocial,
          cnpj,
          address: { street, number, city, state, cep },
          contact: { phone, email },
        });
        return res.json(data);
      } catch (err) {
        return res.json({err: "Falha no registro de dados"})
      }
    }
    else{
      return res.json({err: "Empresa já cadastrada"})
    }

    return;
  },
  async show(req, res) {
    const data = await dataProvider.find({ provider: req.params.id });
    return res.json(data);
  },
};
