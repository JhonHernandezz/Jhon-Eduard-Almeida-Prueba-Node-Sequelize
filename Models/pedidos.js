import { DATE, DataTypes, Model } from "sequelize";

import { Users_clientes } from './users_clientes.js'

import { Con } from "../Controllers/InstCon.js";
import { Carritos } from "./carrito.js";
import { Pedidos_Estados } from "./pedidos_estados.js";
import { Pedidos_Productos } from "./pedidos_productos.js";

let db = await Con()

export class Pedidos extends Model{
    static async getAllPedidos(){
        try {

            let respuesta = await Pedidos.findAll()
            return respuesta

        } catch (error) {
            return error
        }
    }

    static async getPedidoId(req){
        let id = req.params.id_user

        try {

            let respuesta = await db.query(`
            SELECT 
                t.id as id_tienda, 
                t.nombre, 
                ROUND(SUM(p.valor_final), 0) as valor_total,
                COUNT(DISTINCT p.id) as cantidad,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "id", p.id, 
                        "fecha", p.entrega_fecha, 
                        "estado", "Confirmado", 
                        "valor_final", ROUND(p.valor_final, 0), 
                        "productos", JSON_OBJECT("id_producto", pd.id, 
                        "nombre", pd.nombre, 
                        "presentacion", pd.presentacion, 
                        "cantidad", pp.cantidad, 
                        "valor", pp.valor_unitario, 
                        "valor_promocion", pp.valor_unitario_promocion,
                        "valor_total", ROUND((pp.valor_unitario * pp.cantidad), 0))
                    )
                ) as pedidos
            FROM
                pedidos as p
            INNER JOIN
                tiendas as t ON t.id = p.id_tienda
            LEFT JOIN
                pedidos_productos as pp ON pp.id_pedido = p.id
            LEFT JOIN 
                productos as pd ON pp.id_producto = pd.id
            LEFT JOIN
                carritos as c ON pd.id = c.id_producto 
            WHERE
                p.id_user = ${id}
            GROUP BY
                id_tienda, t.nombre;
            `)

            return respuesta[0]

        } catch (error) {
            return error
        }
    }

