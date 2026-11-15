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