"use strict";

import mysql from "mysql2/promise";
import options from "./connection-options.js";

const pool = mysql.createPool(options);

async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await pool.getConnection();
        let [result] = await connection.execute(command, parameters);
        return result;
    } catch (error) {
        console.error("erro ao executar query:", error);
        return;
    } finally {
        connection?.release();
    }
}

async function sendResponse(response, command = "", parameters = [], processResult) {
    let result = await execute(command, parameters);
    result ?
    response.json(processResult(result)) :
    sendError(response);
}

function sendError(response, status = 500, message) {
    response.status(status).json(typeof message === "string" ? message : "Unknown error occured");
}

function toNumber(number) {
    let num = Number(number);
    return isNaN(num) ? void 0 : num;
}

export async function testConnection(){
    try{
        let result = await execute("select * from Member");
        console.log("\nConexão com o mySQL estabelecida");
        console.log(`\n${result}`);
    } catch (error) {
        console.error("Erro ao conectar ao MySQL", error);
    }
}

// testConnection();

export { execute, sendResponse, sendError, toNumber };
