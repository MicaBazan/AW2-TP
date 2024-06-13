import { error } from "console"
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







export default router