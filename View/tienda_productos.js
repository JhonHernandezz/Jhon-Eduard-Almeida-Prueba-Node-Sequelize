import { Router } from "express";

import { instTiendaProductos } from "../Controllers/instTiendaProductos.js";
import { limit } from "../Helpers/limit/limit.js";

let tiendaProductosStorage = Router()

tiendaProductosStorage.get('/', limit(), instTiendaProductos.getAllTiendaPro)
tiendaProductosStorage.get('/:id', limit(), instTiendaProductos.getTiendaPro)

tiendaProductosStorage.get('/api/catalogo/:id_tienda', limit(), instTiendaProductos.getProductosTi)

tiendaProductosStorage.post('/', instTiendaProductos.postTiendaPro)
tiendaProductosStorage.put('/:id', instTiendaProductos.putTiendaPro)
tiendaProductosStorage.delete('/:id', instTiendaProductos.deleteTiendaPro)

export default tiendaProductosStorage