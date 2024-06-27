import { API } from "../../api/api.js"

const formRegistrarUser = document.getElementById('formulario-registro')

formRegistrarUser.addEventListener('sumbit', async function(){
    const nombre = document.getElementById('nombre-registro').value
    const apellido = document.getElementById('apellido-registro').value
    const email = document.getElementById('email-registro').value
    const telefono = Number(document.getElementById('telefono-registro').value)
    const pass = document.getElementById('pass-registro').value

    try {
        const res = await fetch(`${API}/usuarios/registrarUsuario`, {
            method: 'POST',
            body: JSON.stringify({ nombre, apellido, pass, email, telefono }),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        console.log('Registro exitoso:', data)

    } catch (error) {
        console.log('Error en el registro:', error)
    }
})