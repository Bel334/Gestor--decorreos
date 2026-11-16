import type { Correo } from "./Correo";
import type { PredicadoCorreo } from "./FiltroCorreo";

export function obtenerAsuntos(correos: readonly Correo[]): string[] {
  return correos.map(correo => correo.asunto);
}

export function obtenerQueCumplen(
  correos: readonly Correo[],
  condicion: PredicadoCorreo
): Correo[] {
  return correos.filter(condicion);
}

export function contarPorRemitente(
  correos: readonly Correo[]
): Record<string, number> {
  return correos.reduce<Record<string, number>>((conteo, correo) => {
    const clave = correo.remitente?.email ?? "sin remitente";

    return { ...conteo, [clave]: (conteo[clave] ?? 0) + 1 };
  }, {});
}