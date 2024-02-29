import { DataTypes, Model } from "sequelize";

import { Con } from "../Controllers/InstCon.js";

let db = await Con()

export class Users_clientes extends Model{}

Users_clientes.init({

}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'users_direcciones'
})