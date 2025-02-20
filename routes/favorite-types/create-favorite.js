"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const createFavoriteTypeCommand = "insert into `FavoriteType` (`Member`, `EventType`) values (?, ?)";

/**
 * Adiciona um tipo de evento favorito a um membro.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP 
 */
export default async function createFavorite(request, response) {
    const member = toNumber(request.body.member);
    const eventType = toNumber(request.body.eventType);
    
    if (member && eventType) {
        await sendResponse(response, createFavoriteTypeCommand, [member, eventType], (result) => result);
    } else {
        sendError(response, 500, "Erro, membro ou tipo de evento não encontrado");
    }
}
