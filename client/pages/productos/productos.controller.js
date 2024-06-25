import { API } from "../../api/api.js"
import { products } from "../../components/products.js"
console.log(API)

window.addEventListener('load', async function(){
    try {
        const res = await fetch(`${API}/productos/mostrarTodo`)

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json()

        console.log(data)

        data.forEach(producto => {
            document.getElementById('contenedor-productos').innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio)
        });

    } catch (error) {
        console.error('Error al cargar productos:', error)
    }

})