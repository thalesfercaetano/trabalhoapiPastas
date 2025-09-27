import express from "express";
import cors from "cors";

export const aplicacao = express();

aplicacao.use(express.json());
aplicacao.use(cors());
