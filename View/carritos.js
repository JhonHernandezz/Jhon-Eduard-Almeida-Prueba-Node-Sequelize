import { Router } from "express";

import { instCarritos } from "../Controllers/instCarrito.js"; 
import { limit } from "../Helpers/limit/limit.js";

let carritoStorage = Router()

carritoStorage.get('/', limit(), instCarritos.getAllCar)
carritoStorage.post('/', instCarritos.postCar)
carritoStorage.put('/:id', instCarritos.putCar)
carritoStorage.delete('/:id', instCarritos.deleteCar)

export default carritoStorage