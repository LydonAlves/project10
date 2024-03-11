// require('dotenv').config()
// const express = require('express')
// // importar la función
// const { connectDB } = require('./src/config/db')

// const app = express()

// // conectar con la bbdd
// connectDB()

// app.use('*', (req, res, next) => {
//   return res.status(404).json('Route not found')
// })

// app.listen(3000, () => {
//   console.log('http://localhost:3000')
// })

//!--characters
const express = require('express')
const { connect } = require('./src/config/db')

connect()

const PORT = 3000
const server = express()

const Character = require('./models/Character')

const router = express.Router()

router.get('/characters', (req, res) => {
  return Character.find()
    .then((characters) => {
      // Si encontramos los personajes, los devolveremos al usuario
      return res.status(200).json(characters)
    })
    .catch((err) => {
      // Si hay un error, enviaremos por ahora una respuesta de error.
      return res.status(500).json(err)
    })
})

server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
