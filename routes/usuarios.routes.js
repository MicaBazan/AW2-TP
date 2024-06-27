import { error } from "console"
import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const SECRET_KEY = "_AQPsssHV56kFO7ImQL9DPEj5UzCYuLGB8bSAmedv74gLPueV9abm51Ca18rIGJC"

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const usuariosData = JSON.parse(fileUsuarios)

const router = Router()

router.post('/registrarUsuario', (req, res)=>{
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const pass = req.body.pass
    const email = req.body.email
    const telefono = req.body.telefono
    const rol = "usuario"

    const usuarioExistente = usuariosData.find(e => e.email === email)

    if (usuarioExistente){
        return res.status(400).json({ error: 'El email ya se encuentra registrado' })
    }

    const id = usuariosData[usuariosData.length -1].id + 1 


    const hashedPass = bcrypt.hashSync(pass, 8)
    console.log(hashedPass)

    const registrarUsuario = {
        id,
        nombre,
        apellido,
        pass: hashedPass,
        email,
        telefono,
        rol
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
    const {nombre, apellido, pass, email, telefono, rol} = req.body

    const usuarioIndex = usuariosData.findIndex(user => user.id == id)

    if (usuarioIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' })
    }

    const usuarioExistente = usuariosData.find(e => 
        (e.email === email) && e.id != id
    )

    if (usuarioExistente) {
        return res.status(400).json({ error: 'El nombre de usuario o el email ya existe.' })
    }
    
    // Actualizar los datos del usuario
    usuariosData[usuarioIndex] = {
        ...usuariosData[usuarioIndex],
        nombre,
        apellido,
        pass,
        email,
        telefono,
        rol
    };

    try {
        await writeFile('./data/usuarios.json', JSON.stringify(usuariosData, null, 2))
        res.status(200).json({ mensaje: 'Usuario modificado correctamente.' })
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar los datos.' })
    }
})


router.post('/login', (req,res) =>{
    const email = req.body.email
    const pass = req.body.pass

    const result = usuariosData.find(e => e.email === email)

    if(!result){
        return res.status(404).send({estado: false})
    }

    const controlPass = bcrypt.compareSync(pass, result.pass)
    console.log(controlPass)

    if(!controlPass){
        return res.status(401).send({estado:false})
    }

    const rol = result.rol

    const token = jwt.sign({idUsuario: result.id,...result},SECRET_KEY, {expiresIn: 86400})

    try {
        res.status(200).json({ estado: true, token, rol })
    } catch (error) {
        return res.status(500).json({ error: 'Error al ingresar.' })
    }
    

})

router.get('/obtenerUsuario/:id', (req, res)=>{
    const id = req.params.id

    const usuarioEncontrado = usuariosData.find(e=> e.id == id)

    if(!usuarioEncontrado){
        return res.status(400).send({estado: false})
    }

    try {
        res.status(200).json(usuarioEncontrado)
    } catch (error) {
        res.status(500).json({mensaje: 'Error al mostrar al usuario'})
    }
})


export default router