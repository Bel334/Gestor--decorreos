export class Contacto {
  constructor(
    public readonly nombre: string,
    public readonly email: string
  ) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("El email no tiene un formato válido");
    }
  }
}