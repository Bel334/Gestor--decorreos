import { describe, expect, test } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import {
  academicosImportantes,
  entregasFavoritas,
  pendientesDeDestacar
} from "../src/filtrosCompuestos";

describe("Filtros compuestos", () => {
  const ana = new Contacto("Ana", "ana@ucp.edu.ar");
  const eva = new Contacto("Eva", "eva@gmail.com");
  const luis = new Contacto("Luis", "luis@ucp.edu.ar");

  test("selecciona exámenes enviados desde la UCP", () => {
    const examenUcp = new Correo("EXAMEN", "El lunes", ana, [luis]);
    const examenPersonal = new Correo("Examen", "El martes", eva, [luis]);
    const avisoUcp = new Correo("Aviso", "Hay clase", ana, [luis]);
    const borrador = new Correo("Examen pendiente", "", null, []);

    const correos = [examenUcp, examenPersonal, avisoUcp, borrador];

    expect(academicosImportantes.aplicar(correos)).toEqual([examenUcp]);
  });

  test("selecciona entregas favoritas y refleja los cambios", () => {
    const entregaFavorita = new Correo("Aviso", "ENTREGA del TP", ana, [luis]);
    const entregaComun = new Correo("Aviso", "Entrega del TP", ana, [luis]);
    const otroFavorito = new Correo("Aviso", "Hay clase", ana, [luis]);

    entregaFavorita.marcarFavorito();
    otroFavorito.marcarFavorito();

    const correos = [entregaFavorita, entregaComun, otroFavorito];

    expect(entregasFavoritas.aplicar(correos)).toEqual([entregaFavorita]);

    entregaFavorita.desmarcarFavorito();

    expect(entregasFavoritas.aplicar(correos)).toEqual([]);
  });

  test("selecciona proyectos o reuniones que siguen sin favorito", () => {
    const proyecto = new Correo("PROYECTO final", "Organizar", ana, [luis]);
    const reunion = new Correo("Reunión del equipo", "El viernes", ana, [luis]);
    const proyectoFavorito = new Correo("Proyecto", "Revisado", ana, [luis]);
    const aviso = new Correo("Aviso", "Hay clase", ana, [luis]);

    proyectoFavorito.marcarFavorito();

    const correos = [proyecto, reunion, proyectoFavorito, aviso];

    expect(pendientesDeDestacar.aplicar(correos)).toEqual([proyecto, reunion]);
  });
});
