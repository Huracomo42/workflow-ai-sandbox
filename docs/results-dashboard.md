# Tablero de resultados del piloto

## Objetivo

Consolidar los resultados de los experimentos para comparar herramientas, componentes, rutas de trabajo y niveles de control.

_Completado el 18 de julio de 2026, como parte de la regularización documental de PILOT-002. Cubre EXP-001 a EXP-007 (PILOT-001 y la parte ejecutada de PILOT-002 hasta la fecha)._

## Resumen general

- Fecha de inicio del piloto: 17 de julio de 2026 (EXP-001, `experiments/EXP-001-session-log.md`)
- Fecha de cierre: pendiente — sujeta a `docs/PILOT-002-closure-report.md`, fuera del alcance de esta entrega
- Responsable: Hugo Cornejo Villena
- Número de experimentos planificados: 13 tareas definidas en `docs/task-bank.md` (TB-01 a TB-13)
- Número de experimentos ejecutados: 7 (EXP-001 a EXP-007)
- Número de experimentos aprobados: 7
- Número de experimentos aprobados con correcciones: 0
- Número de experimentos repetidos: 0
- Número de experimentos rechazados: 0

## Estado de los experimentos

| ID | Tarea | Componente evaluado | Ruta | Control | Estado | Puntuación | Decisión |
|---|---|---|---|---|---|---:|---|
| EXP-001 | TB-01 | Aplicación mínima de tareas | estándar | medio | cerrado | 40/50 | Aprobado |
| EXP-002 | TB-03 | Validación de título | ligera | medio | cerrado | 45/50 | Aprobado |
| EXP-003 | TB-02 | Fecha límite opcional | ligera | bajo | cerrado | 48/50 | Aprobado |
| EXP-004 | INC-01 | Recuperación de `localStorage` corrupto | incidente | medio | cerrado | 49/50* | Aprobado |
| EXP-005 | (sin entrada en task-bank)** | Pruebas mediante HTTP | — | — | cerrado | N/A** | Aprobado |
| EXP-006 | (sin entrada en task-bank)** | Integración continua (GitHub Actions) | — | — | cerrado | N/A** | Aprobado |
| EXP-007 | TB-13 | Edición inline de tareas existentes | estándar | alto | cerrado | 44/50 | Aprobado |

\* EXP-004 usó una rúbrica específica de incidente, no la rúbrica estándar de 10 criterios; ver nota en la siguiente tabla.
\*\* EXP-005 y EXP-006 son excepciones documentales del piloto (sin ficha, sin registro de sesión, sin evaluación mediante rúbrica); ver `docs/decisions.md`.

## Resultados por criterio

| Experimento | Comprensión | Plan | Calidad técnica | Pruebas | Seguridad | Trazabilidad | Documentación | Eficiencia | Intervención humana | Reversión | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| EXP-001 | 4 | 4 | 4 | 3 | 5 | 4 | 4 | 4 | 3 | 4 | 40 |
| EXP-002 | 5 | 4 | 4 | 3 | 5 | 5 | 5 | 5 | 4 | 4 | 45 |
| EXP-003 | 5 | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 48 |
| EXP-004 | N/A* | N/A* | N/A* | N/A* | N/A* | N/A* | N/A* | N/A* | N/A* | N/A* | 49* |
| EXP-005 | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** |
| EXP-006 | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** | N/A** |
| EXP-007 | 5 | 5 | 4 | 4 | 5 | 4 | 4 | 5 | N/A*** | 4 | 44 |

Notas obligatorias sobre esta tabla:

