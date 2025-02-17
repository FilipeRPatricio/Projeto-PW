"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const deleteTypeCommand = "delete from `EventType` where `id` = ?";

/**
 * Apaga o tipo de evento com o id pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function deleteType(request, response) {
    const id = toNumber(request.params.id);

    if (id) {
        await sendResponse(response, deleteTypeCommand, [id], (result) => result);
    } else {
        sendError(response, 500, "Erro, id não encontrado")
    }
}
