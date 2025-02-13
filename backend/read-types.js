"use strict";

import { sendResponse, toNumber } from "../connection/database.js";

const commandSelectAll = "select `id`, `description` from `EventType`";
const commandSelectId = "select `id`, `description` from `EventType` where `id` = ?";

export default async function readTypes(request, response) {
    let id = toNumber(request.params.get);
    await sendResponse(response, isNaN(id) ? commandSelectAll : commandSelectId, id === void 0 ? [] : [id], (result) => {
        return result;
    });
}