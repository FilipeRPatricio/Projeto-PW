"use strict";
import express from "express";
import cors from "cors";
import routes from "./routes/routes.js"; // Importa as rotas
import readTypes from "./routes/read-types.js";
import createType from "./routes/create-type.js";

const app = express();
const port = 5502;

//app.use(cors());              // Permite que o frontend aceda ao backend
app.use(express.json());        // Processar o json no body
//app.use("/api", routes);

app.get("/types/:id", readTypes);
app.post("/types", createType);

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:5502`);
});