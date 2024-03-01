import { Router } from "express";

import { limit } from "../Helpers/limit/limit.js";

import { instPedidos } from "../Controllers/instPedidos.js";

let pedidoStorage = Router()

pedidoStorage.get('/', limit(), instPedidos.getAllPedidos)
pedidoStorage.get('/api/pedidos/:id_user', limit(), instPedidos.getPedidoId)

pedidoStorage.post('/', instPedidos.postNuevoPedido)

export default pedidoStorage