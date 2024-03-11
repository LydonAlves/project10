// npm i mongoose - todo lo que tenga que ver con la bbdd
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log(process.env.DB_URL)
    await mongoose.connect(process.env.DB_URL)
    console.log('BBDD echando humo, funcionando muy bien')
  } catch (error) {
    console.log('Error conectando con la bbdd')
  }
}

//-- use {} when you're exporting a function. And no keys when it is not a function
module.exports = { connectDB }
