"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const deleteRegistrationCommand = "delete from `Registration` where `Event` = ? and `Member` = ?";

/**
 * Apaga uma inscrição de um membro num evento com os id's pedidos.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function deleteRegistration(request, response) {
    const event = toNumber(request.body.event);
    const member = toNumber(request.body.member);
    
    if (event && member) {
        await sendResponse(response, deleteRegistrationCommand, [event, member], (result) => result);
    } else {
        sendError(response, 500, "Erro, evento ou membro não encontrado");
    }
}
