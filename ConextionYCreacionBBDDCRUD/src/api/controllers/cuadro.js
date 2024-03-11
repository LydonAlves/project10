const Cuadro = require('../models/cuadro')

//! CRUD -> create read update delete

//! Create
const postCuadro = async (req, res, next) => {
  try {
    const newCuadro = new Cuadro(req.body)

    const cuadroSaved = await newCuadro.save()

    return res.status(201).json(cuadroSaved)
  } catch (error) {
    return res.status(400).json('Ha fallado la petición')
  }
}

//* This is a controller
//! READ
const getCuadros = async (req, res, next) => {
  try {
    // model.find() -> encuentra TODOS los datos de dicha colección
    const allCuadros = await Cuadro.find()

    return res.json(allCuadros)
  } catch (error) {
    return res.status(400).json('Ha fallado la petición')
  }
}

//! UPDATE
const updateCuadro = async (req, res, next) => {
  try {
    const { id } = req.params
    const newCuadro = new Cuadro(req.body)
    //! they have the same ID as only there can only be one unique ID. Therefore, it the info in the id is just updated
    newCuadro._id = id
    // findByIdAndUpdate me va a devolver el dato ANTIGUO
    const up = await Cuadro.findByIdAndUpdate(id, newCuadro, { new: true })
    return res.status(200).json(up)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

//! DELETE
const deleteCuadro = async (req, res, next) => {
  try {
    //tengo que saber cual es - el cuadro
    // tenemos una clave única - ID
    const { id } = req.params
    const cuadroDeleted = await Cuadro.findByIdAndDelete(id)
    return res.status(200).json(cuadroDeleted)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

//! READ
const getCuadrosByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params

    //*from the property price I want to get the value precio, and sort them by ones that cost less than X
    //                                            less than or equal to
    const cuadros = await Cuadro.find({ price: { $lte: precio } })
    return res.status(200).json(cuadros)
  } catch (error) {
    return res.status(400).json('Error')
  }
}

module.exports = {
  postCuadro,
  getCuadros,
  updateCuadro,
  deleteCuadro,
  getCuadrosByPrice
}

//!after doing this declare a route
