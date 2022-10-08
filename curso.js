

//let stockProductos = [
//  {id: 1, marca: "Nike", modelo: "Jordan", precio: 5000, img: `img/jordan.jpg` },
//  {id: 2, marca: "Adidas", modelo: "Forum Low", precio: 4900, img: `img/adidasch.jpg` },
//  {id: 3, marca: "Nike", modelo: "SB", precio: 2000, img: `img/remeranike.jpg` },
//  {id: 4, marca: "Adidas", modelo: "Originals", precio: 1900, img: `img/remeraadidas.jpg` }
//]


const contenedorCarrito = document.getElementById(`carrito-contenedor`)
const precioTotal = document.getElementById(`precioTotal`)
const botonVaciar = document.getElementById(`vaciar-carrito`)
const botonFinalizar = document.getElementById(`botonFinalizarCompra`)

let carrito = []

botonVaciar.addEventListener(`click`, () => {
  carrito.length = 0
  actualizarCarrito()
})


//Operador ternario
botonFinalizar.addEventListener(`click`, () => {
  (carrito.length === 0) ? swal("El carrito esta vacío") : swal(`¡Muchas gracias por su compra! El total es ${precioTotal.innerText}$`)
})





document.addEventListener(`DOMContentLoaded`, ()  =>  {
  if (localStorage.getItem(`carrito`)){
    carrito = JSON.parse(localStorage.getItem(`carrito`))
    actualizarCarrito()
  }
})


let divProductos = document.getElementById("Productos")
fetch("productos.json")
.then((res) => res.json())
.then((data) => {
//stockProductos.forEach((Producto)=>{
  for(let Producto of data){
let nuevoProducto = document.createElement("Div")
nuevoProducto.innerHTML = `<div class="card" style="width: 18rem;">
                          <img src=${Producto.img} style="height: 250px;" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title"> ${Producto.marca}</h5>
                            <p class="card-text"> ${Producto.modelo}</p>
                            <p>$${Producto.precio}</p>
                            <a href="#" id="agregar${Producto.id}"><img src="./img/add-to-cart (1).png" class="imgAñadirCarrito"></a>
 </div>
</div>`
divProductos.append(nuevoProducto)

const boton = document.getElementById(`agregar${Producto.id}`)

boton.addEventListener(`click`, ()=>{
  agregarAlCarrito(Producto.id)
})
}})

const agregarAlCarrito = (ProdId) =>{
  const item = stockProductos.find((Prod) => Prod.id === ProdId)
  carrito.push(item)
  actualizarCarrito()
  console.log(carrito)
}

const eliminarDelCarrito = (ProdId) =>{
  const item = carrito.find((Prod) => Prod.Id === ProdId)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  actualizarCarrito()
}

const actualizarCarrito = () =>{
  contenedorCarrito.innerHTML = ""

  carrito.forEach((prod)  => {
    const div = document.createElement(`div`)
    div.className = (`productoEnCarrito`)
    div.innerHTML = `
    <p>${prod.marca} ${prod.modelo}</p>
    <p>$${prod.precio}</p>
    <a href="#" id="eliminarProd" onclick="eliminarDelCarrito(${prod.id})"><img src="./img/eliminar.png" class="imgEliminar"></a>
    <hr>
    `
    contenedorCarrito.appendChild(div)

    localStorage.setItem(`carrito`, JSON.stringify(carrito))
  })
  precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio, 0)

}


