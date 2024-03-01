import { Router } from "express";

import { instCarritos } from "../Controllers/instCarrito.js"; 
import { limit } from "../Helpers/limit/limit.js";

let carritoStorage = Router()

carritoStorage.get('/', limit(), instCarritos.getAllCarrito)
carritoStorage.post('/', instCarritos.postCarrito)
carritoStorage.put('/:id', instCarritos.putCarrito)
carritoStorage.delete('/:id', instCarritos.deleteCarrito)

export default carritoStorage