- Esta tabla, tal como está definida en la plantilla original, no incluye una columna para "Control del alcance" (tercer criterio de `docs/evaluation-rubric.md` §6). Ese puntaje consta en la evaluación individual de cada experimento (`experiments/EXP-00X-evaluation.md`) y no se repite aquí para no alterar la estructura aprobada de la tabla. La columna "Total" corresponde al valor documentado en la evaluación respectiva (suma de los diez criterios principales de la rúbrica, incluido "Control del alcance"), no a la suma de las columnas visibles en esta fila.
- \* EXP-004 usó una rúbrica de incidente con 7 criterios propios (reproducción, diagnóstico, adecuación de la solución, preservación del alcance, calidad de las pruebas, documentación y trazabilidad, reversibilidad — ver `experiments/EXP-004-evaluation.md`). No es comparable criterio a criterio con la rúbrica estándar; no se realiza ninguna conversión artificial (decisión vinculante). El total (49/50) se conserva por ser un dato documentado directamente en esa evaluación.
- \*\* EXP-005 y EXP-006 no cuentan con evaluación mediante rúbrica (excepción documental, ver `docs/decisions.md`); no se asigna ningún puntaje.
- \*\*\* EXP-007: la puntuación de "Intervención humana" no fue asignada numéricamente por el responsable junto con los diez criterios principales; ver `experiments/EXP-007-evaluation.md` §4.

## Incidentes y reglas de bloqueo

| Experimento | Incidente | Regla de bloqueo | Impacto | Acción tomada | Estado |
|---|---|---|---|---|---|
| EXP-004 | Datos corruptos (JSON inválido) en la clave `tasks` de `localStorage` | Ninguna activada | Bloqueo temporal de creación, listado y completado de tareas mientras persistía el contenido corrupto | Corrección en `loadTasks()` mediante `try/catch` y reemplazo por `[]` | Resuelto |

Ninguna regla de bloqueo se activó en EXP-001, EXP-002, EXP-003, EXP-005, EXP-006 ni EXP-007.

## Intervención humana

| Experimento | Tipo de intervención | Motivo | Tiempo aproximado | Resultado |
|---|---|---|---:|---|
| EXP-001 | Corrección moderada | Se corrigió una ampliación de alcance y el punto de restauración antes de implementar | no documentado | Plan corregido, implementación aprobada |
| EXP-002 | Corrección menor | Corrección del punto de restauración antes de la implementación | no documentado | Aprobado |
| EXP-003 | Aprobación y control metodológico | Registro formal del punto de restauración; el plan no necesitó correcciones técnicas | no documentado | Aprobado |
| EXP-004 | Corrección de plan | Distinguir `raw === null` de una cadena vacía almacenada; sustituir `git reset --hard` por `git revert` | no documentado | Plan corregido, aprobado, 49/50 |
| EXP-007 | Autorización de gates y corrección del plan de reversión | Autorización explícita de Gate 1 (registrada en `experiments/EXP-007-session-log.md` §11) y de Gate 5 (aprobación del merge, ocurrida dentro de la sesión operativa del workflow, fuera del repositorio); corrección de los hallazgos H1 y H3 de la revisión independiente; aceptación explícita de la excepción H2 | no documentado | Aprobado, 44/50 |

EXP-005 y EXP-006 no cuentan con registro de intervención humana (excepción documental, sin registro de sesión).

## Reversiones

| Experimento | Motivo | Método | Resultado | Evidencia |
|---|---|---|---|---|
| EXP-004 | Ejercicio de reversión trazable solicitado explícitamente por el responsable como parte del cierre del experimento (no por fallo grave) | `git revert` (reversión) y `git revert` (reaplicación) | El incidente reapareció al revertir; la restauración fue exitosa: 11/11 PASS | `experiments/EXP-004-session-log.md` §13.1; commits `5bde328`, `2885d47`, `1790afd` |
| EXP-007 | Ensayo de reversión exigido por el nivel de control alto (hallazgo H1 de la revisión independiente) | `git revert`, ejecutado en la rama desechable `pilot-002/exp-007-reversal-test` | 12 PASS, 0 FAIL, 2 NO EJECUTADOS; `T005-FINAL` en PASS | `experiments/EXP-007-session-log.md` §12; commit `151c8df` |

EXP-001, EXP-002 y EXP-003 documentaron un procedimiento de reversión pero no lo ejecutaron (no correspondía: sin fallo grave ni regla de bloqueo activada).

