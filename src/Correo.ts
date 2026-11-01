import { Contacto } from "./Contacto";

export class Correo {
  readonly id: string = crypto.randomUUID();

  private _leido: boolean = false;
  private _favorito: boolean = false;
  private _destinatarios: Contacto[];

  constructor(
    public readonly asunto: string,
    public readonly contenido: string,
    public readonly remitente: Contacto | null,
    destinatarios: Contacto[]
  ) {
    this._destinatarios = [...destinatarios];
  }

  get leido(): boolean {
    return this._leido;
  }

  get favorito(): boolean {
    return this._favorito;
  }

  get destinatarios(): Contacto[] {
    return [...this._destinatarios];
  }

  validarParaEnvio(): void {
    this.remitente !== null ||
      this.rechazarEnvio("El remitente es obligatorio");

    this.asunto.trim().length > 0 ||
      this.rechazarEnvio("El asunto es obligatorio");

    this._destinatarios.length > 0 ||
      this.rechazarEnvio("Se requiere al menos un destinatario");
  }

  private rechazarEnvio(mensaje: string): never {
    throw new Error(mensaje);
  }
}