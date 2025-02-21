"use strict";

import { sendResponse, sendError, toNumber, toString } from "../../connection/database.js";

const commandSelectAll = "select `id`, `description` from `EventType` order by `id` ASC";
const commandSelectId = "select `id`, `description` from `EventType` where `id` = ?";

/**
 * Mostra todos os tipos de eventos ou o tipo cujo id foi pedido. 
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
async function readTypes(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => result);
}

const selectDescriptionCommand = "select `id`, `description` from `EventType` where `description` = ?";

/**
 * Mostra os tipos de eventos com a descrição pedida.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP 
 */
async function readTypeWithDescription(request, response) {
    const description = toString(request.params.description);

    if (description) {
        await sendResponse(response, selectDescriptionCommand, [description], (result) => result);
    } else {
        sendError(response, 500, "Erro, descrição não encontrada");
    }
}

const selectAutoIncrementCommand = "select `AUTO_INCREMENT` from information_schema.tables where table_schema = 'ESTSBike' and table_name = 'EventType'";

/**
 * Mostra o id atual do auto_increment da tabela EventType.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
async function typesAutoIncrement(request, response) {
    await sendResponse(response, selectAutoIncrementCommand, [], (result) => result);
}

export { readTypes, readTypeWithDescription, typesAutoIncrement };
