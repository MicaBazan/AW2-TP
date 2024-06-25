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

window.addEventListener('load', async function(){
    const btnFiltrar = document.getElementById('btnFiltrar')
    const selectCategoria = document.getElementById('selectCategoria')
    const contenedorProductos = document.getElementById('contenedor-productos')

    btnFiltrar.addEventListener('click', async () =>{
        const categoriaSeleccionada = selectCategoria.value
        
        try {
            const res = await this.fetch(`${API}/productos/filtrarProductosCategoria/${categoriaSeleccionada}`)

            if(!res.ok){
                throw new Error(`HTTP error! estado: ${res.status}`)
            }

            const data = await res.json()

            contenedorProductos.innerHTML = ''

            data.forEach(producto => {
                contenedorProductos.innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio)
            });

        } catch (error) {
            console.error('Error al cargar productos:', error)
        }
    
    })
})