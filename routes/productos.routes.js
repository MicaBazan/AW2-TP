import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productosData = JSON.parse(fileProductos)

const fileCategorias = await readFile('./data/categorias.json', 'utf-8')
const categoriasData = JSON.parse(fileCategorias)

const router = Router()


router.get('/filtrarProductosCategoria/:categoria', (req, res) => {
    
})






export default router