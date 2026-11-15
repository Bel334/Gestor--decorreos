import type { Contacto } from "./Contacto";
import { Correo } from "./Correo";

export class Borrador extends Correo {
  constructor(
    asunto: string = "",
    contenido: string = "",
    remitente: Contacto | null = null,
    destinatarios: Contacto[] = []
  ) {
    super(asunto, contenido, remitente, destinatarios);
  }
}
