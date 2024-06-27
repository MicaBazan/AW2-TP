import { API } from "../../../api/api.js";
import { ordenes } from "../../../components/ordenes.js";

window.addEventListener('load', async function() {
    try {
        const res = await fetch(`${API}/ordenes/obtenerOrdenes`);

        if (!res.ok) {
            throw new Error(`Error al obtener las órdenes: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);

        const contenedor = document.getElementById('contenedor-ordenes');
        contenedor.innerHTML = '';

        for (const orden of data) {
            try {
                const usuarioRes = await fetch(`${API}/usuarios/obtenerUsuario/${orden.idUsuario}`);
                if (!usuarioRes.ok) {
                    throw new Error('Error al encontrar el usuario');
                }
                const usuario = await usuarioRes.json();

                // Renderizar la orden con el nombre del usuario obtenido
                contenedor.innerHTML += ordenes(orden.id, orden.total, orden.estado, usuario.nombre, usuario.apellido);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                // Puedes decidir cómo manejar errores al obtener el usuario aquí
            }
        }

    } catch (error) {
        console.error('Error al cargar órdenes:', error);
    }
});



