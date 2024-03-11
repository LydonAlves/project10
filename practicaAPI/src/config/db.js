//bring the module to be able to use it here
const mongoose = require('mongoose')

const connectDB = async () => {
  //try catch to controll for errors
  try {
    // mongoose.connect() = method to connect to a MongoDB
    // process.env.DB_URL = This is an environment variable accessed through "process.env"
    await mongoose.connect(process.env.DB_URL)
    console.log('Database connected successfully!!!')
  } catch (error) {
    console.log('Error in the connection with the database')
  }
}

//I need to export the function to be able to use it in index.ja
module.exports = { connectDB }
