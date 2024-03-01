import { Router } from "express";

import { instTiendaProductos } from "../Controllers/instTiendaProductos.js";
import { limit } from "../Helpers/limit/limit.js";

let tiendaProductosStorage = Router()

tiendaProductosStorage.get('/', limit(), instTiendaProductos.getAllTiendaProductos)
tiendaProductosStorage.get('/:id', limit(), instTiendaProductos.getTiendaProductos)

tiendaProductosStorage.get('/api/catalogo/:id_tienda', limit(), instTiendaProductos.getProductosTienda)

tiendaProductosStorage.post('/', instTiendaProductos.postTiendaProductos)
tiendaProductosStorage.put('/:id_tienda_productos', instTiendaProductos.putTiendaProductos)
tiendaProductosStorage.delete('/:id', instTiendaProductos.deleteTiendaProductos)

export default tiendaProductosStorage