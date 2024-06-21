//import { error } from "console"
import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const usuariosData = JSON.parse(fileUsuarios)

const router = Router()

router.post('/registrarUsuario', (req, res)=>{
    const usuario = req.body.usuario
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const pass = req.body.pass
    const email = req.body.email
    const telefono = req.body.telefono

    const usuarioExistente = usuariosData.find(e => e.usuario === usuario || e.email === email)

    if (usuarioExistente){
        return res.status(400).json({ error: 'El usuario o el email ya existe' })
    }

    const id = usuariosData[usuariosData.length -1].id + 1 

    const registrarUsuario = {
        id,
        usuario,
        nombre,
        apellido,
        pass,
        email,
        telefono
    }

    usuariosData.push(registrarUsuario)

    try{
        writeFile('./data/usuarios.json', JSON.stringify(usuariosData,null,2))
        res.status(200).json(registrarUsuario)
    }catch(error){
        res.sendStatus(400)
    }

})

router.delete('/eliminarUsuario/:id', async (req, res) =>{
    const id = req.params.id

    const usuarioIndex = usuariosData.findIndex(user => user.id == id)

    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' })
    }

    usuariosData.splice(usuarioIndex, 1)

    try {
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
        res.status(200).json({ message: 'Usuario eliminado correctamente.' })
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar los datos.' })
    }
})


router.put('/modificarUsuario/:id', async (req, res) => {
    const id = req.params.id;
    const { usuario, nombre, apellido, pass, email, telefono } = req.body

    const usuarioIndex = usuariosData.findIndex(user => user.id == id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const usuarioExistente = usuariosData.find(e => 
        (e.usuario === usuario || e.email === email) && e.id != id
    )

    if (usuarioExistente) {
        return res.status(400).json({ error: 'El nombre de usuario o el email ya existe.' })
    }
    
    // Actualizar los datos del usuario
    usuariosData[usuarioIndex] = {
        ...usuariosData[usuarioIndex],
        usuario,
        nombre,
        apellido,
        pass,
        email,
        telefono
    };

    try {
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2));
        res.status(200).json({ message: 'Usuario modificado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar los datos.' });
    }
})






/*router.get('/todosUsuarios', (req,res)=>{

    res.status(200).json({saludo: "prueba de que se conectaaaa"})
})*/


export default router