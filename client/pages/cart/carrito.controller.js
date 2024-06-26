import { API } from '../../api/api.js'
import { carro } from '../../components/cart.js'
console.log(API)

/*
window.addEventListener('load', async function(){

    try {
        const res = await fetch(`${API}/carrito/carro`)

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json()

        console.log(data)

        data.forEach(producto => {
            document.getElementById('contenedor-productos-carro').innerHTML += carro(producto.nombre, producto.cantidad, producto.precio)
        });

    } catch (error) {
        console.error('Error al cargar productos:', error)
    }
})*/


//probandoo

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

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});



//fin


/*
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const res = await fetch(`${API}/carrito/carro`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);

        const contenedor = document.getElementById('contenedor-productos-carro');

        data.forEach(producto => {
            const productoHTML = carro(producto.nombre, producto.cantidad, producto.precio);
            contenedor.insertAdjacentHTML('beforeend', productoHTML);
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
});*/