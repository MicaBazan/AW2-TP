import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileCategorias = await readFile('./data/categorias.json', 'utf-8')
const categoriasData = JSON.parse(fileCategorias)

const router = Router()






export default router