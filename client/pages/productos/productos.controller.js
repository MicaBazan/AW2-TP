import { API } from "../../api/api.js"
import { products } from "../../components/products.js"
console.log(API)



window.addEventListener('load', async function(){
    const contenedorProductos = document.getElementById('contenedor-productos')

    function renderProducts(data) {
        contenedorProductos.innerHTML = ''
        data.forEach(producto => {
            const productHTML = products(producto.nombre, producto.descripcion, producto.imagen, producto.precio);
            contenedorProductos.innerHTML += productHTML;
        });
        addEventListenersToButtons();
    }

    // Función para agregar eventos a los botones
    function addEventListenersToButtons() {
        const buttons = document.querySelectorAll('[data-nombre]')
        buttons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const nombreProducto = event.target.getAttribute('data-nombre')
                try {
                    const res = await fetch('http://localhost:3000/carrito/agregar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ nombre: nombreProducto })
                    });
                    const result = await res.json();
                    if (res.ok) {
                        mostrarNotification('Producto agregado al carrito', 'success')
                    } else {
                        mostrarNotification('Error al agregar producto al carrito', 'error')
                    }
                } catch (error) {
                    mostrarNotification('Error al agregar producto al carrito', 'error')
                }
            });
        });
    }

    try {
        const res = await fetch(`${API}/productos/mostrarTodo`)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        const data = await res.json()
        renderProducts(data);
    } catch (error) {
        console.error('Error al cargar productos:', error)
    }

    const btnFiltrar = document.getElementById('btnFiltrar')
    const selectCategoria = document.getElementById('selectCategoria')

    btnFiltrar.addEventListener('click', async () => {
        const categoriaSeleccionada = selectCategoria.value
        try {
            let res;
            if(categoriaSeleccionada === 'Todos'){
                res = await fetch(`${API}/productos/mostrarTodo`)
            } else {
                res = await fetch(`${API}/productos/filtrarProductosCategoria/${categoriaSeleccionada}`)
            }
            const data = await res.json();
            renderProducts(data);
        } catch (error) {
            console.error('Error al cargar productos:', error)
        }
    });
});


function mostrarNotification(message, type){
    const container = document.getElementById('notification-container')
    const notification = document.createElement('div')

    let bgColor

    if (type === 'success') {
        bgColor = 'bg-green-500'
    } else if (type === 'error') {
        bgColor = 'bg-red-500'
    }

    notification.className = `p-4 mb-2 text-white rounded ${bgColor}`
    notification.innerText = message;

    container.appendChild(notification);


    setTimeout(() => {
        notification.remove();
    }, 3000);
}

