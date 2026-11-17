import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { ServidorCorreos } from "../src/ServidorCorreos";

describe("Buzones por contacto", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

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
});