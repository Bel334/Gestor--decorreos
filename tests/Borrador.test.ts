import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Borrador } from "../src/Borrador";

describe("Borrador", () => {
  test("crea un borrador incompleto que también es un Correo", () => {
    const borrador = new Borrador();

    expect(borrador).toBeInstanceOf(Correo);
    expect(borrador.id).toBeDefined();
    expect(borrador.asunto).toBe("");
    expect(borrador.contenido).toBe("");
    expect(borrador.remitente).toBeNull();
    expect(borrador.destinatarios).toEqual([]);
  });

  test("hereda los métodos para marcar y desmarcar favoritos", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");

    const borrador = new Borrador(
      "Aviso",
      "Hay clase",
      ana,
      [luis]
    );

    borrador.marcarFavorito();

    expect(borrador.favorito).toBe(true);

    borrador.desmarcarFavorito();

    expect(borrador.favorito).toBe(false);
  });
});