//IMPORTS
const express = require('express')
const routes = express.Router()

//IMPORT CONTROLLERS ---> START

//REGISTER CONTROLLER
const registerProviderController = require('./controllers/registerProviderController')




//IMPORT CONTROLLERS ---> END

//START ROUTES
routes.get('/', (req, res) => {
  res.send('Hello World')
})

//ROUTER TO REGISTER PROVIDER
routes.post('/register/provider', registerProviderController.store)

//EXPORT ROUTES FOR SERVER
module.exports = routes;