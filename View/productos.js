import { Router } from "express";

import { instProductos } from "../Controllers/instProductos.js";
import { limit } from "../Helpers/limit/limit.js";

let productoStorage = Router()

productoStorage.get('/', limit(), instProductos.getAllProductos)
productoStorage.get('/:id', limit(), instProductos.getProductos)
productoStorage.post('/', instProductos.postProductos)
productoStorage.put('/:id', instProductos.putProductos)
productoStorage.delete('/:id', instProductos.deleteProductos)

export default productoStorage