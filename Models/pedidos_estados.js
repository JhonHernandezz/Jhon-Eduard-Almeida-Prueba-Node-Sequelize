import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"

let db = await Con()

export class Pedidos_Estados extends Model{}

Pedidos_Estados.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    estado: {  
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        defaultValue: 1,
        comment: '1=Creado 2=Confirmado 3=Enviado 4=Finalizado 25=Rechazado 26=Cancelado Tienda 27=Cancelado Cliente 31=Reclamo 32=Reclamo Finalizado 33=Soporte 34=Soporte Finalizado'
    },
    id_pedido: {  
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'pedidos_estados'
})