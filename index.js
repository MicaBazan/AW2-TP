import express from 'express'
import categoriaRouter from './routes/categorias.routes.js'
import productoRouter from './routes/productos.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'

const app = express()

app.use(express.json())