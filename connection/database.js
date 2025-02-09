"use strict";

import mysql from "mysql2/promise";
import options from "./connection-options.js";

const pool = mysql.createPool(options);

export async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await pool.getConnection();
        let [result] = await connection.execute(command, parameters);
        console.log(result);
        return result;
    } catch (error) {
        console.error("erro ao executar query:", error);
        return;
    } finally {
        connection?.release();
    }
}

export async function testConnection(){
    try{
        await execute("SELECT * FROM member");
        console.log("conexão com o mySQL estabelecida");
    } catch {
        console.error("Erro ao conectar ao MySQL", error);
    }
}
testConnection();
