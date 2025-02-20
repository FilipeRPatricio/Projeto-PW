"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const commandSelectAll = "select `Event`, `Member` from `Registration` order by `Event` ASC";
const commandSelectMemberId = "select `Event`, `Member` from `Registration` where `Member` = ?";
const commandSelectEventId = "select `Event`, `Member` from `Registration` where `Event` = ?";

/**
 * Mostra todas as inscrições de membros em eventos.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
async function readRegistrations(request, response) {
    await sendResponse(response, commandSelectAll, [], (result) => result);
}

/**
 * Mostra os tipos de eventos favoritos de um membro cujo id foi pedido.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP
 */
async function readMemberRegistrations(request, response) {
    const member = toNumber(request.params.member);
    console.log(member);

    if (member) {
        await sendResponse(response, commandSelectMemberId, [member], (result) => result);
    } else {
        sendError(response, 500, "Erro, membro não encontrado");
    }
}

/**
 * Mostra todos os membros inscritos num evento cujo id foi pedido.
 * 
 * @param {Request} request - Pedido HTTP
 * @param {Response} response - Resposta HTTP 
 */
async function readEventRegistrations(request, response) {
    const event = toNumber(request.params.event);

    if (event) {
        await sendResponse(response, commandSelectEventId, [event], (result) => result);
    } else {
        sendError(response, 500, "Erro, evento não encontrado");
    }
}

export { readRegistrations, readMemberRegistrations, readEventRegistrations };
