import { Correo } from "./Correo";

export function buscarCorreos(
  correos: readonly Correo[],
  texto: string
): Correo[] {
  const busqueda = texto.toLowerCase();

  return correos.filter(correo =>
    correo.asunto.toLowerCase().includes(busqueda)
  );
}