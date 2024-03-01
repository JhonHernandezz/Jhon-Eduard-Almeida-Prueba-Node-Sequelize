import { Productos } from "../Models/productos.js";
import { Tienda_Productos } from "../Models/tienda_productos.js"; 
import { Tiendas } from "../Models/tiendas.js";

import { Con } from "./InstCon.js";

let db = await Con()

export class instTiendaProductos {
    static async getAllTiendaProductos(req, res){
        try {
            let respuesta = await Tienda_Productos.findAll()
            return res.status(200).send({ status: 200, message: respuesta }); 
        } catch (error) {
            return res.status(200).send({ status: 200, message: error.message }); 
        }
    }

    static async getTiendaProductos(req, res){
        let id = req.params.id

        try {
            let respuesta = await Tienda_Productos.findOne({
                where: {
                    id_producto: id
                }
            })

            if (!respuesta) {
                return res.status(200).send({ status: 200, message: 'Este registro de producto no existe en esta tienda' }); 
            }

            return res.status(200).send({ status: 200, message: respuesta }); 

        } catch (error) {
            return res.status(200).send({ status: 200, message: error.message }); 
        }
    }


    static async getProductosTienda(req, res) {

        let id = parseInt(req.params.id_tienda)

        try {

            let consultaTienda = await Tienda_Productos.findOne({
                where: {
                    id_tienda: id
                }
            })

            if (!consultaTienda) {
                return res.status(200).send({ status: 200, message: 'Esta tienda no existe' }); 
            }


            let data = await db.query(`
            SELECT 
                p.id as id_producto, 
                tp.id_tienda as id_tienda, 
                p.nombre, p.presentacion, 
                p.barcode, valor, 
                JSON_OBJECT("porcentaje", prom.porcentaje, "id_promocion", prom.id, "nombre", prom.nombre, "valor_promocion", (tp.valor - (tp.valor * prom.porcentaje / 100))) as promocion 
            FROM 
                productos as p 
            INNER JOIN 
                tiendas_productos as tp ON p.id = tp.id_producto 
            INNER JOIN 
                tiendas as t ON tp.id_tienda = t.id 
            INNER JOIN 
                tiendas_promociones as tpm ON t.id = tpm.id_tienda
            INNER JOIN 
                promociones as prom ON tpm.id_promocion = prom.id 
            WHERE 
                tp.id_tienda = ${id}
                AND tpm.estado = 1
                AND CURDATE() BETWEEN tpm.inicio AND tpm.fin
            `)

            if (data[0].length == '') {
                return res.status(200).send({ status: 200, message: 'Datos no encontrados, recuerde que la tienda se filtra por la fecha actual' }); 
            }

            let newData = data[0].map(value => { 
                return {
                    id_producto: value.id_producto,
                    id_tienda: value.id_tienda,
                    nombre: value.nombre,
                    presentacion: value.presentacion,
                    barcode: value.barcode,
                    valor: Math.trunc( value.valor),
                    promocion: {
                        id_promocion: value.promocion.id_promocion,
                        nombre: value.promocion.nombre,
                        porcentaje: value.promocion.porcentaje,
                        valor_promocion: value.promocion.valor_promocion
                    }
                }
            })

            return res.status(200).send({ status: 200, message: 'consultado correctamente', data: newData });  

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }

    static async postTiendaProductos(req, res){
        let idProducto = req.body.id_producto
        let idTienda = req.body.id_tienda

        let data = req.body

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

            let respuesta = await Tienda_Productos.create(data)
            return res.status(200).send({ status: 200, message: 'Producto agregado en la tienda exitosamente'}); 

        } catch (error) {
            return res.status(200).send({ status: 200, message: error.errors[0].message}); 
        }
    }

    static async putTiendaProductos(req, res){
        let data = req.body
        let id = req.params.id_tienda_productos

        try {

            let consulta = await Tienda_Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return res.status(200).send({ status: 200, message: 'Este registro no existe'});  
            }

            let respuesta = await Tienda_Productos.update(data, {
                where: {
                    id: id
                }
            })

            return res.status(200).send({ status: 200, message: 'Registro actualizado exitosamente'});  

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }

    static async deleteTiendaProductos(req, res){
        let id = req.params.id

        try {

            let consulta = await Tienda_Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return res.status(200).send({ status: 200, message: 'Este registro no existe'});  
            }

            let respuesta = await Tienda_Productos.destroy({
                where: {
                    id: id
                }
            })
            
            return res.status(200).send({ status: 200, message: 'Registro elimiado exitosamente'});  

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }
} 