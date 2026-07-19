# EXP-010 — Plan de implementación

- Fecha real de elaboración: 19 de julio de 2026
- Estado: ejecutado. Gate 1 (fase roja) y Gate 2 (implementación) completados conforme a este plan; Gate 3 (revisión técnica independiente) aprobado sin hallazgos bloqueantes. Ver `experiments/EXP-010-TB-14.md` §12 y `experiments/EXP-010-session-log.md` para el detalle.

## Slice aprobada

VS-01 — Prioridad base y compatibilidad, según `experiments/EXP-009-vertical-slice-map.md` §4-§6, congelada en `experiments/EXP-010-TB-14.md` §6-§8.

## Diagnóstico y entendimiento

Estado actual de `app.js` (sin modificar en esta entrega), según `experiments/EXP-009-modular-design.md` §3 y verificación directa:

- `loadTasks()` (línea 4) lee `localStorage`, recupera JSON corrupto mediante `try/catch` y no conoce el atributo `priority`.
- `createTask(title, dueDate)` (línea 36) valida título y fecha, y no acepta ni persiste prioridad.
- `renderTasks(listElement)` (línea 233) renderiza cada tarea sin texto de prioridad.
- No existen actualmente: constantes de prioridad, `isValidPriority`, `normalizePriority`, `normalizeTask`, `getPriorityLabel`, ni selector de prioridad en `index.html`.
- Las suites `T005-*` (EXP-005) y `T007-*` (EXP-007) son la línea base de regresión y no conocen `priority`.

Esta implementación añade el atributo `priority` de forma aditiva, sin eliminar comportamiento existente.

## Secuencia obligatoria de implementación

El microplan aprobado exige incorporar las pruebas antes que el código productivo, no en paralelo ni después:

1. Incorporar T010-01 a T010-14 en `test-runner.js`, conforme a `experiments/EXP-010-test-plan.md`, sin modificar todavía `app.js`, `index.html` ni `styles.css`.
2. Ejecutar la suite completa (T010-01 a T010-14 más la regresión `T005-*`/`T007-*`) en ese estado intermedio y documentar en `experiments/EXP-010-session-log.md` que las pruebas T010-01 a T010-14 fallan por la ausencia esperada de VS-01 (fase roja), junto con la regresión existente, que debe permanecer en PASS.
3. Solo después de registrar la fase roja, implementar los cambios productivos en `app.js`, `index.html` y `styles.css` descritos en "Cambios previstos".
4. Ejecutar de nuevo la suite completa y documentar que T010-01 a T010-14 pasan a PASS (fase verde) y que la regresión `T005-*`/`T007-*` permanece en PASS.

Esta secuencia roja→verde es evidencia obligatoria de control alto y no puede sustituirse por la evidencia de EXP-006 (integración continua), que valida un caso distinto (una expectativa incorrecta en CI, no la ausencia de una funcionalidad todavía no implementada).

## Archivos autorizados

Para la fase de implementación (autorizada y ejecutada mediante Gate 1 y Gate 2):

- `app.js`
- `index.html`
- `styles.css`
- `test-runner.js`
- `tests.html`, solo si cambia el recuento o la presentación de resultados

Ningún otro archivo de código o configuración podrá modificarse. No se autoriza crear archivos JavaScript, módulos o dependencias adicionales.

## Cambios previstos

### Constantes (`app.js`)

- `VALID_PRIORITIES = ['low', 'medium', 'high']`
- `DEFAULT_PRIORITY = 'medium'`
- `PRIORITY_LABELS` — mapa `{ low: 'Baja', medium: 'Media', high: 'Alta' }`

### Validación y normalización (`app.js`)

- `isValidPriority(priority)` — verifica pertenencia exacta a `VALID_PRIORITIES`.
- `normalizePriority(priority)` — devuelve el valor si es válido; en caso contrario devuelve `DEFAULT_PRIORITY`. No escribe en `localStorage`.
- `normalizeTask(task)` — devuelve una tarea con `priority` normalizada, sin mutar ni persistir.
- `getPriorityLabel(priority)` — traduce un valor interno válido a su texto visible mediante `PRIORITY_LABELS`.

### Persistencia (`app.js`)

- `loadTasks()` conserva su manejo actual de JSON corrupto (`try/catch` → `[]`).
- Tras el `parse`, cada tarea se normaliza en memoria mediante `normalizeTask()` antes de devolverse.
- No se invoca `saveTasks()` como efecto de la normalización (Riesgo B, `experiments/EXP-009-vertical-slice-map.md` §10).
- `saveTasks(tasks)` no cambia de comportamiento.

### Dominio (`app.js`)

- `createTask(title, dueDate, priority)`:
  - mantiene la validación existente de `title` y `dueDate`;
  - si `priority` se omite, usa `DEFAULT_PRIORITY`;
  - si `priority` se provee y es inválida (no pertenece a `VALID_PRIORITIES`), rechaza la creación completa: no se persiste ninguna tarea (RF-21);
  - si `priority` se provee y es válida, se persiste exactamente ese valor;
  - la llamada existente `createTask(title, dueDate)` sin tercer argumento sigue funcionando sin cambios de comportamiento observable para quien la invoque así.

