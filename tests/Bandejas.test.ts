import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Bandejas", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("eliminar mueve el correo a Eliminados", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);
    gestor.recibir(correo);

    gestor.eliminar(correo);

    expect(gestor.entrada).toEqual([]);
    expect(gestor.eliminados).toEqual([correo]);
  });
});