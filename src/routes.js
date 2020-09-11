//IMPORTS
const express = require("express");
const multer = require('multer')
const routes = express.Router();
const multerConfig = require('./config/multer')

//MIDDLEWARES
const isActiveMd = require('./middlewares/adminActive')

//IMPORT CONTROLLERS ---> START

//--------------------------------------------------------------------------------->


//PROVIDER CONTROLLER -- START
//REGISTER CONTROLLER
const authProviderController = require("./controllers/Provider/authProviderController");

//DATA PROVIDER CONTROLLER
const dataProviderController = require("./controllers/Provider/dataProviderController");
const uploadProviderController = require('./controllers/Provider/uploadProviderController')

//WORK REGISTER
const workProviderController = require('./controllers/Provider/workProviderController')
//PROVIDER CONTROLLER -- END

const authenticationsController = require("./controllers/authenticationsController");
const companiesController = require("./controllers/companiesController");
const servicesController = require("./controllers/servicesController");
const categoriesController = require("./controllers/categoriesController");
const subCategoriesController = require("./controllers/subCategoriesController");
const invoicesController = require("./controllers/Payments/invoicesController");






const authMiddlewares = require("./middlewares/authMiddlewares");




//--------------------------------------------------------------------------------->



//AUTH ADMIN CONTROLLER
const authAdminController = require('./controllers/Admin/authAdminController')

//CATEGORY CONTROLLER -> ADMIN
const categoryController = require("./controllers/Admin/categoryController");

//SUBCATEGORY CONTROLLER -> ADMIN
const subcategoryController = require("./controllers/Admin/subcategoryController");

//LIST PROVIDERS
const listCompanys = require('./controllers/Admin/listCompanysProvider')

//COMPANY APPROVAL
const companyApproval = require('./controllers/Admin/companyApprovalController');
const multerS3 = require("./config/multerS3");

//IMPORT CONTROLLERS ---> END


//--------------------------------------------------------------------------------->


//START ROUTES
routes.get("/", (req, res) => {
  res.send("Hello World");
});

//ROUTER TO AUTH PROVIDER
routes.post("/register/provider", 
multer(multerS3).fields([
  {
    name: 'cpfFile', maxCount: 1
  },
  {
    name: 'cnpjFile', maxCount: 1
  },
  {
    name: 'rgFile', maxCount: 1
  }
]), 
authProviderController.store); //REGISTER
routes.post("/login/provider", authProviderController.login); //LOGIN
routes.get("/profile/:id", authProviderController.show); //GET PROVIDER DATA ACESS

//--------------------------------------------------------------------------------->

//ROUTER TO REGISTER DATA PROVIDER
routes.post("/register/data", dataProviderController.store); //REGISTER DATA
routes.put('/uploads/provider', 

// multer(multerConfig).single('file'), 
multer(multerConfig).any(), 

// multer(multerConfig).fields([
//   {
//     name: 'cpfFile', maxCount: 1
//   },
//   {
//     name: 'cnpjFile', maxCount: 1
//   },
//   {
//     name: 'rgFile', maxCount: 1
//   }
// ]), 


uploadProviderController.store) //ROUTE FOR UPLOAD FILE 
routes.get("/provider/:id", dataProviderController.show); //SHOW DATA PROVIDER

//--------------------------------------------------------------------------------->

//ROUTER TO CONTROL WORK PROVIDER
routes.post('/register/work', workProviderController.store) //REGISTER
routes.get('/index/works/:id', workProviderController.index) //INDEX

//--------------------------------------------------------------------------------->

//ROUTES ADMIN ---> START

//AUTH CONTROLLER
routes.post('/register/admin', authAdminController.store) //ADMIN REGISTER
routes.post('/login/admin', authAdminController.login) // ADMIN LOGIN
routes.get('/profile/admin/:id', authAdminController.show) //SHOW ADMIN DATA

//CATEGORY CONTROLLER
routes.post("/admin/register/category", isActiveMd, categoryController.store); //REGISTER CATEGORY
routes.get("/admin/categorys", categoryController.index); //INDEX CATEGORY
routes.get("/admin/category/show/:id", categoryController.show); //INDEX CATEGORY

