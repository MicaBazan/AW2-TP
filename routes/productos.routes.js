import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

const fileCategorias = await readFile('./data/categorias.json', 'utf-8')
const categoriasData = JSON.parse(fileCategorias)

const router = Router()


router.get('/filtrarProductosCategoria/:categoria', (req, res) => {
    
})


router.post('/registrarProducto', async (req,res)=>{
    const { nombre, idCategoria, precio, descripcion, imagen } = req.body

    const id = productosData[productosData.length -1].id + 1
    
    const categoria = categoriasData.find(e => e.nombre == idCategoria)

    if(!categoria){
        return res.status(400).json({error: 'Categoria no encontrada'})
    }

    const agregarProducto = {
        id,
        nombre,
        categoria: categoria.idCategoria,
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


export default router