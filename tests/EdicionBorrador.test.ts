import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Borrador } from "../src/Borrador";

describe("Edición de un borrador", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("cambia el asunto y conserva los demás datos", () => {
    const borrador = new Borrador("Aviso", "Texto inicial", ana, [luis]);
    const editado = borrador.editar({ asunto: "Entrega" });

    expect(editado).toBeInstanceOf(Borrador);
    expect(editado.id).toBe(borrador.id);
    expect(editado.asunto).toBe("Entrega");
    expect(editado.contenido).toBe("Texto inicial");
    expect(editado.remitente).toBe(ana);
    expect(editado.destinatarios).toEqual([luis]);
    expect(borrador.asunto).toBe("Aviso");
  });

  test("permite vaciar los campos y conserva el favorito", () => {
    const borrador = new Borrador("Aviso", "Hay clase", ana, [luis]);
    borrador.marcarFavorito();

    const editado = borrador.editar({
      asunto: "",
      contenido: "",
      remitente: null,
      destinatarios: []
    });

    expect(editado.id).toBe(borrador.id);
    expect(editado.asunto).toBe("");
    expect(editado.contenido).toBe("");
    expect(editado.remitente).toBeNull();
    expect(editado.destinatarios).toEqual([]);
    expect(editado.favorito).toBe(true);
  });

  test("protege la lista de destinatarios después de editar", () => {
    const borrador = new Borrador();
    const destinatarios = [luis];
    const editado = borrador.editar({ destinatarios });

    destinatarios.pop();
    const consulta = editado.destinatarios;
    consulta.pop();

    expect(editado.destinatarios).toEqual([luis]);
    expect(borrador.destinatarios).toEqual([]);
  });
});