//CATEGORY SUBCONTROLLER
routes.post("/admin/register/subcategory", subcategoryController.store); //REGISTER SUBCATEGORY
routes.get("/admin/subcategorys", subcategoryController.index); //INDEX SUBCATEGORY
routes.get("/admin/subcategory/filter", subcategoryController.show); //FILTER

//LIST ALL PROVIDERS ON APLICATION
routes.get('/providers/admin', listCompanys.index)

//COMPANY APPROVAL
routes.put('/approval/:id', companyApproval.update)


//--------------------------------------------------------------------------------->


//UPLOAD FILE CONTROLLER
routes.delete('/file/delete/provider/:id', uploadProviderController.delete) //DELETE FILES
routes.get('/files/index', uploadProviderController.index)


//ROUTES ADMIN ---> END


routes.post("/login", authenticationsController.login); //LOGIN
routes.post("/register", authMiddlewares.registerMiddleware,  authenticationsController.register);

routes.post("/companies", authMiddlewares.isAuthenticated,  companiesController.store);
routes.get("/companies/:id", authMiddlewares.isAuthenticated,  companiesController.index);

routes.put('/companies/:id/uploads', authMiddlewares.isAuthenticated, 
  multer(multerS3).any(), companiesController.uploads);
// routes.get("/companies", authMiddlewares.isAuthenticated,  companiesController.show);
routes.get("/companies/users/:userId", authMiddlewares.isAuthenticated,  companiesController.getByUserId);

routes.get("/companies", authMiddlewares.isAuthenticated,  companiesController.list);
routes.get("/admin/companies/show/:id", authMiddlewares.isAuthenticated,  companiesController.getCompany);
// routes.put("/companies/approval/:id", authMiddlewares.isAuthenticated,  companiesController.approval);
routes.put("/companies/:id/approve", authMiddlewares.isMasterAdmin, companiesController.approve);

routes.get("/services", authMiddlewares.isAuthenticated, servicesController.list);
routes.post("/services", authMiddlewares.isAuthenticated, servicesController.store);
routes.get("/services/:id", authMiddlewares.isAuthenticated, servicesController.index);
routes.put("/services/:id", authMiddlewares.isAuthenticated, servicesController.update);
routes.delete("/services/:id", authMiddlewares.isAuthenticated, servicesController.delete);
routes.put("/services/:id/approve", authMiddlewares.isAuthenticated, servicesController.approve);
routes.get("/services/:companyId/last", authMiddlewares.isAuthenticated, servicesController.listLast);


routes.get("/categories", authMiddlewares.isAuthenticated, categoriesController.list);
routes.post("/categories", authMiddlewares.isMasterAdmin, categoriesController.store);
routes.get("/categories/:id", authMiddlewares.isAuthenticated, categoriesController.index);
routes.put("/categories/:id", authMiddlewares.isMasterAdmin, categoriesController.update);
routes.delete("/categories/:id", authMiddlewares.isMasterAdmin, categoriesController.delete);

routes.get("/sub-categories", authMiddlewares.isAuthenticated, subCategoriesController.list);
routes.post("/sub-categories", authMiddlewares.isMasterAdmin, subCategoriesController.store);
routes.get("/sub-categories/:id", authMiddlewares.isAuthenticated, subCategoriesController.index);
routes.put("/sub-categories/:id", authMiddlewares.isMasterAdmin, subCategoriesController.update);
routes.delete("/sub-categories/:id", authMiddlewares.isMasterAdmin, subCategoriesController.delete);

routes.get("/payments/invoices", authMiddlewares.isAuthenticated, invoicesController.list);
routes.post("/payments/invoices", authMiddlewares.isMasterAdmin, invoicesController.store);
routes.get("/payments/invoices/:id", authMiddlewares.isAuthenticated, invoicesController.index);
routes.put("/payments/invoices/:id", authMiddlewares.isMasterAdmin, invoicesController.update);
routes.delete("/payments/invoices/:id", authMiddlewares.isMasterAdmin, invoicesController.delete);






//EXPORT ROUTES FOR SERVER
module.exports = routes