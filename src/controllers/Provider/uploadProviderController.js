const UploadProvider = require("../../models/Provider/uploadsProvider");

module.exports = {
  async store(req, res) {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const { provider, dataProviderId } = req.body;

    const uploadsProvider = await UploadProvider.create({
      provider,
      dataProviderId,
      name,
      size,
      key,
      url,
    });
    return res.json(uploadsProvider);
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
