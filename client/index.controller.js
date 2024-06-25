import { API } from "./api/api.js"
console.log(API)
const formLogIn = document.getElementById("logInForm")
const error = document.getElementById("error")

formLogIn.addEventListener('submit',async (e)=>{
    e.preventDefault()
    try {
        await logIn();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        error.textContent = "Error al conectar con el servidor";
    }
})

const logIn = async()=>{
    /*Inputs del usuario*/
    const email = document.getElementById("email").value
    const pass = document.getElementById("pass").value

    try {
        const res = await fetch(`${API}/usuarios/login`, {
            method: 'POST',
            body: JSON.stringify({email, pass}),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        if(data.estado){
            console.log(data)

            if(data.rol === 'admin'){
                window.location.href = "./pages/admin/index.html"
            }
            else if(data.rol === 'usuario'){
                window.location.href = './pages/usuario/index.html'
            }
            else{
                error.textContent = "Rol de usuario desconocido"
            }

            sessionStorage.setItem('email', JSON.stringify(data))
        }
        else{
            error.textContent = "Error al encontrar al usuario"
        }
        
    } catch (error) {
        console.error('error al realizar la solicitud:', error)
        error.textContent = "Error al conectarse con el servidor"
    }
    
}