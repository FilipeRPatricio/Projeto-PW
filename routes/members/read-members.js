"use strict";

import { sendResponse, toNumber } from "../../connection/database.js";

const commandSelectAll = "select `id`, `description` from `Member` order by `id` ASC";
const commandSelectId = "select `id`, `description` from `Member` where `id` = ?";

/**
 * Mostra todos os membros ou o membro cujo id foi pedido. 
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readMembers(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => result);
}

const selectAutoIncrementCommand = "select `AUTO_INCREMENT` from information_schema.tables where table_schema = 'ESTSBike' and table_name = 'Member'";

/**
 * Mostra o id atual do auto_increment da tabela Member.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function membersAutoIncrement(request, response) {
    await sendResponse(response, selectAutoIncrementCommand, [], (result) => result);
}

export { readMembers, membersAutoIncrement };
