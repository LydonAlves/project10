const mongoose = require('mongoose')

// Create a new Schema
// Add two objects:_ first is structure of data, second is the options of the data
// In the first structure we have the routes to the items, we need to stringify them
//  In the second option we will use the collection(name of the collection) and the timestamps(show at what time and when generated)
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number },
    genre: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'movies'
  }
)

// create a model: always singular and start with capital
// contains three arguments: 1. name of model 2. the schema 3. name of the collection in the database (same as the first one in this case)
const Movie = mongoose.model('movies', movieSchema, 'movies')
module.exports = Movie
