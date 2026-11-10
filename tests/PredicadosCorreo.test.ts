import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { FiltroCorreo } from "../src/FiltroCorreo";
import { and, or, not } from "../src/predicadosCorreo";

describe("Combinación de condiciones", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  const esExamen = (correo: Correo) =>
    correo.asunto.toLowerCase().includes("examen");

  const esFavorito = (correo: Correo) => correo.favorito;

  function crearCorreos() {
    const examenFavorito = new Correo("Examen", "El lunes", ana, [luis]);
    const examenComun = new Correo("Examen", "El martes", ana, [luis]);
    const avisoFavorito = new Correo("Aviso", "Hay clase", ana, [luis]);
    const avisoComun = new Correo("Aviso", "Cambio de aula", ana, [luis]);

    examenFavorito.marcarFavorito();
    avisoFavorito.marcarFavorito();

    return {
      todos: [examenFavorito, examenComun, avisoFavorito, avisoComun],
      examenFavorito,
      examenComun,
      avisoFavorito,
      avisoComun
    };
  }

  test("AND exige que se cumplan ambas condiciones", () => {
    const { todos, examenFavorito } = crearCorreos();

    const filtro = new FiltroCorreo(
      "Exámenes favoritos",
      and(esExamen, esFavorito)
    );

    expect(filtro.aplicar(todos)).toEqual([examenFavorito]);
  });

  test("OR incluye correos que cumplen una o ambas condiciones", () => {
    const { todos, examenFavorito, examenComun, avisoFavorito } = crearCorreos();

    const filtro = new FiltroCorreo(
      "Exámenes o favoritos",
      or(esExamen, esFavorito)
    );

    expect(filtro.aplicar(todos)).toEqual([
      examenFavorito,
      examenComun,
      avisoFavorito
    ]);
  });

  test("NOT invierte el resultado de una condición", () => {
    const { todos, examenComun, avisoComun } = crearCorreos();

    const filtro = new FiltroCorreo("Sin favorito", not(esFavorito));

    expect(filtro.aplicar(todos)).toEqual([examenComun, avisoComun]);
  });

  test("permite combinar AND, OR y NOT en un mismo filtro", () => {
    const { todos, avisoFavorito } = crearCorreos();

    const filtro = new FiltroCorreo(
      "Exámenes o favoritos, excluyendo exámenes",
      and(or(esExamen, esFavorito), not(esExamen))
    );

    expect(filtro.aplicar(todos)).toEqual([avisoFavorito]);
  });
});
