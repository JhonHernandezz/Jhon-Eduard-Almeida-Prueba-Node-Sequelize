import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"

let db = await Con()

export class Pedidos_Productos extends Model{}

Pedidos_Productos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false
    },
    valor_unitario: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false,
        comment: 'Valor en _productos_',
    },
    valor_unitario_promocion: {
        type: DataTypes.DECIMAL(11, 3).UNSIGNED,
        allowNull: false,
        comment: 'Valor en _productos_ si tiene promo _valor_promo_ si no tiene _valor_'
    },
    total_teorico: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false
    },
    total_final: {
        type: DataTypes.DECIMAL(12, 3).UNSIGNED,
        allowNull: false,
        comment: 'Se usa siempre, y es por motivo de si llega a haber promoción',
    },
    id_promocion: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        comment: 'La promoción de como se vendió',
    },
    id_producto: {
        type: DataTypes.INTEGER.UNSIGNED,
        comment: 'Null = Se borró el producto después'
    },
    id_pedido: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'pedidos_productos'
})