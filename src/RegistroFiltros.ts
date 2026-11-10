import type { FiltroCorreo } from "./FiltroCorreo";

export class RegistroFiltros {
  private readonly _filtros = new Map<string, FiltroCorreo>();

  registrar(filtro: FiltroCorreo): void {
    !this._filtros.has(filtro.nombre) ||
      this.rechazarRegistro("Ya existe un filtro con ese nombre");

    this._filtros.size < 5 ||
      this.rechazarRegistro("Solo se pueden registrar hasta cinco filtros");

    this._filtros.set(filtro.nombre, filtro);
  }

  consultar(nombre: string): FiltroCorreo | undefined {
    return this._filtros.get(nombre);
  }

  get filtros(): FiltroCorreo[] {
    return [...this._filtros.values()];
  }

  private rechazarRegistro(mensaje: string): never {
    throw new Error(mensaje);
  }
}