### Renderizado (`app.js`)

- `renderTasks(listElement)` incluye, para cada tarea, el texto visible de prioridad obtenido mediante `getPriorityLabel(task.priority)`.
- No se introduce distinción de estados vacíos (fuera de alcance de VS-01); el comportamiento actual ante colección vacía no se modifica funcionalmente más allá de lo estrictamente necesario para no romperlo.

### Interfaz (`index.html`)

- Se añade un `<select>` de prioridad dentro del formulario de creación existente, con exactamente tres `<option>`: Baja (`low`), Media (`medium`, seleccionada por defecto) y Alta (`high`).
- No se añaden controles de filtro ni de edición.
- No se añaden referencias externas nuevas (scripts, hojas de estilo o fuentes de terceros).

### Estilos (`styles.css`)

- Reglas mínimas para el selector de prioridad y el texto visible de prioridad en cada fila.
- No se realiza rediseño visual general (`experiments/EXP-009-modular-design.md` §4.8).

### Pruebas (`test-runner.js`)

- Incorporación de T010-01 a T010-14, según `experiments/EXP-010-test-plan.md`, **antes** de los cambios productivos (ver "Secuencia obligatoria de implementación").
- Reutilización del patrón de aislamiento de `localStorage` ya usado por `T005-*` y `T007-*`.
- Ejecución íntegra de la regresión `T005-*` y `T007-*` sin modificar sus expectativas, tanto en la fase roja como en la fase verde.

## Pruebas previstas

T010-01 a T010-14, congeladas en `experiments/EXP-010-TB-14.md` §9 y detalladas en `experiments/EXP-010-test-plan.md`. Deben ejecutarse dos veces: una en fase roja (antes del código productivo, con fallo esperado) y otra en fase verde (después del código productivo, en PASS).

## Riesgos

Heredados de `experiments/EXP-009-vertical-slice-map.md` §10 y `experiments/EXP-009-modular-design.md` §8, aplicables a esta implementación:

- **Riesgo A — Cambio incompatible de firma.** Control: `createTask(title, dueDate, priority)` acepta la omisión de `priority`; la omisión produce `medium`; las llamadas existentes de `T005-*`/`T007-*` no requieren cambios.
- **Riesgo B — Persistencia automática durante normalización.** Control: comparar `localStorage` antes y después de `loadTasks()` en T010-08; no invocar `saveTasks()` por prioridad ausente o inválida al cargar.
- **Riesgo C — Falsa recuperación de entrada inválida.** Control: distinguir explícitamente dato antiguo inválido al cargar (normaliza a Media, T010-06/T010-07) de entrada nueva explícitamente inválida en creación (rechaza, T010-05).
- **Riesgo D — Slice demasiado amplia.** Control: no implementar edición, filtros, ordenamiento ni estados vacíos diferenciados; ver exclusiones congeladas en `experiments/EXP-010-TB-14.md` §7.
- **R7 — Romper pruebas existentes.** Control: mantener compatibilidad de `createTask(title, dueDate)`, conservar funciones globales usadas por las pruebas, ejecutar regresión completa (T010-13).

## Limitaciones

- VS-01 no introduce edición de prioridad; una tarea creada solo puede corregirse recreándola (limitación conocida, resuelta en VS-02).
- VS-01 no introduce filtros; toda tarea persistida se muestra siempre en la lista.
- El texto visible de prioridad usa una etiqueta fija en español; no se contempla internacionalización.

## Elementos fuera de alcance

Idénticos a `experiments/EXP-010-TB-14.md` §7:

- edición de prioridad;
- filtros;
- transición reversible de estado como comportamiento nuevo;
- ordenamiento;
- estados vacíos diferenciados;
- dependencias externas;
- refactorizaciones no necesarias.

## Punto de restauración

- Rama base: `main`.
- Commit estable identificado: `43185f4` (merge de PR #13, cierre documental de EXP-009).
- Este commit se registra como punto de restauración operativo antes de cualquier implementación futura.

## Procedimiento de reversión

- Reversión mediante `git revert` de los commits de implementación de EXP-010, preservando el historial (sin `git reset --hard` ni reescritura de historial), conforme al patrón usado en EXP-004 y EXP-007.
- Condición que obliga a revertir: activación de una regla de bloqueo, fallo grave de regresión (`T005-*`, `T007-*` o `T010-*` en FAIL), pérdida de estabilidad, o instrucción expresa del responsable humano.
- El ensayo de reversión se documentará en `experiments/EXP-010-reversal-test.md`, sobre una rama desechable, antes del merge, conforme al nivel de control alto.

## Aprobación humana antes de implementar

- Gate 1 (fase roja) y Gate 2 (implementación) fueron autorizados explícitamente por Hugo Cornejo Villena, en instrucciones separadas de la autorización de la preparación documental (Gate 0, cubierta por el gate de entrada P3-4 ya autorizado). Ambos gates se completaron conforme a este plan; ver `experiments/EXP-010-TB-14.md` §12 y `experiments/EXP-010-session-log.md` para el detalle y la evidencia de ejecución.
