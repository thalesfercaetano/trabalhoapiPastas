import express from "express";
import { ControladorPessoa } from "../controller/UserController";

export const rotaPessoa = express.Router();

const controladorPessoa = new ControladorPessoa();

rotaPessoa.get("/por-idade", controladorPessoa.buscarPessoasPorIdade);
rotaPessoa.get("/:id", controladorPessoa.buscarPessoaPorId);
rotaPessoa.delete("/limpar-sem-artigos", controladorPessoa.limparPessoasSemArtigos);
