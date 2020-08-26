//READ FILES ON ENV
require('dotenv').config()
//IMPORTS
const express = require('express') //MINIMAL FRAMEWORK FOR ROUTES
const mongoose = require('mongoose') // DATABASE (MONGODB)
const cors = require('cors') //FOR URLS
const routes = require('./routes') 

//START APP
const app = express()

//CONFIG APP
app.use(cors()) //ENABLE FOR ALL URL's
app.use(express.json()) //READ IN JSON
app.use(routes) //IMPORT ROUTES 


//START APP ON SERVER
const start = async () =>{
  //BEFORE, START DATABASE (MONGODB WITH MONGOOSE)
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const port = 3333
  app.listen(process.env.PORT || port, ()=>{
    console.log(`server started on port ${port}`)
  })
}
start()
