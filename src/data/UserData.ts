import { Artigo } from "../types/types";
import { pessoas } from "./database";

export class DadosPessoa {
  public buscarTodasPessoas = () => {
    return pessoas;
  };

  public buscarPessoaPorId = (id: number) => {
    return pessoas.find((p) => p.id === id);
  };

  public buscarPessoasPorIdade = (idadeMin: number, idadeMax: number) => {
    return pessoas.filter((pessoa) => pessoa.idade >= idadeMin && pessoa.idade <= idadeMax);
  };

  public buscarPessoasSemArtigos = (todosArtigos: Artigo[]) => {
    return pessoas.filter((pessoa) => {
      const temArtigos = todosArtigos.some((artigo) => artigo.autorId === pessoa.id);
      return !temArtigos && pessoa.tipo !== "administrador";
    });
  };
}
