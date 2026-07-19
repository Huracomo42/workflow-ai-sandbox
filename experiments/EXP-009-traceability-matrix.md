# EXP-009 — Matriz de trazabilidad

- Piloto: PILOT-003
- Experimento: EXP-009
- Fecha: 19 de julio de 2026
- Estado: corregida tras revisión independiente

## Cobertura crítica corregida

| Requisito | Criterio | Slice | Pruebas previstas |
|---|---|---|---|
| RF-14 | Pendiente → Completada reevalúa vista | VS-03 | prueba directa |
| RF-14 | Completada → Pendiente reevalúa vista | VS-03 | prueba inversa |
| RF-14 | ambas direcciones conservan prioridad, id y posición | VS-03, VS-05 | pruebas de conservación |

## Cobertura general

RF-01 a RF-13 y RF-15 a RF-22 mantienen la asignación definida previamente.

RF-14 deja de considerarse cubierta por una sola prueba.

## Artefactos de soporte

La cobertura se apoya además en:

- `EXP-009-current-system-analysis.md`;
- `EXP-009-test-design.md`.

## Brechas

Después de esta corrección:

- no existen requisitos huérfanos;
- no existen direcciones de transición sin prueba prevista;
- no faltan artefactos obligatorios del microplan.
