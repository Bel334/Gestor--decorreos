import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { FiltroCorreo } from "../src/FiltroCorreo";

describe("Filtros de correos", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("aplica el mismo filtro con nombre a distintas listas", () => {
    const examen = new Correo("Examen de Paradigmas", "El lunes", ana, [luis]);
    const reunion = new Correo("Reunión", "El viernes", ana, [luis]);

    const filtro = new FiltroCorreo("Exámenes", (correo: Correo) =>
      correo.asunto.toLowerCase().includes("examen")
    );

    expect(filtro.nombre).toBe("Exámenes");
    expect(filtro.aplicar([examen, reunion])).toEqual([examen]);
    expect(filtro.aplicar([reunion])).toEqual([]);
  });

  test("vuelve a evaluar la condición cuando cambia un correo", () => {
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);
    const correos = Object.freeze([correo]);

    const filtro = new FiltroCorreo("Favoritos", (mensaje: Correo) =>
      mensaje.favorito
    );

    expect(filtro.aplicar(correos)).toEqual([]);

    correo.marcarFavorito();
    expect(filtro.aplicar(correos)).toEqual([correo]);

    correo.desmarcarFavorito();
    expect(filtro.aplicar(correos)).toEqual([]);
  });
});