import { Tienda_Productos } from "../Models/tienda_productos.js"; 

export class instTiendaProductos {
    static async getAllTiendaPro(req, res){ 
        let respuesta = await Tienda_Productos.getAllTiendaProductos();
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async getTiendaPro(req, res){ 
        let respuesta = await Tienda_Productos.getTiendaProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async getProductosTi(req, res){ 
        let respuesta = await Tienda_Productos.getProductosTienda(req);
        return res.status(200).send({ status: 200, message: 'consultado correctamente', data: respuesta });  
    }

    static async postTiendaPro(req, res){ 
        await Tienda_Productos.sync()
        let respuesta = await Tienda_Productos.postTiendaProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async putTiendaPro(req, res){ 
        let respuesta = await Tienda_Productos.putTiendaProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async deleteTiendaPro(req, res){ 
        let respuesta = await Tienda_Productos.deleteTiendaProductos(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }
} 