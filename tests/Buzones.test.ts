import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { ServidorCorreos } from "../src/ServidorCorreos";
import { Correo } from "../src/Correo";

describe("Buzones por contacto", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");
  const eva = new Contacto("Eva", "eva@ucp.edu.ar");
 
  test("cada contacto tiene su propio buzón", () => {
    const servidor = new ServidorCorreos();
    servidor.registrar(ana);
    servidor.registrar(luis);

    expect(servidor.buzonDe("ana@ucp.edu.ar"))
      .not.toBe(servidor.buzonDe("luis@ucp.edu.ar"));
    expect(servidor.buzonDe("ANA@ucp.edu.ar"))
      .toBe(servidor.buzonDe("ana@ucp.edu.ar"));
    expect(() => servidor.registrar(ana)).toThrow(/ya tiene/i);
    expect(() => servidor.buzonDe("nadie@ucp.edu.ar")).toThrow(/buzón/i);
  });

    test("enviar deja el correo en Enviados y una copia en cada Entrada", () => {
    const servidor = new ServidorCorreos();
    servidor.registrar(ana);
    servidor.registrar(luis);
    servidor.registrar(eva);
    const correo = new Correo("Examen", "El lunes", ana, [luis, eva]);

    servidor.enviar(correo);

    const entradaLuis = servidor.buzonDe("luis@ucp.edu.ar").entrada;
    const entradaEva = servidor.buzonDe("eva@ucp.edu.ar").entrada;
    expect(servidor.buzonDe("ana@ucp.edu.ar").enviados).toEqual([correo]);
    expect(entradaLuis.map(c => c.asunto)).toEqual(["Examen"]);
    expect(entradaEva.map(c => c.asunto)).toEqual(["Examen"]);
    expect(entradaLuis[0]).not.toBe(entradaEva[0]);
  });

  test("si un destinatario elimina el correo, a los demás no se les borra", () => {
    const servidor = new ServidorCorreos();
    servidor.registrar(ana);
    servidor.registrar(luis);
    servidor.registrar(eva);
    const correo = new Correo("Examen", "El lunes", ana, [luis, eva]);
    servidor.enviar(correo);
    const buzonLuis = servidor.buzonDe("luis@ucp.edu.ar");

    for (const copia of buzonLuis.entrada) {
      copia.marcarLeido();
      buzonLuis.eliminar(copia);
    }

    const entradaEva = servidor.buzonDe("eva@ucp.edu.ar").entrada;
    expect(buzonLuis.entrada).toEqual([]);
    expect(buzonLuis.eliminados).toHaveLength(1);
    expect(entradaEva).toHaveLength(1);
    expect(entradaEva.map(c => c.leido)).toEqual([false]);
    expect(servidor.buzonDe("ana@ucp.edu.ar").enviados).toEqual([correo]);
  });

  test("no envía nada si un destinatario no tiene buzón", () => {
    const servidor = new ServidorCorreos();
    servidor.registrar(ana);
    servidor.registrar(luis);
    const correo = new Correo("Examen", "El lunes", ana, [luis, eva]);

    expect(() => servidor.enviar(correo)).toThrow(/buzón/i);
    expect(servidor.buzonDe("ana@ucp.edu.ar").enviados).toEqual([]);
    expect(servidor.buzonDe("luis@ucp.edu.ar").entrada).toEqual([]);
  });
  
});