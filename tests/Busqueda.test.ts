import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { buscarCorreos } from "../src/buscarCorreos";

describe("Búsqueda de correos", () => {
  test("busca por una parte del asunto sin distinguir mayúsculas", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const examen = new Correo(
      "Examen de Paradigmas",
      "El lunes",
      ana,
      [luis]
    );

    const reunion = new Correo(
      "Reunión",
      "El viernes",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([examen, reunion], "exAM");

    expect(resultado).toEqual([examen]);
  });
});