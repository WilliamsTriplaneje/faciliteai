const dataProvider = require("../../models/Provider/dataProvider");

module.exports = {
  async update(req, res) {
    const approval = await dataProvider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(approval)
  },
};
  