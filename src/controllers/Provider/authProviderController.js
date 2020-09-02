//CONTROLLER PROVIDERS
const Provider = require("../../models/Provider/registerProvider");
const bcryptjs = require("bcryptjs");
const { Error } = require("mongoose");

module.exports = {
  //REGISTER PROVIDERS
  async store(req, res) {
    try {
      const {
        providerEmail,
        providerPassword,
        providerName,
        providerLastname,
        isActive,
      } = req.body;
      const provider = await Provider.create({
        providerEmail,
        providerPassword,
        providerName,
        providerLastname,
        isActive,
      });
      provider.providerPassword = undefined;
      return res.json(provider);
    } catch {
      return res.status(400).send({ error: "Este e-mail já foi cadastrado." });
    }
  },
  async login(req, res) {
    const { providerEmail, providerPassword } = req.body;

    const provider = await Provider.findOne({ providerEmail }).select(
      "+providerPassword"
    );

    //CONDICIONS
    if (!provider) return res.status(400).send({ error: "User not found" });

    if (!(await bcryptjs.compare(providerPassword, provider.providerPassword)))
      return res.status(400).send({ error: "Invalid password" });

    //CALLBACK
    provider.providerPassword = undefined;
    return res.send(provider);
  },
  async show(req, res) {
    const provider = await Provider.findById(req.params.id);
    return res.json(provider);
  },
};
