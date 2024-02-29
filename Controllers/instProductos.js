import { Productos } from "../Models/productos.js";

export class instProductos {
    static async getAllPro(req, res){ 
        let respuesta = await Productos.getAllProductos();
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async getPro(req, res){ 
        let respuesta = await Productos.getProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async postPro(req, res){ 
        await Productos.sync()
        let respuesta = await Productos.postProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async putPro(req, res){ 
        let respuesta = await Productos.putProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async deletePro(req, res){ 
        let respuesta = await Productos.deleteProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }
} 