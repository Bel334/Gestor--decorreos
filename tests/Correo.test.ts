import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("Correo", () => {
  test("guarda los datos del mensaje", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Examen",
      "El parcial es el lunes",
      remitente,
      [destinatario]
    );

    expect(correo.asunto).toBe("Examen");
    expect(correo.contenido).toBe("El parcial es el lunes");
    expect(correo.remitente).toBe(remitente);
    expect(correo.destinatarios).toEqual([destinatario]);
  });

  test("cada correo tiene un identificador diferente", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo1 = new Correo(
      "Examen", "El lunes", remitente, [destinatario]
    );

    const correo2 = new Correo(
      "Examen", "El lunes", remitente, [destinatario]
    );

    expect(correo1.id).toBeDefined();
    expect(correo2.id).toBeDefined();
    expect(correo1.id).not.toBe(correo2.id);
  });

  test("comienza no leído y sin marcar como favorito", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Aviso",
      "Hay clase el lunes",
      remitente,
      [destinatario]
    );

    expect(correo.leido).toBe(false);
    expect(correo.favorito).toBe(false);
  });

  test("no cambia al modificar el array original de destinatarios", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");
    const destinatarios = [destinatario];

    const correo = new Correo(
      "Aviso",
      "Hay clase el lunes",
      remitente,
      destinatarios
    );

    destinatarios.pop();

    expect(correo.destinatarios).toEqual([destinatario]);
  });

  test("no cambia al modificar los destinatarios consultados", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Aviso",
      "Hay clase el lunes",
      remitente,
      [destinatario]
    );

    const destinatariosConsultados = correo.destinatarios;
    destinatariosConsultados.pop();

    expect(correo.destinatarios).toEqual([destinatario]);
  });

  test("se puede marcar y desmarcar como favorito", () => {
    const remitente = new Contacto("Ana", "ana@ucp.edu.ar");
    const destinatario = new Contacto("Luis", "luis@ucp.edu.ar");
    const correo = new Correo("Aviso", "Hay clase", remitente, [destinatario]);

    correo.marcarFavorito();
    expect(correo.favorito).toBe(true);

    correo.desmarcarFavorito();
    expect(correo.favorito).toBe(false);
  });
});