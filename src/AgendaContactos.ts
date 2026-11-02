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

  modificar(email: string, nombre: string, nuevoEmail: string): void {
    if (!this.consultar(email)) {
      throw new Error("El contacto no existe");
    }

    const actualizado = new Contacto(nombre, nuevoEmail);
    const cambiaEmail = this.clave(email) !== this.clave(nuevoEmail);

    if (cambiaEmail && this.consultar(nuevoEmail)) {
      throw new Error("Ya existe un contacto con ese email");
    }

    this._contactos.delete(this.clave(email));
    this._contactos.set(this.clave(nuevoEmail), actualizado);
  }

  eliminar(email: string): void {
    if (!this._contactos.delete(this.clave(email))) {
      throw new Error("El contacto no existe");
    }
  }

  get contactos(): Contacto[] {
    return [...this._contactos.values()];
  }

  private clave(email: string): string {
    return email.toLowerCase();
  }
}