import { error } from "console"
import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

const fileCategorias = await readFile('./data/categorias.json', 'utf-8')
const categoriasData = JSON.parse(fileCategorias)

const router = Router()


router.post('/registrarProducto', async (req,res)=>{
    const { nombre, idCategoria, precio, descripcion, imagen } = req.body

    const id = productosData[productosData.length -1].id + 1
    
    const categoria = categoriasData.find(e => e.nombre == idCategoria)

    if(!categoria){
        return res.status(400).json({error: 'Categoria no encontrada'})
    }

    const nombreM = nombre.toUpperCase()

    const agregarProducto = {
        id,
        nombre : nombreM,
        idCategoria: categoria.idCategoria,
        precio,
        descripcion,
        imagen
    }

    productosData.push(agregarProducto)

    try{
        await writeFile('./data/productos.json', JSON.stringify(productosData,null,2))
        res.status(200).json(agregarProducto)
    }
    catch(error){
        res.sendStatus(400)
    }
})


router.put('/modificarProducto/:id', async (req,res)=>{
    const id = req.params.id
    const { nombre, categoria, precio, descripcion, imagen } = req.body

    const productoIndex = productosData.findIndex(e => e.id == id)

    if(productoIndex === -1) {
        return res.status(400).json({ error: 'Producto no encontrado' })
    }

    const buscarCategoria = categoriasData.find(e => e.nombre == categoria)

    if(!buscarCategoria){
        return res.status(400).json({error: 'Categoria no encontrada'})
    }

    productosData[productoIndex] = {
        ...productosData[productoIndex],
        nombre: nombre.toUpperCase(),
        idCategoria: buscarCategoria.idCategoria,
        precio,
        descripcion,
        imagen
    }

    try{
        await writeFile('./data/productos.json', JSON.stringify(productosData, null, 2))
        res.status(200).json({ mensaje: 'Producto modificado correctamente' })
    }catch(error){
        return res.status(500).json({ error: 'Error al guardar los datos.' })
    }
})

router.get('/mostrarTodo', async (req,res)=>{
    try{
        res.status(200).json(productosData)
    }
    catch(error){
        res.status(500).json({ mensaje: 'Error al mostrar los datos' })
    }
})

router.get('/buscarProducto/:nombre', async (req,res)=>{
    const nombre = req.params.nombre.toUpperCase()

    const productoIndex = productosData.find(e => e.nombre.toUpperCase() === nombre)

    if(productoIndex === -1) {
        return res.status(400).json({ error: 'Producto no encontrado' })
    }

    try {
        res.status(200).json(productoIndex)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al mostrar el producto' })
    }
})

/*
router.get('/buscarProductoId/:id', async (req,res)=>{
    const id = req.params

    const productoIndex = productosData.find(e => e.id === id)

    if(productoIndex === -1) {
        return res.status(400).json({ error: 'Producto no encontrado' })
    }

    try {
        res.status(200).json(productoIndex)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al mostrar el producto' })
    }
})*/


router.delete('/eliminarProducto/:id', async (req,res)=>{
    const id = req.params.id

    const productoIndex = productosData.findIndex(e => e.id == id)

    if(productoIndex === -1){
        return res.status(404).json({ error: 'Producto no encontrado'})
    }

    productosData.splice(productoIndex, 1)

    try {
        await writeFile('./data/productos.json', JSON.stringify(productosData, null, 2))
        res.status(200).json({ message: 'Producto eliminado correctamente.' })
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar los datos.' })
    }
})

router.get('/filtrarProductosCategoria/:categoria', (req, res) => {
    const categoria = req.params.categoria

    const categoriaIndex = categoriasData.find(e => e.nombre === categoria)

    if(!categoriaIndex){
        return res.status(400).json({error: 'Categoria no encontrada'})
    }

    const idCategoria = categoriaIndex.idCategoria

    const productos = productosData.filter(e => e.idCategoria == idCategoria)

    try {
        res.status(200).json(productos)
    } catch (error) {
        return res.status(500).json({ error: 'Error al mostrar los datos.' })
    }
})

export default router