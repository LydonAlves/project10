//! this function is to get all the info from the server
//This always has to be async. It is executed via a petition(res) that is sent by the database
const Movie = require('../models/Movie')
//* the above can be imported by just writing the name as in JS

const postMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre
    })
    //it is not essential to write out the above 4 lines, you could just put req.body. But by doing this you ensure it has this structure
    //* the below saves the movie to the database
    const movieSaved = await newMovie.save()
    return res.status(201).json(movieSaved)

    console.log(req.body)

    //*you can return console.log and see if it's working in Insomnia
    // return res.json('We are in the method post')
  } catch (error) {
    return res.status(400).json('The petition has failed')
  }
}

// always add the three arguments as they go in order
const getMovies = async (req, res, next) => {
  try {
    // this variable will find all the movies in the Database
    // we go to the section: Movie and use find() to look for all the movies from the collection Movie
    const allMovies = await Movie.find()
    // then we return everything found
    return res.status.json(allMovies)
  } catch (error) {
    return res.status(400).json('The petition has failed')
  }
}

router.get('/movies/id/:id', async (req, res, next) => {
  //The id is created by mongodb. use example: a user clicks on an item and the front end needs to call it from the backend via an id
  const id = req.params.id
  try {
    const movie = await Movie.findById(id)
    if (movie) {
      //res.status(200) = successful HTTP request
      return res.status(200).json(movie)
    } else {
      // res.status(404) = HTTP request that couldn't find the requested resource. Commonly used to indicate that an item does not exist
      return res.status(404).json('No movie found by this id')
    }
  } catch (error) {
    //res.status(500) general response that indicates an internal server error. Used when an unexpected condition was encountered and no more specific message was suitable.
    return res.status(500).json(error)
  }
})

router.get('/movies/title/:title', async (req, res, next) => {
  const { title } = req.params

  try {
    const movieByTitle = await Movie.find({ title })
    return res.status(200).json(movieByTitle)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/movies/genre/:genre', async (req, res, next) => {
  //this const extracts the genre property from the req.params. (destructuring)
  const { genre } = req.params
  try {
    const movieByGenre = await Movie.find({ genre })
    return res.status(200).json(movieByGenre)
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('movies/year/:year', async (req, res, next) => {
  const { year } = req.params
  try {
    const movieByYear = await Movie.find({ year })
    return res.status(200).json(movieByYear)
  } catch (error) {
    return res.status(500).json(error)
  }
})

//export the function which will be executed by a route
module.exports = { getMovies, postMovie }
