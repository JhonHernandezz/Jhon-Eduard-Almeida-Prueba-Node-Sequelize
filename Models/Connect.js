import { Sequelize } from "sequelize";

export class Connect {
    static async Conn(){
        return new Sequelize(
            {
                dialect: 'mysql',
                host: 'localhost',
                username: 'root',
                password: '0000',
                database: 'market',
                port: 3306
            }
        )
    }
}