import { DataTypes, Model } from "sequelize"

import { Con } from "../Controllers/InstCon.js"

let db = await Con()

export class Promociones extends Model{}

Promociones.init({
    
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'promociones'
})