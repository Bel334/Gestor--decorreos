import { Contacto } from "./Contacto";
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

  private clave(email: string): string {
    return email.toLowerCase();
  }
}