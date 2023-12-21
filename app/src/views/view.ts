import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";

export abstract class View<T> {
  protected elemento: HTMLElement;
  private escapar = false;

  constructor(selector: string, escapar?: boolean) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      this.elemento = <HTMLElement> elemento;
    } else {
      throw (`Seletor ${selector} não existe no DOM.`);
    }
    
    if (escapar) 
      this.escapar = escapar;
  }

  @inspect
  @logarTempoDeExecucao()
  update(model: T): void {
    let template = this.template(model);
    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, '');
    }
    this.elemento.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
