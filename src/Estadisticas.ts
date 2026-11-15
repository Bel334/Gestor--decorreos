import type { Correo } from "./Correo";

export function obtenerAsuntos(correos: readonly Correo[]): string[] {
  return correos.map(correo => correo.asunto);
}