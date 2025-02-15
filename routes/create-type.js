"use strict";

import { sendResponse, sendError, toString } from "../connection/database.js";

const createTypeCommand = "insert into `EventType` (`description`) values (?)";

export default async function createType(request, response) {
    const description = toString(request.body.description);

    if (description) {
        await sendResponse(response, createTypeCommand, [description], (result) => {
            return result;
        });
    } else {
        sendError(response, 500, "Erro, descrição não encontrada");
    }
}
