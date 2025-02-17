//Endpoint da API
"use strict";
import express from "express";
import { execute } from "../../connection/database.js";

const router = express.Router();

//Apagar evento por ID
router.delete("/events/:id", async (req, res) => {        //Rever melhor os caminhos
    const { id } = req.params; 
    try {
        console.log(`Recebido pedido para apagar evento com ID: ${id}`);
        await execute("DELETE FROM event WHERE ID = ?", [id]); //evita sql injection
        res.status(200).json({ message: "Evento apagado com sucesso!" });
    } catch (error) {
        console.error("Erro ao apagar evento:", error);
        res.status(500).json({ message: "Erro ao apagar evento." });
    }
});

export default router;