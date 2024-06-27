import { API } from "../../../api/api.js"
import { productosAdmin, products } from "../../../components/products.js"

window.addEventListener('load', async function(){
    const contenedorProductos = document.getElementById('contenedor-productos')

    function renderProducts(data) {
        contenedorProductos.innerHTML = ''
        data.forEach(producto => {
            const productHTML = productosAdmin(producto.nombre, producto.descripcion, producto.imagen, producto.precio)
            contenedorProductos.innerHTML += productHTML
        })
    }

    try {
        const res = await fetch(`${API}/productos/mostrarTodo`)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        renderProducts(data)
    } catch (error) {
        console.error('Error al cargar productos:', error)
    }
})

const botonCerrar = document.getElementById('cerrar-sesion')

botonCerrar.addEventListener('click', ()=>{
    sessionStorage.removeItem('email')
    window.location.href = '../../../index.html'
})