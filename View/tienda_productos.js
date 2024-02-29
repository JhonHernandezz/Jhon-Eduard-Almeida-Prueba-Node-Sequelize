import { Router } from "express";

import { instTiendaProductos } from "../Controllers/instTiendaProductos.js";

let tiendaProductosStorage = Router()

tiendaProductosStorage.get('/', instTiendaProductos.getAllTiendaPro)
tiendaProductosStorage.get('/:id', instTiendaProductos.getTiendaPro)

tiendaProductosStorage.get('/api/catalogo/:id_tienda', instTiendaProductos.getProductosTi)

tiendaProductosStorage.post('/', instTiendaProductos.postTiendaPro)
tiendaProductosStorage.put('/:id', instTiendaProductos.putTiendaPro)
tiendaProductosStorage.delete('/:id', instTiendaProductos.deleteTiendaPro)

export default tiendaProductosStorage