const { decodeToken, verifyRole } = require('../utils/AuthUtils')
const { DEFAULT_CLIENT_ROLES, DEFAULT_PROVIDER_ROLES } = require('../config/Constants')


const isAuthenticated = async (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({
        message: 'Token inexistente'
      })
    }

    const user = await decodeToken(token).then((tokenInfos) => {
        return tokenInfos
    }).catch((err) => {
        console.log(err)
        return null
    })
    if(!user){
        return res.status(401).json({
            message: 'Token inválido'
        })
    }
    res.locals.user = user
    next()
}

const isAdmin = async (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({
        message: 'Token inexistente'
      })
    }

    const user = await decodeToken(token).then((tokenInfos) => {
        return tokenInfos
    }).catch((err) => {
        console.log(err)
        return null
    })
    if(!user){
        return res.status(401).json({
            message: 'Token inválido'
        })
    }
    if(!verifyRole(user.roles, 'admin')){
        return res.status(401).json({
            message: 'Rota permitida somente a administradores'
        })
    }
    res.locals.user = user
    next()
}

const isMasterAdmin = async (req, res, next) => {
    let token = req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({
        message: 'Token inexistente'
      })
    }

    const user = await decodeToken(token).then((tokenInfos) => {
        return tokenInfos
    }).catch((err) => {
        console.log(err)
        return null
    })
    if(!user){
        return res.status(401).json({
            message: 'Token inválido'
        })
    }
    if(!verifyRole(user.roles, 'master-admin')){
        return res.status(401).json({
            message: 'Rota permitida somente a administradores Master'
        })
    }
    res.locals.user = user
    next()
}

const registerMiddleware = async (req, res, next) => {
    let token = req.headers['x-access-token']
    const selectedRoles = req.body.roles

    const { isClient } = req.body
    if(isClient){
        req.body.roles = DEFAULT_CLIENT_ROLES
    }else{
        req.body.roles = DEFAULT_PROVIDER_ROLES
    }
    
    if (!token) {
        next()
        return
    }

    const user = await decodeToken(token).then((tokenInfos) => {
        return tokenInfos
    }).catch((err) => {
        console.log(err)
        return null
    })
    if(!user){
        return res.status(401).json({
            message: 'Token inválido'
        })
    }
    if(verifyRole(user.roles, 'master-admin')){
        req.body.roles = selectedRoles
    }
    res.locals.user = user
    next()
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isMasterAdmin,
    registerMiddleware
}