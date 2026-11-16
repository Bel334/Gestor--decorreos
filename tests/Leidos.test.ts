import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";
import { FiltroCorreo } from "../src/FiltroCorreo";
import { obtenerNoLeidos } from "../src/Estadisticas";

describe("Leído y no leído", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("mantiene el estado al consultar la bandeja", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);
    gestor.recibir(correo);

    correo.marcarLeido();

    expect(gestor.entrada.map(c => c.leido)).toEqual([true]);
  });

  test("obtiene los no leídos de una bandeja", () => {
    const gestor = new GestorCorreos();
    const leido = new Correo("Examen", "El lunes", ana, [luis]);
    const pendiente = new Correo("Reunión", "El martes", ana, [luis]);
    gestor.recibir(leido);
    gestor.recibir(pendiente);

    leido.marcarLeido();

    expect(obtenerNoLeidos(gestor.entrada)).toEqual([pendiente]);
    expect(obtenerNoLeidos([])).toEqual([]);
  });

  test("el cambio de estado se refleja en los filtros", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);
    gestor.recibir(correo);
    const filtro = new FiltroCorreo("No leídos", c => !c.leido);

    expect(filtro.aplicar(gestor.entrada)).toEqual([correo]);

    correo.marcarLeido();
    expect(filtro.aplicar(gestor.entrada)).toEqual([]);

    correo.marcarNoLeido();
    expect(filtro.aplicar(gestor.entrada)).toEqual([correo]);
  });
});