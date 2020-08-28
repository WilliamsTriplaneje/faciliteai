//IMPORTS
const express = require('express')
const routes = express.Router()

//IMPORT CONTROLLERS ---> START

//REGISTER CONTROLLER
const authProviderController = require('./controllers/Provider/authProviderController')

//DATA PROVIDER CONTROLLER
const dataProviderController = require('./controllers/Provider/dataProviderController')


//IMPORT CONTROLLERS ---> END

//START ROUTES
routes.get('/', (req, res) => {
  res.send('Hello World')
})

//ROUTER TO AUTH PROVIDER
routes.post('/register/provider', authProviderController.store) //REGISTER
routes.post('/login/provider', authProviderController.login) //LOGIN
routes.get('/profile/:id', authProviderController.show) //GET PROVIDER DATA ACESS

//ROUTER TO REGISTER DATA PROVIDER
routes.post('/register/data', dataProviderController.store) //REGISTER DATA
routes.get('/profile/data/:id', dataProviderController.show) //SHOW DATA PROVIDER

//ROUTER TO ADD PROVIDER ON DATA


//EXPORT ROUTES FOR SERVER
module.exports = routes;