# EXP-009 — Mapa de vertical slices

- Piloto: PILOT-003
- Experimento: EXP-009
- Fecha: 19 de julio de 2026
- Estado: corregido tras revisión independiente

| Slice | Valor funcional | Requisitos principales | Estado |
|---|---|---|---|
| VS-01 | crear y visualizar prioridad con compatibilidad | RF-01, RF-02, RF-04, RF-21, RF-22 | seleccionada para EXP-010 |
| VS-02 | editar prioridad de forma atómica | RF-03, RF-18, RF-19, RF-20 | diferida |
| VS-03 | filtrar por estado y alternar estado en ambas direcciones | RF-06, RF-08, RF-09, RF-10, RF-11, RF-14 | diferida |
| VS-04 | filtrar por prioridad y combinar con AND | RF-05, RF-07, RF-08, RF-09, RF-10, RF-11, RF-15 | diferida |
| VS-05 | conservar coherencia tras crear, editar o alternar estado | RF-11, RF-12, RF-13, RF-18 | diferida |
| VS-06 | estados vacíos y regresión integral | RF-16, RF-17 | diferida |

## Corrección de VS-03

VS-03 incluye explícitamente:

- Pendiente → Completada;
- Completada → Pendiente;
- reevaluación inmediata;
- persistencia del nuevo estado;
- conservación de prioridad, posición y filtros.

Pruebas previstas:

- completar bajo filtro Pendientes;
- desmarcar bajo filtro Completadas;
- aparición tras alternar;
- desaparición tras alternar;
- ausencia de reinicio de filtros.

## VS-01

Se mantiene sin cambios como única slice para EXP-010.

EXP-010 no implementará todavía transición reversible ni filtros.
