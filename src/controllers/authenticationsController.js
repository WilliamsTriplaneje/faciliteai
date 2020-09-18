const User = require("../models/user");
const ConfirmationEmail = require("../models/confirmationEmail");
const RecoveryPassword = require("../models/recoveryPassword");


const { comparePasswords, generateToken } = require('../utils/AuthUtils')
const { sendConfirmationEmail, sendRecoveryPasswordEmail } = require('../services/mailer')
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
            console.log(`${CONTROLLER_NAME} Credenciais incorretas do usuário ${email}`)
            return res.status(400).send({ error: "Invalid password" });
        }

        if(!user.emailIsConfirmed){
            console.log(`${CONTROLLER_NAME} Email não confirmado do usuário ${email}`)
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
          await sendConfirmationEmail(user, confirmationUrl).catch((err) => {
              console.log("Erro ao enviar email de confirmação")
          })
          user.password = undefined;
          return res.json(user);
    },
    async confirmEmail(req, res){
        const {
            confirmationEmailId
        } = req.body

        console.log(`${CONTROLLER_NAME} Confirmando email com o código ${confirmationEmailId}`)

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
    },
    async recoveryPassword(req, res){
        const {
            recoveryPasswordId,
            password
        } = req.body
        console.log(`${CONTROLLER_NAME} Alterando senha com o código ${recoveryPasswordId}`)

        const recovery = await RecoveryPassword.findById(recoveryPasswordId)

        if (!recovery) return res.status(400).send({ error: "Recovery not found" });
        if (recovery.isUsed === true) return res.status(400).send({ error: "Recovery already used" });
        if (!recovery.isValid) return res.status(400).send({ error: "Recovery not valid" });
        
        const isSuccess = await User.updateOne({
            _id: recovery.userId
        }, { $set: 
        { 
            password
        } 
        })
        .then(() => true)
        .catch((err) => {
            console.log(`Erro ao confirmar email do usuário`)
            console.log(err)
            return false
        })

        await RecoveryPassword.updateOne({
            _id: recovery.id
        }, { $set: 
        { 
            isUsed: true
        } 
        })


        if(!isSuccess){
            return res.status(400).send({ error: `Erro ao confirmar email do usuário ${user.email}` })
        }

        return res.status(200).send({})
    },
    async sendRecoveryPassword(req, res){
        const {
            email
        } = req.body
        console.log(`${CONTROLLER_NAME} Enviando código de recuperação de senha pro email ${email}`)

        const user = await User.findOne({
            email
        })
        if (!user) return res.status(400).send({ error: "User not found" });

        const recovery = await RecoveryPassword.create({
            userId: user._id
        })

        const recoveryUrl = `${SITE_URL}/recuperar-senha/${recovery._id}`
        const isSuccess = await sendRecoveryPasswordEmail(user, recoveryUrl)
        .then(() => true)
        .catch((err) => {
            console.log(`Erro ao enviar recuperação de senha para o usuário ${user.email}`)
            console.log(err)
            return false
        })
        if(!isSuccess){
            return res.status(400).send({ error: `Erro ao confirmar email do usuário ${user.email}` })
        }

        return res.status(200).send({})
    }
}