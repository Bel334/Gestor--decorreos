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

    test("restaurar devuelve cada correo a su bandeja de origen", () => {
        const gestor = new GestorCorreos();
        const recibido = new Correo("Aviso", "Hay clase", ana, [luis]);
        const enviado = new Correo("Examen", "El lunes", ana, [luis]);
        gestor.recibir(recibido);
        gestor.enviar(enviado);
        gestor.eliminar(recibido);
        gestor.eliminar(enviado);

        gestor.restaurar(recibido);
        gestor.restaurar(enviado);

        expect(gestor.eliminados).toEqual([]);
        expect(gestor.entrada).toEqual([recibido]);
        expect(gestor.enviados).toEqual([enviado]);
    });

    test("rechaza movimientos inválidos", () => {
        const gestor = new GestorCorreos();
        const correo = new Correo("Aviso", "Hay clase", ana, [luis]);

        expect(() => gestor.eliminar(correo)).toThrow(/ninguna bandeja/i);
        expect(() => gestor.restaurar(correo)).toThrow(/eliminados/i);

        gestor.recibir(correo);
        gestor.eliminar(correo);

        expect(() => gestor.eliminar(correo)).toThrow(/ya está eliminado/i);

        gestor.restaurar(correo);
        expect(gestor.entrada).toEqual([correo]);
    });
});