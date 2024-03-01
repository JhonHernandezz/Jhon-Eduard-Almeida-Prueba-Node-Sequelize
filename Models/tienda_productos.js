import { DataTypes, Model, Sequelize } from "sequelize"

import { Con } from "../Controllers/InstCon.js"
import { Productos } from "./productos.js"
import { Promociones } from "./promociones.js"

let db = await Con()

export class Tienda_Productos extends Model {}

Tienda_Productos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    compra_maxima: {
        type: DataTypes.DECIMAL(3, 1),
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