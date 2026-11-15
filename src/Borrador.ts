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

  static desdeCorreo(
    correo: Correo,
    cambios: CambiosBorrador = {}
  ): Borrador {
    const {
      asunto = correo.asunto,
      contenido = correo.contenido,
      remitente = correo.remitente,
      destinatarios = correo.destinatarios
    } = cambios;

    const editado = new Borrador(
      asunto,
      contenido,
      remitente,
      destinatarios
    );

    editado.copiarEstadoDe(correo);

    return editado;
  }

  editar(cambios: CambiosBorrador): Borrador {
    return Borrador.desdeCorreo(this, cambios);
  }
}
