"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const createRegistrationCommand = "insert into `Registration` (`Event`, `Member`) values (?, ?)";

/**
 * Adiciona uma inscrição de um membro num evento.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
export default async function createRegistration(request, response) {
    const event = toNumber(request.body.event);
    const member = toNumber(request.body.member);
    
    if (event && member) {
        await sendResponse(response, createRegistrationCommand, [event, member], (result) => result);
    } else {
        sendError(response, 500, "Erro, evento ou membro não encontrado");
    }
}
