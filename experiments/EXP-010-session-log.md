# EXP-010 — Registro de sesión

- Fecha de creación: 19 de julio de 2026
- Fecha de ejecución de esta entrega: 19 de julio de 2026
- Estado: preparación documental previa a implementación (Gate 0 en curso)

## 1. Condiciones de entrada

- EXP-008 cerrado y aprobado (47/50), Gate P3-2.
- EXP-009 cerrado y aprobado (48/50), Gate P3-4, autorizado por Hugo Cornejo Villena el 19 de julio de 2026.
- Slice VS-01 seleccionada en `experiments/EXP-009-vertical-slice-map.md` §4.
- Commit base identificado: `43185f4` (`main`, merge de PR #13).

## 2. Objetivo de la sesión

Elaborar exclusivamente los artefactos documentales iniciales de EXP-010 (ficha, plan de implementación, plan de pruebas y este registro de sesión) para congelar el alcance de VS-01 antes de autorizar cualquier cambio en código productivo o pruebas ejecutables.

## Línea base

- `main` en `43185f4`.
- Árbol de trabajo limpio antes de esta entrega (`git status` sin cambios pendientes).
- Ningún archivo de código o prueba modificado durante esta sesión.

## 3. Autorización de la preparación documental (Gate 0 interno)

- Gate estratégico de entrada autorizado: **P3-4** (EXP-009 cerrado y aprobado), ya autorizado por Hugo Cornejo Villena el 19 de julio de 2026; es el único gate estratégico autorizado hasta ahora para EXP-010.
- Instrucción recibida de Hugo Cornejo Villena: "Estamos iniciando EXP-010 de PILOT-003. Implementaremos exclusivamente VS-01 — Prioridad base y compatibilidad."
- Alcance autorizado por esta instrucción: creación de los cuatro artefactos documentales iniciales (Gate 0 interno de EXP-010); ningún archivo de código o prueba.
- Decisiones congeladas explícitamente en la instrucción: prioridades internas `low`/`medium`/`high`; predeterminada `medium`; normalización en memoria sin escritura automática; compatibilidad con `createTask(title, dueDate)`; rechazo atómico de prioridad nueva explícitamente inválida; selector con Baja, Media y Alta; prioridad visible mediante texto; pruebas T010-01 a T010-14.
- Exclusiones congeladas explícitamente: edición de prioridad; filtros; transición reversible de estado; ordenamiento; estados vacíos diferenciados; dependencias externas; refactorizaciones no necesarias.
- Esta instrucción **no** autoriza el Gate P3-5 general (`EXP-010 autorizado`, `docs/PILOT-003-operational-package.md` §13) ni el Gate 1 interno de EXP-010 (autorización para modificar pruebas ejecutables y código, `experiments/EXP-010-TB-14.md` §12). Ambos permanecen pendientes de autorización explícita separada.

## 4. Artefactos elaborados en esta entrega

- `experiments/EXP-010-TB-14.md` — ficha de EXP-010, con alcance, decisiones congeladas, pruebas T010-01 a T010-14, gates y prohibiciones.
- `experiments/EXP-010-implementation-plan.md` — plan técnico detallado de VS-01, riesgos, punto de restauración y procedimiento de reversión.
- `experiments/EXP-010-test-plan.md` — plan de pruebas T010-01 a T010-14, regresión y criterios de aprobación.
- `experiments/EXP-010-session-log.md` — este registro.

No se modificaron `experiments/EXP-010-independent-review.md`, `experiments/EXP-010-reversal-test.md` ni `experiments/EXP-010-evaluation.md` (plantillas ya existentes, correspondientes a fases posteriores).

## Commits por gate

- Gate 0 (preparación documental, §1-§7 de este registro): commit `d55f645` — "docs: initialize EXP-010 implementation controls", sobre `main` (base `43185f4`).
- Gate 1 — fase roja (§8-§13 de este registro): cambios en `test-runner.js` todavía sin commit, según instrucción expresa de no crear commit en esta entrega.

## 5. Control del alcance

Confirmado en esta entrega:

- no se modificó `app.js`;
- no se modificó `index.html`;
- no se modificó `styles.css`;
- no se modificó `test-runner.js`;
- no se modificó `tests.html`;
- no se ejecutó implementación;
- no se iniciaron pruebas de EXP-010;
- no se añadieron dependencias;
- no se modificaron requisitos congelados de EXP-008 ni las decisiones cerradas de EXP-009.

## Pruebas

Fase roja completada (§8-§13). T010-01 a T010-14 incorporadas en `test-runner.js` y ejecutadas antes de cualquier cambio productivo. Resultado: FAIL/NO EJECUTADO en las pruebas de comportamiento de VS-01 (según lo esperado), regresión `T005-*`/`T007-*` íntegra en PASS. Detalle completo en §9-§11. La fase verde (tras implementar el código productivo) sigue pendiente y requiere una autorización separada de Gate 1 para modificar `app.js`, `index.html` y `styles.css`.

## CI

Pendiente. No aplica todavía: no hay cambios de código que integrar.

## Revisión

Pendiente. La revisión técnica independiente (Gate 3) requiere implementación previa y se registrará en `experiments/EXP-010-independent-review.md`.

## Reversión

Pendiente. El ensayo de reversión (Gate 5) requiere implementación previa y se registrará en `experiments/EXP-010-reversal-test.md`.

## 6. Observaciones metodológicas

- Se siguió el patrón de EXP-007/EXP-009: separar explícitamente la preparación documental (Gate 0 interno, ejecutada bajo el gate de entrada P3-4 ya autorizado) de la autorización de implementación (Gate 1, todavía pendiente, que en su momento activará el gate general P3-5), evitando repetir el hallazgo de EXP-008 sobre fragmentación excesiva al agrupar las decisiones congeladas en un solo bloque por fuente.
- La ausencia de `experiments/EXP-009-frozen-requirements.md` como archivo independiente se verificó y se documentó en `experiments/EXP-010-TB-14.md` §4: los requisitos congelados de origen residen en `experiments/EXP-008-frozen-requirements.md`.

## 7. Estado de salida de esta entrega

- Documentación previa (Gate 0): completada mediante esta entrega.
- Implementación: no autorizada todavía; requiere Gate 1.
- Código o pruebas modificados: no.
- Preguntas bloqueantes abiertas: 0.

## Excepciones

Ninguna registrada en la entrega de Gate 0.

---

## 8. Gate 1 — Autorización y ejecución de la fase roja (segunda entrega)

- Fecha de ejecución: 19 de julio de 2026.
- Instrucción recibida de Hugo Cornejo Villena: "Gate 1 de EXP-010 autorizado exclusivamente para preparar y ejecutar la fase roja."
- Alcance autorizado: modificar únicamente `test-runner.js` para incorporar T010-01 a T010-14; ejecutar la suite; registrar resultado en este archivo. No autoriza modificar `app.js`, `index.html`, `styles.css`, `tests.html` ni ningún otro artefacto documental, ni crear commit.
- Commit base de esta entrega: `d55f645` (`main`), resultado del Gate 0 anterior.

## 9. Corrección metodológica: numeración T010-01 a T010-14

Al redactar las pruebas se detectó una divergencia entre las descripciones de T010-10 a T010-14 en `experiments/EXP-010-test-plan.md`/`EXP-010-TB-14.md` (que agrupan "selector + valor predeterminado" en un solo ítem T010-10 y contienen un ítem T010-14 duplicado sobre dependencias externas) y la lista canónica de 14 ítems distintos de `experiments/EXP-009-test-design.md` §6. Se implementó la suite conforme a `experiments/EXP-009-test-design.md` (fuente vinculante explícita de esta entrega), que separa correctamente:

- T010-10: el selector ofrece solo Baja, Media y Alta;
- T010-11: Media aparece seleccionada inicialmente;
- T010-12: la prioridad se muestra mediante texto;
- T010-13: regresión completa;
- T010-14: ausencia de dependencias externas nuevas.

Los archivos `EXP-010-TB-14.md` y `EXP-010-test-plan.md` no se modificaron en esta entrega (fuera del alcance autorizado); su tabla de T010-10 a T010-14 queda pendiente de alinearse con esta numeración en una entrega documental separada.

## 10. Archivo modificado

- `test-runner.js`: se añadió la función auxiliar `findPrioritySelect()` y los catorce casos T010-01 a T010-14, insertados entre `T007-09` y `T005-CONTROL-ASSERT`. Ningún caso existente (`T005-*`, `T007-*`, `T005-CONTROL-*`, `T005-FINAL`) fue modificado, eliminado ni rebajado en severidad.

## 11. Ejecución

- Servidor: `python -m http.server 8010`, servido desde la raíz del repositorio.
- Navegador: Microsoft Edge headless, versión 150.0.4078.83.
- Comando: `msedge --headless --disable-gpu --virtual-time-budget=8000 --dump-dom http://localhost:8010/tests.html`, modo `normal` (sin parámetro `?mode=`), equivalente al mecanismo usado por EXP-005/EXP-006/EXP-007 y por `.github/workflows/tests.yml`.
- Estado general reportado por el ejecutor: `data-test-status="fail"`, `data-test-general-status="FAIL"` (fase roja: se espera FAIL general porque T010-* aún no tienen implementación).
- Totales: 37 casos — 23 PASS, 11 FAIL, 3 NO EJECUTADO.

### Resultado de la línea base (regresión)

`T005-01` a `T005-10`, `T007-01` a `T007-09`: **19/19 en PASS**, sin cambios de comportamiento ni de expectativa.

### Resultado individual T010-01 a T010-14

| ID | Estado | Causa |
|---|---|---|
| T010-01 | FAIL | `createTask` sin tercer argumento no asigna `priority: "medium"` (no existe el atributo). |
| T010-02 | FAIL | `createTask(title, dueDate, 'low')` no persiste `priority`; el tercer argumento se ignora. |
| T010-03 | FAIL | Igual que T010-02, con `'medium'`. |
| T010-04 | FAIL | Igual que T010-02, con `'high'`. |
| T010-05 | FAIL | `createTask` no valida el tercer argumento; una prioridad explícitamente inválida no rechaza la creación. |
| T010-06 | FAIL | `loadTasks()` no normaliza una tarea antigua sin `priority` a `medium`. |
| T010-07 | FAIL | `loadTasks()` no normaliza una prioridad desconocida a `medium`. |
| T010-08 | FAIL | Falla en la primera aserción (normalización en memoria ausente); la ausencia de escritura automática no llegó a evaluarse de forma independiente porque la normalización previa ya falta. |
| T010-09 | FAIL | Las tres tareas cargan sin bloquearse (eso ya funciona hoy), pero la tarea con prioridad inválida no se normaliza a `medium`. |
| T010-10 | FAIL | No existe ningún `<select>` de prioridad dentro de `#task-form` en `index.html`. |
| T010-11 | NO EJECUTADO | `skipWhen` detecta que el selector de prioridad (prerrequisito de T010-10) no existe; se clasifica como dependencia no satisfecha, no como fallo. |
| T010-12 | FAIL | El texto renderizado de cada tarea no contiene ninguna etiqueta Baja/Media/Alta. |
| T010-13 | PASS | Es una prueba de regresión, no una prueba de comportamiento de VS-01: verifica en tiempo de ejecución que ningún resultado `T005-*`/`T007-*` sea distinto de PASS. Como VS-01 todavía no altera `app.js`, la regresión se mantiene intacta y esta prueba pasa legítimamente, tanto ahora como después de implementar VS-01. |
| T010-14 | PASS | Es un control de ausencia de dependencias externas nuevas (idéntico en técnica a T005-10/T007-09), no una prueba de comportamiento de VS-01: como `index.html` no se modificó en esta entrega, no hay referencias externas que detectar. Pasa legítimamente ahora y debe seguir en PASS después de implementar VS-01 (CA-VS01-12).

**Nota de validez de la fase roja:** de las 14 pruebas nuevas, 12 son pruebas de comportamiento de VS-01 (T010-01 a T010-12) y las 14 fallan o quedan no ejecutadas exclusivamente por la ausencia de VS-01, tal como exige la condición de validez. T010-13 y T010-14 son, por diseño, pruebas de control/regresión (no de comportamiento de VS-01): verifican que nada se haya roto ni se haya añadido, una condición que debe cumplirse tanto antes como después de implementar VS-01. Que ambas pasen ya en esta fase no es un falso positivo de la fase roja: no había ninguna forma correcta de diseñarlas para que fallen sin comprometer su propio propósito de control. Se documenta explícitamente esta distinción para que quede sujeta a revisión.

## 12. Confirmación de ausencia de fallos heredados o del ejecutor

- Ningún caso `T005-*`, `T007-*`, `T005-CONTROL-*` ni `T005-FINAL` cambió de estado respecto de su comportamiento esperado.
- El ejecutor completó su ciclo normalmente (`data-test-status` presente, sin excepción no controlada fuera de los casos `try/catch` de `runCase`); no hubo un fallo crítico del ejecutor (`FAIL crítico del ejecutor`, mensaje que no apareció).
- Cada fallo nuevo quedó identificado por ID y causa (§11).
- Conclusión: la fase roja es **válida** conforme a los criterios de la instrucción, con la salvedad documentada en §11 sobre T010-13/T010-14.

## 13. Control del alcance de esta entrega

Confirmado:

- se modificó únicamente `test-runner.js`;
- no se modificó `app.js`;
- no se modificó `index.html`;
- no se modificó `styles.css`;
- no se modificó `tests.html`;
- no se modificó ningún otro artefacto documental (`EXP-010-TB-14.md`, `EXP-010-implementation-plan.md`, `EXP-010-test-plan.md`, `EXP-010-independent-review.md`, `EXP-010-reversal-test.md`, `EXP-010-evaluation.md`), salvo este registro;
- no se implementó ninguna solución productiva;
- no se creó commit.

## 14. Estado de salida tras Gate 1 (fase roja)

- Fase roja: completada y válida.
- Fase verde (implementación productiva): no autorizada todavía.
- Código productivo modificado: no. Pruebas ejecutables modificadas: sí (`test-runner.js` únicamente).
- Preguntas bloqueantes abiertas: 0.

## Excepciones (Gate 1)

Ninguna registrada.

---

## 15. Gate 2 — Autorización e implementación de VS-01 (tercera entrega)

- Fecha de ejecución: 19 de julio de 2026.
- Instrucción recibida de Hugo Cornejo Villena: "La fase roja de EXP-010 queda aprobada. Gate 2 autorizado para implementar exclusivamente VS-01 — Prioridad base y compatibilidad."
- Alcance autorizado: corregir la divergencia de numeración en `EXP-010-TB-14.md` y `EXP-010-test-plan.md`; implementar VS-01 en `app.js`, `index.html` y `styles.css`; modificar `test-runner.js` solo ante un defecto real de prueba; ejecutar la suite completa; registrar el resultado únicamente en este archivo. No autoriza commit.

## 16. Corrección previa de numeración (antes de implementar)

Se corrigió la tabla de T010-10 a T010-14 en `experiments/EXP-010-TB-14.md` §9 y las secciones correspondientes de `experiments/EXP-010-test-plan.md` para alinearlas con la numeración canónica de `experiments/EXP-009-test-design.md` §6 (la misma ya usada al implementar las pruebas en Gate 1):

- T010-10: selector ofrece únicamente Baja, Media y Alta;
- T010-11: Media aparece seleccionada inicialmente;
- T010-12: prioridad visible mediante texto;
- T010-13: regresión completa;
- T010-14: ausencia de dependencias externas.

`experiments/EXP-010-implementation-plan.md` no contenía descripciones divergentes por ID (solo referencias genéricas a "T010-01 a T010-14"); no requirió corrección.

## 17. Decisiones implementadas

En `app.js`:

1. `VALID_PRIORITIES = ['low', 'medium', 'high']`, `DEFAULT_PRIORITY = 'medium'`, `PRIORITY_LABELS = { low: 'Baja', medium: 'Media', high: 'Alta' }`.
2. `isValidPriority(priority)` valida pertenencia exacta al conjunto permitido.
3. `createTask(title, dueDate, priority)`: si `priority` es `undefined` (tercer argumento omitido), usa `DEFAULT_PRIORITY`.
4. `createTask`: si `priority` está definida y no es válida, retorna `null` sin persistir nada (rechazo atómico); si es válida, se persiste exactamente ese valor.
5. `normalizeTask(task)` / `normalizePriority(priority)`: prioridad válida se conserva; ausente o desconocida se normaliza a `medium`.
6. `loadTasks()` aplica `normalizeTask` en memoria sobre el resultado de `JSON.parse`, sin invocar `saveTasks()` como efecto de la normalización.
7. El manejo de JSON corrupto (`try/catch` → `saveTasks([])` → `[]`) se conservó sin cambios.
8. `index.html`: `<select id="task-priority">` dentro de `#task-form`, con `<option>` Baja/Media/Alta y `medium` marcada `selected`.
9. El manejador de envío en `app.js` lee `task-priority` y lo pasa como tercer argumento a `createTask`.
10. Tras una creación exitosa, el manejador restablece `priorityInput.value = DEFAULT_PRIORITY`.
11. `renderReadRow` añade un `<span class="priority-label">` con el texto `Prioridad: Baja|Media|Alta`, obtenido mediante `getPriorityLabel(task.priority)`.
12. `styles.css`: dos reglas mínimas (`select#task-priority`, `.priority-label`), sin rediseño general.
13. `createTask(title, dueDate)` sin tercer argumento sigue funcionando sin cambios de comportamiento para quien la invoque así (compatibilidad verificada por T005-*/T007-* y T010-01).
14. No se implementó edición de prioridad, filtros, transición reversible de estado, ordenamiento ni refactorizaciones fuera de lo descrito arriba. `updateTask`/`completeTask`/`saveEditTask` no se modificaron: la prioridad de una tarea existente se conserva implícitamente porque esas funciones nunca tocan el campo `priority`.

Mensaje de error de prioridad (`TASK_PRIORITY_ERROR_MESSAGE`, mostrado mediante un `showFieldError`/`hideFieldError` generalizados a partir de los antiguos `showTitleError`/`hideTitleError`) añadido para no confundirse con el mensaje de título, conforme a `experiments/EXP-009-feature-specification.md` §9. Esta ruta no es alcanzable actualmente desde la interfaz (el `<select>` solo ofrece valores válidos) pero cubre `createTask` invocado con una prioridad inválida por otras vías.

## 18. Hallazgo: defecto real en `test-runner.js` (`waitForFrame`)

Al ejecutar la fase verde, `T010-10` seguía en FAIL pese a que `index.html` ya contenía el `<select>` de prioridad. Se investigó y se determinó que `waitForFrame()` podía resolver su promesa contra el documento `about:blank` inicial del iframe (previo a la navegación real a `index.html`) cuando su comprobación síncrona rápida se ejecutaba antes de que la navegación real terminara. Esto es un defecto preexistente del arnés compartido, no introducido en esta entrega: pasó inadvertido en `T005-10`/`T007-09`/`T010-14` porque esas pruebas verifican la *ausencia* de referencias externas, condición que también se cumple trivialmente en un documento `about:blank` vacío (falso positivo silencioso). `T010-10`/`T010-11` verifican la *presencia* de un elemento, lo que expuso el defecto.

Corrección aplicada en `waitForFrame()` (única modificación de `test-runner.js` en esta entrega, no relacionada con adaptar expectativas): la comprobación rápida ahora exige además `frame.contentWindow.location.href !== 'about:blank'`, de modo que solo se considera "cargado" el documento realmente navegado a `index.html`, no el marcador de posición inicial. Diagnóstico y verificación del defecto realizados con un archivo temporal fuera del repositorio (`debug-select.html`, servido por el mismo servidor HTTP local), eliminado antes de cerrar esta entrega; no queda en el árbol de trabajo.

Ningún caso de prueba (`T005-*`, `T007-*`, `T010-01` a `T010-14`, `T005-CONTROL-*`, `T005-FINAL`) fue rebajado, eliminado ni tuvo su expectativa alterada por esta corrección.

## 19. Ejecución (fase verde)

- Servidor: `python -m http.server 8011`, servido desde la raíz del repositorio.
- Navegador: Microsoft Edge headless, versión 150.0.4078.83.
- Comando: `msedge --headless --disable-gpu --virtual-time-budget=8000 --dump-dom http://localhost:8011/tests.html`, modo `normal`.
- Antes de la corrección del defecto: `data-test-status="fail"`, totales `{total:37, passed:33, failed:1, notRun:3}` — único fallo: `T010-10` (causa: defecto de `waitForFrame`, no de la implementación de VS-01; ver §18).
- Después de la corrección: `data-test-status="pass"`, `data-test-general-status="PASS CON NO EJECUTADOS"`.
- Totales finales: **37 casos — 35 PASS, 0 FAIL, 2 NO EJECUTADO.**
- Ejecución repetida una segunda vez para confirmar ausencia de intermitencia: mismo resultado.

### Resultado individual T010-01 a T010-14 (fase verde)

| ID | Estado |
|---|---|
| T010-01 | PASS |
| T010-02 | PASS |
| T010-03 | PASS |
| T010-04 | PASS |
| T010-05 | PASS |
| T010-06 | PASS |
| T010-07 | PASS |
| T010-08 | PASS |
| T010-09 | PASS |
| T010-10 | PASS |
| T010-11 | PASS |
| T010-12 | PASS |
| T010-13 | PASS |
| T010-14 | PASS |

### NO EJECUTADO restantes

Únicamente los controles deliberados del ejecutor, en modo `normal`:

- `T005-CONTROL-ASSERT` — "Solo se ejecuta con ?mode=assertion-failure."
- `T005-CONTROL-EXCEPTION` — "Solo se ejecuta con ?mode=exception."

## 20. Confirmación de regresión

`T005-01` a `T005-10`, `T007-01` a `T007-09` y `T005-FINAL`: **20/20 en PASS**, sin cambios de expectativa. `T010-13` (que evalúa esta misma condición en tiempo de ejecución) también en PASS.

## 21. Validación de los criterios de validez de la fase verde

- T010-01 a T010-14 pasan: sí (§19).
- Todas las T005 y T007 siguen pasando: sí (§20).
- No hay fallos ni casos nuevos no ejecutados: sí, 0 FAIL, y los únicos NO EJECUTADO son los dos controles deliberados preexistentes.
- Los únicos NO EJECUTADOS siguen siendo los controles deliberados del ejecutor: confirmado (§19).
- No se añadieron dependencias: confirmado por `T005-10`, `T007-09` y `T010-14`, los tres en PASS.
- No se modificó alcance diferido: confirmado en §22.

**Conclusión: la fase verde es válida.**

## 22. Control del alcance de esta entrega

Confirmado:

- se modificaron `app.js`, `index.html` y `styles.css` conforme al plan congelado;
- se modificó `test-runner.js` únicamente para corregir el defecto de `waitForFrame` descrito en §18 (no para adaptar expectativas a la implementación);
- se corrigieron `experiments/EXP-010-TB-14.md` y `experiments/EXP-010-test-plan.md` (numeración, §16), antes de implementar;
- no se modificó `tests.html`;
- no se modificaron `experiments/EXP-010-implementation-plan.md`, `EXP-010-independent-review.md`, `EXP-010-reversal-test.md` ni `EXP-010-evaluation.md`;
- no se implementó edición de prioridad, filtros, transición reversible de estado, ordenamiento, estados vacíos diferenciados ni refactorizaciones generales;
- no se añadieron dependencias externas;
- no se creó commit.

## 23. Estado de salida tras Gate 2 (fase verde)

- Fase verde: completada y válida.
- VS-01: implementada conforme al plan congelado en `experiments/EXP-010-implementation-plan.md`.
- Regresión: íntegra.
- Revisión técnica independiente (Gate 3), rúbrica de control alto (Gate 4) y ensayo de reversión (Gate 5): pendientes, cada uno requiere autorización separada.
- Preguntas bloqueantes abiertas: 0.

## Excepciones (Gate 2)

Ninguna registrada. El hallazgo de §18 se documenta como defecto corregido del arnés de pruebas, no como excepción al alcance autorizado.

---

## 24. Gate 3 — Revisión técnica independiente (cuarta entrega)

- Fecha: 19 de julio de 2026.
- Instrucción recibida: "Inicia ahora la revisión independiente de EXP-010. No modifiques código ni archivos durante la revisión."
- Un primer informe (commit `42ff4d3`) se redactó en el mismo contexto que la implementación y registró un hallazgo bloqueante (F1) por incumplir el requisito de separación de contexto de `experiments/EXP-010-TB-14.md` §12.
- Ese informe fue reemplazado por una revisión formal realizada en un contexto separado, registrada en `experiments/EXP-010-independent-review.md`, con **veredicto APROBADO, sin hallazgos bloqueantes** (10 hallazgos H1-H10, todos no bloqueantes u observaciones).
- Instrucción recibida a continuación: "La revisión independiente formal aprobó Gate 3 sin hallazgos bloqueantes."

## 25. Ajuste previo a reversión (quinta entrega): cierre de H1, H3, H4, H5 y H6

- Fecha: 19 de julio de 2026.
- Instrucción recibida: autorización limitada a corregir H1, H3 y H4 (documentales), añadir T010-15 y T010-16 (cierre de H5 y H6), sin modificar comportamiento productivo salvo defecto real revelado por esas pruebas, sin implementar alcance diferido, reejecutar la suite completa y actualizar únicamente este registro y `EXP-010-independent-review.md` (solo para registrar el cierre, sin reescribir el veredicto formal).

### Cierre de H1 — estados obsoletos

Actualizados `experiments/EXP-010-TB-14.md` (encabezado, tabla de gates §12, alcance vigente §13, estado actual §14, lista de archivos §11), `experiments/EXP-010-test-plan.md` (encabezado) y `experiments/EXP-010-implementation-plan.md` (encabezado, sección "Archivos autorizados", sección "Aprobación humana antes de implementar") para reflejar: Gate 0 completado, Gate 1 (fase roja) completado, Gate 2 (implementación) completado, Gate 3 (revisión independiente) aprobado sin hallazgos bloqueantes; Gates 4-6 pendientes.

### Cierre de H3 — cita incorrecta de RF-05

En `experiments/EXP-010-TB-14.md` §8 (decisión 6) y §9 (tabla de pruebas, filas T010-10 y T010-11), se eliminó la cita a RF-05 (que describe el filtro de prioridad, trazado a VS-04 en `experiments/EXP-009-traceability-matrix.md`, no a VS-01) y se sustituyó por CA-VS01-08 (criterio de aceptación de la propia slice, que sí describe el selector de creación) y RI-02 (conjunto de valores válidos), conforme a la recomendación del hallazgo H3.

### Cierre de H4 — mapeo T010 desalineado en la matriz de EXP-009

En `experiments/EXP-009-traceability-matrix.md` §1, la fila de RF-04 citaba `T010-11` (que tras la renumeración de Gate 1 es "Media aparece seleccionada inicialmente"); se corrigió a `T010-12` (el caso que efectivamente prueba "texto visible en fila renderizada"). Fue el único identificador `T010-1x` desalineado en ese archivo (verificado mediante búsqueda exhaustiva de `T010-1[0-4]`). No se modificó ningún requisito, decisión ni alcance de EXP-009.

### Cierre de H5 y H6 — pruebas nuevas T010-15 y T010-16

Incorporadas en `test-runner.js`, entre `T010-14` y `T005-CONTROL-ASSERT`:

- **T010-15** — ejerce el envío real del formulario de creación dentro del iframe de `index.html` (no simulado): localiza `#task-form`, `#task-title` y el selector de prioridad mediante `findPrioritySelect()`; fija un título único y `priority = 'high'`; despacha un evento `submit` real sobre el formulario; verifica que la tarea creada quedó persistida con `priority: "high"` y que el `<select>` volvió a mostrar `medium` seleccionado. Cierra H5.
- **T010-16** — crea una tarea con `priority: 'high'`; la edita (título y fecha) mediante `beginEditTask`/`saveEditTask`; verifica que `priority` sigue siendo `'high'` tanto en el valor devuelto como en `localStorage`; completa la tarea (`completeTask`) y verifica que `priority` sigue siendo `'high'`. Cierra H6.

Ambas pruebas ejecutan sobre código productivo sin modificar: no se tocó `app.js`, `index.html` ni `styles.css` en esta entrega. Ninguna reveló un defecto real, por lo que no se aplicó ningún cambio de comportamiento productivo (condición 5 de la instrucción).

## 26. Ejecución (reconfirmación tras el ajuste)

- Servidor: `python -m http.server 8012`, servido desde la raíz del repositorio.
- Navegador: Microsoft Edge headless, versión 150.0.4078.83.
- Comando: `msedge --headless --disable-gpu --virtual-time-budget=8000 --dump-dom http://localhost:8012/tests.html`, modo `normal`.
- Totales: **39 casos — 37 PASS, 0 FAIL, 2 NO EJECUTADO.**
- `T010-15` y `T010-16`: ambas en **PASS**.
- T010-01 a T010-14: las 14 en PASS (sin cambios respecto de Gate 2).
- Regresión `T005-*`/`T007-*`/`T005-FINAL`: 20/20 en PASS.
- NO EJECUTADO: únicamente `T005-CONTROL-ASSERT` y `T005-CONTROL-EXCEPTION` (controles deliberados, modo `normal`).
- Ejecución repetida una segunda vez para confirmar ausencia de intermitencia (en particular de `T010-15`, que despacha un evento DOM real): mismo resultado.

## 27. Control del alcance de esta entrega

Confirmado:

- se modificaron únicamente `experiments/EXP-010-TB-14.md`, `experiments/EXP-010-test-plan.md`, `experiments/EXP-010-implementation-plan.md` (cierre de H1 y H3), `experiments/EXP-009-traceability-matrix.md` (cierre de H4, un solo identificador), `test-runner.js` (T010-15 y T010-16) y este registro;
- no se modificó `app.js`, `index.html` ni `styles.css`;
- no se modificó `tests.html`;
- no se implementó edición de prioridad, filtros, transición reversible de estado, ordenamiento ni ningún otro elemento de alcance diferido;
- no se añadieron dependencias externas;
- no se alteraron requisitos, decisiones ni alcance de EXP-008/EXP-009 (solo se corrigieron citas/identificadores de trazabilidad, H3 y H4);
- no se creó commit.

## 28. Estado de salida tras el ajuste previo a reversión

- H1, H3, H4, H5 y H6: cerrados.
- H2, H7, H8, H9, H10: sin cambios (H2 pendiente de aceptación explícita como excepción o de re-secuenciación de commits; H7-H10 son observaciones que no requerían corrección en esta entrega).
- Gate 3: se mantiene aprobado; esta entrega no reabre ni reescribe ese veredicto.
- Siguiente paso: ensayo de reversión (Gate 5) y/o evaluación de rúbrica (Gate 4), cada uno sujeto a autorización separada.
- Preguntas bloqueantes abiertas: 0.

## Excepciones (ajuste previo a reversión)

Ninguna registrada.

---

## 29. Gate 5 — Ensayo de reversión (sexta entrega)

- Fecha: 19 de julio de 2026.
- Instrucción recibida: "Gate 4 autorizado para ejecutar el ensayo de reversión de EXP-010." Objetivo: demostrar que los cambios de EXP-010 pueden revertirse y restaurarse de forma trazable, sin reescribir historial y sin afectar `main`.
- **Corrección de numeración** (aplicada en la entrega siguiente, de evaluación formal): la instrucción citada llamó "Gate 4" a este ensayo; `experiments/EXP-010-TB-14.md` §12 lo define como **Gate 5** (Gate 4 = rúbrica de control alto). Esta sección se renombró de "Gate 4" a "Gate 5" para alinearse con la numeración oficial de TB-14.md; el contenido técnico del ensayo (lo efectivamente ejecutado) no cambia.
- Punto de restauración registrado: `pilot-003/exp-010-priority-base` @ `a840a1b` (HEAD en el momento de iniciar el ensayo; árbol de trabajo limpio, sin cambios pendientes).
- Rama desechable creada: `pilot-003/exp-010-reversal-test`, desde `a840a1b`.

### Commits identificados (main..HEAD, 6 commits, mapeados a las 6 categorías solicitadas)

`d55f645` (documentación inicial), `9a64754` (fase roja), `fecdbea` (corrección de `waitForFrame()`), `02238a6` (implementación VS-01), `42ff4d3` (revisión independiente), `a840a1b` (cierre de hallazgos).

### Reversión

`git revert --no-edit` en orden inverso: `a840a1b` → `42ff4d3` → `02238a6` → `fecdbea` → `9a64754` → `d55f645`. **Cero conflictos** en las 6 operaciones. No se usó `git reset --hard`, `rebase`, `push --force` ni edición manual. Verificado que el árbol resultante es idéntico a `main` para `app.js`/`index.html`/`styles.css`/`test-runner.js` (`git diff main --stat` sin salida); `priority` ausente de `app.js` (0 coincidencias); `T010` ausente de `test-runner.js` (0 coincidencias).

### Suite tras revertir

Servidor HTTP local (puerto 8013) + Microsoft Edge headless 150.0.4078.83, modo `normal`. Resultado: **23 casos — 21 PASS, 0 FAIL, 2 NO EJECUTADO** (línea base EXP-005/EXP-007 íntegra; ningún caso `T010-*` presente; sin fallos heredados; sin errores del ejecutor).

### Restauración

`git revert --no-edit` sobre los 6 commits de reversión, en orden que reaplica los cambios originales cronológicamente: revert de `f0dafc5` → `ca4b8ac` → `244ce34` → `098d807` → `85c836c` → `7d7b799`. **Cero conflictos** en las 6 operaciones. Árbol restaurado verificado idéntico al punto de restauración (`git diff a840a1b --stat` sin salida).

### Suite tras restaurar

Servidor HTTP local (puerto 8014) + Edge headless, modo `normal`. Resultado confirmado: **39 casos — 37 PASS, 0 FAIL, 2 NO EJECUTADO**, coincidiendo exactamente con el resultado esperado.

### Cierre

- Regreso a `pilot-003/exp-010-priority-base` (`git checkout`); HEAD nuevamente en `a840a1b`.
- `main` verificado sin cambios (`43185f4`).
- Rama desechable `pilot-003/exp-010-reversal-test` **conservada, no fusionada, no eliminada**, con los 12 commits de reversión/restauración disponibles para inspección.
- No se creó commit en `pilot-003/exp-010-priority-base`.
- No se modificó código productivo ni pruebas en esta rama; todo el ensayo ocurrió en la rama desechable.
- Detalle completo, tabla de commits y evidencia íntegra en `experiments/EXP-010-reversal-test.md`.

## Estado de salida tras Gate 5

- Ensayo de reversión: completado y válido. Gate 5 superado.
- Gates pendientes: 4 (rúbrica de control alto) y 6 (aprobación humana e integración/merge).
- Preguntas bloqueantes abiertas: 0.

## Excepciones (Gate 5)

Ninguna registrada.

---

## 30. Gate 4 — Evaluación formal mediante rúbrica (séptima entrega)

- Fecha: 19 de julio de 2026.
- Instrucción recibida: "Inicia la evaluación formal de EXP-010." Contexto verificado por Hugo Cornejo Villena: revisión independiente aprobada sin bloqueantes, suite final 39/37/0/2, ensayo de reversión exitoso, rama restaurada exactamente, `main` intacto, rama desechable conservada, sin cambios productivos pendientes.
- Primer paso autorizado: corrección de la inconsistencia de numeración de gates (Gate 4 = rúbrica; Gate 5 = ensayo de reversión; Gate 6 = autorización de PR y merge), sin alterar contenido técnico ni inventar gates nuevos.

### Corrección de numeración aplicada

`experiments/EXP-010-TB-14.md` §12 ya definía la numeración correcta (Gate 4 = rúbrica, Gate 5 = reversión, Gate 6 = aprobación humana e integración) desde su redacción original; no requirió cambios de numeración. La única inconsistencia real estaba en este mismo registro (§29, entrega anterior), que había titulado el ensayo de reversión como "Gate 4" siguiendo literalmente la frase de la instrucción recibida en ese momento. Se corrigió: el encabezado "## 29. Gate 4 — Ensayo de reversión" pasó a "## 29. Gate 5 — Ensayo de reversión"; "Estado de salida tras Gate 4"/"Gate 4 superado"/"Excepciones (Gate 4)" pasaron a "Gate 5"; la nota de numeración que dejaba la discrepancia sin resolver se reemplazó por una nota de corrección aplicada. No se modificó ningún otro contenido de §29 (comandos, commits, resultados de suite quedan exactamente igual).

### Evaluación mediante rúbrica

Completada en `experiments/EXP-010-evaluation.md`, conforme a la estructura oficial de `docs/evaluation-rubric.md` (§15 registro de puntuación, §16 cálculo, §17 umbrales de control alto, §19 reglas de bloqueo, §20 evaluación por dimensión, §21 decisión final, §22 decisión sobre el componente). Resumen:

- Puntuación principal: **42/50** (umbral de control alto: 42/50 — cumplido en el límite exacto).
- Mínimos por criterio (control alto): seguridad y control 5/5, pruebas 5/5, reversión 5/5, trazabilidad 4/5 — los cuatro cumplen su mínimo de 4/5.
- Intervención humana (reportada aparte, no sumada): 3/5.
- Reglas de bloqueo: ninguna activada (verificación puntual de las 12 reglas de `docs/evaluation-rubric.md` §19).
- Resultado propuesto: **Aprobado**.
- Decisión sobre el componente: **incorporar con restricciones** (condicionado a que Hugo Cornejo Villena decida sobre el hallazgo H2 antes de Gate 6).
- Nota de transparencia registrada en la propia evaluación (§0 de `EXP-010-evaluation.md`): a diferencia de Gate 3, Gate 4 no exige explícitamente contexto separado del de implementación en `EXP-010-TB-14.md` §12, pero esta evaluación fue redactada por el mismo contexto que ejecutó Gates 1, 2 y 5; se deja constancia expresa de esta circunstancia.

### Actualización de `experiments/EXP-010-TB-14.md`

Estado actualizado: Gate 4 (rúbrica) y Gate 5 (ensayo de reversión) marcados como completados, con referencia a `experiments/EXP-010-evaluation.md` y `experiments/EXP-010-reversal-test.md` respectivamente. Gate 6 permanece pendiente. No se modificó ningún contenido técnico de TB-14.md más allá de estos campos de estado.

### Actualización de `docs/results-dashboard.md`

Añadida la sección "Resultado de EXP-010" en la tabla y el detalle de PILOT-003, siguiendo el mismo formato usado para EXP-008 y EXP-009. No se cerró PILOT-003 como ciclo: no se añadió reporte de cierre del piloto, conclusión general ni aprobación final del piloto; solo se registró el resultado individual de EXP-010, conforme a la regla de actualización ya vigente en ese tablero ("este tablero deberá actualizarse al cierre real de cada experimento").

### Control del alcance de esta entrega

Confirmado:

- se modificaron únicamente `experiments/EXP-010-evaluation.md`, `experiments/EXP-010-session-log.md` (este registro), `experiments/EXP-010-TB-14.md` (numeración ya correcta; solo estado actualizado) y `docs/results-dashboard.md`;
- no se modificó `app.js`, `index.html`, `styles.css`, `test-runner.js` ni `tests.html`;
- no se modificaron `experiments/EXP-010-implementation-plan.md`, `experiments/EXP-010-test-plan.md`, `experiments/EXP-010-independent-review.md` ni `experiments/EXP-010-reversal-test.md`;
- no se abrió pull request;
- no se fusionó nada;
- no se eliminó la rama desechable `pilot-003/exp-010-reversal-test` (verificada existente);
- no se creó commit;
- PILOT-003 no se cerró como ciclo.

## Estado de salida tras Gate 4

- Evaluación formal: completada. Gate 4 superado (42/50, umbral cumplido, sin bloqueos).
- Gate pendiente (en el momento de esta entrega): 6 (aprobación humana e integración/merge), condicionado a la decisión de Hugo Cornejo Villena sobre H2.
- Preguntas bloqueantes abiertas: 0.

## Excepciones (Gate 4)

Ninguna registrada en el momento de esta entrega. H2 quedó pendiente de decisión (ver §31, siguiente entrega, donde se acepta como excepción).

---

## 31. Aceptación de H2 como excepción documentada y cierre técnico de EXP-010 (octava entrega)

- Fecha: 19 de julio de 2026.
- Instrucción recibida: "Acepto H2 como excepción documentada de EXP-010." Justificación provista por Hugo Cornejo Villena: no afecta la corrección técnica; no afecta pruebas, seguridad ni reversión; corregirlo exigiría reescribir historial o fabricar commits artificiales; la cadena actual sigue siendo auditable; debe convertirse en regla preventiva para PILOT-004 (narrativa y código en el commit correspondiente, en orden cronológico).

### 1. H2 aceptado como excepción no bloqueante

Registrado formalmente en `experiments/EXP-010-evaluation.md` §8, conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15 (regla omitida, motivo, riesgo, persona que autoriza, duración, medidas compensatorias, resultado). Precedente: hallazgo H2 de EXP-007, aceptado bajo el mismo mecanismo. El hallazgo permanece descrito, sin cambios, en `experiments/EXP-010-independent-review.md` (no modificado en esta entrega); su estado de aceptación consta en `EXP-010-evaluation.md`, `EXP-010-TB-14.md`, este registro y `docs/results-dashboard.md`.

### 2. Puntaje final

**42/50.** Sin cambios respecto de la evaluación de Gate 4 (§30): la aceptación de H2 como excepción no modifica ninguna puntuación de la rúbrica — la trazabilidad ya se había puntuado en 4/5 considerando este hallazgo abierto; aceptarlo como excepción no lo convierte en un defecto adicional ni en un mérito nuevo.

### 3. Decisión final de EXP-010

**Aprobado, con restricciones.** Ver `experiments/EXP-010-evaluation.md` §10-§11 (actualizado).

### 4-6. Estado de gates

- Gate 4 (rúbrica): completado (42/50, sin cambios).
- Gate 5 (ensayo de reversión): completado (sin cambios).
- Gate 6 (autorización de PR y merge): **pendiente**. Requiere autorización humana explícita para abrir el pull request y para el merge a `main`. Ya no está condicionado a H2 (resuelto como excepción); condición única restante: revisión y aprobación del pull request por Hugo Cornejo Villena.

### 7. Cierre técnico de EXP-010

EXP-010 queda **cerrado técnicamente**: implementación completa (Gate 2), revisión independiente aprobada (Gate 3), evaluación aprobada (Gate 4), reversión demostrada (Gate 5), único hallazgo no bloqueante pendiente de decisión (H2) resuelto como excepción documentada. **No integrado todavía**: no existe pull request abierto, no hay merge a `main`, Gate 6 sigue pendiente.

### 8. Estado de PILOT-003

PILOT-003 **continúa abierto**. No se redacta en esta entrega ningún reporte de cierre de piloto, conclusión general del ciclo ni aprobación final del piloto. El cierre formal de PILOT-003 requiere, como mínimo, el merge de EXP-010 (Gate 6) y una entrega de cierre de piloto separada, análoga a `docs/PILOT-001-closure-report.md`/`docs/PILOT-002-closure-report.md`, no autorizada todavía.

### 9. Lección obligatoria para PILOT-004

La narrativa de sesión y el código correspondiente deben registrarse **en el mismo commit y en orden cronológico**. Se registra como lección obligatoria, no como sugerencia, porque el mismo tipo de hallazgo ya ocurrió en EXP-007 (H2) y volvió a ocurrir en EXP-010 (H2): una recomendación documentada una sola vez no fue suficiente para evitar la recurrencia. Registrada en `experiments/EXP-010-evaluation.md` §9 y en `docs/results-dashboard.md`.

### Control del alcance de esta entrega

Confirmado:

- se modificaron únicamente `experiments/EXP-010-evaluation.md`, `experiments/EXP-010-session-log.md` (este registro), `experiments/EXP-010-TB-14.md` y `docs/results-dashboard.md`;
- no se modificó código productivo ni pruebas;
- no se modificó `experiments/EXP-010-independent-review.md` (el hallazgo H2 permanece descrito allí sin cambios; solo su estado de aceptación se registra en los cuatro archivos autorizados);
- no se abrió pull request;
- no se fusionó nada;
- no se eliminó la rama desechable `pilot-003/exp-010-reversal-test`;
- no se creó commit.

## Estado de salida final de EXP-010 (esta sesión)

- Gates 0 a 5: completados.
- Gate 6: pendiente de autorización humana (PR y merge).
- H2: aceptado como excepción documentada. H7, H8, H9: observaciones pendientes para VS-02.
- EXP-010: cerrado técnicamente, no integrado.
- PILOT-003: abierto.
- Preguntas bloqueantes abiertas: 0.

## Excepciones (registro acumulado de EXP-010)

- H2 — aceptada como excepción documentada por Hugo Cornejo Villena, 19 de julio de 2026 (detalle completo en `experiments/EXP-010-evaluation.md` §8).
