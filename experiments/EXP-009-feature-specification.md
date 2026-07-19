# EXP-009 — Especificación funcional de TB-14

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha: 19 de julio de 2026
- Estado: corregida tras revisión independiente

## Objetivo

Incorporar prioridades y filtros preservando compatibilidad y evitando efectos destructivos.

## Requisitos verificables

RF-01 a RF-13, RF-15 a RF-22 permanecen según los requisitos congelados y los criterios previamente definidos.

### RF-14 — Reevaluación tras cambio de estado

**Dirección 1**

Dado que una tarea pendiente coincide con los filtros activos, cuando se marca como completada, deberá reevaluarse inmediatamente y desaparecer si deja de coincidir.

**Dirección 2**

Dado que una tarea completada coincide con los filtros activos, cuando se desmarca y vuelve a Pendiente, deberá reevaluarse inmediatamente y desaparecer si deja de coincidir.

En ambas direcciones:

- se conserva prioridad;
- se conserva posición;
- se conserva `id`;
- se persiste el nuevo estado;
- no se reinician filtros.

## Casos límite añadidos

- tarea pendiente que pasa a completada bajo filtro Pendientes;
- tarea completada que pasa a pendiente bajo filtro Completadas;
- tarea que aparece al alternar estado;
- tarea que desaparece al alternar estado;
- conservación de prioridad y posición en ambas direcciones.

## Preguntas abiertas

No quedan preguntas funcionales bloqueantes.
