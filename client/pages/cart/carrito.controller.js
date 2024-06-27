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


const confirmarOrden = document.getElementById('confirmar-orden')

confirmarOrden.addEventListener('click', async function() {
    const email = sessionStorage.getItem('email')

    if (!email) {
        console.log('Email no encontrado')
        return;
    }

    try {
        const res = await fetch(`${API}/ordenes/cargarOrden`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Orden guardada con éxito:', data)
            alert('Orden confirmada con éxito')
            window.location.href = "../usuario/index.html"
            const eliminarCarrito = await fetch(`${API}/carrito/eliminarCarro`, {
                method: 'DELETE'
            });

            if (eliminarCarrito.ok) {
                console.log('Carrito eliminado con éxito');
                // Redireccionar después de eliminar el carrito
                window.location.href = "../usuario/index.html";
            } else {
                const errorData = await eliminarCarrito.json();
                console.error('Error al eliminar el carrito:', errorData);
                alert('Error al eliminar el carrito, por favor intenta de nuevo');
                // Aquí podrías decidir qué hacer si falla la eliminación del carrito
            }

        } else {
            const errorData = await res.json()
            console.error('Error al guardar la orden:', errorData)
            alert('Error al confirmar la orden, debes llenar el carrito.')
            window.location.href = "../productos/index.html"
            
        }
    } catch (error) {
        console.error('Error de conexión:', error)
        alert('Error de conexión al intentar confirmar la orden')
    }
})