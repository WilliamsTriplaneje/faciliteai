//IMPORTS
const express = require("express");
const multer = require('multer')
const routes = express.Router();
const multerConfig = require('./config/multer')

//MIDDLEWARES
const isActiveMd = require('./middlewares/adminActive')

//IMPORT CONTROLLERS ---> START

//PROVIDER CONTROLLER -- START

//REGISTER CONTROLLER
const authProviderController = require("./controllers/Provider/authProviderController");

//DATA PROVIDER CONTROLLER
const dataProviderController = require("./controllers/Provider/dataProviderController");
const uploadProviderController = require('./controllers/Provider/uploadProviderController')

//WORK REGISTER
const workProviderController = require('./controllers/Provider/workProviderController')

//PROVIDER CONTROLLER -- END

//AUTH ADMIN CONTROLLER
const authAdminController = require('./controllers/Admin/authAdminController')

//CATEGORY CONTROLLER -> ADMIN
const categoryController = require("./controllers/Admin/categoryController");

//SUBCATEGORY CONTROLLER -> ADMIN
const subcategoryController = require("./controllers/Admin/subcategoryController");

//IMPORT CONTROLLERS ---> END


//START ROUTES
routes.get("/", (req, res) => {
  res.send("Hello World");
});

//ROUTER TO AUTH PROVIDER
routes.post("/register/provider", authProviderController.store); //REGISTER
routes.post("/login/provider", authProviderController.login); //LOGIN
routes.get("/profile/:id", authProviderController.show); //GET PROVIDER DATA ACESS

//ROUTER TO REGISTER DATA PROVIDER
routes.post("/register/data", dataProviderController.store); //REGISTER DATA
routes.post('/uploads/provider', multer(multerConfig).single('file'), uploadProviderController.store) //ROUTE FOR UPLOAD FILE 
routes.get("/provider/:id", dataProviderController.show); //SHOW DATA PROVIDER

//ROUTER TO CONTROL WORK PROVIDER
routes.post('/register/work', workProviderController.store) //REGISTER
routes.get('/index/works/:id', workProviderController.index) //INDEX

//ROUTES ADMIN ---> START

//AUTH CONTROLLER
routes.post('/register/admin', authAdminController.store) //ADMIN REGISTER
routes.post('/login/admin', authAdminController.login) // ADMIN LOGIN
routes.get('/profile/admin/:id', authAdminController.show) //SHOW ADMIN DATA

//CATEGORY CONTROLLER
routes.post("/admin/register/category", isActiveMd, categoryController.store); //REGISTER CATEGORY
routes.get("/admin/categorys", categoryController.index); //INDEX CATEGORY

//CATEGORY SUBCONTROLLER
routes.post("/admin/register/subcategory", subcategoryController.store); //REGISTER SUBCATEGORY
routes.get("/admin/subcategorys", subcategoryController.index); //INDEX SUBCATEGORY

//UPLOAD FILE CONTROLLER
routes.delete('/file/delete/provider/:id', uploadProviderController.delete) //DELETE FILES
routes.get('/files/index', uploadProviderController.index)

//ROUTES ADMIN ---> END

//EXPORT ROUTES FOR SERVER
module.exports = routes;
