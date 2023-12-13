export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
        // return [...this.negociacoes]; // Devolve uma nova lista com os mesmos itens da outra
    }
}
