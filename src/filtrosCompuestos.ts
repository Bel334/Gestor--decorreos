import type { Correo } from "./Correo";
import { FiltroCorreo } from "./FiltroCorreo";
import { and, or, not } from "./predicadosCorreo";

const esDeUcp = (correo: Correo) =>
  correo.remitente !== null &&
  correo.remitente.email.toLowerCase().endsWith("@ucp.edu.ar");

const esExamen = (correo: Correo) =>
  correo.asunto.toLowerCase().includes("examen");

const esEntrega = (correo: Correo) =>
  correo.contenido.toLowerCase().includes("entrega");

const esFavorito = (correo: Correo) => correo.favorito;

const esProyecto = (correo: Correo) =>
  correo.asunto.toLowerCase().includes("proyecto");

const esReunion = (correo: Correo) =>
  correo.asunto.toLowerCase().includes("reunión");

export const academicosImportantes = new FiltroCorreo(
  "Académicos importantes",
  and(esDeUcp, esExamen)
);

export const entregasFavoritas = new FiltroCorreo(
  "Entregas favoritas",
  and(esEntrega, esFavorito)
);

export const pendientesDeDestacar = new FiltroCorreo(
  "Pendientes de destacar",
  and(or(esProyecto, esReunion), not(esFavorito))
);
