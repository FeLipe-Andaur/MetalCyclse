
const botonProducto = document.querySelectorAll(".boton-producto")
const contenedorModal = document.getElementById("modalProductos");
const botonPagar = document.getElementById('btnPagar');
const botonVaciar = document.getElementById('btnVaciar')
const contenedorAlerta = document.getElementById("contenedorAlerta");

let productos = JSON.parse(localStorage.getItem("productos")) || []
let total = Number(localStorage.getItem('precioTotal')) || 0;

botonVaciar.addEventListener('click', () => {
    productos = []
    limpiarHTML()
    localStorage.removeItem('productos')
    localStorage.removeItem('precioTotal')
})



if (JSON.parse(localStorage.getItem("productos"))) {
    JSON.parse(localStorage.getItem("productos")).forEach(producto => {
        const contenedor = document.createElement("div");
        const nombreProducto = document.createElement("p");
        const precioProducto = document.createElement("p");

        contenedor.classList.add("d-flex", "justify-content-between", "w-100");
        nombreProducto.textContent = producto.nombre;
        precioProducto.textContent = producto.precio;

        contenedor.appendChild(nombreProducto);
        contenedor.appendChild(precioProducto);

        contenedorModal.appendChild(contenedor);
    })
    const contenedorPrecio = document.createElement("div")
    contenedorPrecio.classList.add("d-flex", "justify-content-between", 'w-100')

    const parrafoTotalAPagar = document.createElement("p")
    parrafoTotalAPagar.classList.add("fw-medium")
    parrafoTotalAPagar.textContent = "TOTAL A PAGAR"

    totalAPagar = localStorage.getItem('precioTotal');
    const precioTotal = document.createElement("p")
    precioTotal.textContent = totalAPagar

    contenedorPrecio.appendChild(parrafoTotalAPagar)
    contenedorPrecio.appendChild(precioTotal);

    contenedorModal.appendChild(contenedorPrecio)
}



for (let i = 0; i < botonProducto.length; i++) {
    botonProducto[i].addEventListener("click", () => {
        const nombreProducto = botonProducto[i].parentElement.parentElement.parentElement.parentElement.querySelector("h2").textContent
        const precioProducto = botonProducto[i].parentElement.parentElement.parentElement.parentElement.querySelector("p").textContent
        const objetoProducto = { nombre: nombreProducto, precio: precioProducto }
        productos = [...productos, objetoProducto]

        agregarProductosModal()
        localStorage.setItem("productos", JSON.stringify(productos))

    })
}



function limpiarHTML() {
    while (contenedorModal.firstChild) {
        contenedorModal.removeChild(contenedorModal.firstChild);
    }
}

function agregarProductosModal() {
    limpiarHTML()
    alert('Producto agregado')
    let precioUnitario = 0;
    productos.forEach(producto => {
        const contenedor = document.createElement("div");
        const nombreProducto = document.createElement("p");
        const precioProducto = document.createElement("p");

        nombreProducto.textContent = producto.nombre;
        precioProducto.textContent = producto.precio;
        precioUnitario = Number(parseFloat(precioProducto.textContent.replace(/[^\d.-]/g, '')))
        contenedor.classList.add("d-flex", "justify-content-between", "w-100");
        contenedor.appendChild(nombreProducto);
        contenedor.appendChild(precioProducto);

        contenedorModal.appendChild(contenedor);
    })
    total = precioUnitario + total;
    localStorage.setItem('precioTotal', total);


    const contenedorPrecio = document.createElement("div")
    contenedorPrecio.classList.add("d-flex", "justify-content-between", 'w-100')

    const parrafoTotalAPagar = document.createElement("p")
    parrafoTotalAPagar.classList.add("fw-medium")
    parrafoTotalAPagar.textContent = "TOTAL A PAGAR"

    const precioTotal = document.createElement("p")
    precioTotal.textContent = total

    contenedorPrecio.appendChild(parrafoTotalAPagar)
    contenedorPrecio.appendChild(precioTotal)

    contenedorModal.appendChild(contenedorPrecio)
    console.log(total)
}

botonPagar.addEventListener('click', () => {
    if (productos.length === 0) {
        alert('No tienes productos en el carrito')
    } else {
        const divAlerta = document.createElement("div")
        divAlerta.classList.add("alert", "alert-success");
        divAlerta.textContent = "Pagando productos...."
        contenedorAlerta.appendChild(divAlerta)
        limpiarHTML()
        productos = []
        localStorage.removeItem("productos")
        localStorage.removeItem("precioTotal")
        setTimeout(() => {
            contenedorAlerta.removeChild(divAlerta)
        }, 2000)
    }
})

