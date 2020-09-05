const Category = require("../../models/Admin/Category");

module.exports = {
  async store(req, res) {
    const { category, createdBy } = req.body;

    try {
      const newCat = await Category.create({ category, createdBy });
      res.json(newCat);
    } catch {
      res
        .status(400)
        .send({ error: "Você não tem permissão para criar uma categoria" });
    }
  },
  async index(req, res) {
    const category = await Category.find();
    return res.json(category);
  },
  async show(req, res) {
    const getCategory = await Category.findById(req.params.id);
    res.json(getCategory);
  },
};
