import { describe, expect, test } from "vitest";
import { FiltroCorreo } from "../src/FiltroCorreo";
import { RegistroFiltros } from "../src/RegistroFiltros";

describe("Registro de filtros", () => {
  test("registra un filtro y permite consultarlo por nombre", () => {
    const registro = new RegistroFiltros();

    const filtro = new FiltroCorreo("Exámenes", correo =>
      correo.asunto.toLowerCase().includes("examen")
    );

    registro.registrar(filtro);

    expect(registro.consultar("Exámenes")).toBe(filtro);
    expect(registro.consultar("Inexistente")).toBeUndefined();
    expect(registro.filtros).toEqual([filtro]);
  });

  test("admite cinco filtros y conserva los anteriores al rechazar el sexto", () => {
    const registro = new RegistroFiltros();

    const filtros = Array.from({ length: 5 }, (_, indice) =>
      new FiltroCorreo(`Filtro ${indice + 1}`, () => true)
    );

    filtros.forEach(filtro => registro.registrar(filtro));

    const sexto = new FiltroCorreo("Filtro 6", () => true);

    expect(() => registro.registrar(sexto)).toThrow(/cinco filtros/i);
    expect(registro.filtros).toEqual(filtros);
  });

  test("rechaza un nombre repetido y conserva el filtro original", () => {
    const registro = new RegistroFiltros();

    const original = new FiltroCorreo("Favoritos", correo => correo.favorito);
    const repetido = new FiltroCorreo("Favoritos", () => false);

    registro.registrar(original);

    expect(() => registro.registrar(repetido)).toThrow(/ya existe/i);
    expect(registro.consultar("Favoritos")).toBe(original);
    expect(registro.filtros).toEqual([original]);
  });
});