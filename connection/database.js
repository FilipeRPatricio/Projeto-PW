"use strict";

import mysql from "mysql2/promise";
import options from "./connection-options.js";

export async function execute(command, parameters = []) {
    let connection;
    try {
        connection = await mysql.createConnection(options);
        let [result] = await connection.execute(command, parameters);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
        return;
    } finally {
        connection?.end();
    }
}

execute("select * from Event");
