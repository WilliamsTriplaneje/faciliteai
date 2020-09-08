const bcryptjs = require("bcryptjs");
const jwt =  require('jsonwebtoken')
const { JWT_SALT_KEY } = require('../config/Constants')

function verifyRole (roles, role){
    return roles.indexOf(role) >= 0
}

const getHashPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt)
    return hash
}

const comparePasswords = async (password, hashPassword) => {
    return await bcryptjs.compare(password, hashPassword)
}
const generateToken = async (data) => {
    return jwt.sign(data, JWT_SALT_KEY, { expiresIn: '600d' })
}

const decodeToken = async (token) => {
    const data = await jwt.verify(token, JWT_SALT_KEY)
    return data
}

module.exports = {
    getHashPassword,
    comparePasswords,
    generateToken,
    decodeToken,
    verifyRole
}