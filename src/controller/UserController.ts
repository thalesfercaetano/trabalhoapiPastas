import { Request, Response } from "express";
import { LogicaPessoa } from "../business/UserBusiness";

export class ControladorPessoa {
  private logicaPessoa = new LogicaPessoa();

  public buscarPessoaPorId = (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const pessoa = this.logicaPessoa.buscarPessoaPorId(id);
      res.status(200).send(pessoa);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };

  public buscarPessoasPorIdade = (req: Request, res: Response) => {
    try {
      const idadeMin = parseInt(req.query.idadeMin as string);
      const idadeMax = parseInt(req.query.idadeMax as string);
      const pessoas = this.logicaPessoa.buscarPessoasPorIdade(idadeMin, idadeMax);
      res.status(200).send(pessoas);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };

  public limparPessoasSemArtigos = (req: Request, res: Response) => {
    try {
      const confirmar = req.query.confirmar as string;
      const pessoasRemovidas = this.logicaPessoa.limparPessoasSemArtigos(confirmar);
      res.status(200).send(pessoasRemovidas);
    } catch (error: any) {
      res.status(400).send({ mensagem: error.message });
    }
  };
}
