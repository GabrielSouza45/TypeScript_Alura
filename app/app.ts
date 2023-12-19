import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController(); // Nova instancia do controller

const form = document.querySelector('.form'); // Pega o objeto da classe form no html

form.addEventListener('submit', event => { // igual lambda, quando o evento de 'submit' acontecer:

    event.preventDefault(); // não recarrega a página como é padrão do submit de formulario
    controller.adiciona(); // chama a função adiciona do controller

});
