import { DataTypes, Model } from "sequelize";

import { Con } from "../Controllers/InstCon.js";

let db = await Con()

export class Productos extends Model {}

Productos.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    estado: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 1,
        allowNull: false,
        comment: '0=Inactivo 1=Activo'
    },
    kit: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
        comment: '0=No 1=Si... Para evaluar disponibilidad, descuentos y otros en productos_kits'
    },
    barcode: {  
        type: DataTypes.STRING(30), 
        allowNull: false,
        unique: {
            args: true,
            msg: 'El campo barcode debe ser único'
        },
        comment: 'Código de barras',
        validate: {
            notNull: {
                args: true,
                msg: 'El campo barcode es obligatorio'
            },
            is: {
                args: [/^[a-zA-Z0-9\s]+$/],
                msg: 'El campo barcode tiene que ser un string'
            }
        }
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: {
            args: true,
            msg: 'El campo nombre debe ser único'
        },
        validate: {
            len: {
                args: [1, 60],
                msg: 'El campo nombre solo se permite de 1 a 60 caracteres'
            },
            notNull: {
                args: true,
                msg: 'El campo nombre es obligatorio'
            },
            is: {
                args: [/^[a-zA-Z0-9\s]+$/],
                msg: 'El campo nombre tiene que ser un string'
            }
        }
    },
    presentacion: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
            len: {
                args: [1, 25],
                msg: 'El campo presentacion solo se permite de 1 a 25 caracteres'
            },
            notNull: {
                args: true,
                msg: 'El campo barcode es obligatorio'
            },
            is: {
                args: [/^[a-zA-Z0-9\s]+$/],
                msg: 'El campo barcode tiene que ser un string'
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING(500),
        defaultValue: null
    },
    foto: {
        type: DataTypes.STRING(120),
        defaultValue: null,
        comment: 'Max 200'
    },
    peso: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        defaultValue: '0.00',
        comment: 'En Kilogramos'
    }
}, {
    sequelize: db,
    createdAt: false,
    updatedAt: false,
    modelName: 'productos'
})