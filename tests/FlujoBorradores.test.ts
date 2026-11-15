import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Borrador } from "../src/Borrador";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Recorrido de borradores editados", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("envía la versión actualizada usando la referencia original", () => {
    const gestor = new GestorCorreos();
    const original = new Borrador();

    gestor.guardarBorrador(original);

    const editado = gestor.editarBorrador(original.id, {
      asunto: "Entrega",
      contenido: "Adjunto el trabajo",
      remitente: ana,
      destinatarios: [luis]
    });

    gestor.enviar(original);

    expect(gestor.borradores).toEqual([]);
    expect(gestor.enviados).toEqual([editado]);
    expect(gestor.enviados[0]?.id).toBe(original.id);
    expect(gestor.enviados[0]?.asunto).toBe("Entrega");
  });

  test("rechaza el envío cuando la edición deja un asunto vacío", () => {
    const gestor = new GestorCorreos();
    const original = new Borrador("Aviso", "Hay clase", ana, [luis]);

    gestor.guardarBorrador(original);

    const editado = gestor.editarBorrador(original.id, {
      asunto: "   "
    });

    expect(() => gestor.enviar(original)).toThrow(/asunto/i);
    expect(gestor.borradores).toEqual([editado]);
    expect(gestor.enviados).toEqual([]);
  });

  test("conserva la edición y el favorito al eliminar y restaurar", () => {
    const gestor = new GestorCorreos();
    const original = new Borrador("Aviso", "Hay clase", ana, [luis]);

    gestor.guardarBorrador(original);

    const editado = gestor.editarBorrador(original.id, {
      asunto: "Aviso actualizado"
    });

    editado.marcarFavorito();

    gestor.eliminar(original);

    expect(gestor.borradores).toEqual([]);
    expect(gestor.eliminados).toEqual([editado]);
    expect(gestor.favoritos).toEqual([]);

    gestor.restaurar(original);

    expect(gestor.borradores).toEqual([editado]);
    expect(gestor.eliminados).toEqual([]);
    expect(gestor.favoritos).toEqual([editado]);
  });

  test("volver a guardar el objeto anterior conserva la edición actual", () => {
    const gestor = new GestorCorreos();
    const original = new Correo("Aviso", "Hay clase", ana, [luis]);

    gestor.guardarBorrador(original);

    const editado = gestor.editarBorrador(original.id, {
      asunto: "Entrega"
    });

    gestor.guardarBorrador(original);

    expect(gestor.borradores).toEqual([editado]);
    expect(gestor.borradores[0]?.asunto).toBe("Entrega");
  });
});