"use strict";

import { sendResponse, toNumber } from "../../connection/database.js";

const commandSelectAll = "select `Member`, `EventType` from `FavoriteType`";
const commandSelectTypeId = "select `Member`, `EventType` from `FavoriteType` where `EventType` = ?";

/**
 * Mostra todos os tipos de eventos favoritos 
 * ou os membros que têm como favorito o tipo de evento cujo id foi pedido. 
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function readFavorites(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectTypeId, id === void 0 ? [] : [id], (result) => result);
}
