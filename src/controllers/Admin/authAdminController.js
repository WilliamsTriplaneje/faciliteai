const Auth = require("../../models/Admin/registerAdmin");
const bcryptjs = require("bcryptjs");

module.exports = {
  async store(req, res) {
    const { adminName, adminEmail, adminPassword, isAdmin } = req.body;
    const registerAdmin = await Auth.create({
      adminName,
      adminEmail,
      adminPassword,
      isAdmin,
    });
    registerAdmin.adminPassword = undefined;
    return res.json(registerAdmin);
  },
  async login(req, res) {
    const { adminEmail, adminPassword } = req.body;

    const loginAdmin = await Auth.findOne({ adminEmail }).select(
      "+adminPassword"
    );

    //CONDICIONS
    if (!loginAdmin) return res.status(400).send({ error: "User not found" });

    if (!(await bcryptjs.compare(adminPassword, loginAdmin.adminPassword)))
      return res.status(400).send({ error: "Invalid password" });

    //CALLBACK
    loginAdmin.adminPassword = undefined; 
    return res.send(loginAdmin);
  },
  async show(req, res) {
    const admin = await Auth.findById(req.params.id);
    return res.json(admin);
  },
};
