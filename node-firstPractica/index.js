const array = [
  {
    DNI: '23984723D',
    Nombre: 'Paquito',
    Apellidos: 'García'
  },
  {
    DNI: '2398233F',
    Nombre: 'Juanito',
    Apellidos: 'García'
  }
]

//!--- my try----
// let keysSet = new Set()
// array.forEach((obj) => {
//   Object.keys(obj).forEach((key) => {
//     keysSet.add(key)
//   })
// })

// let uniqueKeys = Array.from(keysSet)
// console.log(uniqueKeys)

// let objectValues = []
// array.forEach((obj) => {
//   Object.values(obj).forEach((value) => {
//     objectValues.push(value)
//   })
//   objectValues.push(`\n`)
// })
// console.log(objectValues)

//!-- Chat GPT: beginner version-----
// First, we need to get the headers (the keys from the objects)
// We take the keys from the first object in the array
const headers = Object.keys(array[0])

// Initialize the CSV string with the headers, joined by commas
let csvString = headers.join(',') + '\n'

// Now loop through each object in the array to create the rows
for (let i = 0; i < array.length; i++) {
  // For each object, loop through each header to get its value
  let row = ''
  for (let j = 0; j < headers.length; j++) {
    // Add the value to the row
    row += array[i][headers[j]]

    // If it's not the last header, add a comma
    if (j < headers.length - 1) {
      row += ','
    }
  }

  // Add the row to the CSV string
  csvString += row

  // If it's not the last object, add a newline character
  if (i < array.length - 1) {
    csvString += '\n'
  }
}

// Printing the CSV string to the console
console.log(csvString)
//!---Advanced version------------------
// const headers = Object.keys(array[0])

// // Map each object to a string, join values with commas
// const rows = array.map((obj) => {
//   return headers.map((header) => obj[header]).join(',')
// })

// // Combine headers and rows, join with newline
// const csvString = [headers.join(',')].concat(rows).join('\n')

// console.log(csvString)

//!------PMBA------------
// 1. Creamos el string en el que iremos plasmando los datos.
let stringFinal = ``

// 2. Creamos la primera fila añadiendo las claves separadas por comas al string, ya que es el formato que nos pide un csv
for (const key in array[0]) {
  stringFinal += `${key},`
}

// 3. Quitamos la última coma
stringFinal = stringFinal.slice(0, stringFinal.length - 1)

// 4. Añadimos el caracter especial \n para dar un salto de línea en nuestro string para crear una fila nueva en el formato csv
stringFinal += '\n'

// 5. Añadiremos ahora los valores en direferentes filas
for (const elemento of array) {
  stringFinal += `${elemento.DNI},${elemento.Nombre},${elemento.Apellidos}\n`
}

// 6. En este punto habremos conseguido el ejemplo de formato csv, lo podemos comprobar con un log
console.log(stringFinal)

// proceso final ---------

// 7. Utilizamos el método writeFile para crear el archivo.csv con el contenido generado
fs.writeFile('archivo.csv', stringFinal, (err, data) => {
  console.log('Escrito!')
})