## Decisiones por componente

| Componente | Experimentos relacionados | Evidencia principal | Decisión | Restricciones |
|---|---|---|---|---|
| Workflow base (creación, validación, fecha límite) | EXP-001, EXP-002, EXP-003 | `experiments/EXP-001-evaluation.md` a `EXP-003-evaluation.md`; `docs/PILOT-001-closure-report.md` | Incorporado con ajustes (ver `docs/PILOT-001-closure-report.md` §10-§11) | Ninguna adicional |
| Diagnóstico y recuperación de incidentes | EXP-004 | `experiments/EXP-004-evaluation.md`, `experiments/EXP-004-session-log.md` §13.1 | Incorporado al workflow | No cubre JSON válido cuyo resultado no sea un array (limitación conocida) |
| Pruebas mediante HTTP | EXP-005 | `docs/EXP-005-HTTP-TESTING.md` | Incorporado al workflow, como excepción documental | Pendiente de ficha formal en ciclos futuros; excepción no repetible en PILOT-003 |
| Integración continua (GitHub Actions) | EXP-006 | `docs/EXP-006-GITHUB-ACTIONS.md` | Incorporado al workflow, como excepción documental | Pendiente de ficha formal en ciclos futuros; excepción no repetible en PILOT-003 |
| Edición de tareas con revisión independiente | EXP-007 | `experiments/EXP-007-evaluation.md`, `experiments/EXP-007-independent-review.md` | Incorporado al workflow (integrado a `main`, PR #9, commit `ac3a479`) | Ver riesgos pendientes no bloqueantes en `experiments/EXP-007-session-log.md` §9 |

## Hallazgos principales

### Fortalezas observadas

- Control del proceso mediante gates y restricciones explícitas, confirmado tanto en PILOT-001 (`docs/PILOT-001-closure-report.md` §7.1) como en el esquema de 6 gates de EXP-007.
- Trazabilidad respaldada por commits, registros de sesión, fichas y evaluaciones (`docs/PILOT-001-closure-report.md` §7.2).
- Manejo de incidentes reproducibles y reversión trazable mediante `git revert`, sin reescritura de historial (EXP-004 §13.1, EXP-007 §12).
- La integración continua (GitHub Actions) detecta correctamente una expectativa incorrecta y produce un check en rojo, y se recupera al corregirla (`docs/EXP-006-GITHUB-ACTIONS.md`).
- El aislamiento de pruebas bajo HTTP evita que un fallo o una excepción en un caso detenga los casos posteriores (`docs/EXP-005-HTTP-TESTING.md`).

### Debilidades observadas

- Carga documental alta en tareas pequeñas (`docs/PILOT-001-closure-report.md` §8.3).
- EXP-005 y EXP-006 se ejecutaron sin ficha formal, sin entrada en `docs/task-bank.md`, sin registro de sesión y sin evaluación mediante rúbrica, generando un vacío documental detectado solo al preparar el cierre de PILOT-002.
- La revisión técnica independiente y la evaluación mediante rúbrica de EXP-007 no se registraron como artefactos separados en el momento de la revisión, sino mediante una regularización documental posterior al merge (`experiments/EXP-007-independent-review.md`, `experiments/EXP-007-evaluation.md`).
- Gate 0 y Gate 2 de EXP-007 quedaron registrados en un único commit en lugar de commits separados por gate (hallazgo H2, aceptado como excepción operativa).

### Riesgos recurrentes

- Vacíos documentales que solo se detectan al intentar cerrar el piloto formalmente (EXP-005, EXP-006, EXP-007).
- Reversión ensayada en una rama desechable en vez de la rama real de la implementación (EXP-007), lo que limita el puntaje de reversión a 4/5 en vez de 5/5.
- Mezcla de commits entre gates (H2 en EXP-007), que reduce la granularidad de la trazabilidad commit a commit.

### Controles que funcionaron

- Separación de contextos entre implementación y revisión independiente (Gate 3 de EXP-007), aunque su artefacto se documentó de forma tardía.
- Reglas de bloqueo: ninguna se activó indebidamente en los 7 experimentos ejecutados.
- Aprobación humana obligatoria antes del merge (Gate 5): en EXP-007, esa aprobación ocurrió dentro de la sesión operativa del workflow, fuera del repositorio; el commit `ac3a479` y el pull request #9 fusionado corroboran que la integración se ejecutó, pero no sustituyen por sí solos la evidencia de la aprobación.

### Controles que deben modificarse

- Exigir que la ficha, el registro de sesión y la evaluación existan como artefactos desde el inicio de cada experimento futuro, no solo cuando el nivel de control lo exige explícitamente al final (regla incorporada en `docs/decisions.md` para PILOT-003).
- Exigir separación de commits por gate, para evitar la recurrencia del hallazgo H2.

## Métricas del piloto

- Puntuación media: 45.2/50 (promedio de EXP-001, EXP-002, EXP-003, EXP-004 y EXP-007: (40+45+48+49+44)/5; EXP-005 y EXP-006 no tienen puntaje numérico y se excluyen del promedio)
- Tiempo medio por experimento: no documentado en los registros disponibles
- Porcentaje de experimentos aprobados: 100% (7/7)
- Porcentaje con intervención humana alta: 0% según los registros disponibles (ningún experimento con puntaje de intervención humana ≤2/5 documentado); EXP-005, EXP-006 y EXP-007 no cuentan con puntaje numérico de intervención humana
- Número de reglas de bloqueo activadas: 0
- Número de reversiones exitosas: 2 (EXP-004, EXP-007)
- Número de cambios fuera de alcance: 0 (confirmado explícitamente en cada registro de sesión disponible)
- Número de errores no detectados por la IA: no cuantificado explícitamente en los registros disponibles

## Conclusión del ciclo

- Resultado general: siete experimentos ejecutados y aprobados (EXP-001 a EXP-007); los vacíos documentales de EXP-005, EXP-006 y EXP-007 fueron regularizados el 18 de julio de 2026.
- Componentes aprobados: workflow base, diagnóstico y recuperación de incidentes, pruebas mediante HTTP, integración continua, edición de tareas con revisión independiente.
- Componentes aprobados con restricciones: pruebas mediante HTTP e integración continua (excepción documental, no repetible en PILOT-003).
- Componentes que requieren nuevos experimentos: ruta exploratoria, nivel de control crítico o regulado, coordinación entre varios agentes (no validados aún, según `docs/WORKFLOW-METHODOLOGY-v2.md` §16).
- Componentes rechazados: ninguno.
- Cambios propuestos al workflow: exigir los artefactos documentales completos desde el inicio de cada experimento futuro (ver `docs/decisions.md`); evitar mezclar commits entre gates.
- Próximo ciclo recomendado: PILOT-003, sujeto a la redacción y aprobación separada de `docs/PILOT-002-closure-report.md`.

## Aprobación

- Estado del piloto: en preparación de cierre (cierre formal pendiente de `docs/PILOT-002-closure-report.md`)
- Responsable: Hugo Cornejo Villena
- Fecha: 18 de julio de 2026 (fecha de esta regularización documental; no es la fecha de cierre formal del piloto)

---

## PILOT-003 — Inicialización previa a ejecución

- Fecha de inicialización: 19 de julio de 2026
- Fecha de cierre formal: 19 de julio de 2026 (`docs/PILOT-003-closure-report.md`)
- Estado del piloto: **cerrado — aprobado con restricciones**. EXP-008, EXP-009 y EXP-010 cerrados, aprobados e integrados a `main` mediante pull requests #12, #13 y #14 respectivamente.
- Gate: P3-3 cerrado; Gates internos de EXP-010 (0-6) completados; PR #14 fusionado (commit de merge `aa89057`)
- Experimentos ejecutados: 3
- Experimentos evaluados: 3
- Experimentos planificados: EXP-008, EXP-009 y EXP-010
- Código modificado: sí (EXP-010, VS-01 — `app.js`, `index.html`, `styles.css`, `test-runner.js`), fusionado a `main` mediante PR #14
- Paquete operativo: aprobado e incorporado en rama documental
- Regla de actualización: este tablero deberá actualizarse al cierre real de cada experimento, conforme al Ajuste H.

| ID | Tarea | Componente evaluado | Ruta | Control | Estado | Puntuación | Decisión |
|---|---|---|---|---|---|---:|---|
| EXP-008 | TB-14 | Presión y congelamiento de requisitos | exploratoria | medio | cerrado | 47/50 | Aprobado |
| EXP-009 | TB-14 | Especificación, diseño y vertical slices | estándar | alto | cerrado | 48/50 | Aprobado |
| EXP-010 | TB-14 | Implementación de VS-01 (prioridad base y compatibilidad) | estándar | alto | cerrado; integrado a `main` (PR #14) | 42/50 | Aprobado, con restricciones |

### Resultado de EXP-008

- Fecha de ejecución y evaluación: 19 de julio de 2026
- Resultado recomendado: aprobado
- Puntaje: 47/50
- Preguntas bloqueantes abiertas: 0
- Código o pruebas modificados: no
- Evidencia:
  - `experiments/EXP-008-pressure-session.md`
  - `experiments/EXP-008-frozen-requirements.md`
  - `experiments/EXP-008-session-log.md`
  - `experiments/EXP-008-evaluation.md`
- Observación metodológica: la sesión fue trazable, pero excesivamente fragmentada en microdecisiones; EXP-009 deberá trabajar mediante bloques de decisiones.
- Estado final: aprobado; pendiente de integración mediante pull request.

### Resultado de EXP-009

- Fecha de ejecución y evaluación: 19 de julio de 2026
- Resultado: aprobado
- Puntaje: 48/50
- Revisión independiente: aprobada en segunda revisión
- Hallazgos bloqueantes iniciales: 2
- Hallazgos bloqueantes cerrados: 2
- Preguntas bloqueantes abiertas: 0
- Código o pruebas ejecutables modificados: no
- Slice seleccionada para EXP-010: VS-01 — Prioridad base y compatibilidad
- Evidencia:
  - `experiments/EXP-009-current-system-analysis.md`
  - `experiments/EXP-009-domain-model.md`
  - `experiments/EXP-009-feature-specification.md`
  - `experiments/EXP-009-modular-design.md`
  - `experiments/EXP-009-vertical-slice-map.md`
  - `experiments/EXP-009-test-design.md`
  - `experiments/EXP-009-traceability-matrix.md`
  - `experiments/EXP-009-independent-review.md`
  - `experiments/EXP-009-evaluation.md`
- Estado final: aprobado y cerrado; pull request autorizado.
- Restricción vigente: EXP-010 no puede iniciarse sin Gate P3-4 separado. *(Cumplida: ver "Resultado de EXP-010".)*

### Resultado de EXP-010

- Fecha de ejecución y evaluación: 19 de julio de 2026
- Resultado: **aprobado, con restricciones** (rúbrica: Aprobado; decisión sobre el componente: incorporar con restricciones)
- Puntaje final: 42/50 (umbral de control alto cumplido en el límite exacto)
- Mínimos de control alto: seguridad y control 5/5, pruebas 5/5, trazabilidad 4/5, reversión 5/5 (los cuatro cumplen el mínimo de 4/5)
- Intervención humana (no sumada al total): 3/5
- Revisión independiente: aprobada, sin hallazgos bloqueantes (primer informe, redactado en el mismo contexto que la implementación, fue inválido y reemplazado íntegramente por una revisión en contexto separado)
- Hallazgos bloqueantes: 0
- Hallazgos no bloqueantes cerrados: H1, H3, H4, H5, H6 (de 10 hallazgos totales de la revisión independiente)
- Excepción documentada: **H2** (narrativa de sesión y código en commits distintos, orden cronológico invertido) aceptada por Hugo Cornejo Villena el 19 de julio de 2026, conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15; detalle completo en `experiments/EXP-010-evaluation.md` §8. No afecta corrección técnica, pruebas, seguridad ni reversión.
- Hallazgos no bloqueantes pendientes: H7, H8, H9 (observaciones para VS-02)
- Lección obligatoria registrada para PILOT-004: la narrativa de sesión y el código correspondiente deben registrarse en el mismo commit y en orden cronológico (recurrencia del mismo tipo de hallazgo que H2 de EXP-007; ver `experiments/EXP-010-evaluation.md` §9).
- Ensayo de reversión: ejecutado y exitoso — 6 commits revertidos y 6 reaplicados mediante `git revert` exclusivamente, 0 conflictos en 12/12 operaciones, árbol y suite verificados idénticos en ambos extremos (23/21/0/2 tras revertir; 39/37/0/2 tras restaurar), en la rama desechable `pilot-003/exp-010-reversal-test` (conservada, no fusionada)
- Código o pruebas ejecutables modificados: sí — `app.js`, `index.html`, `styles.css`, `test-runner.js`, fusionados a `main` mediante pull request #14 (commit de merge `aa89057`)
- Slice implementada: VS-01 — Prioridad base y compatibilidad (única slice autorizada para EXP-010)
- Evidencia:
  - `experiments/EXP-010-TB-14.md`
  - `experiments/EXP-010-implementation-plan.md`
  - `experiments/EXP-010-test-plan.md`
  - `experiments/EXP-010-session-log.md`
  - `experiments/EXP-010-independent-review.md`
  - `experiments/EXP-010-reversal-test.md`
  - `experiments/EXP-010-evaluation.md`
- Estado final: **cerrado e integrado**. Gates 0 a 6 completados; pull request #14 revisado y fusionado a `main` mediante commit de merge `aa89057`.
- Slices diferidas: VS-02 a VS-06 (edición de prioridad, filtros, coherencia bajo filtros, estados vacíos y regresión integral), según `experiments/EXP-009-vertical-slice-map.md` §11; ninguna quedó implementada en EXP-010.

---

## PILOT-003 — Cierre formal

- Fecha de cierre: 19 de julio de 2026
- Informe de cierre: `docs/PILOT-003-closure-report.md`
- Decisión final: **APROBADO CON RESTRICCIONES**
- Experimentos: EXP-008 (47/50), EXP-009 (48/50), EXP-010 (42/50) — los tres aprobados, cero reglas de bloqueo activadas, cero excepciones por artefactos faltantes
- Excepción documentada: H2 de EXP-010, aceptada conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15
- Rama desechable `pilot-003/exp-010-reversal-test`: conservada, no fusionada, no eliminada
- Ajustes K a O (`docs/PILOT-003-closure-report.md` §11) — verificación explícita de separación de contexto antes de redactar; correspondencia commit↔narrativa en el mismo commit; numeración de gates fijada contra la ficha técnica; plantillas documentales por nivel de control (reactivación del Ajuste A de PILOT-001, nunca implementado); decisión pendiente sobre independencia de contexto para Gate 4 (rúbrica). Se incorporan como **condiciones de entrada y controles obligatorios de PILOT-004**, validados durante ese mismo piloto — no mediante un experimento aislado previo.
- VS-02 a VS-06 (TB-14): deuda funcional diferida, fuera del camino crítico hacia PILOT-004.
- Conclusión estratégica: el workflow está listo para una validación end-to-end controlada; continuar con experimentos aislados produciría rendimientos decrecientes y no resolvería el principal vacío pendiente (la experiencia completa de iniciar, instalar, operar y cerrar un proyecto nuevo desde una idea vaga).
- **PILOT-004: no iniciado.** Ningún paquete operativo, banco de tareas ni experimento fue creado para PILOT-004 en este cierre; su inicio requiere un paquete operativo que incorpore las nueve condiciones de entrada de `docs/PILOT-003-closure-report.md` §15.