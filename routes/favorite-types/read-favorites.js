"use strict";

import { sendResponse, sendError, toNumber } from "../../connection/database.js";

const commandSelectAll = "select `Member`, `EventType` from `FavoriteType` order by `EventType` ASC";
const commandSelectMemberId = "select `Member`, `EventType` from `FavoriteType` where `Member` = ?";
const commandSelectTypeId = "select `Member`, `EventType` from `FavoriteType` where `EventType` = ?";

/**
 * Mostra todos os tipos de eventos favoritos.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readFavorites(request, response) {
    await sendResponse(response, commandSelectAll, [], (result) => result);
}

/**
 * Mostra os tipos de eventos favoritos de um membro cujo id foi pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readFavoritesOfMember(request, response) {
    const member = toNumber(request.params.member);

    if (member) {
        await sendResponse(response, commandSelectMemberId, [member], (result) => result);
    } else {
        sendError(response, 500, "Erro, membro não encontrado");
    }
}

/**
 * Mostra os tipos de eventos favoritos com um tipo cujo id foi pedido.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readFavoritesWithType(request, response) {
    const type = toNumber(request.params.type);

    if (type) {
        await sendResponse(response, commandSelectTypeId, [type], (result) => result);
    } else {
        sendError(response, 500, "Erro, tipo de evento não encontrado");
    }
}

export { readFavorites, readFavoritesOfMember, readFavoritesWithType };
