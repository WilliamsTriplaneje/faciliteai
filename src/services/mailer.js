const nodemailer = require('nodemailer')
const { EMAIL_EMAIL, EMAIL_NAME, EMAIL_PASSWORD } = require('../config/Constants')

transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: EMAIL_EMAIL, // Basta dizer qual o nosso usuário
        pass: EMAIL_PASSWORD // e a senha da nossa conta
    }
})

async function sendEmail(to, subject, message){
    const options = {
        from: EMAIL_NAME,
        to,
        subject,
        html: message
    }
    return await transporter.sendMail(options)
        .then((res) => {
            console.log(res)
            return true
        }).catch((err) => {
            console.log(err)
            return false
        })
}
async function sendConfirmationEmail(user, url){
    return await sendEmail(user.email, 'Confirmação de email Facilite Ai', 
    `<h1>Por favor clique abaixo para confirmar seu email </h>${url}`
    )
}

async function sendRecoveryPasswordEmail(user, url){
    return await sendEmail(user.email, 'Recuperação de senha Facilite Ai', 
    `<h1>Por favor clique abaixo para recuperar sua senha </h>${url}`
    )
}
module.exports = {
    sendEmail,
    sendConfirmationEmail,
    sendRecoveryPasswordEmail
}