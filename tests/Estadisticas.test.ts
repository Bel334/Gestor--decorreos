import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";
import { obtenerAsuntos } from "../src/Estadisticas";

describe("Estadísticas", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("obtiene los asuntos de una bandeja", () => {
    const gestor = new GestorCorreos();
    gestor.recibir(new Correo("Examen", "El lunes", ana, [luis]));
    gestor.recibir(new Correo("Reunión", "El martes", ana, [luis]));

    expect(obtenerAsuntos(gestor.entrada)).toEqual(["Examen", "Reunión"]);
    expect(obtenerAsuntos([])).toEqual([]);
  });
});