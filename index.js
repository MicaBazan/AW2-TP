import express from 'express'
import categoriaRouter from './routes/categorias.routes.js'
import productoRouter from './routes/productos.routes.js'
import usuariosRouter from './routes/usuarios.routes.js'
import ordenesRouter from './routes/ordenes.routes.js'
import carritoRouter from './routes/carro.routes.js'

const app = express()

app.use(express.json())

const port = 3000

app.listen(port, ()=>{
    console.log(`servidor levantado en el puerto ${port}`)
})

app.use('/categorias', categoriaRouter)
app.use('/productos', productoRouter)
app.use('/usuarios', usuariosRouter)
app.use('/ordenes', ordenesRouter)
app.use('/carrito', carritoRouter)
app.use(express.static("./client"))