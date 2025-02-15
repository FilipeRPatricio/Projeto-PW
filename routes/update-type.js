"use strict";

import { sendResponse, sendError, toNumber, toString } from "../connection/database.js";

const updateTypeCommand = "update `EventType` set `description` = ? where `id` = ?"

export default async function updateType(request, response) {
    const id = toNumber(request.params.id);
    const newDescription = toString(request.body.description);

    if (id && newDescription) {
        await sendResponse(response, updateTypeCommand, [newDescription, id], (result) => {
            return result;
        });
    } else {
        sendError(response, 500, "Erro, id ou descrição não encontrados");
    }
} 