import { DadosPessoa } from "../data/UserData";
import { artigos } from "../data/database";

export class LogicaPessoa {
  private dadosPessoa = new DadosPessoa();

  public buscarPessoaPorId(id: number) {
    if (isNaN(id)) {
      throw new Error("ID não é válido. Precisa ser um número.");
    }

    const pessoa = this.dadosPessoa.buscarPessoaPorId(id);

    if (!pessoa) {
      throw new Error("Pessoa não foi encontrada.");
    }

    return pessoa;
  }

  public buscarPessoasPorIdade(idadeMin: number, idadeMax: number) {
    if (isNaN(idadeMin) || isNaN(idadeMax)) {
      throw new Error("As idades devem ser números válidos.");
    }
    return this.dadosPessoa.buscarPessoasPorIdade(idadeMin, idadeMax);
  }

  public limparPessoasSemArtigos(confirmar: string) {
    if (confirmar !== "sim") {
      throw new Error("Para confirmar, envie 'sim' no parâmetro 'confirmar'");
    }

    const pessoasSemArtigos = this.dadosPessoa.buscarPessoasSemArtigos(artigos);

    return pessoasSemArtigos;
  }
}
