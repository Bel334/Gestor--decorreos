import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { buscarCorreos } from "../src/buscarCorreos";

describe("Casos límite de búsqueda", () => {
  test("devuelve una lista vacía cuando no hay correos", () => {
    const resultado = buscarCorreos([], "examen");

    expect(resultado).toEqual([]);
  });

  test("devuelve una lista vacía cuando no hay coincidencias", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([correo], "vacaciones");

    expect(resultado).toEqual([]);
  });

  test("conserva la lista original y los datos del correo", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "EXAMEN",
      "El LUNES",
      ana,
      [luis]
    );

    const otro = new Correo(
      "Reunión",
      "El viernes",
      ana,
      [luis]
    );

    const correos = Object.freeze([otro, correo]);
    const idOriginal = correo.id;

    const resultado = buscarCorreos(correos, "examen");

    expect(resultado).toEqual([correo]);
    expect(correos).toEqual([otro, correo]);
    expect(correo.id).toBe(idOriginal);
    expect(correo.asunto).toBe("EXAMEN");
    expect(correo.contenido).toBe("El LUNES");
    expect(correo.remitente).toBe(ana);
    expect(correo.destinatarios).toEqual([luis]);
    expect(correo.leido).toBe(false);
    expect(correo.favorito).toBe(false);
  });
});