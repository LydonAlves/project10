require('dotenv').config()
//?---In the above code we configue and call module dotenv
//I have installed the module express which can be see in package.json, I bring it here with the follwing code
const express = require('express')
const { connectDB } = require('./src/config/db')
const movieRoutes = require('./src/api/routes/Movie')

//I need to execute the module, and I store it in the variable app
const app = express()
//!--the above is the initial setup, bring the module express and set up a port----------------------------------

connectDB()
//-----below is what comes from the api files---------------------------------------------------------------------------------------------
//*The following line allows  the server to revieve and process info json. Without this a req will come back as undefined: req.body (this is in insomnia)
app.use(express.json())
// we create the route that is added to the url: "/api/v1/movies". when it sees this it goes into movieRoutes
app.use('/api/v1/movies', movieRoutes)

//? this is to check that info is being sent correctly to the page
app.use('/ping', (req, res, next) => {
  return res.status(200).json('pong')
})
//--------------------------------------------------------------------------------------------------
//*The below is for all routs without a response
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

//!--the below is the initial setup----------------------------------
//we get the server to listen(like addEventListener). We add the port 3000, and a callback which is a funciton to be executed
app.listen(3000, () => {
  console.log('http:localhost:3000')
})
