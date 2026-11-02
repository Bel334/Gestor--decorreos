import { describe, expect, test } from "vitest";
import { AgendaContactos } from "../src/AgendaContactos";
import { Contacto } from "../src/Contacto";

describe("Agenda de contactos", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");

    test("agrega y consulta un contacto", () => {
    const agenda = new AgendaContactos();
    agenda.agregar(ana);
    expect(agenda.consultar("ana@ucp.edu.ar")).toBe(ana);
    expect(agenda.contactos).toEqual([ana]);
    });

    test("rechaza un email duplicado sin distinguir mayúsculas", () => {
    const agenda = new AgendaContactos();
    agenda.agregar(ana);

    expect(() =>
      agenda.agregar(new Contacto("Otra Ana", "ANA@ucp.edu.ar"))
    ).toThrow(/existe/i);
    expect(agenda.contactos).toEqual([ana]);
    });
});