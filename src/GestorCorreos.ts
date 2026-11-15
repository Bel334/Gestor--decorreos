import { Correo } from "./Correo";
import { Borrador } from "./Borrador";
import type { CambiosBorrador } from "./Borrador";
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
      correo: registro?.correo ?? correo,
      bandeja: "borradores"
    });
  }

  editarBorrador(
    id: string,
    cambios: CambiosBorrador
  ): Borrador {
    const registro = this._registros.get(id) ??
      this.rechazarMovimiento("El correo no existe");

    registro.bandeja === "borradores" ||
      this.rechazarMovimiento(
        "Solo se pueden editar borradores"
      );

    const editado = Borrador.desdeCorreo(registro.correo, cambios);

    registro.correo = editado;

    return editado;
  }

  enviar(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    registro?.bandeja !== "entrada" ||
      this.rechazarMovimiento(
        "Un correo recibido no puede enviarse como propio"
      );

    registro?.bandeja !== "eliminados" ||
      this.rechazarMovimiento(
        "Un correo eliminado debe restaurarse antes de enviarse"
      );

    const actual = registro?.correo ?? correo;

    actual.validarParaEnvio();

    this._registros.set(actual.id, {
      correo: actual,
      bandeja: "enviados"
    });
  }

  recibir(correo: Correo): void {
    const registro = this._registros.get(correo.id);

    (registro === undefined || registro.bandeja === "entrada") ||
      this.rechazarMovimiento(
        "El correo ya pertenece a otra bandeja"
      );

    const actual = registro?.correo ?? correo;

    actual.validarParaEnvio();

    this._registros.set(actual.id, {
      correo: actual,
      bandeja: "entrada"
    });
  }

  eliminar(correo: Correo): void {
    const registro = this._registros.get(correo.id) ??
      this.rechazarMovimiento(
        "El correo no pertenece a ninguna bandeja"
      );

    registro.bandeja !== "eliminados" ||
      this.rechazarMovimiento("El correo ya está eliminado");

    this._registros.set(correo.id, {
      correo: registro.correo,
      bandeja: "eliminados",
      origen: registro.bandeja
    });
  }

  restaurar(correo: Correo): void {
    const registro = this._registros.get(correo.id) ??
      this.rechazarMovimiento(
        "El correo no está en Eliminados"
      );

    registro.bandeja === "eliminados" ||
      this.rechazarMovimiento(
        "El correo no está en Eliminados"
      );

    const origen = registro.origen ??
      this.rechazarMovimiento(
        "El correo no tiene una bandeja de origen"
      );

    this._registros.set(correo.id, {
      correo: registro.correo,
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

  get favoritos(): Correo[] {
    return [...this._registros.values()]
      .filter(registro => registro.bandeja !== "eliminados")
      .map(registro => registro.correo)
      .filter(correo => correo.favorito);
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
