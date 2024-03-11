const mongoose = require('mongoose')
const Movie = require('../src/api/models/Movie')

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción'
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción'
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación'
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación'
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción'
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica'
  }
]
console.log('code is running')
const movieDocuments = movies.map((movie) => new Movie(movie))

mongoose
  .connect(
    'mongodb+srv://lydonalves:Y00b99bfPkuF7BKx@cluster0.wgehhc7.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err)
    process.exit(1) // Exit the process with an error code
  })

  .then(async () => {
    const allMovies = await Movie.find()
    if (allMovies.length) {
      await Movie.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Movie.insertMany(movieDocuments)
    console.log('DatabaseCreated')
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect())
