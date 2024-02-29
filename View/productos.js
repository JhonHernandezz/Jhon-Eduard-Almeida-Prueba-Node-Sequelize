import { Router } from "express";

import { instProductos } from "../Controllers/instProductos.js";
import { limit } from "../Helpers/limit/limit.js";

let productoStorage = Router()

productoStorage.get('/', limit(), instProductos.getAllPro)
productoStorage.get('/:id', limit(), instProductos.getPro)
productoStorage.post('/', instProductos.postPro)
productoStorage.put('/:id', instProductos.putPro)
productoStorage.delete('/:id', instProductos.deletePro)

export default productoStorage