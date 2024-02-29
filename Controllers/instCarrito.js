import { Carritos } from "../Models/carrito.js"; 

export class instCarritos {
    static async getAllCar(req, res){ 
        let respuesta = await Carritos.getAllCarrito();
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async postCar(req, res){ 
        await Carritos.sync()
        let respuesta = await Carritos.postCarrito(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async putCar(req, res){ 
        let respuesta = await Carritos.putCarrito(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }

    static async deleteCar(req, res){ 
        let respuesta = await Carritos.deleteCarrito(req);
        return res.status(200).send({ status: 200, message: respuesta });  
    }
} 