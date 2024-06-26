import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import axios from 'axios'


const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const usuariosData = JSON.parse(fileUsuarios)

const fileOrdenes = await readFile('./data/ordenes.json', 'utf-8')
const ordenesData = JSON.parse(fileOrdenes)

const fileCarrito = await readFile('./data/carrito.json', 'utf-8')
const carritoData = JSON.parse(fileCarrito)

const router = Router()


router.post('/cargarOrden', async (req,res)=>{
    const email = req.body.email

    const user = usuariosData.find(e => e.email === email)
    if(!user){
        return res.status(404).json({error: 'Usuario no encontrado'})
    }
    const userId = user.id

    try {
        const respuestaCarrito = await axios.get(`http://localhost:3000/carrito/carro`)

        if(!respuestaCarrito.data || respuestaCarrito.data.length === 0){
            return res.status(400).json({mensaje: 'Carrito vacio'})
        }

        const total = respuestaCarrito.data.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
        
        let idOrden = 1

        if(ordenesData.length > 0){
            idOrden = ordenesData[ordenesData.length - 1].id + 1
        }

        const agregarOrden = {
            id: idOrden,
            idUsuario: userId,
            fecha: new Date().toISOString(),
            productos: respuestaCarrito.data.map(producto => ({
                idProducto: producto.id,
                cant: producto.cantidad
            })),
            total: total,
            estado: "Pendiente"
        }

        ordenesData.push(agregarOrden)

        await writeFile('./data/ordenes.json', JSON.stringify(ordenesData, null, 2))
        res.status(200).json(agregarOrden)

    } catch (error) {
        console.error('Error al procesar la orden:', error)
        res.sendStatus(500)
    }
})

router.get('/obtenerOrdenes', async (req, res) =>{
    try {
        res.status(200).json(ordenesData)
    } catch (error) {
        res.status(500).json({mensaje: 'Error al obtener las ordenes de compra'})
    }
})

router.put('/modificarOrden/:id', async (req, res) =>{
    const id = req.params.id
    const {estado} = req.body

    const ordenEncontrada = ordenesData.findIndex(orden => orden.id == id)
    if(ordenEncontrada === -1){
        return res.status(400).json('Orden no encontrada')
    }

    ordenesData[ordenEncontrada] = {
        ...ordenesData[ordenEncontrada],
        id: ordenEncontrada.id,
        idUsuario: ordenEncontrada.idUsuario,
        fecha: ordenEncontrada.fecha,
        productos: ordenEncontrada.productos,
        total: ordenEncontrada.total,
        estado: estado
    }

    try {
        await writeFile('/data/ordenes.json', JSON.stringify(ordenesData, null, 2))
        res.status(200).json('Orden actualizada correctamente')
    } catch (error) {
        res.status(500).json('Error al actualizar el estado de la orden')
    }
})

export default router