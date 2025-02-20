"use strict";

import { sendResponse, sendError, toNumber, toString, toDate } from "../../connection/database.js";

const updateEventCommand = "update `Event` set `type` = ? , `description` = ? , `data` = ? where `id` = ?";

/**
 * Atualiza um evento com o tipo, descrição e data pedidos.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function updateEvent(request, response) {
    const type = toNumber(request.body.type);
    const description = toString(request.body.description);
    const date = toDate(request.body.date);

    if (type && description && date) {
        await sendResponse(response, updateEventCommand, [type, description, date], (result) => result);
    } else {
        sendError(response, 500, "Erro, tipo, descrição ou data não são válidos");
    }
}
