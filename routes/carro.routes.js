import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import axios from 'axios'

const fileCarrito = await readFile('./data/carrito.json', 'utf-8')
const carritoData = JSON.parse(fileCarrito)

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

const router = Router()

router.get('/carro', async (req, res)=>{

    

    try {
        res.status(200).json(carritoData)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el carro de compras' })
    }
})

router.post('/agregar', async (req, res) => {
    const {nombre} = req.body;
    const cantidad = 1

    try {
        const respuesta = await axios.get(`http://localhost:3000/productos/buscarProducto/${nombre}`)
        const producto = respuesta.data;

        if (!producto) {
            return res.status(400).json({ mensaje: 'Producto no encontrado', nombre: `${nombre}` })
        }

        const productoExiste = carritoData.find(p => p.id === producto.id)

        if (productoExiste) {
            productoExiste.cantidad += parseInt(cantidad)
            productoExiste.cantidad = parseInt(productoExiste.cantidad)
        } else {
            const nuevoProducto = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: parseInt(cantidad)
            };
            carritoData.push(nuevoProducto)
        }

        await writeFile('./data/carrito.json', JSON.stringify(carritoData, null, 2))

        res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito: carritoData })

    } catch (error) {
        console.error('Error al agregar producto al carro:', error)
        res.status(500).json({ mensaje: 'Error al agregar producto al carro' })
    }
});

router.delete('/eliminar/:nombre', async (req,res)=>{
    const nombre = req.params.nombre
    const cantidad = 1

    const productoExiste = carritoData.findIndex(c => c.nombre === nombre)

    if(productoExiste === -1){
        return res.status(400).json({ error: 'Producto no encontrado' })
    }

    carritoData.splice(productoExiste, 1)

    try {
        await writeFile('./data/carrito.json', JSON.stringify(carritoData, null, 2))
        res.status(200).json(carritoData)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto del carro' })
    }
})


router.delete('/eliminarProducto/:nombre', async (req, res) => {
    const { nombre } = req.params;

    const productoExiste = carritoData.find(c => c.nombre === nombre)

    if (!productoExiste) {
        return res.status(400).json({ error: 'Producto no encontrado' })
    }

    if (productoExiste.cantidad > 0) {
        productoExiste.cantidad -= 1
    }

    try {
        await writeFile('./data/carrito.json', JSON.stringify(carritoData, null, 2))
        res.status(200).json({ mensaje: 'Cantidad reducida del producto en el carrito', carrito: carritoData })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el carrito' })
    }
});


export default router
