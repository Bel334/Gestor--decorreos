import { Contacto } from "./Contacto";
import { Correo } from "./Correo";
import { GestorCorreos } from "./GestorCorreos";

export class ServidorCorreos {
  private _buzones = new Map<string, GestorCorreos>();

  registrar(contacto: Contacto): GestorCorreos {
    const clave = this.clave(contacto.email);

    if (this._buzones.has(clave)) {
      throw new Error("El contacto ya tiene un buzón");
    }

    const buzon = new GestorCorreos();
    this._buzones.set(clave, buzon);
    return buzon;
  }

  buzonDe(email: string): GestorCorreos {
    const buzon = this._buzones.get(this.clave(email));

    if (buzon === undefined) {
      throw new Error("No existe un buzón para ese email");
    }

    return buzon;
  }

  enviar(correo: Correo): void {
    correo.validarParaEnvio();

    const buzonRemitente = this.buzonDe(correo.remitente?.email ?? "");
    const buzonesDestino = correo.destinatarios
      .map(destinatario => this.buzonDe(destinatario.email));

    buzonRemitente.enviar(correo);

    for (const buzon of buzonesDestino) {
      buzon.recibir(this.copiar(correo));
    }
  }

  private copiar(correo: Correo): Correo {
    return new Correo(
      correo.asunto,
      correo.contenido,
      correo.remitente,
      correo.destinatarios
    );
  }

  private clave(email: string): string {
    return email.toLowerCase();
  }
}