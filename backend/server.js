import express from "express";
import cors from "cors";
import routes from "./routes.js"; //importa as rotas

const app = express();
const port = 5502;

app.use(cors());                //permite que o frontend aceda ao backend
app.use(express.json());        //processar o json no body
app.use("/api", routes);

app.listen(port, () => {
    console.log(`servidor a correr em http://localhost:5502/www/`);
});