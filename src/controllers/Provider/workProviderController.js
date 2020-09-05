const Work = require("../../models/Provider/workProvider");

module.exports = {
  async store(req, res) {
    const {
      workProvider,
      workName,
      workCategory,
      workSubcategory,
      value,
      workDescription,
      isActive,
      typePay
    } = req.body;

    const work = await Work.create({
      workProvider,
      workName,
      workCategory,
      workSubcategory,
      value,
      workDescription, 
      isActive,
      typePay
    });
    res.json(work);
  },
  async index(req, res) {
    const works = await Work.find({ workProvider: req.params.id });
    res.json(works);
  },
};
