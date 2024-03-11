console.log('hola desde index.js')
const fs = require('fs')

fs.readFile('archivo.txt', 'utf-8', (error, data) => {
  console.log(data)
})

fs.writeFile(
  'archivoNuevo.txt',
  'Esto es el contenido del archivo',
  (error, data) => {
    console.log('Ya se ha creado!')
  }
)
