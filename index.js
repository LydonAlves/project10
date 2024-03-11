require('dotenv').config()
const cloudinary = require('cloudinary').v2
const express = require('express')
const { connectDb } = require('./src/config/db')
const mainRouter = require('./src/api/routes/MainRouter')
const cors = require('cors')
const app = express()

//!----------------------
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.path}`)
//   next()
// })
//!----------------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())
connectDb()
app.use(cors())

app.use('/api/v1', mainRouter)

app.use('/ping', (req, res, next) => {
  return res.status(200).json('pong')
})

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
