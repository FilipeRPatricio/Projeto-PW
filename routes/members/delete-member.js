"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const deleteMemberCommand = "delete from `Member` where `id` = ?";

/**
 * Apaga o membro com o id pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function deleteMember(request, response) {
    const id = toNumber(request.params.id);

    if (id) {
        await sendResponse(response, deleteMemberCommand, [id], (result) => result);
    } else {
        sendError(response, 500, "Erro, id não encontrado")
    }
}
