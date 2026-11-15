import { Contacto } from "./Contacto";

export class Correo {
  private _id: string = crypto.randomUUID();
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

  get id(): string {
    return this._id;
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

  marcarFavorito(): void {
    this._favorito = true;
  }

  desmarcarFavorito(): void {
    this._favorito = false;
  }

  protected copiarEstadoDe(correo: Correo): void {
    this._id = correo.id;
    this._leido = correo.leido;
    this._favorito = correo.favorito;
  }

  private rechazarEnvio(mensaje: string): never {
    throw new Error(mensaje);
  }
}