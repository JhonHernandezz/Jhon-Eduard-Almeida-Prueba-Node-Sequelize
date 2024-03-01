import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"

let db = await Con()

export class Carritos extends Model{}

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