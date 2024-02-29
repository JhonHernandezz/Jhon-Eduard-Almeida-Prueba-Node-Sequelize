import { Connect } from "../Models/Connect.js";

export async function Con(){
    try {

        let newConnect = await Connect.Conn()
        await newConnect.authenticate()
        return newConnect

    } catch (error) {
        return error
    }
}