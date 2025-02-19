"use strict";

import { sendResponse, sendError} from "../../connection/database.js";

const deleteEventCommand = "delete from `Event` where `id` = ?";

/**
 * Apaga o tipo de evento favorito com o id de membro e de tipo pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function deleteEvent(request, response) {
    
    if (id) {
        await sendResponse(response, deleteEventCommand, [id], (result) => result);
    } else {
        sendError(response, 500, "Erro, evento não encontrado");
    }
}
