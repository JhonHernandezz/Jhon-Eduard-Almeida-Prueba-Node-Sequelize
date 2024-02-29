import { DataTypes, Model, Sequelize } from "sequelize"

import { Con } from "../Controllers/InstCon.js"
import { Productos } from "./productos.js"
import { Tiendas } from "./tiendas.js"
import { Promociones } from "./promociones.js"

let db = await Con()

export class Tienda_Productos extends Model {
    static async getAllTiendaProductos(){
        try {
            let respuesta = await Tienda_Productos.findAll()
            return respuesta
        } catch (error) {
            return error.message
        }
    }
    
    static async getTiendaProductos(req){
        let id = req.params.id

        try {
            let respuesta = await Tienda_Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!respuesta) {
                return ('Este registro no existe')
            }

            return respuesta
        } catch (error) {
            return error.message
        }
    }


    static async getProductosTienda(req) {

        let id = parseInt(req.params.id_tienda)

        try {

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

            return newData

        } catch (error) {
            return error
        }
    }

    static async postTiendaProductos(req){
        let idProducto = req.body.id_producto
        let idTienda = req.body.id_tienda

        let data = req.body

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

            let consultaProductoTienda = await Tienda_Productos.findOne({
                where: {
                    id_tienda: idTienda,
                    id_producto: idProducto
                }
            })

            if (consultaProductoTienda) {
                return ('Este producto ya existe en esta tienda')
            } 

            let respuesta = await Tienda_Productos.create(data)
            return ('Producto agregado en la tienda exitosamente')

        } catch (error) {
            return error.errors[0].message
        }
    }

    static async putTiendaProductos(req){
        let data = req.body
        let id = req.params.id

        try {

            let consulta = await Tienda_Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return ('Este registro no existe')
            }

            let respuesta = await Tienda_Productos.update(data, {
                where: {
                    id: id
                }
            })

            return ('Producto actualizado exitosamente')

        } catch (error) {
            return error
        }
    }

    static async deleteTiendaProductos(req){
        let id = req.params.id

        try {

            let consulta = await Tienda_Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return ('Este producto no existe')
            }

            let respuesta = await Tienda_Productos.destroy({
                where: {
                    id: id
                }
            })
            
            return ('Producto eliminado exitosamente')

        } catch (error) {
            return error
        }
    }
}

Tienda_Productos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    compra_maxima: {
        type: DataTypes.DECIMAL(3, 1),
        defaultValue: '1.0',
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El campo compra_maxima es obligatorio'
            },
            is: {
                args: [/^[0-9.]+$/],
                msg: 'El campo compra_maxima debe de ser un string tipo numero'
            }
        }
    },
    valor: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        comment: 'Valor de venta más actual',
        validate: {
            notNull: {
                args: true,
                msg: 'El campo valor es obligatorio'
            }
        }
    },
    id_promocion: {  
        type: DataTypes.MEDIUMINT,
        allowNull: false,
    },
    id_tienda: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El campo id_tienda es obligatorio'
            }
        }
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
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'tiendas_productos'
})

Tienda_Productos.belongsTo(Productos, {
    foreignKey: "id_producto",
    targetKey: "id"
});

Tienda_Productos.belongsTo(Promociones, {
    foreignKey: "id_promocion",
    targetKey: "id"
});