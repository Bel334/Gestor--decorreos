import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";
import { FiltroCorreo } from "../src/FiltroCorreo";

describe("Favoritos", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("muestra los favoritos de todas las bandejas sin moverlos", () => {
    const gestor = new GestorCorreos();
    const recibido = new Correo("Aviso", "Hay clase", ana, [luis]);
    const enviado = new Correo("Examen", "El lunes", ana, [luis]);
    const comun = new Correo("Hola", "Saludos", ana, [luis]);
    gestor.recibir(recibido);
    gestor.enviar(enviado);
    gestor.recibir(comun);

    recibido.marcarFavorito();
    enviado.marcarFavorito();

    expect(gestor.favoritos).toEqual([recibido, enviado]);
    expect(gestor.entrada).toEqual([recibido, comun]);
    expect(gestor.enviados).toEqual([enviado]);
  });

 test("oculta los favoritos eliminados hasta restaurarlos", () => {
    const gestor = new GestorCorreos();
    const correo = new Correo("Aviso", "Hay clase", ana, [luis]);
    gestor.recibir(correo);
    correo.marcarFavorito();

    gestor.eliminar(correo);

    expect(gestor.favoritos).toEqual([]);
    expect(correo.favorito).toBe(true);

    gestor.restaurar(correo);

    expect(gestor.favoritos).toEqual([correo]);
  });

  test("permite aplicar un filtro sobre los favoritos", () => {
    const gestor = new GestorCorreos();
    const pedro = new Contacto("Pedro", "pedro@gmail.com");
    const deUcp = new Correo("Examen", "El lunes", ana, [luis]);
    const deGmail = new Correo("Hola", "Saludos", pedro, [luis]);
    gestor.recibir(deUcp);
    gestor.recibir(deGmail);
    deUcp.marcarFavorito();
    deGmail.marcarFavorito();

    const filtro = new FiltroCorreo("Correos de la UCP", correo =>
      correo.remitente?.email.endsWith("@ucp.edu.ar") ?? false
    );

    expect(filtro.aplicar(gestor.favoritos)).toEqual([deUcp]);
  });
});