    static async postNuevoPedido(req){

        let instrucciones = req.body.instrucciones
        let entrega_fecha = req.body.entrega_fecha
        let id_tienda = parseInt(req.body.id_tienda)
        let id_user = parseInt(req.body.id_user)

        try {

            if (!instrucciones) {
                return ('Falta instrucciones')
            } else if(!entrega_fecha) {
                return ('Falta entrega_fecha')
            } else if(!id_tienda){
                return ('Falta id_tienda')
            }else if(!id_user){
                return ('Falta id_user')
            }

            let consultaExisteCliente = await Users_clientes.findOne({
                where: {
                    id_user: id_user
                }
            })

            if (!consultaExisteCliente) {
                return ('El cliente con este ID no existe')
            } 

            let consultaCarritoCliente = await Carritos.findAll({
                where: {
                    id_user: id_user
                }
            })

            if (consultaCarritoCliente.length === 0) {
                return ('El cliente no tiene pedidos en el carrito')
            }

            let consultaData = await db.query(`
            SELECT 
                c.id as id_carrito, tie.id as id_tienda, tp.id_promocion, c.id_producto, c.id_user, p.nombre, p.presentacion, p.barcode,
                MAX(ud.direccion) as direccion, MAX(ud.distancia) as distancia, c.cantidad as cantidad,
                CASE
                    WHEN MAX(ud.distancia) BETWEEN 0 AND 100 THEN 2000
                    WHEN MAX(ud.distancia) BETWEEN 101 AND 200 THEN 2500
                    WHEN MAX(ud.distancia) BETWEEN 201 AND 400 THEN 3000
                    WHEN MAX(ud.distancia) > 401 THEN 5000
                ELSE 0
                END as valor_envio, tp.valor as valor_producto,
                CASE 
                    WHEN CURRENT_DATE() BETWEEN tprom.inicio AND tprom.fin THEN pm.porcentaje
                    ELSE 0
                END as porcentaje,
                CASE 
                    WHEN CURRENT_DATE() BETWEEN tprom.inicio AND tprom.fin 
                        THEN ROUND((tp.valor * pm.porcentaje / 100), 1)
                    ELSE 0
                END as valor_descuento,
                tprom.inicio, 
                tprom.fin
            FROM 
                carritos as c
            INNER JOIN
                tiendas_productos as tp ON tp.id_tienda = c.id_tienda
            INNER JOIN 
                promociones as pm ON tp.id_promocion = pm.id
            INNER JOIN 
                productos as p ON p.id = c.id_producto
            INNER JOIN 
                users_direcciones as ud ON c.id_user = ud.id_user
            INNER JOIN 
                tiendas_promociones as tprom ON pm.id = tprom.id_promocion
            INNER JOIN 
                tiendas as tie ON tie.id = c.id_tienda
            WHERE 
                c.id_user = ${id_user} AND tie.id = ${id_tienda} AND tp.id_producto = 20
            GROUP BY 
                id_carrito, cantidad, c.id_producto, c.id_user, p.nombre, tp.valor, p.presentacion, p.barcode, tp.id_promocion, tp.id_tienda, pm.porcentaje, tprom.inicio, tprom.fin
            `)

            let valor_productos = 0
            let valor_descuento = 0
            let valor_envio = 0
            let direccion = ''

            for (let item of consultaData[0]) {
                let valor = parseFloat(item.valor_producto).toFixed(0);
                let cantidad = parseFloat(item.cantidad).toFixed(0);
                valor_productos += valor * cantidad;

                let valorDescuento = parseFloat(item.valor_descuento);
                let totalValorDescuentoProducto = valorDescuento * cantidad
                valor_descuento += totalValorDescuentoProducto;

                let valorEnvio = parseFloat(item.valor_envio);
                valor_envio = valorEnvio;

                let dir = item.direccion;
                direccion = dir;
            }
            
            let valor_final = valor_productos - valor_descuento + valor_envio

            let respuestaTransaccion;

            db.transaction(async (t1) => {
                respuestaTransaccion = await Pedidos.create({
                    instrucciones: instrucciones,
                    entrega_fecha: entrega_fecha,
                    valor_productos: valor_productos,
                    valor_descuento: valor_descuento,
                    valor_envio: valor_envio,
                    valor_final: valor_final,
                    direccion: direccion,
                    id_tienda: id_tienda,
                    id_user: id_user
                }, { transaction: t1 })

                let id_pedido = respuestaTransaccion.id;

                for (let data of consultaData[0]) {
                    let cantidad = parseFloat(data.cantidad)
                    let valor_unitario = parseFloat(data.valor_producto)
                    let valor_unitario_promocion = parseFloat(data.valor_descuento)
                    let total_teorico = valor_unitario * cantidad
                    let total_final = valor_unitario_promocion * cantidad
                    let id_promocion = data.id_promocion
                    let id_producto = data.id_producto

                    await Pedidos_Productos.sync()
                    await Pedidos_Productos.create({
                        cantidad: cantidad, 
                        valor_unitario: valor_unitario,
                        valor_unitario_promocion: valor_unitario_promocion,
                        total_teorico: total_teorico,
                        total_final: total_final,
                        id_promocion: id_promocion,
                        id_producto: id_producto,
                        id_pedido: id_pedido
                    }, { transaction: t1 })
                }

                await Pedidos_Estados.sync()
                await Pedidos_Estados.create({
                    estado: 1,
                    id_pedido: id_pedido,
                    create_at: new Date()
                }, { transaction: t1 })
                
            })

            return ('Pedido creado con éxito');
            
        } catch (error) {
            return error
        }

    }
}

Pedidos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    instrucciones: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notNull: {
                args: true,
                msg: 'El campo instrucciones es obligatorio'
            }
        }
    },
    entrega_fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'El cliente cuando desea que su pedido sea entregado',
        validate: {
            notNull: {
                args: true,
                msg: 'El campo entrega_fecha es obligatorio'
            }
        }
    },
    valor_productos: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false,
    },
    valor_envio: {
        type: DataTypes.DECIMAL(10, 3).UNSIGNED,
        allowNull: false,
    },
    valor_descuento: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false,
        comment: 'Valor producto - Valor promo',
    },
    valor_cupon: {
        type: DataTypes.DECIMAL(11, 3).UNSIGNED,
        allowNull: false,
        defaultValue: '0.000',
        comment: 'Valor descuento por cupón aplicado (tomado del pedido hijo)',
    },
    impuestos: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        comment: '0=No 1=Si',
    },
    valor_impuestos: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        defaultValue: '0.000',
        comment: 'Valor de impuestos de todos los productos -- No tiene en cuenta el valor final',
    },
    valor_final: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.DECIMAL(3, 2),
        comment: 'Calculado con todas las Calificaciones y sus pesos',
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
    direccion: {
        type: DataTypes.STRING(160),
        comment: 'Guardar el String de la dirección del cliente en ese momento. En manual es digitada',
    },
    valor_comision: {
        type: DataTypes.DECIMAL(11, 3),
        allowNull: false,
        defaultValue: '0.000',
        comment: 'Es el valor de la comisión calculado segun la utilidad',
    },
    id_user: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        comment: 'Cliente',
        validate: {
            notNull: {
                args: true,
                msg: 'El campo id_user es obligatorio'
            }
        }
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'pedidos'
})