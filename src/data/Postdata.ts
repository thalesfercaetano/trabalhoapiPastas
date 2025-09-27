import { Artigo } from "../types/types";
import { artigos } from "./database";

export class DadosArtigo {
  public buscarTodosArtigos = () => {
    return artigos;
  };

  public buscarPorId = (id: number) => {
    return artigos.find((a) => a.id === id);
  };

  public criarNovoId = () => {
    return artigos.length > 0 ? Math.max(...artigos.map((artigo) => artigo.id)) + 1 : 1;
  };

  public adicionar = (novoArtigo: Artigo) => {
    artigos.push(novoArtigo);
  };

  public atualizar = (
    id: number,
    dados: { titulo?: string; texto?: string; publicado?: boolean }
  ) => {
    const artigo = this.buscarPorId(id);
    if (artigo) {
      if (dados.titulo !== undefined) artigo.titulo = dados.titulo;
      if (dados.texto !== undefined) artigo.texto = dados.texto;
      if (dados.publicado !== undefined) artigo.publicado = dados.publicado;
    }
  };

  public remover = (id: number) => {
    const posicao = artigos.findIndex((a) => a.id === id);
    if (posicao > -1) {
      artigos.splice(posicao, 1);
    }
  };
}
