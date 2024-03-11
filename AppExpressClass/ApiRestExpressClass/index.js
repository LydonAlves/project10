//! librería por excelencia para nuestro servidor - express - generar el servidor, escuchar peticiones, organizar enrutado, utilizar opciones
//!Try to always do this in the same way
const express = require('express')

//* cors is so that you can do petetions from a front
// const cors = require('cors')

//? this can be called server as well
//* By executing express I can use all the methods from express()
// ejecuto express y lo guardo en la variable app, que utilizaré de ahora en adelante para gestionar las primeras rutas de nuestro servidor, poner a escuchar a nuestro servidor y utilizar diferentes herramientas
const app = express()
// app.use(cors())

const products = [
  {
    nombre: 'Sofá',
    precio: 300
  },
  {
    nombre: 'TV',
    precio: 400
  },
  {
    nombre: 'Lampara',
    precio: 20
  },
  {
    nombre: 'Puzzle',
    precio: 25
  }
]

//* All the functions made from peticiones de usuarios recieve 3 arguments
//? declarado una función, el nombre de la función es pong y esta función se ejecuta mediante una petición, esto significa que la petición cuando se lance, me enviará 3 parámetros.
const pong = (req, res, next) => {
  //! 1 req- request - information from the petition: from the client to the server
  //! 2  res - response - the information from the response: from the server to the client
  //! 3 next - this will be a function that allows me to continue to the following middleware of a router
  // console.log('pong')
  // console.log(res)
  //? I set the status code, can find them on http.cat
  return res.status(200).json('pong')
  //* Things I almost always need to use in a response
  //* 1. return res
  //* 2. status code of the res
  //* 3. json -> this is how the response will be interpreted
}

const getProducts = (req, res, next) => {
  return res.status(200).json(products)
}
const getProductsByPrice = (req, res, next) => {
  console.log(req.params.precio)

  return res
    .status(200)
    .json(
      products.filter((product) => product.precio < parseInt(req.params.precio))
    )
}

const probarQuery = (req, res, next) => {
  console.log(req.query)
}

app.use('/ping', pong)
app.use('/products/:precio', getProductsByPrice)
app.use('/products', getProducts)
app.use('/prueba', probarQuery)

//* the 3000 is the port the server is opened in
app.listen(3000, () => {
  console.log('http://localhost:' + 3000)
})
