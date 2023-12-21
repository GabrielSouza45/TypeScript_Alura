export function logarTempoDeExecucao(segundos: boolean = false) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let divisor = 1;
      let tempo = "milissegundos";

      if (segundos) {
        divisor = 1000;
        tempo = "segundos";
      }

      const t1 = performance.now();
      const metodo = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      console.log(
        `${propertyKey}, tempo de execução: ${(t2 - t1) / divisor} ${tempo}.`
      );
      metodo;
    };
    return descriptor;
  };
}
