import { Carritos } from "../Models/carrito.js"; 
import { Productos } from "../Models/productos.js";
import { Tiendas } from "../Models/tiendas.js";

export class instCarritos {
    static async getAllCarrito(req, res){
        try {
            let respuesta = await Carritos.findAll()
            return res.status(200).send({ status: 200, message: respuesta});  
        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 

        }
    }

    static async postCarrito(req, res){
        let data = req.body
        let idProducto = req.body.id_producto
        let idTienda = req.body.id_tienda

        try {

            if (!idProducto) {
                return res.status(200).send({ status: 200, message: 'Falta id_producto'});  
            } else if(!idTienda) {
                return res.status(200).send({ status: 200, message: 'Falta id_tienda'});  
            }

            let consultaProducto = await Productos.findOne({
                where: {
                    id: idProducto
                }
            })

            if (!consultaProducto) {
                return res.status(200).send({ status: 200, message: 'Este producto no existe'});  
            }

            let consultaTienda = await Tiendas.findOne({
                where: {
                    id: idTienda
                }
            })

            if (!consultaTienda) {
                return res.status(200).send({ status: 200, message: 'Esta tienda no existe'});  
            }
            
            let respuesta = await Carritos.create(data)
            return res.status(200).send({ status: 200, message: 'Carrito agregado exitosamente'});  


        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }

    static async putCarrito(req, res){
        let data = req.body
        let id = req.params.id
        
        let idProducto = req.body.id_producto
        let idTienda = req.body.id_tienda

        try {

            let consulta = await Carritos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return res.status(200).send({ status: 200, message: 'El carrito con este ID no existe'});  
            }

            let consultaTienda = await Tiendas.findOne({
                where: {
                    id: idTienda
                }
            })

            if (!consultaTienda) {
                return res.status(200).send({ status: 200, message: 'Esta tienda no existe'});  
            }

            let consultaProducto = await Productos.findOne({
                where: {
                    id: idProducto
                }
            })

            if (!consultaProducto) {
                return res.status(200).send({ status: 200, message: 'Este producto no existe'});  
            }

            let respuesta = await Carritos.update(data, {
                where: {
                    id: id
                }
            })

            return res.status(200).send({ status: 200, message: 'Carrito actualizado exitosamente'});  

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }

    static async deleteCarrito(req, res){
        let id = req.params.id

        try {

            let consulta = await Carritos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return res.status(200).send({ status: 200, message: 'El carrito con este ID no existe'});  
            }

            let respuesta = await Carritos.destroy({
                where: {
                    id: id
                }
            })
            
            return res.status(200).send({ status: 200, message: 'Carrito eliminado exitosamente'});  

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }
} 