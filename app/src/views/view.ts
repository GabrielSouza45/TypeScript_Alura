import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";

export abstract class View<T> {
  protected elemento: HTMLElement;
  private escapar = false;

  constructor(selector: string) {
    const elemento = document.querySelector(selector);
    if (elemento) {
      this.elemento = <HTMLElement> elemento;
    } else {
      throw (`Seletor ${selector} não existe no DOM.`);
    }
  
  }

  @inspect
  @logarTempoDeExecucao()
  update(model: T): void {
    let template = this.template(model);
    this.elemento.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
