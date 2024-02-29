import dotenv from 'dotenv'
import express from 'express'

import productoStorage from './View/productos.js'
import tiendaProductosStorage from './View/tienda_productos.js'
import carritoStorage from './View/carritos.js'
import pedidoStorage from './View/pedidos.js'

dotenv.config('')

let app = express()
app.use(express.json())

app.use('/productos', productoStorage)
app.use('/tienda_productos', tiendaProductosStorage)
app.use('/carritos', carritoStorage)
app.use('/', pedidoStorage)

let config = JSON.parse(process.env.MY_SERVER)
app.listen(config, () => console.log(`http://${config.hostname}:${config.port}`))