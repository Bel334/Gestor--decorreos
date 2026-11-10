import type { Correo } from "./Correo";

export type PredicadoCorreo = (correo: Correo) => boolean;

export class FiltroCorreo {
  constructor(
    public readonly nombre: string,
    private readonly condicion: PredicadoCorreo
  ) {}

  aplicar(correos: readonly Correo[]): Correo[] {
    return correos.filter(this.condicion);
  }
}