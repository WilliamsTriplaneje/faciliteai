const Provider = require('../models/registerProvider')

module.exports = {
  async store(req, res) {
    const { providerEmail, providerPassword } = req.body
    const provider = await Provider.create({
      providerEmail,
      providerPassword
    })
    provider.providerPassword = undefined
    return res.json(provider)
  }
}