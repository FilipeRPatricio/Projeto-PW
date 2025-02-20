"use strict";

import { sendResponse, sendError, toNumber} from "../../connection/database.js";

const deleteEventCommand = "delete from `Event` where `id` = ?";

/**
 * Apaga o tipo de evento favorito com o id de membro e de tipo pedido.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function deleteEvent(request, response) {
    const id = toNumber(request.params.id);
    
    if (id) {
        await sendResponse(response, deleteEventCommand, [id], (result) => result);
    } else {
        sendError(response, 500, "Erro, evento não encontrado");
    }
}
