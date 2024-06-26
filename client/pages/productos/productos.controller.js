import { API } from "../../api/api.js"
import { products } from "../../components/products.js"
console.log(API)

//PROBANDO
/*
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


document.addEventListener('DOMContentLoaded', function(){
    const botones = document.querySelectorAll('button[name="cargar-carrito"]')

    botones.forEach(boton =>{
        boton.addEventListener('click', async function(){
            const nombreProducto = this.getAttribute('data-nombre').value

            try{
                const res = await fetch(`${API}/carrito/agregar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({nombre: nombreProducto})
                })

                const result = await res.json()

                if(res.ok){
                    alert(result.mensaje)
                }
                else{
                    alert('Error: ' + result.mensaje)
                }
            }
            catch(error){
                console.error('Error al agregar producto al carro:', error)
                alert('Error al agregar producto al carro')
            }
        })
    })
})
*/
//FIN PROBADA !!!!!

// INICIO PRUEBA FUNCIONA PERO NO AGREGAR CARRO

window.addEventListener('load', async function(){
    const contenedorProductos = document.getElementById('contenedor-productos')

    // Función para renderizar productos
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
                        console.log('Producto agregado al carrito:', result)
                    } else {
                        console.error('Error al agregar producto al carrito:', result)
                    }
                } catch (error) {
                    console.error('Error al agregar producto al carrito:', error)
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

//PRUEBA FIN


/*
async function cargarProductos() {
    try {
        console.log('Cargando productos...');
        const res = await fetch(`${API}/productos/mostrarTodo`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Datos recibidos:', data);

        const contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos productos

        data.forEach(producto => {
            contenedorProductos.innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio);
        });

        console.log('Productos renderizados correctamente');
        agregarEventListeners();
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function agregarEventListeners() {
    const botones = document.querySelectorAll('button[name="cargar-carrito"]');

    botones.forEach(boton => {
        boton.addEventListener('click', async function () {
            const nombre = this.getAttribute('data-nombre');

            try {
                const res = await fetch(`${API}/carrito/agregar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre }) // Asegúrate de que el cuerpo de la solicitud es JSON
                });

                const result = await res.json();

                if (res.ok) {
                    alert(result.mensaje);
                } else {
                    alert('Error: ' + result.mensaje);
                }
            } catch (error) {
                console.error('Error al agregar producto al carro:', error);
                alert('Error al agregar producto al carro');
            }
        });
    });
}



window.addEventListener('load', function () {
    const btnFiltrar = document.getElementById('btnFiltrar');
    const selectCategoria = document.getElementById('selectCategoria');
    const contenedorProductos = document.getElementById('contenedor-productos');

    btnFiltrar.addEventListener('submit', async function (event) {
        event.preventDefault();
        const categoriaSeleccionada = selectCategoria.value;

        try {
            let res;
            if (categoriaSeleccionada === 'Todos') {
                res = await fetch(`${API}/productos/mostrarTodo`);
            } else {
                res = await fetch(`${API}/productos/filtrarProductosCategoria/${categoriaSeleccionada}`);
            }

            const data = await res.json();

            contenedorProductos.innerHTML = '';

            data.forEach(producto => {
                contenedorProductos.innerHTML += products(producto.nombre, producto.descripcion, producto.imagen, producto.precio);
            });

            // Añadir event listeners a los botones después de renderizar los productos filtrados
            agregarEventListeners();
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    });
});

window.addEventListener('load', cargarProductos);
*/


/*
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