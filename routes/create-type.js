"use strict";

import { sendResponse, toString } from "../connection/database.js";

const createTypeCommand = "insert into `EventType` (`description`) values (?)";

export default async function createType(request, response) {
    const description = toString(request.body.description);
    console.log(description);

    if (description) {
        await sendResponse(response, createTypeCommand, [description], (result) => {
            return result;
        });
    }
}
