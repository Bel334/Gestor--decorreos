import { describe, expect, test } from "vitest";
import { Borrador } from "../src/Borrador";
import { Contacto } from "../src/Contacto";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Recorrido completo", () => {
  test("borrador, edición, envío, favorito, eliminación y restauración", () => {
    const ana = new Contacto("Ana", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis", "luis@ucp.edu.ar");
    const gestor = new GestorCorreos();

    const borrador = new Borrador();
    gestor.guardarBorrador(borrador);
    expect(gestor.borradores).toEqual([borrador]);

    const editado = gestor.editarBorrador(borrador.id, {
      asunto: "Examen",
      contenido: "El parcial es el lunes",
      remitente: ana,
      destinatarios: [luis]
    });
    expect(editado.id).toBe(borrador.id);
    expect(gestor.borradores).toEqual([editado]);

    gestor.enviar(editado);
    expect(gestor.borradores).toEqual([]);
    expect(gestor.enviados).toEqual([editado]);

    editado.marcarFavorito();
    expect(gestor.favoritos).toEqual([editado]);

    gestor.eliminar(editado);
    expect(gestor.enviados).toEqual([]);
    expect(gestor.eliminados).toEqual([editado]);
    expect(gestor.favoritos).toEqual([]);

    gestor.restaurar(editado);
    expect(gestor.eliminados).toEqual([]);
    expect(gestor.enviados).toEqual([editado]);
    expect(gestor.favoritos).toEqual([editado]);
  });
});