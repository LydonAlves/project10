//! The fs module is used for interacting with the file system in Node.js.
const fs = require('fs')

//? write a file: if it doesn't exist it will be created
// fs.writeFile(
//   'nuevoArchivo.txt',
//   'Esto es lo primero que he escrito en mi archivo',
//   (err, data) => {
//     console.log('se ha escrito correctamente')
//     //? takes a file and allows you to read it in utf-8 format: this is asynchronos so it works inside the other function because the other funciton must be executed first
//     fs.readFile('nuevoArchivo.txt', 'utf-8', (err, data) => {
//       console.log(data)
//     })
//   }
// )

//! after passing the following array through the function below it the array is no longer needed as a new file is creted with all the data
// const arrayCoches = [
//   {
//     marca: 'Peugeot',
//     precio: 23200,
//     color: 'azul'
//   },
//   {
//     marca: 'Mazda',
//     precio: 26200,
//     color: 'rojo'
//   },
//   {
//     marca: 'Ferrari',
//     precio: 150000,
//     color: 'rojo'
//   },
//   {
//     marca: 'Seat',
//     precio: 30000,
//     color: 'negros'
//   }
// ]

//* Create a JSON from the arrayCoches: can be used for getting info from excel too
// fs.writeFile('coches.json', JSON.stringify(arrayCoches), (err, data) => {
//   console.log('archivo completado')
// })

//* read the newly created file
// fs.readFile('coches.json', 'utf-8', (err, data) => {
//   console.log(data)
// })

//* pass the file to an array of object
// fs.readFile('coches.json', 'utf-8', (err, data) => {
//   console.log(JSON.parse(data))
// })

//* write a .csv with this data: we want all the keys to be at the top of the page, then the data below
// Obtener las claves de un objecto: Object.Keys or forIn
//recorrer un objet0: coches[0]
//meter una salta de linea en un string \n
fs.readFile('coches.json', 'utf-8', (err, data) => {
  const coches = JSON.parse(data)

  let stringToCsv = ''

  // for (const key in coches[0]) {
  //   stringToCsv += `${key},`
  // }

  //? remove the last comma
  // stringToCsv = stringToCsv.slice(0, stringToCsv.length - 1)
  //! or instead of the above line of code and the forIn loop do the below, instead of removing the comma, don't add it in the first place
  let arrayClaves = Object.keys(coches[0])

  //* below one has a comma and the other doesn't
  for (let i = 0; i < arrayClaves.length; i++) {
    if (i === arrayClaves.length - 1) {
      stringToCsv += `${arrayClaves[i]}`
    } else stringToCsv += `${arrayClaves[i]},`
  }

  //? it is here so that it is executed after the loop has finished
  stringToCsv += '\n'

  //* create a string from the values of the objects in the array
  for (const coche of coches) {
    stringToCsv += `${coche.marca},${coche.precio},${coche.color}\n`
  }

  //!create a new .csv file with the data I chose to commit
  fs.writeFile('concesionario.csv', stringToCsv, (err, data) => {
    console.log('Procesado correctamente')
  })

  console.log(stringToCsv)
})
