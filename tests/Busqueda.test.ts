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

  test("busca por una parte del contenido sin distinguir mayúsculas", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const aviso = new Correo(
      "Aviso",
      "Recordar la ENTREGA del trabajo",
      ana,
      [luis]
    );

    const reunion = new Correo(
      "Reunión",
      "El viernes",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([aviso, reunion], "entreg");

    expect(resultado).toEqual([aviso]);
  });

  test("no duplica un correo que coincide en asunto y contenido", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Entrega",
      "Recordatorio de entrega",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([correo], "entrega");

    expect(resultado).toEqual([correo]);
  });

  test("busca por una parte del nombre del remitente", () => {
    const ana = new Contacto("Ana Gómez", "agomez@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([correo], "gÓME");

    expect(resultado).toEqual([correo]);
  });

  test("busca por una parte del email del remitente", () => {
    const ana = new Contacto("Ana Gómez", "agomez@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis]
    );

    const resultado = buscarCorreos([correo], "AGOMEZ@");

    expect(resultado).toEqual([correo]);
  });

  test("permite buscar aunque un correo no tenga remitente", () => {
    const correo = new Correo(
      "Pendiente",
      "Falta completar",
      null,
      []
    );

    const resultado = buscarCorreos([correo], "docente");

    expect(resultado).toEqual([]);
  });

  test("busca por el nombre de un destinatario que no es el primero", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");
    const lucia = new Contacto(
      "Lucía Pérez",
      "lucia.perez@ucp.edu.ar"
    );

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis, lucia]
    );

    const resultado = buscarCorreos([correo], "péRE");

    expect(resultado).toEqual([correo]);
  });

  test("busca por el email de un destinatario que no es el primero", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");
    const lucia = new Contacto(
      "Lucía Pérez",
      "lucia.perez@ucp.edu.ar"
    );

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis, lucia]
    );

    const resultado = buscarCorreos([correo], "PEREZ@");

    expect(resultado).toEqual([correo]);
  });

  test("no duplica un correo que coincide también en sus contactos", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const otraAna = new Contacto(
      "Ana Gómez",
      "ana.gomez@ucp.edu.ar"
    );

    const correo = new Correo(
      "Consulta de Ana",
      "Ana necesita información",
      ana,
      [otraAna]
    );

    const resultado = buscarCorreos([correo], "ana");

    expect(resultado).toEqual([correo]);
  });
});