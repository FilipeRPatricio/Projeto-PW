"use strict";

import { sendResponse, sendError, toString } from "../../connection/database.js";

const createMemberCommand = "insert into `Member` (`id`, `description`) values (null, ?)";

/**
 * Cria um novo membro com a descrição do corpo do pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export default async function createMember(request, response) {
    const description = toString(request.body.description);

    if (description) {
        await sendResponse(response, createMemberCommand, [description], (result) => result);
    } else {
        sendError(response, 500, "Erro, descrição não encontrada");
    }
}
