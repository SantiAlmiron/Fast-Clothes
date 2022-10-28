

let stockProductos = [
  {id: 1, marca: "Nike", modelo: "Jordan", precio: 6000, img: `img/nike-jordan.jpg` },
  {id: 2, marca: "Adidas", modelo: "Forum Low", precio: 4900, img: `img/adidasch.jpg` },
  {id: 3, marca: "Nike", modelo: "Air Force Shadow", precio: 5500, img: `img/nike-air-force-1.jpg` },
  {id: 4, marca: "Nike", modelo: "Air Force World Champions", precio: 5000, img: `img/nike-air-force-1-low.jpg` },
  {id: 5, marca: "Nike", modelo: "Air More Uptempo", precio: 7000, img: `img/nike-air-more.jpg` },
  {id: 6, marca: "Adidas", modelo: "Superstar", precio: 6200, img: `img/adidas-superstar.jpg` },
  {id: 7, marca: "Nike", modelo: "Air Max 97", precio: 6500, img: `img/nike-air-97.jpg` },
  {id: 8, marca: "Nike", modelo: "Huarache", precio: 5200, img: `img/nike-huarache.jpg` },
]


const contenedorCarrito = document.getElementById(`carrito-contenedor`)
const precioTotal = document.getElementById(`precioTotal`)
const botonVaciar = document.getElementById(`vaciar-carrito`)
const botonFinalizar = document.getElementById(`botonFinalizarCompra`)
const contadorCarrito = document.getElementById(`contadorCarrito`)

let carrito = []

botonVaciar.addEventListener(`click`, () => {
  carrito.length = 0
  localStorage.setItem("carrito", JSON.stringify(carrito))
  actualizarCarrito()
  Swal.fire({
    position: 'top-end',
    title: 'El carrito fué vaciado.',
    showConfirmButton: false,
    timer: 1500
  })
})

botonFinalizar.addEventListener(`click`, () => {
  
  (carrito.length === 0) ?   swal.fire({
    title: "El carrito está vacío.",
    icon: "warning",
    confirmButtonColor: "yellow",
    confirmButtonText: "Acepto"
  })  :   swal.fire({
    title: `¡Muchas gracias por su compra! El total es ${precioTotal.innerText}$.`,
    icon: "sucess",
    confirmButtonColor: "green",
    confirmButtonText: "Acepto"
  })  
  carrito.length = 0
  localStorage.setItem("carrito", JSON.stringify(carrito))
  actualizarCarrito()
})


document.addEventListener(`DOMContentLoaded`, ()  =>  {
  if (localStorage.getItem(`carrito`)){
    carrito = JSON.parse(localStorage.getItem(`carrito`))
    actualizarCarrito()
  }
})


let divProductos = document.getElementById("Productos")


function mostrarCatalogo(){
stockProductos.forEach((Producto)=>{
  
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
})
}

let btnMostrarCatalogo = document.getElementById("verCatalogo")
btnMostrarCatalogo.addEventListener("click",()=>{ 
  mostrarCatalogo()
})


const agregarAlCarrito = (ProdId) =>{
  const existe = carrito.some((Prod) => Prod.id === ProdId)
  if(existe) {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'El producto ya se encuentra en el carrito.',
      showConfirmButton: false,
      timer: 1500
    })
  } else{
  const item = stockProductos.find((Prod) => Prod.id === ProdId)
  carrito.push(item)
  console.log(carrito)
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'El producto fue agregado al carrito.',
    showConfirmButton: false,
    timer: 1500
  })
}actualizarCarrito()
}

const actualizarCarrito = () =>{
  contenedorCarrito.innerHTML = ""

  carrito.forEach((prod)  => {
    const div = document.createElement(`div`)
    div.className = (`productoEnCarrito`)
    div.innerHTML = `
    <p>${prod.marca} ${prod.modelo}</p>
    <p>$${prod.precio}</p>
    <a href="#" id="botonEliminar${prod.id}"><img src="./img/eliminar.png" class="imgEliminar"></a>
    <hr>
    `
    contenedorCarrito.appendChild(div)

    localStorage.setItem(`carrito`, JSON.stringify(carrito))
  })
  contadorCarrito.innerText = carrito.length
  
  carrito.forEach((prod, indice)=> {
    document.getElementById(`botonEliminar${prod.id}`).addEventListener("click", (e)=> { 
      carrito.splice(indice, 1)
      localStorage.setItem("carrito", JSON.stringify(carrito))
      actualizarCarrito(carrito)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto fue eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

    })
  }
    )
  
  precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.precio, 0)
}


