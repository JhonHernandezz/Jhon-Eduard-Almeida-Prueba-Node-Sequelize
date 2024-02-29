import rateLimit from "express-rate-limit";

export function limit(){
    return rateLimit(
        {
            windowMs: 10 * 1000, 
            max: 5,
            message: (req, res) => {
                return res.send({status: 200, message: 'Limite de peticiones alcanzado, espera un momento :)'})
            }
        }
    )
}