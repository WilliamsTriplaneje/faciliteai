const Category = require("../../models/Admin/Category");

module.exports = {
  async store(req, res) {
    const { category } = req.body;
    const name = await Category.create({ category });
    res.json(name);
  },
  async index(req, res){
    const category = await Category.find()
    return res.json(category)
  }
};
