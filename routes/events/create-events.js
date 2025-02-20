"use strict";

import { sendResponse, sendError, toNumber, toString, toDate } from "../../connection/database.js";

const createEventCommand = "insert into `Event` (`type`, `description`, `date`) values (?, ?, ?)";

/**
 * Cria um novo evento com o tipo, descrição e data do corpo do pedido.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function createEvent(request, response) {
    const type = toNumber(request.body.type);
    const description = toString(request.body.description);
    const date = toDate(request.body.date);


    if (type && description && date) {
        await sendResponse(response, createEventCommand, [type, description, date], (result) => result);
    } else {
        sendError(response, 500, "Erro, tipo, descrição ou data não são válidos");
    }
}
