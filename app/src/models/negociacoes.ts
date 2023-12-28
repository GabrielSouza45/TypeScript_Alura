import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes>{

  private negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao) {
    this.negociacoes.push(negociacao);
  }

  lista(): readonly Negociacao[] {
    return this.negociacoes;
    // return [...this.negociacoes]; // Devolve uma nova lista com os mesmos itens da outra
  }

  public paraTexto(): string {
    return JSON.stringify(this.negociacoes, null, 2);
  }

  ehIgual(negociacoes: Negociacoes): boolean {
      return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes);
  }

}
