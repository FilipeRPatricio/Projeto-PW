"use strict";

import mysql from "mysql2/promise";
import options from "./connection-options.js";

const pool = mysql.createPool(options);

/**
 * Cria uma conexão com a base de dados mysql e executa um comando.
 * 
 * @param {string} command - comando mysql para executar
 * @param {Array} parameters - array com parâmetros do comando a executar
 * @returns O resultado do comando
 * @async
 */
async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await pool.getConnection();
        let [result] = await connection.execute(command, parameters);
        return result;
    } catch (error) {
        console.error("Erro ao executar query:", error);
        return;
    } finally {
        connection?.release();
    }
}

/**
 * Executa um comando mysql, processa o resultado e envia uma resposta HTTP para o client.
 * 
 * @param {*} response - resposta HTTP a enviar
 * @param {string} command - comando a executar
 * @param {Array} parameters - parâmetros do comando a executar
 * @param {Function} processResult - função para processar o resultado do comando
 * @async
 */
async function sendResponse(response, command = "", parameters = [], processResult) {
    let result = await execute(command, parameters);
    result ?
    response.json(processResult(result)) :
    sendError(response);
}

/**
 * Envia uma resposta de erro HTTP, para o client, com o status e mensagem requisitados.
 * 
 * @param {*} response - resposta de erro HTTP a enviar
 * @param {number} status - status HTTP da resposta
 * @param {string} message - mensagem de erro
 */
function sendError(response, status = 500, message) {
    response.status(status).json(typeof message === "string" ? message : "Erro desconhecido");
}

/**
 * Converte um objeto para número.
 * 
 * @param {number | Object} number - O número a converter
 * @returns um número ou undefined, caso o número não seja válido
 */
function toNumber(number) {
    let num = Number(number);
    return isNaN(num) ? void 0 : num;
}

/**
 * Converte um objeto para string.
 * 
 * @param {string | Object} string - A string ou objeto a converter para string
 * @returns uma string ou undefined, caso a string não seja válida
 */
function toString(string) {
    return String(string);
}

/**
 * Converte um objeto para o tipo date.
 * 
 * @param {Date | Object} date - A data ou objeto a converter para o tipo date
 * @returns uma data ou undefined, caso a date não seja válida
 */
function toDate(date) {
    newDate = new Date(date);
    return newDate ? newDate : void 0;
 }

 /**
  * Converte uma data para string no formato YYYY-MM-DD.
  * 
  * @param {Date | Object} date - A data ou objeto a converter para string
  * @returns uma string formatada ou undefined, caso a date não seja válida
  */
 function dateToString(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
 
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
 
    return date ? `${date.getFullYear()}-${month}-${day}` : void 0;
 }

export { sendResponse, sendError, toNumber, toString, toDate, dateToString };
