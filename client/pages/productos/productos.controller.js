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

    btnFiltrar.addEventListener('sumbit', async () =>{
        const categoriaSeleccionada = selectCategoria.value
        
        try {

            if(categoriaSeleccionada == 'Todos'){
                const res = await fetch(`${API}/productos/mostrarTodo`)

                const data = await res.json()

                contenedorProductos.innerHTML = ''

                data.forEach(producto => {
                    contenedorProductos.innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio)
                });
            }
            else{

                const res = await this.fetch(`${API}/productos/filtrarProductosCategoria/${categoriaSeleccionada}`)

                const data = await res.json()

                contenedorProductos.innerHTML = ''

                data.forEach(producto => {
                    contenedorProductos.innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio)
                });
            }

        } catch (error) {
            console.error('Error al cargar productos:', error)
        }
    
    })
})


const agregarCarroElements = document.getElementsByName('cargar-carrito')

agregarCarroElements.forEach(agregarCarro => {
    agregarCarro.addEventListener('click', async () => {
        const nombreProductoElements = document.getElementsByName("nombre-producto")
        
        if (nombreProductoElements.length > 0) {
            const nombre = nombreProductoElements[0].value;

            try {
                const res = await fetch(`${API}/carrito/agregar`, {
                    method: 'POST',
                    body: JSON.stringify({ nombre }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const text = await res.text()
                console.log('Respuesta de texto crudo:', text)

                const data = JSON.parse(text)

                console.log(data)

            } catch (error) {
                console.error('Error al agregar producto al carrito:', error)
            }
        } else {
            console.error('No se encontró ningún elemento')
        }
    });
});




/*
const agregarCarrito = async ()=>{
    const nombre = document.getElementById("nombre-producto").value

    try {
        const res = await fetch(`${API}/carrito/agregar`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre: nombre})
        })

        const data = await res.json()
        console.log(data)

    } catch (error) {
        console.log('Error al llamar al endpoint:', error)
    }
}

const agregarCarro = document.getElementById('cargar-carrito')
        agregarCarrito.addEventListener('click', async (e)=>{
            e.preventDefault()
            try {
                await agregarCarrito()
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
            }
        })*/

// Definición de la función agregarCarrito
/*
async function agregarCarrito(nombreProducto) {
    try {
        const res = await fetch(`${API}/carrito/agregar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombreProducto })
        });

        const data = await res.json();  // Aquí no deberías necesitar JSON.parse
        console.log(data);  // Aquí puedes manejar la respuesta como necesites
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
    }
}
*/