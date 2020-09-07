//READ FILES ON ENV
require('dotenv').config()
//IMPORTS
const express = require('express') //MINI FRAMEWORK FOR ROUTES
const mongoose = require('mongoose') // DATABASE (MONGODB)
const cors = require('cors') //FOR URLS
const path = require('path')
const routes = require('./routes') 

//START APP
const app = express()

//CONFIG APP
app.use(cors()) //ENABLE FOR ALL URL's
app.use(express.json()) //READ IN JSON
app.use(express.urlencoded({extended: true})) //URL ENCODED
app.use(routes) //IMPORT ROUTES 
app.use(process.env.PUBLIC_URL, express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

//START APP ON SERVER
const start = async () =>{
  //BEFORE, START DATABASE (MONGODB WITH MONGOOSE)
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
