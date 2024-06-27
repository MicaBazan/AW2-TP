import { API } from "../../../api/api.js"

const formGuardarProducto = document.getElementById('formulario-registro-producto')

formGuardarProducto.addEventListener('submit', async function(event){
    event.preventDefault()

    const nombre = document.getElementById('nombre-nuevo').value
    const idCategoria = document.getElementById('selectCategoria-producto').value
    const precio = document.getElementById('precio-nuevo').value
    const descripcion = document.getElementById('descripcion-nueva').value

    try {
        const res = await fetch(`${API}/productos/registrarProducto`, {
            method: 'POST',
            body: JSON.stringify({nombre, idCategoria, precio, descripcion}),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        alert('Producto guardado', data)

        formGuardarProducto.reset()

        
    } catch (error) {
        console.log('Error en el guardado', data)
    }
})

const botonVolver = document.getElementById('volver')

botonVolver.addEventListener('click', ()=>{
    window.location.href = './productos.html'
})
