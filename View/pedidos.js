import { Router } from "express";

import { limit } from "../Helpers/limit/limit.js";

import { instPedidos } from "../Controllers/instPedidos.js";

let pedidoStorage = Router()

pedidoStorage.get('/', limit(), instPedidos.getAllPed)
pedidoStorage.post('/', instPedidos.postPed)

export default pedidoStorage