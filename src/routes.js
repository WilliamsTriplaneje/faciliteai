//IMPORTS
const express = require('express')
const routes = express.Router()

//IMPORT CONTROLLERS ---> START

//REGISTER CONTROLLER
const authProviderController = require('./controllers/Provider/authProviderController')

//DATA PROVIDER CONTROLLER
const dataProviderController = require('./controllers/Provider/dataProviderController')

//CATEGORY CONTROLLER -> ADMIN
const categoryController = require('./controllers/Admin/categoryController')

//SUBCATEGORY CONTROLLER -> ADMIN
const subcategoryController = require('./controllers/Admin/subcategoryController')


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


//ROUTES ADMIN ---> START

//CATEGORY CONTROLLER
routes.post('/admin/register/category', categoryController.store) //REGISTER CATEGORY
routes.get('/admin/categorys', categoryController.index) //INDEX CATEGORY


//CATEGORY SUBCONTROLLER
routes.post('/admin/register/subcategory', subcategoryController.store) //REGISTER SUBCATEGORY
routes.get('/admin/subcategorys', subcategoryController.index) //INDEX SUBCATEGORY
//ROUTES ADMIN ---> END


//EXPORT ROUTES FOR SERVER
module.exports = routes;