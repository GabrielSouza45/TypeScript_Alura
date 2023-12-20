import { Negociacao } from "./negociacao.js";

export class Negociacoes {
  private negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao) {
    this.negociacoes.push(negociacao);
  }

  lista(): readonly Negociacao[] {
    return this.negociacoes;
    // return [...this.negociacoes]; // Devolve uma nova lista com os mesmos itens da outra
  }
}
