"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const deleteTypeCommand = "delete from `FavoriteType` where `Member` = ? and `EventType` = ?";

/**
 * Apaga o tipo de evento favorito com o id de membro e de tipo pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function deleteFavorite(request, response) {
    const member = toNumber(request.body.member);
    const eventType = toNumber(request.body.eventType);
    
    if (member && eventType) {
        await sendResponse(response, deleteTypeCommand, [member, eventType], (result) => result);
    } else {
        sendError(response, 500, "Erro, membro ou tipo de evento não encontrado");
    }
}
