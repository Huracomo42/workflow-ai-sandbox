# EXP-010 — Plan de pruebas

- Fecha real de elaboración: 19 de julio de 2026
- Estado: congelado; pruebas no ejecutadas (implementación no autorizada todavía)

## Línea base

- Suite `T005-*` (EXP-005, pruebas mediante HTTP) y `T005-FINAL`: deben permanecer en PASS.
- Suite `T007-*` (EXP-007, edición inline): deben permanecer en PASS.
- Ninguna prueba existente cambia su expectativa como consecuencia de EXP-010; solo se añaden pruebas nuevas.

## Casos funcionales nuevos

| ID | Conducta |
|---|---|
| T010-01 | Creación sin prioridad explícita persiste `priority: "medium"` |
| T010-02 | Creación con `low` persiste exactamente `low` |
| T010-03 | Creación con `medium` persiste exactamente `medium` |
| T010-04 | Creación con `high` persiste exactamente `high` |
| T010-10 | El selector de creación ofrece exclusivamente Baja, Media y Alta, con Media seleccionada inicialmente |
| T010-11 | Cada tarea renderizada muestra el texto visible de su prioridad (Baja, Media o Alta) |

## Casos inválidos

| ID | Conducta |
|---|---|
| T010-05 | Crear una tarea con prioridad explícitamente inválida rechaza la creación completa: no se persiste ninguna tarea |

Diferencia obligatoria respecto de los casos de compatibilidad (siguiente sección): T010-05 evalúa una **entrada nueva** explícitamente inválida (rechazo), no un dato antiguo ya persistido (normalización).

## Compatibilidad con datos anteriores

| ID | Conducta |
|---|---|
| T010-06 | Una tarea persistida sin atributo `priority` se normaliza en memoria como `medium` al cargar |
| T010-07 | Una tarea persistida con prioridad desconocida (fuera de `low`/`medium`/`high`) se normaliza en memoria como `medium` al cargar |
| T010-09 | Una tarea con prioridad inválida en la colección no impide que las demás tareas válidas se carguen |

## Pruebas de persistencia

| ID | Conducta |
|---|---|
| T010-08 | La normalización de prioridad durante `loadTasks()` no escribe automáticamente en `localStorage` (comparación de contenido antes y después de la carga) |

## Pruebas de edición y visualización

La edición de prioridad está fuera de alcance de VS-01 (diferida a VS-02); esta sección se limita a visualización:

| ID | Conducta |
|---|---|
| T010-11 | Texto visible de prioridad presente en el renderizado (ver también "Casos funcionales nuevos") |

No se incluyen pruebas de edición de prioridad en EXP-010.

## Regresión

- Ejecución completa de `T005-01` a `T005-10` y `T005-FINAL`.
- Ejecución completa de `T007-01` a `T007-09`.
- T010-12 y T010-14 — controles de ausencia de dependencias externas nuevas (en `index.html` y en el conjunto de archivos modificados).
- T010-13 — regresión agregada: confirma que la suite completa anterior (`T005-*`, `T007-*`) permanece en PASS tras incorporar VS-01.

## Ejecución mediante HTTP

Se reutiliza el patrón establecido en EXP-005: servidor HTTP local, carga de `tests.html` mediante iframe, y ejecución en Microsoft Edge headless, con clasificación PASS, FAIL y NO EJECUTADO, y ejecución secuencial (`experiments/EXP-009-test-design.md` §10).

## Integración continua

El flujo de GitHub Actions establecido en EXP-006 debe permanecer en verde tras incorporar T010-01 a T010-14 y la regresión completa. El CI en verde es condición obligatoria de cierre (Gate 2 y Gate 4, `experiments/EXP-010-TB-14.md` §12).

## Prueba roja controlada

Fase obligatoria exigida por el microplan aprobado, no sustituible por la evidencia de EXP-006:

1. Incorporar T010-01 a T010-14 en `test-runner.js` **antes** de modificar `app.js`, `index.html` o `styles.css`.
2. Ejecutar la suite completa en ese estado intermedio. Se espera que T010-01 a T010-14 fallen (FAIL), por ausencia real de la implementación de VS-01, mientras que la regresión `T005-*` y `T007-*` debe permanecer en PASS.
3. Documentar esta ejecución roja en `experiments/EXP-010-session-log.md`: comando, modo, totales por estado e identificadores en FAIL.
4. Solo después de registrar la fase roja se autoriza implementar el código productivo (Gate 1, conforme al plan de implementación).
5. Ejecutar de nuevo la suite completa tras la implementación. T010-01 a T010-14 deben pasar a PASS (fase verde) y la regresión debe permanecer en PASS.

EXP-006 valida que el CI detecta una expectativa incorrecta y se recupera al corregirla (`docs/EXP-006-GITHUB-ACTIONS.md`); es un caso distinto (una expectativa mal escrita, no la ausencia esperada de una funcionalidad todavía no implementada) y no sustituye esta evidencia.

## Criterios de aprobación

- fase roja documentada: T010-01 a T010-14 en FAIL antes de la implementación, con regresión `T005-*`/`T007-*` en PASS en ese mismo momento;
- fase verde: cero fallos críticos, T010-01 a T010-14 en PASS después de la implementación;
- regresión completa (`T005-*`, `T007-*`) en verde en ambas fases, sin excepciones;
- CI en verde;
- evidencia archivada en `experiments/EXP-010-session-log.md` (comando de ejecución, modo, totales PASS/FAIL/NO EJECUTADO, identificadores fallidos si los hubiera, commit probado, navegador, limitaciones), conforme a `experiments/EXP-009-test-design.md` §11.
