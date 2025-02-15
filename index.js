"use strict";
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";     // Importa as rotas

import { readTypes, typesAutoIncrement } from "./routes/read-types.js";
import createType from "./routes/create-type.js";
import updateType from "./routes/update-type.js";
import deleteType from "./routes/delete-type.js";

const app = express();
const port = 8081;

app.use(cors({ origin: "*" }));              // Permite que o frontend aceda ao backend
app.use(express.json());                     // Processar o json no body
//app.use("/api", routes);

// Routes para os tipos de eventos
app.get("/types/auto-inc", typesAutoIncrement)
app.get("/types/:id", readTypes);
app.post("/types", createType);
app.put("/types/:id", updateType);
app.delete("/types/:id", deleteType);

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:${port}`);
});