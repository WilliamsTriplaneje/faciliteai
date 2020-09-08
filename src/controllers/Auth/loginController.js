const User = require("../../models/user");
const { comparePasswords } = require('../../utils/AuthUtils')


module.exports = {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select(
            "+password"
        );

        //CONDICIONS
        if (!user) return res.status(400).send({ error: "User not found" });

        if (!(await comparePasswords(adminPassword, loginAdmin.adminPassword)))
            return res.status(400).send({ error: "Invalid password" });

        //CALLBACK
        return res.status(200).json({
            _id: user._id,
            email: email,
            token: 'ashASDIAHDHIASDJOIASDIASD',
            name: user.name,
            lastname: user.lastname,
            roles: user.roles
        })
    },
}