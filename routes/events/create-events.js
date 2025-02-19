"use strict";

import { sendResponse, sendError, toString } from "../../connection/database.js";

const createEventCommand = "insert into `Event` (`id`, `type`, `description`, `date`) values (null, ?, ?, ?)";

/**
 * Cria um novo evento com a descrição do corpo do pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function createEvent(request, response) {
    const type = int(request.body.type);
    const description = toString(request.body.description);
    const date = date(request.body.date);


    if (type && description && date) {
        await sendResponse(response, createEventCommand, [type, description, date], (result) => result);
    } else {
        sendError(response, 500, "Erro, tipo, descrição ou data nao encontrados");
    }
}
