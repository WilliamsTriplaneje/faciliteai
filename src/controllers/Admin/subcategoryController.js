const Subcategory = require("../../models/Admin/Subcategory");

module.exports = {
  async store(req, res) {
    const { subcategory, categoryId } = req.body;
    const name = await Subcategory.create({
      subcategory,
      categoryId,
    });
    res.json(name);
  },
  async index(req, res) {
    const subcategory = await Subcategory.find();
    return res.json(subcategory);
  },
  async show(req, res) {
    const { categoryId } = req.query;
    const subcategory = await Subcategory.find({ categoryId: categoryId });
    return res.json(subcategory)
  },
};
