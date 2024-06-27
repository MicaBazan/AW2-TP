import express from 'express'
import productoRouter from './routes/productos.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'
import ordenesRouter from './routes/ordenes.routes.js'
import cors from 'cors'
import carritoRouter from './routes/carro.routes.js'

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.listen(port, ()=>{
    console.log(`servidor levantado en el puerto ${port}`)
})

app.use('/productos', productoRouter)
app.use('/usuarios', usuariosRouter)
app.use('/ordenes', ordenesRouter)
app.use('/carrito', carritoRouter)
app.use(express.static("./client"))