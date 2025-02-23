"use strict";

import { sendResponse, sendError, toNumber, toString } from "../../connection/database.js";

const updateMemberCommand = "update `Member` set `description` = ? where `id` = ?";

/**
 * Atualiza um membro com o id e descrição pedidos.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function updateMember(request, response) {
    const id = toNumber(request.params.id);
    const description = toString(request.body.description);

    if (id && description) {
        await sendResponse(response, updateMemberCommand, [description, id], (result) => result);
    } else {
        sendError(response, 500, "Erro, id ou descrição não encontrados");
    }
}