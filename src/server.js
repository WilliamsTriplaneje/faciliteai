//READ FILES ON ENV
require('dotenv').config()
//IMPORTS
const express = require('express') //MINI FRAMEWORK FOR ROUTES
const mongoose = require('mongoose') // DATABASE (MONGODB)
const cors = require('cors') //FOR URLS
const path = require('path')
const routes = require('./routes') 
const paymentsController = require("./controllers/Stripe/paymentsController");
const bodyParser = require('body-parser');

//START APP
const app = express()

//CONFIG APP
app.use(cors()) //ENABLE FOR ALL URL's
app.post("/stripe/webhooks", bodyParser.raw({type: 'application/json'}), paymentsController.webhooks);
app.use(express.json()) //READ IN JSON
app.use(express.urlencoded({extended: true})) //URL ENCODED
app.use(routes) //IMPORT ROUTES 
app.use(process.env.PUBLIC_URL, express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

//START APP ON SERVER
const start = async () =>{
  //BEFORE, START DATABASE (MONGODB WITH MONGOOSE)
  console.log(`Conectando ao mongodb no endereço: ${process.env.MONGO_URL}`)
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true ,
    useFindAndModify: true
  })
  const port = 3333
  app.listen(process.env.PORT || port, ()=>{
    console.log(`server started on port ${port}`)
  })
}
start()
