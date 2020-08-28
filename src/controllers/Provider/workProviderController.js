const Work = require("../../models/Provider/workProvider");

module.exports = {
  async store(req, res) {
    const {
      workProvider,
      workCategory,
      workSubcategory,
      nameCategory,
      workDescription,
    } = req.body;
    const work = await Work.create({
      workProvider,
      workCategory,
      nameCategory,
      workSubcategory,
      workDescription,
    });
    res.json(work);
  },
  async index(req, res) {
    const works = await Work.find({ workProvider: req.params.id });
    res.json(works)
  },
};
