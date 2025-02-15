"use strict";

import { sendResponse, toNumber } from "../connection/database.js";

const commandSelectAll = "select `id`, `description` from `EventType`";
const commandSelectId = "select `id`, `description` from `EventType` where `id` = ?";

/**
 * Mostra todos os tipos de eventos ou o tipo cujo id foi pedido. 
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readTypes(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => result);
}



const selectAutoIncrementCommand = "select `AUTO_INCREMENT` from information_schema.tables where table_schema = 'ESTSBike' and table_name = 'EventType'";

/**
 * Mostra o id atual do auto_increment da tabela EventType.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function typesAutoIncrement(request, response) {
    await sendResponse(response, selectAutoIncrementCommand, [], (result) => result);
}

export { readTypes, typesAutoIncrement }
