import { DadosArtigo } from "../data/Postdata";
import { DadosPessoa } from "../data/UserData";
import { Artigo } from "../types/types";

export class LogicaArtigo {
  private dadosArtigo = new DadosArtigo();
  private dadosPessoa = new DadosPessoa();

  public buscarTodosArtigos() {
    return this.dadosArtigo.buscarTodosArtigos();
  }

  public criarArtigo(titulo: string, texto: string, autorId: number) {
    if (!titulo || !texto || !autorId) {
      throw new Error(
        "Os campos 'titulo', 'texto' e 'autorId' são necessários."
      );
    }
    if (typeof titulo !== "string" || titulo.length < 3) {
      throw new Error("O título precisa ter pelo menos 3 letras.");
    }
    if (typeof texto !== "string" || texto.length < 10) {
      throw new Error("O texto precisa ter pelo menos 10 letras.");
    }

    const autor = this.dadosPessoa.buscarPessoaPorId(autorId);
    if (!autor) {
      throw new Error("Autor não foi encontrado.");
    }

    const novoId = this.dadosArtigo.criarNovoId();

    const novoArtigo: Artigo = {
      id: novoId,
      titulo,
      texto,
      autorId,
      dataCriacao: new Date(),
      publicado: false,
    };

    this.dadosArtigo.adicionar(novoArtigo);
    return novoArtigo;
  }

  public atualizarArtigo(id: number, dadosParaAtualizar: any) {
    if (isNaN(id)) {
      throw new Error("ID do artigo não é válido.");
    }

    const artigo = this.dadosArtigo.buscarPorId(id);
    if (!artigo) {
      throw new Error("Artigo não foi encontrado.");
    }

    if (
      dadosParaAtualizar.id !== undefined ||
      dadosParaAtualizar.autorId !== undefined ||
      dadosParaAtualizar.dataCriacao !== undefined
    ) {
      throw new Error(
        "Não pode alterar os campos 'id', 'autorId' ou 'dataCriacao'."
      );
    }

    this.dadosArtigo.atualizar(id, dadosParaAtualizar);
    return this.dadosArtigo.buscarPorId(id);
  }

  public deletarArtigo(artigoId: number, pessoaId: number) {
    if (isNaN(artigoId) || isNaN(pessoaId)) {
      throw new Error("Os IDs não são válidos.");
    }

    const artigo = this.dadosArtigo.buscarPorId(artigoId);
    if (!artigo) {
      throw new Error("Artigo não foi encontrado.");
    }

    const pessoa = this.dadosPessoa.buscarPessoaPorId(pessoaId);
    if (!pessoa) {
      throw new Error("Pessoa não foi encontrada.");
    }

    if (artigo.autorId !== pessoa.id && pessoa.tipo !== "administrador") {
      throw new Error("Você não pode deletar este artigo.");
    }

    this.dadosArtigo.remover(artigoId);
  }
}
