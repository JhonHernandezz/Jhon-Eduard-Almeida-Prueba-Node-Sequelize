import { Productos } from "../Models/productos.js";

export class instProductos {
    static async getAllProductos(req, res){
        try {
            let respuesta = await Productos.findAll()
            return res.status(200).send({ status: 200, message: respuesta });  
        } catch (error) {
            return res.status(200).send({ status: 200, message: error.message });  
        }
    }

    static async getProductos(req, res){
        let id = req.params.id

        try {
            let respuesta = await Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!respuesta) {
                return ('Este producto no existe')
            }

            return res.status(200).send({ status: 200, message: respuesta }); 
        } catch (error) {
            return res.status(200).send({ status: 200, message: error.message }); 
        }
    }

    static async postProductos(req, res){
        let data = req.body

        try {

            let respuesta = await Productos.create(data)
            return res.status(200).send({ status: 200, message: 'Producto agregado exitosamente' }); 

        } catch (error) {
            return res.status(200).send({ status: 200, message: error.errors[0].message }); 
        }
    }

    static async putProductos(req, res){
        let data = req.body
        let id = req.params.id

        try {

            let consulta = await Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return ('Este producto no existe')
            }

            let respuesta = await Productos.update(data, {
                where: {
                    id: id
                }
            })

            return res.status(200).send({ status: 200, message: 'Producto actualizado exitosamente' }); 

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }

    static async deleteProductos(req, res){
        let id = req.params.id

        try {

            let consulta = await Productos.findOne({
                where: {
                    id: id
                }
            })

            if (!consulta) {
                return ('Este producto no existe')
            }

            let respuesta = await Productos.destroy({
                where: {
                    id: id
                }
            })
            
            return res.status(200).send({ status: 200, message: 'Producto elimado exitosamente' }); 

        } catch (error) {
            return res.status(200).send({ status: 200, message: error }); 
        }
    }
} 