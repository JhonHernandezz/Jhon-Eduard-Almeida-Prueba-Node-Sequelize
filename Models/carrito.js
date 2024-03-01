import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"
import { Tiendas } from "./tiendas.js"
import { Productos } from "./productos.js"

let db = await Con()

export class Carritos extends Model{
    static async getAllCarrito(){
        try {
            let respuesta = await Carritos.findAll()
            return respuesta
        } catch (error) {
            return error
        }
    }

    static async postCarrito(req){
        let data = req.body
        let idProducto = req.body.id_producto
        let idTienda = req.body.id_tienda

        try {

            if (!idProducto) {
                return ('Falta id_producto')
            } else if(!idTienda) {
                return ('Falta id_tienda')
            }

            let consultaProducto = await Productos.findOne({
                where: {
                    id: idProducto
                }
            })

            if (!consultaProducto) {
                return ('Este producto no existe')
            }

            let consultaTienda = await Tiendas.findOne({
                where: {
                    id: idTienda
                }
            })

            if (!consultaTienda) {
                return ('Esta tienda no existe')
            }
            
            let respuesta = await Carritos.create(data)
            return ('Carrito agregado exitosamente')

        } catch (error) {
            return error
        }
    }

    static async putCarrito(req){
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
                return ('Este registro no existe')
            }

            let consultaTienda = await Tiendas.findOne({
                where: {
                    id: idTienda
                }
            })
            

            if (!consultaTienda) {
                return ('Esta tienda no existe')
            }

            let consultaProducto = await Productos.findOne({
                where: {
                    id: idProducto
                }
            })

            if (!consultaProducto) {
                return ('Este producto no existe')
            }

            let respuesta = await Carritos.update(data, {
                where: {
                    id: id
                }
            })

            return ('Carrito actualizado exitosamente')

        } catch (error) {
            return error
        }
    }

    static async deleteCarrito(req){
        let id = req.params.id

        try {

            let consulta = await Carritos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return ('Este registro no existe')
            }

            let respuesta = await Carritos.destroy({
                where: {
                    id: id
                }
            })
            
            return ('Carrito eliminado exitosamente')

        } catch (error) {
            return error
        }
    }
}

Carritos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.DECIMAL(9,3),
        defaultValue: 1,
        allowNull: false,
    },
    id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El campo id_producto es obligatorio'
            }
        }
    },
    id_tienda: {  
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El campo id_tienda es obligatorio'
            }
        }
    },
    id_user: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
        comment: 'Cliente Comprador',
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'carritos'
})