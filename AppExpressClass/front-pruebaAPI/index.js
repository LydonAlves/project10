const input = document.querySelector('input')
const button = document.querySelector('button')

const peticion = () => {
  fetch('http://localhost:3000/products/' + input.value)
    .then((res) => res.json())
    .then((res) => {
      // const h1 = document.createElement('h1')
      // h1.textContent = res
      // document.body.append(h1)
      console.log(res)
      for (const product of res) {
        const nombre = document.createElement('h2')
        const precio = document.createElement('p')

        nombre.textContent = product.nombre
        precio.textContent = product.precio

        document.body.append(nombre)
        document.body.append(precio)
      }
    })
}

button.addEventListener('click', peticion)
