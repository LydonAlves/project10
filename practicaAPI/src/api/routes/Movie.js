//Declare a route
//This turns moveRoutes into a router
const { getMovies, postMovie } = require('../controllers/Movie')

// express is used for everything related to the server
const movieRoutes = require('express').Router()

movieRoutes.get('/', getMovies)
movieRoutes.post('/', postMovie)

module.exports = movieRoutes
