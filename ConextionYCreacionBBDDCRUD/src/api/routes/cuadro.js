const {
  getCuadros,
  postCuadro,
  deleteCuadro,
  updateCuadro,
  getCuadrosByPrice
} = require('../controllers/cuadro')

//!the below is a router
const cuadroRoutes = require('express').Router()

cuadroRoutes.get('/getByPrice/:precio', getCuadrosByPrice)
cuadroRoutes.get('/', getCuadros)
cuadroRoutes.post('/', postCuadro)
cuadroRoutes.put('/:id', updateCuadro)
cuadroRoutes.delete('/:id', deleteCuadro)

module.exports = cuadroRoutes

//! next step: connect the router - controller and model in index.js
