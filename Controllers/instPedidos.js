import { Pedidos } from "../Models/pedidos.js";

export class instPedidos { 
    static async getAllPed(req, res){
        let respuesta = await Pedidos.getAllPedidos()
        return res.status(200).send({ status: 200, message: respuesta })
    }

    static async getPedId(req, res){
        let respuesta = await Pedidos.getPedidoId(req)
        return res.status(200).send({ status: 200, message: respuesta })
    }

    static async postPed(req, res){
        let respuesta = await Pedidos.postNuevoPedido(req)
        return res.status(200).send({ status: 200, message: respuesta })
    }
}