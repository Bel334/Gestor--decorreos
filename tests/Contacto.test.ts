import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";

describe("Contacto", () => {
  test("guarda el nombre y el email", () => {
    const contacto = new Contacto("Ana", "ana@ucp.edu.ar");

    expect(contacto.nombre).toBe("Ana");
    expect(contacto.email).toBe("ana@ucp.edu.ar");
  });

  test("rechaza un email con formato inválido", () => {
  expect(() => new Contacto("Ana", "ana.ucp.edu.ar")).toThrow(/email/i);
  });
});