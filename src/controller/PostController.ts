import { Request, Response } from "express";
import { LogicaArtigo } from "../business/PostBusiness";

export class ControladorArtigo {
  private logicaArtigo = new LogicaArtigo();

  public buscarTodosArtigos = (req: Request, res: Response) => {
    try {
      const todosArtigos = this.logicaArtigo.buscarTodosArtigos();
      res.status(200).send(todosArtigos);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };

  public criarArtigo = (req: Request, res: Response) => {
    try {
      const { titulo, texto, autorId } = req.body;
      const novoArtigo = this.logicaArtigo.criarArtigo(titulo, texto, autorId);
      res.status(201).send(novoArtigo);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };

  public atualizarArtigo = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dadosParaAtualizar = req.body;
      const artigoAtualizado = this.logicaArtigo.atualizarArtigo(id, dadosParaAtualizar);
      res.status(200).send(artigoAtualizado);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };

  public deletarArtigo = (req: Request, res: Response) => {
    try {
      const artigoId = parseInt(req.params.id);
      const pessoaId = parseInt(req.headers["pessoa-id"] as string);
      this.logicaArtigo.deletarArtigo(artigoId, pessoaId);
      res.status(200).send({ mensagem: "Artigo foi deletado com sucesso." });
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };
}
