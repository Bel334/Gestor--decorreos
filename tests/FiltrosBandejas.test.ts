import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorCorreos } from "../src/GestorCorreos";
import { RegistroFiltros } from "../src/RegistroFiltros";
import {
  academicosImportantes,
  entregasFavoritas
} from "../src/filtrosCompuestos";

describe("Filtros sobre bandejas", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("aplica un filtro registrado sobre Entrada y Enviados", () => {
    const gestor = new GestorCorreos();
    const registro = new RegistroFiltros();

    const recibido = new Correo("Examen", "El lunes", ana, [luis]);
    const enviado = new Correo("Examen", "El martes", ana, [luis]);
    const aviso = new Correo("Aviso", "Hay clase", ana, [luis]);

    gestor.recibir(recibido);
    gestor.recibir(aviso);
    gestor.enviar(enviado);

    registro.registrar(academicosImportantes);

    const filtro = registro.consultar("Académicos importantes");

    expect(filtro).toBeDefined();
    expect(filtro?.aplicar(gestor.entrada)).toEqual([recibido]);
    expect(filtro?.aplicar(gestor.enviados)).toEqual([enviado]);

    expect(gestor.entrada).toEqual([recibido, aviso]);
    expect(gestor.enviados).toEqual([enviado]);
  });

  test("filtra favoritos y refleja la eliminación y restauración", () => {
    const gestor = new GestorCorreos();

    const entrega = new Correo("Aviso", "Entrega del TP", ana, [luis]);
    const aviso = new Correo("Aviso", "Hay clase", ana, [luis]);

    gestor.recibir(entrega);
    gestor.enviar(aviso);

    entrega.marcarFavorito();
    aviso.marcarFavorito();

    expect(entregasFavoritas.aplicar(gestor.favoritos)).toEqual([
      entrega
    ]);

    gestor.eliminar(entrega);

    expect(entregasFavoritas.aplicar(gestor.favoritos)).toEqual([]);
    expect(entrega.favorito).toBe(true);

    gestor.restaurar(entrega);

    expect(entregasFavoritas.aplicar(gestor.favoritos)).toEqual([
      entrega
    ]);
  });
});