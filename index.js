import express from "express";
import cors from "cors";
import routes from "./backend/routes.js"; // Importa as rotas

const app = express();
const port = 5502;

app.use(cors());                // Permite que o frontend aceda ao backend
app.use(express.json());        // Processar o json no body
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor a correr em http://localhost:5502`);
});