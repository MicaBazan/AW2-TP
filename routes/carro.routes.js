import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import axios from 'axios'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

let carro = []
let products = []

const router = Router()


//obtener el carrito
router.get('/', (req,res)=>{
    res.json(carro)
})

//Agregar un producto al carrito
router.post('/agregar', async (req,res)=>{
    const {nombre, cantidad} = req.body

    try {
        const respuesta = await axios.get(`http://localhost:3000/productos/buscarProducto/${nombre}`)
        const producto = respuesta.data

        if(!producto){
            return res.status(400).json({ mensaje: 'producto no encontrado'})
        }

        const productoExiste = carro.find(p => p.id === id)

        if(productoExiste){
            productoExiste.cantidad += cantidad
        }
        else{
            carro.push({id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad})
        }

        res.json(carro)

    } catch (error) {
        res.status(500).json({ message: 'Error fetching product data' })
    }
})

export default router