import { Correo } from "./Correo";
import { buscarCorreos } from "./buscarCorreos";

type Bandeja = "entrada" | "borradores" | "enviados" | "eliminados";

interface RegistroCorreo {
  correo: Correo;
  bandeja: Bandeja;
  origen?: Bandeja;
}

export class GestorCorreos {
  private _registros = new Map<string, RegistroCorreo>();

  guardarBorrador(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    (registro === undefined || registro.bandeja === "borradores") ||
      this.rechazarMovimiento(
        "Solo se pueden guardar correos nuevos o borradores existentes"
      );

    this._registros.set(correo.id, {
      correo,
      bandeja: "borradores"
    });
  }

  enviar(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    registro?.bandeja !== "entrada" ||
      this.rechazarMovimiento(
        "Un correo recibido no puede enviarse como propio"
      );

    correo.validarParaEnvio();

    this._registros.set(correo.id, {
      correo,
      bandeja: "enviados"
    });
  }

  recibir(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    (registro === undefined || registro.bandeja === "entrada") ||
      this.rechazarMovimiento(
        "El correo ya pertenece a otra bandeja"
      );

    correo.validarParaEnvio();

    this._registros.set(correo.id, {
      correo,
      bandeja: "entrada"
    });
  }

  eliminar(correo: Correo): void {
    const origen = this._registros.get(correo.id)?.bandeja;
    
    if (origen === undefined) {
      throw new Error("El correo no pertenece a ninguna bandeja");
    }

    if (origen === "eliminados") {
      throw new Error("El correo ya está eliminado");
    }

    this._registros.set(correo.id, {
      correo,
      bandeja: "eliminados",
      origen
    });
  }

  restaurar(correo: Correo): void {
    const origen = this._registros.get(correo.id)?.origen;

    if (origen === undefined) {
      throw new Error("El correo no está en Eliminados");
    }

    this._registros.set(correo.id, {
      correo,
      bandeja: origen
    });
  }

  get entrada(): Correo[] {
    return this.obtenerCorreos("entrada");
  }

  get enviados(): Correo[] {
    return this.obtenerCorreos("enviados");
  }

  get borradores(): Correo[] {
    return this.obtenerCorreos("borradores");
  }

  get eliminados(): Correo[] {
    return this.obtenerCorreos("eliminados");
  }

  buscarEnEntrada(texto: string): Correo[] {
    return buscarCorreos(this.entrada, texto);
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