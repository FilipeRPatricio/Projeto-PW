"use strict";

import { sendResponse, toNumber } from "../../connection/database.js";

const commandSelectAll = "select `id`, `description` from `Member`";
const commandSelectId = "select `id`, `description` from `Member` where `id` = ?";

/**
 * Mostra todos os membros ou o membro cujo id foi pedido. 
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function readMembers(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => result);
}
