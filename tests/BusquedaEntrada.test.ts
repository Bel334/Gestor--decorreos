import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";

describe("Búsqueda en Entrada", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("busca entre los correos recibidos", () => {
    const gestor = new GestorCorreos();

    const correo = new Correo(
      "Examen de Paradigmas",
      "El lunes",
      ana,
      [luis]
    );

    gestor.recibir(correo);

    expect(gestor.entrada).toEqual([correo]);
    expect(gestor.buscarEnEntrada("exAM")).toEqual([correo]);
  });

  test("busca solamente en Entrada y conserva las bandejas", () => {
    const gestor = new GestorCorreos();

    const recibido = new Correo(
      "Examen", "El lunes", ana, [luis]
    );

    const enviado = new Correo(
      "Examen", "El martes", ana, [luis]
    );

    const borrador = new Correo(
      "Examen", "El miércoles", ana, [luis]
    );

    gestor.recibir(recibido);
    gestor.enviar(enviado);
    gestor.guardarBorrador(borrador);

    const resultado = gestor.buscarEnEntrada("examen");

    expect(resultado).toEqual([recibido]);
    expect(gestor.entrada).toEqual([recibido]);
    expect(gestor.enviados).toEqual([enviado]);
    expect(gestor.borradores).toEqual([borrador]);
  });

  test("permite buscar por datos de los destinatarios en Entrada", () => {
    const gestor = new GestorCorreos();

    const correo = new Correo(
      "Aviso",
      "Hay clase",
      ana,
      [luis]
    );

    gestor.recibir(correo);

    const resultado = gestor.buscarEnEntrada("LUIS@");

    expect(resultado).toEqual([correo]);
  });

  test("devuelve una lista vacía cuando Entrada está vacía", () => {
    const gestor = new GestorCorreos();

    const resultado = gestor.buscarEnEntrada("examen");

    expect(resultado).toEqual([]);
  });
});