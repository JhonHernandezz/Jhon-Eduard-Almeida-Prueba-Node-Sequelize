import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"

let db = await Con()

export class Tiendas extends Model{}

Tiendas.init({}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'tiendas'
})