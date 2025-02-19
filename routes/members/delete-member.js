//Endpoint da API
"use strict";
import express from "express";
import { execute } from "../../connection/database.js";

const router = express.Router();

//Apagar evento por ID
router.delete("/members/:id", async (req, res) => {       
    const { id } = req.params; 
    try {
        console.log(`Recebido pedido para apagar membro com ID: ${id}`);
        await execute("DELETE FROM member WHERE ID = ?", [id]); 
        res.status(200).json({ message: "Membro apagado com sucesso!" });
    } catch (error) {
        console.error("Erro ao apagar membro:", error);
        res.status(500).json({ message: "Erro ao apagar membro." });
    }
});

export default router;