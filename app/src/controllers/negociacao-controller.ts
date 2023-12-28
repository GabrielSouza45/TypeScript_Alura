import { domInjector } from "../decorators/domInjector.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { NegociacaoService } from "../services/negociacao-service.js";

export class NegociacaoController {

    @domInjector("#data")
    private inputData: HTMLInputElement;
    @domInjector("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @domInjector("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacaoService = new NegociacaoService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao(true)
    adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputData.value,
            this.inputData.value
        );

        if (this.validaData(negociacao)){
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
            this.limparFormulario();
        }
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }

    public importaDados(){
        this.negociacaoService.obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje
                .filter(negociacaoDeHoje =>{
                    return !this.negociacoes
                        .lista()
                        .some(negociacao => negociacao
                            .ehIgual(negociacaoDeHoje))
                })
        })
        .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje)[
                this.negociacoes.adiciona(negociacao)
            ]
            this.negociacoesView.update(this.negociacoes);
        })
    }

    private validaData(negociacao: Negociacao): boolean{
        let valida = false;
        if (negociacao.data.getDay() > DiasDaSemana.DOMINGO && negociacao.data.getDay() < DiasDaSemana.SABADO){
            valida = true;
        } else {
            this.mensagemView.update("Negociações apenas em dias úteis");
        }
        return valida;
    }
}