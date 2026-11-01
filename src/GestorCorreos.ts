import { Correo } from "./Correo";

type Bandeja = "borradores" | "enviados";

interface RegistroCorreo {
  correo: Correo;
  bandeja: Bandeja;
}

export class GestorCorreos {
  private _registros = new Map<string, RegistroCorreo>();

  guardarBorrador(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    registro?.bandeja !== "enviados" ||
      this.rechazarMovimiento(
        "Un correo enviado no puede volver a Borradores"
      );

    this._registros.set(correo.id, {
      correo,
      bandeja: "borradores"
    });
  }

  enviar(correo: Correo): void {
    correo.validarParaEnvio();

    this._registros.set(correo.id, {
      correo,
      bandeja: "enviados"
    });
  }

  get enviados(): Correo[] {
    return this.obtenerCorreos("enviados");
  }

  get borradores(): Correo[] {
    return this.obtenerCorreos("borradores");
  }

  private obtenerCorreos(bandeja: Bandeja): Correo[] {
    return [...this._registros.values()]
      .filter(registro => registro.bandeja === bandeja)
      .map(registro => registro.correo);
  }

  private rechazarMovimiento(mensaje: string): never {
    throw new Error(mensaje);
  }
}