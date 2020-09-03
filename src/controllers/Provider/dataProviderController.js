const dataProvider = require("../../models/Provider/dataProvider");

module.exports = {
  async store(req, res) {
    const {
      provider,
      firstName,
      lastname,
      pessoalEmail,
      pessoalPhone,
      rg,
      cpf,
      nameFantasy,
      rSocial,
      cnpj,
      assignment,
      address: { street, number,neighborhood, city, state, cep, lat, long },
      contact: { phone, email, instaPerfil, facebookPage },
      description,
      isActive,
    } = req.body;

    const listDataProvider = await dataProvider.findOne({ cnpj });

    if (!listDataProvider) {
      try {
        const data = await dataProvider.create({
          provider,
          firstName,
          lastname,
          pessoalEmail,
          pessoalPhone,
          rg, 
          cpf,
          nameFantasy,
          rSocial,
          cnpj,
          assignment,
          address: { street, number,neighborhood, city, state, cep, lat, long },
          contact: { phone, email, instaPerfil, facebookPage },
          description,
          isActive,
        });
        return res.json(data);
      } catch (err) {
        return res.json({ err: "Falha no registro de dados" });
      }
    } else {
      return res.json({ err: "Empresa já cadastrada" });
    }
  },
  async show(req, res) {
    const data = await dataProvider.findOne({ provider: req.params.id });
    return res.json(data);
  },
};
