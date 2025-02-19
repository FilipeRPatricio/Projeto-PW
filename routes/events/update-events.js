"use strict";

import { sendResponse, sendError, toNumber, toString } from "../../connection/database.js";

const updateEventCommand = "update `Event` set `type` = ? , `description` = ? , `data` = ? where `id` = ?";

export default async function updateEvent(request, response) {
    const type = int(request.body.type);
    const description = toString(request.body.description);
    const date = date(request.body.date);

    if (type && description && date) {
        await sendResponse(response, updateMemberCommand, [type, description, date], (result) => result);
    } else {
        sendError(response, 500, "Erro, id ou descrição não encontrados");
    }
}