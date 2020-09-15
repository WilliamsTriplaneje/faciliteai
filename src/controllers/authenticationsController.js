const User = require("../models/user");
const { comparePasswords, generateToken } = require('../utils/AuthUtils')

const CONTROLLER_NAME = 'AUTHENTICATIONS'
module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email }).select(
            "+password"
        );

        //CONDICIONS
        if (!user) return res.status(400).send({ error: "User not found" });

        if (!(await comparePasswords(password, user.password))){
            console.log(`${CONTROLLER_NAME} Erro ao autenticar usuário ${email}`)
            return res.status(400).send({ error: "Invalid password" });
        }
            
        console.log(`${CONTROLLER_NAME} Usuário ${email} autenticado com sucesso`)
        const tokenInfos = {
            _id: user._id,
            email: email,
            name: user.name,
            lastname: user.lastname,
            roles: user.roles
        }
        //CALLBACK
        return res.status(200).json({
            _id: user._id,
            email: email,
            token: await generateToken(tokenInfos),
            name: user.name,
            lastname: user.lastname,
            roles: user.roles
        })
    },

    async register(req, res) {
        const {
            email,
            password,
            name,
            lastname,
            roles,
            isActive
          } = req.body;

          console.log(`Email: '${email}'`)
          console.log(`Senha: '${password}'`)

          const user = await User.create({
            email,
            password,
            name,
            lastname,
            roles,
            isActive,
          });
          user.providerPassword = undefined;
          return res.json(user);
    }
}