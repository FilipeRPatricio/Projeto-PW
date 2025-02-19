"use strict";

import { sendResponse, toNumber, dateToString } from "../../connection/database.js";

const commandSelectAll = "select `id`, `type`, `description`, `date` from `Event` order by `id` ASC";
const commandSelectId = "select `id`, `type`, `description`, `date` from `Event` where `id` = ?";

/**
 * Mostra todos os eventos ou o evento cujo id foi pedido. 
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function readEvents(request, response) {
    const id = toNumber(request.params.id);
    
    await sendResponse(response, id === void 0 ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => {
        result.forEach((event) => {
            event.date = dateToString(event.date);
        });
        return result;
    });
}

const selectAutoIncrementCommand = "select `AUTO_INCREMENT` from information_schema.tables where table_schema = 'ESTSBike' and table_name = 'Event'";

/**
 * Mostra o id atual do auto_increment da tabela Event.
 * 
 * @param {*} request 
 * @param {*} response 
 */
async function eventsAutoIncrement(request, response) {
    await sendResponse(response, selectAutoIncrementCommand, [], (result) => result);
}

export { readEvents, eventsAutoIncrement };
