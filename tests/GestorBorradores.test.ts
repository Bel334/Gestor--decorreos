import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Borrador } from "../src/Borrador";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Borradores en el gestor", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("edita un borrador creado con la clase Correo", () => {
    const gestor = new GestorCorreos();
    const original = new Correo("", "Texto inicial", null, []);

    gestor.guardarBorrador(original);

    const editado = gestor.editarBorrador(original.id, {
      asunto: "Entrega"
    });

    expect(editado).toBeInstanceOf(Borrador);
    expect(editado.id).toBe(original.id);
    expect(editado.asunto).toBe("Entrega");
    expect(editado.contenido).toBe("Texto inicial");
    expect(editado.remitente).toBeNull();
    expect(editado.destinatarios).toEqual([]);
    expect(gestor.borradores).toEqual([editado]);
  });

  test("conserva los cambios de varias ediciones", () => {
    const gestor = new GestorCorreos();
    const original = new Borrador();

    gestor.guardarBorrador(original);

    gestor.editarBorrador(original.id, {
      asunto: "Entrega"
    });

    const editado = gestor.editarBorrador(original.id, {
      contenido: "Adjunto el trabajo",
      remitente: ana,
      destinatarios: [luis]
    });

    expect(editado.id).toBe(original.id);
    expect(editado.asunto).toBe("Entrega");
    expect(editado.contenido).toBe("Adjunto el trabajo");
    expect(editado.remitente).toBe(ana);
    expect(editado.destinatarios).toEqual([luis]);
    expect(gestor.borradores).toEqual([editado]);
  });

  test("rechaza editar correos de otras bandejas", () => {
    const gestor = new GestorCorreos();

    const recibido = new Correo("Aviso", "Hay clase", ana, [luis]);
    const enviado = new Correo("Entrega", "El lunes", ana, [luis]);
    const eliminado = new Borrador();

    gestor.recibir(recibido);
    gestor.enviar(enviado);
    gestor.guardarBorrador(eliminado);
    gestor.eliminar(eliminado);

    [recibido, enviado, eliminado].forEach(correo => {
      expect(() => gestor.editarBorrador(correo.id, {
        asunto: "Cambio"
      })).toThrow(/solo se pueden editar borradores/i);
    });

    expect(gestor.entrada).toEqual([recibido]);
    expect(gestor.enviados).toEqual([enviado]);
    expect(gestor.eliminados).toEqual([eliminado]);
  });

  test("rechaza editar un correo inexistente", () => {
    const gestor = new GestorCorreos();

    expect(() => gestor.editarBorrador("inexistente", {
      asunto: "Cambio"
    })).toThrow(/no existe/i);
  });
});