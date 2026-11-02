import { describe, expect, test } from "vitest";
import { AgendaContactos } from "../src/AgendaContactos";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

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

    test("modifica un contacto y rechaza uno inexistente", () => {
     const agenda = new AgendaContactos();
     agenda.agregar(ana);

     agenda.modificar("ana@ucp.edu.ar", "Ana Gómez", "agomez@ucp.edu.ar");

     expect(agenda.consultar("ana@ucp.edu.ar")).toBeUndefined();
     expect(agenda.consultar("agomez@ucp.edu.ar")?.nombre).toBe("Ana Gómez");
     expect(() =>
     agenda.modificar("nadie@ucp.edu.ar", "Nadie", "n@ucp.edu.ar")
     ).toThrow(/no existe/i);
    });

    test("eliminar un contacto no afecta a sus correos", () => {
     const agenda = new AgendaContactos();
     agenda.agregar(ana);
     const correo = new Correo("Aviso", "Hay clase", ana, []);
     agenda.eliminar("ana@ucp.edu.ar");
     expect(agenda.consultar("ana@ucp.edu.ar")).toBeUndefined();
     expect(correo.remitente).toBe(ana);
     expect(() => agenda.eliminar("nadie@ucp.edu.ar")).toThrow(/no existe/i);
    });
});