export type Pessoa = {
  id: number;
  nome: string;
  email: string;
  idade: number;
  tipo: "administrador" | "usuario";
};

export interface Artigo {
  id: number;
  titulo: string;
  texto: string;
  autorId: number;
  dataCriacao: Date;
  publicado: boolean;
}
