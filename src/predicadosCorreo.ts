import type { PredicadoCorreo } from "./FiltroCorreo";

export function and(...condiciones: PredicadoCorreo[]): PredicadoCorreo {
  return correo => condiciones.every(condicion => condicion(correo));
}

export function or(...condiciones: PredicadoCorreo[]): PredicadoCorreo {
  return correo => condiciones.some(condicion => condicion(correo));
}

export function not(condicion: PredicadoCorreo): PredicadoCorreo {
  return correo => !condicion(correo);
}