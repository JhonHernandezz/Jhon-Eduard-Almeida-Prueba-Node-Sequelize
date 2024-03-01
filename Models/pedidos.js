import { DATE, DataTypes, Model } from "sequelize";

import { Con } from "../Controllers/InstCon.js";

let db = await Con()

export class Pedidos extends Model{}

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