import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Envío de correos", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");
  const eva = new Contacto("Eva", "eva@ucp.edu.ar");

  test("envía correos de distintos remitentes a varios destinatarios", () => {
    const gestor = new GestorCorreos();

    const correo1 = new Correo(
      "Examen", "El lunes", ana, [luis, eva]
    );

    const correo2 = new Correo(
      "Reunión", "El martes", luis, [ana, eva]
    );

    gestor.enviar(correo1);
    gestor.enviar(correo2);

    expect(gestor.enviados).toEqual([correo1, correo2]);
    expect(correo1.remitente).toBe(ana);
    expect(correo2.remitente).toBe(luis);
    expect(correo1.destinatarios).toEqual([luis, eva]);
    expect(correo2.destinatarios).toEqual([ana, eva]);
  });

  test("enviar dos veces el mismo correo no lo duplica", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);

    gestor.enviar(correo);
    gestor.enviar(correo);

    expect(gestor.enviados).toEqual([correo]);
  });

  test("al enviar un borrador lo retira de Borradores", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);

    gestor.guardarBorrador(correo);

    expect(gestor.borradores).toEqual([correo]);

    gestor.enviar(correo);

    expect(gestor.borradores).toEqual([]);
    expect(gestor.enviados).toEqual([correo]);
  });

  test("rechaza un asunto vacío y conserva el borrador", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("   ", "Hay clase", ana, [luis]);

    gestor.guardarBorrador(correo);

    expect(() => gestor.enviar(correo)).toThrow(/asunto/i);
    expect(gestor.borradores).toEqual([correo]);
    expect(gestor.enviados).toEqual([]);
  });

  test("rechaza enviar un correo sin remitente", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", null, [luis]);

    expect(() => gestor.enviar(correo)).toThrow(/remitente/i);
    expect(gestor.enviados).toEqual([]);
  });

  test("rechaza enviar un correo sin destinatarios", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, []);

    expect(() => gestor.enviar(correo)).toThrow(/destinatario/i);
    expect(gestor.enviados).toEqual([]);
  });

  test("permite guardar un borrador incompleto", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("", "", null, []);

    gestor.guardarBorrador(correo);

    expect(gestor.borradores).toEqual([correo]);
    expect(gestor.enviados).toEqual([]);
  });

  test("permite enviar un correo con el cuerpo vacío", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "", ana, [luis]);

    gestor.enviar(correo);

    expect(gestor.enviados).toEqual([correo]);
  });
});