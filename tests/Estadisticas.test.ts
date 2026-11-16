import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";
import { contarPorRemitente, obtenerAsuntos, obtenerQueCumplen } from "../src/Estadisticas";

describe("Estadísticas", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("obtiene los asuntos de una bandeja", () => {
    const gestor = new GestorCorreos();
    gestor.recibir(new Correo("Examen", "El lunes", ana, [luis]));
    gestor.recibir(new Correo("Reunión", "El martes", ana, [luis]));

    expect(obtenerAsuntos(gestor.entrada)).toEqual(["Examen", "Reunión"]);
    expect(obtenerAsuntos([])).toEqual([]);
  });

  test("obtiene los correos que cumplen una condición", () => {
    const examen = new Correo("Examen", "El lunes", ana, [luis]);
    const reunion = new Correo("Reunión", "El martes", ana, [luis]);
    const correos = [examen, reunion];
    examen.marcarFavorito();

    const resultado = obtenerQueCumplen(correos, correo => correo.favorito);

    expect(resultado).toEqual([examen]);
    expect(correos).toEqual([examen, reunion]);
  });

  test("cuenta los correos por remitente", () => {
    const pedro = new Contacto("Pedro", "pedro@gmail.com");
    const correos = [
      new Correo("Examen", "El lunes", ana, [luis]),
      new Correo("Reunión", "El martes", ana, [luis]),
      new Correo("Hola", "Saludos", pedro, [luis]),
      new Correo("", "", null, [])
    ];

    expect(contarPorRemitente(correos)).toEqual({
      "ana@ucp.edu.ar": 2,
      "pedro@gmail.com": 1,
      "sin remitente": 1
    });
    expect(contarPorRemitente([])).toEqual({});
  });
});