import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileOrdenes = await readFile('./data/ordenes.json', 'utf-8')
const ordenesData = JSON.parse(fileOrdenes)

const router = Router()









export default router