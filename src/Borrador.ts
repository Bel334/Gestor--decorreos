import type { Contacto } from "./Contacto";
import { Correo } from "./Correo";

export interface CambiosBorrador {
  asunto?: string;
  contenido?: string;
  remitente?: Contacto | null;
  destinatarios?: Contacto[];
}

export class Borrador extends Correo {
  constructor(
    asunto: string = "",
    contenido: string = "",
    remitente: Contacto | null = null,
    destinatarios: Contacto[] = []
  ) {
    super(asunto, contenido, remitente, destinatarios);
  }

  editar(cambios: CambiosBorrador): Borrador {
    const {
      asunto = this.asunto,
      contenido = this.contenido,
      remitente = this.remitente,
      destinatarios = this.destinatarios
    } = cambios;

    const editado = new Borrador(
      asunto,
      contenido,
      remitente,
      destinatarios
    );

    editado.copiarEstadoDe(this);

    return editado;
  }
}
