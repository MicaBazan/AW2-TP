const botonCerrar = document.getElementById('cerrar-sesion')

botonCerrar.addEventListener('click', ()=>{
    sessionStorage.removeItem('email')
    window.location.href = '../../../index.html'
})