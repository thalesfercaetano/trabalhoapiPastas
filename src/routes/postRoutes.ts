import express from "express";
import { ControladorArtigo } from "../controller/PostController";

export const rotaArtigo = express.Router();

const controladorArtigo = new ControladorArtigo();

rotaArtigo.get("/", controladorArtigo.buscarTodosArtigos);
rotaArtigo.post("/", controladorArtigo.criarArtigo);
rotaArtigo.put("/:id", controladorArtigo.atualizarArtigo);
rotaArtigo.delete("/:id", controladorArtigo.deletarArtigo);
