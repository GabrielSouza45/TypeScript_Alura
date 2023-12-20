import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView', true);
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputData.value, this.inputData.value);
        if (this.validaData(negociacao)) {
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
            this.limparFormulario();
        }
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
    validaData(negociacao) {
        let valida = false;
        if (negociacao.data.getDay() > DiasDaSemana.DOMINGO && negociacao.data.getDay() < DiasDaSemana.SABADO) {
            valida = true;
        }
        else {
            this.mensagemView.update("Negociações apenas em dias úteis");
        }
        return valida;
    }
}
