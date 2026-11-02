import { Contacto } from "./Contacto";

export class AgendaContactos {
  private _contactos = new Map<string, Contacto>();

  agregar(contacto: Contacto): void {
    if (this.consultar(contacto.email)) {
      throw new Error("Ya existe un contacto con ese email");
    }
    this._contactos.set(this.clave(contacto.email), contacto);
  }

  consultar(email: string): Contacto | undefined {
    return this._contactos.get(this.clave(email));
  }

  get contactos(): Contacto[] {
    return [...this._contactos.values()];
  }

  private clave(email: string): string {
    return email.toLowerCase();
  }
}