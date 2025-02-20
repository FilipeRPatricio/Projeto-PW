"use strict";

import { sendResponse, sendError, toString } from "../../connection/database.js";

const createTypeCommand = "insert into `EventType` (`description`) values (?)";

/**
 * Cria um tipo de evento com a descrição do corpo do pedido.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function createType(request, response) {
    const description = toString(request.body.description);

    if (description) {
        await sendResponse(response, createTypeCommand, [description], (result) => result);
    } else {
        sendError(response, 500, "Erro, descrição não encontrada");
    }
}
