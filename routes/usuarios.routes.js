import { error } from "console"
import e, { Router } from "express"
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


router.delete('/eliminarUsuario/:id', (req, res) =>{
    const id = req.params

    const usuarioIndice = usuariosData.findIndex(e => e.id == id)

    if(usuarioIndice === -1){
        return res.status(400).json({ error: 'Usuario no encontrado' })
    }

    //falta terminar
})

router.put('/modificarUsuario/:id', (req, res) => {
    const id = req.params
    const usuario = req.body.usuario
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const pass = req.body.pass
    const email = req.body.email
    const telefono = req.body.telefono

    const usuarioIndex = usuariosData.findIndex(user => user.id == id)

    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' })
    }

    const usuarioExistente = usuariosData.find(e => 
        (e.usuario === usuario || e.email === email) && e.id != id
    )

    if (usuarioExistente) {
        return res.status(400).json({ error: 'El nombre de usuario o el email ya existe.' })
    }

    // Modificar los campos del usuario
    if (usuario) usuariosData[usuarioIndex].usuario = usuario;
    if (nombre) usuariosData[usuarioIndex].nombre = nombre;
    if (apellido) usuariosData[usuarioIndex].apellido = apellido;
    if (pass) usuariosData[usuarioIndex].pass = pass;
    if (email) usuariosData[usuarioIndex].email = email;
    if (telefono) usuariosData[usuarioIndex].telefono = telefono;

    try {
        fs.writeFileSync('./data/usuarios.json', JSON.stringify(usuariosData, null, 2));
        res.status(200).json(usuariosData[usuarioIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el usuario.' });
    }
})


export default router