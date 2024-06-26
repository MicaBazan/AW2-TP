import { API } from '../../api/api.js'
import { carro } from '../../components/cart.js'
console.log(API)


window.addEventListener('load', async function() {
    try {
        const res = await fetch(`${API}/carrito/carro`)

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()

        console.log(data);

        const contenedor = document.getElementById('contenedor-productos-carro')
        let totalGeneral = 0

        data.forEach(producto => {
            const precioTotal = producto.cantidad * producto.precio
            totalGeneral += precioTotal

            contenedor.innerHTML += carro(producto.nombre, producto.cantidad, producto.precio, precioTotal);
        });

        document.getElementById('total-general').textContent = `$${totalGeneral}`

        addEventListenersToButtons()
        
    } catch (error) {
        console.error('Error al cargar productos:', error)
    }
});

function addEventListenersToButtons() {
    const contenedor = document.getElementById('contenedor-productos-carro')

    contenedor.addEventListener('click', async function(event) {
        if (event.target.closest('button[data-nombre]')) {
            const boton = event.target.closest('button[data-nombre]')
            const nombreProducto = boton.getAttribute('data-nombre')
            let cantidadProducto =  parseInt(boton.getAttribute('data-cantidad'))
            const cantidadElemento = boton.closest('li').querySelector('.cantidad-producto')
            const precioTotalElemento = boton.closest('li').querySelector('.precio-total-producto')

            console.log('Producto a eliminar:', nombreProducto)
            try {
                const res = await fetch(`${API}/carrito/eliminarProducto/${nombreProducto}`, {
                    method: 'DELETE'
                });
                const resultado = await res.json()

                if(res.ok){
                    cantidadProducto--

                    if (cantidadProducto <= 0) {
                        console.log('Producto eliminado')
                        await fetch(`${API}/carrito/eliminar/${nombreProducto}`, {
                            method: 'DELETE'
                        })
                        boton.closest('li').remove();
                    } else {
                        console.log('Actualizando cantidad del producto')
                        cantidadElemento.textContent = `Cantidad: ${cantidadProducto}`
                        const precioUnitario = parseFloat(boton.closest('li').querySelector('.precio-unitario').textContent.split('$')[1])
                        const nuevoPrecioTotal = cantidadProducto * precioUnitario
                        precioTotalElemento.textContent = `Precio total: $${nuevoPrecioTotal}`
                        boton.setAttribute('data-cantidad', cantidadProducto)
                    }

                    actualizarTotalGeneral()
                }
                

            } catch (error) {
                console.log('Error al eliminar el producto:', error)
            }
        }
    });
}

function actualizarTotalGeneral() {
    const productos = document.querySelectorAll('#contenedor-productos-carro li')
    let totalGeneral = 0

    productos.forEach(producto => {
        const cantidad = parseInt(producto.querySelector('.cantidad-producto').textContent.split(': ')[1])
        const precioUnitario = parseFloat(producto.querySelector('.precio-unitario').textContent.split('$')[1])
        totalGeneral += cantidad * precioUnitario
    });

    document.getElementById('total-general').textContent = `$${totalGeneral}`
}
