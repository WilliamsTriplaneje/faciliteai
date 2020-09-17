const User = require("../models/user");
const ConfirmationEmail = require("../models/confirmationEmail");

const { comparePasswords, generateToken } = require('../utils/AuthUtils')
const { sendConfirmationEmail } = require('../services/mailer')
const { SITE_URL } = require('../config/Constants')


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

        if(!user.emailIsConfirmed){
            return res.status(400).send({ error: "Email não confirmado" });
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

          const user = await User.create({
            email,
            password,
            name,
            lastname,
            roles,
            isActive,
          });
          const confirmation = await ConfirmationEmail.create({
              userId: user._id
          })
          const confirmationUrl = `${SITE_URL}/confirmar-email/${confirmation._id}`
          await sendConfirmationEmail(user, confirmationUrl)
          user.providerPassword = undefined;
          return res.json(user);
    },
    async confirmEmail(req, res){
        const {
            confirmationEmailId
        } = req.body

        const confirmation = await ConfirmationEmail.findById(confirmationEmailId)

        if (!confirmation) return res.status(400).send({ error: "Confirmation not found" });

        if (!confirmation.isValid) return res.status(400).send({ error: "Confirmation not valid" });
        
        const isSuccess = await User.updateOne({
            _id: confirmation.userId
        }, { $set: 
        { 
            emailIsConfirmed: true
        } 
        })
        .then(() => true)
        .catch((err) => {
            console.log(`Erro ao confirmar email do usuário ${user.email}`)
            console.log(err)
            return false
        })
        if(!isSuccess){
            return res.status(400).send({ error: `Erro ao confirmar email do usuário ${user.email}` })
        }

        return res.status(200).send({})
    }
}