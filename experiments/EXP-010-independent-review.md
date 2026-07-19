# EXP-010 — Revisión técnica independiente

## 0. Nota sobre independencia de contexto

Esta revisión se redacta en una **sesión y un contexto de agente distintos** de los que prepararon la documentación de Gate 0, ejecutaron la fase roja (Gate 1) y la fase verde (Gate 2) de VS-01. Este contexto no participó en escribir `app.js`, `index.html`, `styles.css` ni en corregir `waitForFrame()`; toma como punto de partida únicamente el estado del repositorio (commits, diffs, artefactos congelados) y verificación propia, no las conclusiones ya redactadas por la sesión de implementación.

El informe previo almacenado en este mismo archivo (commit `42ff4d3`) documentaba explícitamente que había sido escrito en el **mismo** contexto que la implementación, y por ello registraba un hallazgo bloqueante (F1) por incumplimiento del requisito de separación de contexto exigido por `experiments/EXP-010-TB-14.md` §12 (Gate 3). Esta entrega **reemplaza por completo** ese informe. No se hereda su veredicto: cada afirmación de cumplimiento se volvió a verificar de forma directa (relectura de diffs, relectura de código fuente y, donde fue posible, reejecución real de la suite de pruebas), y solo se conserva del informe anterior lo que resistió esa verificación independiente.

**Verificación de la propia condición de independencia**: dado que la separación de contexto no se puede demostrar mediante evidencia interna al repositorio (es una propiedad de la sesión, no del código), esto se declara como un hecho procedimental bajo responsabilidad de quien encargó esta revisión, no como una afirmación que este informe pueda demostrar con un diff. Con esa salvedad, el hallazgo F1 del informe anterior se considera **resuelto** por esta entrega, no reevaluado como bloqueante de nuevo (ver §7).

## 1. Identificación

- Experimento: EXP-010
- Tarea del banco: TB-14 — slice VS-01 (Prioridad base y compatibilidad)
- Rama revisada: `pilot-003/exp-010-priority-base`, contra `main` (`43185f4`)
- Fecha de esta revisión: 19 de julio de 2026
- Contexto de revisión: sesión separada de la que ejecutó Gate 1 y Gate 2 (ver §0)

## 2. Alcance y commits revisados

| Commit | Mensaje | Archivos tocados |
|---|---|---|
| `d55f645` | docs: initialize EXP-010 implementation controls | `EXP-010-TB-14.md`, `EXP-010-implementation-plan.md`, `EXP-010-test-plan.md`, `EXP-010-session-log.md` |
| `9a64754` | test: establish EXP-010 red phase | `test-runner.js`, `EXP-010-session-log.md` |
| `fecdbea` | test: fix iframe readiness detection | `test-runner.js`, `EXP-010-session-log.md` |
| `02238a6` | feat: implement EXP-010 priority base | `app.js`, `index.html`, `styles.css`, `EXP-010-TB-14.md`, `EXP-010-test-plan.md` |

No se incluye en el alcance de esta revisión el commit `42ff4d3` (posterior a los cuatro anteriores), que solo reescribió este mismo archivo con el informe inválido que aquí se reemplaza.

No se modificó ningún archivo de código durante esta revisión. El único archivo modificado es este mismo (`experiments/EXP-010-independent-review.md`).

## 3. Metodología de verificación

- Lectura completa de `git diff main...pilot-003/exp-010-priority-base` para `app.js`, `index.html`, `styles.css`, `test-runner.js`.
- Lectura del código fuente completo de las funciones relevantes en la rama (`createTask`, `loadTasks`, `normalizeTask`, `normalizePriority`, `updateTask`, `completeTask`, `saveEditTask`, `renderReadRow`, `renderEditRow`, `waitForFrame`, `findPrioritySelect`), no solo del diff.
- Cotejo cruzado de las citas de requisitos (RF-01 a RF-22, RI-01 a RI-03) contra `experiments/EXP-008-frozen-requirements.md` y `experiments/EXP-009-traceability-matrix.md`.
- **Reejecución real e independiente de la suite de pruebas**, sin depender del resultado narrado en `experiments/EXP-010-session-log.md`: servidor HTTP local (`python -m http.server`) sirviendo la raíz del repositorio en el estado exacto de `pilot-003/exp-010-priority-base`, y Microsoft Edge headless (`msedge.exe`, mismo binario disponible en esta máquina) contra `tests.html` en modo `normal`, con el mismo patrón de invocación (`--headless --disable-gpu --virtual-time-budget=8000 --dump-dom`) usado por el proyecto.
- Resultado de la reejecución independiente: `data-test-status="pass"`, `data-test-general-status="PASS CON NO EJECUTADOS"`, resumen `Total: 37 | PASS: 35 | FAIL: 0 | NO EJECUTADO: 2`. Los dos únicos casos NO EJECUTADO son `T005-CONTROL-ASSERT` y `T005-CONTROL-EXCEPTION` (controles que solo corren con `?mode=assertion-failure`/`?mode=exception`, no aplican en modo `normal`). Este resultado coincide exactamente con el registrado en `experiments/EXP-010-session-log.md` §19, pero aquí se llega a él por ejecución propia, no por lectura del registro.

## 4. Cumplimiento de CA-VS01-01 a CA-VS01-12

| Criterio | Verificación directa | Resultado |
|---|---|---|
| CA-VS01-01 — crear sin prioridad persiste `medium` | `app.js`: `priority: priority === undefined ? DEFAULT_PRIORITY : priority`; `T010-01` PASS (reejecutado) | Cumple |
| CA-VS01-02 — crear con `low`/`medium`/`high` persiste ese valor exacto | mismo bloque; `T010-02/03/04` PASS (reejecutado) | Cumple |
| CA-VS01-03 — prioridad explícita inválida rechaza la creación completa | `if (priority !== undefined && !isValidPriority(priority)) return null;` antes de `loadTasks()`/`push`/`saveTasks()` (rechazo atómico real, no solo declarado); `T010-05` PASS, incluye `loadTasks().length === 0` | Cumple |
| CA-VS01-04 — tarea sin `priority` carga como `medium` | `loadTasks()` → `parsed.map(normalizeTask)`; `T010-06` PASS | Cumple |
| CA-VS01-05 — prioridad desconocida carga como `medium` | mismo mecanismo; `T010-07` PASS | Cumple |
| CA-VS01-06 — normalización no escribe automáticamente | rama de éxito de `loadTasks()` no invoca `saveTasks()`; solo la rama `catch` (JSON corrupto), sin cambios respecto de `main`; `T010-08` PASS | Cumple |
| CA-VS01-07 — una tarea inválida no bloquea la carga de las demás | `Array.prototype.map`, `normalizePriority` no lanza; `T010-09` PASS | Cumple |
| CA-VS01-08 — selector exclusivo Baja/Media/Alta, Media inicial | `index.html`: tres `<option>`, `medium` con `selected`; `T010-10`/`T010-11` PASS | Cumple |
| CA-VS01-09 — texto visible de prioridad en cada tarea | `renderReadRow`: `'Prioridad: ' + getPriorityLabel(task.priority)`; `T010-12` PASS | Cumple en modo lectura (ver H8) |
| CA-VS01-10 — el significado no depende solo de color/icono | contenido textual explícito; CSS solo fija tamaño/color, no reemplaza el texto | Cumple |
| CA-VS01-11 — EXP-005/EXP-007 sin regresión | reejecución propia: `T005-*`, `T007-*`, `T005-FINAL` 20/20 PASS | Cumple |
| CA-VS01-12 — sin dependencias nuevas | `index.html` sin `<script src="http...">` ni `<link href="http...">` nuevos; `T010-14` PASS (reejecutado) | Cumple |

Las 12 CA se cumplen con evidencia verificada de forma independiente, no solo declarada.

## 5. Cumplimiento de T010-01 a T010-14

Los 14 casos están presentes en `test-runner.js` (líneas insertadas entre `T007-09` y `T005-CONTROL-ASSERT`) y los 14 obtuvieron PASS en la reejecución independiente descrita en §3. No se identificó ningún caso ausente, duplicado ni con aserción trivial (todas las aserciones comparan un valor concreto esperado, no solo `truthy`).

## 6. Verificación puntual de los puntos solicitados

1. **Compatibilidad con `createTask(title, dueDate)`**: confirmado. El tercer parámetro es opcional; las llamadas de dos argumentos de `T005-*`/`T007-*` no se modificaron y pasan.
2. **Rechazo atómico de prioridad explícita inválida**: confirmado por lectura de código — la validación ocurre antes de cualquier lectura/escritura de `localStorage`; no existe ruta de escritura parcial.
3. **Normalización en memoria sin escritura automática**: confirmado — `loadTasks()` no llama a `saveTasks()` en su rama de éxito; `T010-08` compara contenido de `localStorage` antes/después y pasa.
4. **Recuperación ante JSON corrupto**: confirmado — el bloque `catch` es idéntico al de `main` (`saveTasks([]); return [];`); `T005-03/04/09` en PASS en la reejecución.
5. **Selector Baja, Media y Alta**: confirmado, exactamente tres `<option>`.
6. **Media predeterminada y restablecida tras creación**: la parte "predeterminada" está probada (`T010-11`, verificado). La parte "restablecida tras creación" está implementada (`priorityInput.value = DEFAULT_PRIORITY` en el manejador `submit`) pero **ningún caso de prueba ejerce un envío real del formulario de creación** — ver H5.
7. **Prioridad visible mediante texto**: confirmado en modo lectura; ausente en modo edición inline — ver H8.
8. **Ausencia de edición de prioridad, filtros, transición reversible, ordenamiento y refactor fuera de alcance**: confirmado por inspección completa del diff de `app.js`/`index.html`. El único cambio de tipo refactor es `showTitleError`/`hideTitleError` → `showFieldError`/`hideFieldError` con parámetro de mensaje; acotado, sin uso fuera de `app.js`, necesario para distinguir el error de prioridad del de título. No se considera refactor general fuera de alcance.
9. **Ausencia de dependencias nuevas**: confirmado, `T010-14` PASS en reejecución.
10. **Conservación de prioridad al editar título/fecha y completar**: confirmado por lectura directa de `updateTask`, `completeTask` y `saveEditTask` — ninguna de las tres toca `task.priority`. No existe una prueba automatizada dedicada a esta interacción (edición está fuera de alcance de VS-01) — ver H6.
11. **Regresión T005 y T007**: confirmado, 20/20 PASS en reejecución propia.
12. **Corrección de `waitForFrame()` frente a `about:blank`**: confirmado por lectura del diff de `fecdbea` — la condición añadida (`frame.contentWindow.location.href !== 'about:blank'`) es un marcador de estado inicial del navegador, no depende del nombre ni la ruta de `index.html`.
13. **Riesgo de esperas infinitas, falsos negativos o dependencia rígida de URL**: no se identifica ninguno de los tres. El `setTimeout` de 5000 ms preexistente no se tocó; si `isFrameReady()` da `false`, el código cae a la ruta ya existente (`frame.addEventListener('load', finish)`), sin ninguna condición nueva bajo la cual un frame realmente cargado se reporte como no cargado de forma permanente; la comprobación está envuelta en `try/catch` para tolerar un acceso fallido a `contentWindow.location`.
14. **Separación y trazabilidad de commits**: los cuatro commits existen por separado (mejor que agrupar Gate 0/1/2 en uno solo), pero con un problema real de correspondencia código↔narrativa — ver H2.
15. **Inconsistencias documentales**: confirmadas varias, algunas ya conocidas y una no reportada previamente — ver H1, H3, H4.
16. **Falta de prueba específica del restablecimiento del selector a Media**: confirmado de forma independiente — se buscó en `test-runner.js` cualquier uso de `dispatchEvent`/`.click()` sobre el formulario de creación (`#task-form`) y no existe ninguno; los únicos usos de esas técnicas corresponden a los casos de edición (`T007-*`), no a la creación. Ver H5.

## 7. Hallazgos

### H1 — Documentación de estado desactualizada en tres artefactos congelados

- **Clasificación**: no bloqueante.
- **Descripción**: `experiments/EXP-010-TB-14.md` (encabezado y §12 "Gate 1: No cumplido todavía", §13 "modificar app.js... prohibida", §14 "Implementación: no autorizada todavía"), `experiments/EXP-010-test-plan.md` (encabezado "pruebas no ejecutadas") y `experiments/EXP-010-implementation-plan.md` (encabezado "implementación no autorizada todavía") no reflejan que Gate 1 y Gate 2 ya se completaron y que el código productivo ya se modificó. El estado real y correcto solo consta en `experiments/EXP-010-session-log.md`.
- **Riesgo**: quien consulte únicamente `EXP-010-TB-14.md` concluiría erróneamente que la implementación no ha comenzado.
- **Recomendación**: actualizar encabezados y las secciones §12-§14 de `EXP-010-TB-14.md`, y los encabezados de `EXP-010-test-plan.md`/`EXP-010-implementation-plan.md`, antes del cierre de EXP-010.

### H2 — Narrativa de sesión y código en commits distintos, con orden cronológico invertido

- **Clasificación**: no bloqueante.
- **Descripción**: `fecdbea` ("test: fix iframe readiness detection") contiene, además del fix real de `waitForFrame()`, la narrativa completa de las decisiones de VS-01, el hallazgo del defecto y los resultados de la fase verde (`EXP-010-session-log.md` §15-23) — es decir, documenta código de `app.js`/`index.html`/`styles.css` que **todavía no existe en ese commit** (se añade recién en `02238a6`, el commit siguiente). El commit `02238a6`, que sí contiene el código real de VS-01, no lleva actualización propia de `EXP-010-session-log.md`. Los timestamps de ambos commits están separados por **un segundo** (`03:41:20` y `03:41:21`), lo que confirma que no se registraron en el orden en que la narrativa dice que ocurrieron los hechos (implementar → verde → descubrir defecto → corregir).
- **Riesgo**: reduce la capacidad de auditar o hacer `git bisect` commit a commit; quien revise `fecdbea` en aislamiento encuentra documentación de un estado del código que ese commit no alcanza todavía.
- **Recomendación**: documentar como excepción de trazabilidad (regla omitida, motivo, riesgo, medida compensatoria, responsable que la acepta) antes del cierre, siguiendo el patrón usado en `experiments/EXP-007-independent-review.md` (hallazgo H2 de EXP-007). Nota: ese precedente de EXP-007 trataba de un problema distinto (Gate 0 y Gate 2 mezclados en un único commit, no separados), por lo que se cita como patrón general de tratamiento de excepciones, no como un caso idéntico.

### H3 — Cita de requisito incorrecta: RF-05 aplicado al selector de creación en lugar del filtro

- **Clasificación**: no bloqueante.
- **Descripción**: `experiments/EXP-010-TB-14.md` §9 traza `T010-10` y `T010-11` a `RF-05 (alcance de creación)`. Sin embargo, `experiments/EXP-008-frozen-requirements.md` define RF-05 explícitamente como "Opciones del filtro de prioridad" (el filtro, con opción `Todas` incluida), y `experiments/EXP-009-traceability-matrix.md` línea 17 traza RF-05 a **VS-04** (`T013-01`), no a VS-01. El filtro de prioridad está expresamente fuera de alcance de VS-01 (`EXP-010-TB-14.md` §7). No hay ningún RF explícito en `EXP-008-frozen-requirements.md` que describa las opciones del selector de *creación*; el requisito más cercano es RF-02 (prioridad predeterminada), ya citado correctamente para `T010-01`.
- **Riesgo**: una cita de trazabilidad incorrecta en un artefacto congelado (TB-14) puede inducir a pensar que VS-01 ya cubrió parte de RF-05 (filtro), cuando en realidad RF-05 permanece completamente sin implementar y diferido a VS-04.
- **Recomendación**: corregir la cita en `EXP-010-TB-14.md` §9, referenciando únicamente CA-VS01-08 (criterio de aceptación de la propia slice) en lugar de RF-05, o dejar la celda sin requisito funcional directo si no existe uno aplicable.

### H4 — Matriz de trazabilidad de EXP-009 con mapeo de ID desalineado tras la renumeración de Gate 1

- **Clasificación**: observación.
- **Descripción**: `experiments/EXP-009-traceability-matrix.md` línea 16 traza RF-04 ("Prioridad visible mediante texto") a `T010-11`. Según la numeración canónica vigente (corregida en Gate 1, `EXP-010-session-log.md` §9-§10, y reflejada en el `test-plan`/`TB-14` actuales), `T010-11` es "Media aparece seleccionada inicialmente" y el caso que efectivamente prueba el texto visible es `T010-12`. La matriz de EXP-009 no se modificó en esta rama (es un artefacto congelado de un experimento anterior) y por tanto quedó desalineada con la renumeración posterior.
- **Riesgo**: bajo — no afecta el comportamiento de VS-01, pero reduce la fiabilidad de la matriz como fuente de trazabilidad para auditorías futuras.
- **Recomendación**: registrar la corrección en una entrega documental de EXP-009 o anotar la divergencia en `EXP-010-TB-14.md` como nota de reconciliación, sin reabrir el alcance congelado de EXP-009.

### H5 — Sin prueba automatizada del restablecimiento del selector a Media tras crear

- **Clasificación**: no bloqueante.
- **Descripción**: el restablecimiento de `priorityInput.value` a `DEFAULT_PRIORITY` tras una creación exitosa está implementado, pero ningún caso `T010-*` dispara un envío real del formulario de creación (`dispatchEvent`/`.click()` sobre `#task-form` o su botón). `T010-11` solo inspecciona el estado inicial estático del `<select>`, no el comportamiento tras un envío. El mismo patrón preexistía para la limpieza de `dueDateInput.value` tras crear, tampoco cubierta por una prueba dedicada — no es una regresión de cobertura nueva, sino una laguna preexistente que VS-01 replica.
- **Recomendación**: considerar una prueba de integración de formulario (técnica similar a `T007-01`, que sí ejerce clics/eventos reales) en una consolidación futura; no bloquea el cierre de VS-01.

### H6 — Conservación de `priority` en edición/completado verificada solo por inspección de código

- **Clasificación**: observación.
- **Descripción**: `updateTask`, `completeTask` y `saveEditTask` no tocan `task.priority`, confirmado por lectura directa, no por una prueba que cree una tarea con prioridad no-`medium`, la edite o la complete, y verifique explícitamente que `priority` no cambió. La edición de prioridad está fuera de alcance de VS-01 (diferida a VS-02), por lo que la ausencia de esta prueba es coherente con el alcance congelado.
- **Recomendación**: VS-02 debería incluir explícitamente un caso que confirme que editar título/fecha no altera `priority`.

### H7 — Mensaje de error de prioridad (RF-21) implementado pero inalcanzable desde la UI y sin prueba de DOM

- **Clasificación**: observación.
- **Descripción**: RF-21 exige que, al rechazar una prioridad inválida en creación, "se mostrará un mensaje claro sobre el problema de prioridad". El código implementa esto (`showFieldError(priorityErrorMessage, TASK_PRIORITY_ERROR_MESSAGE)`), pero el `<select>` de `index.html` solo ofrece valores válidos, por lo que esta ruta no es alcanzable desde la interfaz real (reconocido también en `EXP-010-session-log.md` §17). `T010-05` verifica el rechazo a nivel de `createTask()` y de `localStorage`, pero ningún caso verifica que el mensaje efectivamente aparezca en el DOM cuando se invoca `createTask` con una prioridad inválida por otra vía (p. ej., manipulando el DOM del `<select>` en la prueba). CA-VS01-03 (el criterio de aceptación específicamente congelado para esta slice) no exige probar el mensaje, solo el rechazo atómico, por lo que esto no se considera un incumplimiento de VS-01, sino una brecha de cobertura de un sub-requisito de RF-21 citado como trazado.
- **Recomendación**: dejar constancia explícita para evitar que una revisión futura sin este contexto lo confunda con incumplimiento de RF-21.

### H8 — Prioridad no visible durante el modo de edición inline

- **Clasificación**: observación.
- **Descripción**: `renderEditRow` (modo edición, preexistente de EXP-007) no incluye el `<span class="priority-label">`, que solo se añadió a `renderReadRow`. Mientras una tarea está en edición, su texto de prioridad desaparece temporalmente de la vista. La edición de prioridad está fuera de alcance de VS-01 y no hay requisito congelado que exija mostrarla durante la edición de título/fecha.
- **Recomendación**: considerar en VS-02 si el formulario de edición debe mostrar la prioridad de forma consistente con el modo lectura.

### H9 — Efecto secundario correcto pero no evidente: `completeTask`/`updateTask` pueden persistir prioridades normalizadas de otras tareas

- **Clasificación**: observación.
- **Descripción**: como `loadTasks()` normaliza en memoria toda la colección, cualquier operación que persista la colección (`completeTask`, `updateTask`) escribirá en `localStorage` la versión ya normalizada de **todas** las tareas cargadas en esa llamada, no solo de la mutada. Esto está expresamente permitido por `experiments/EXP-009-feature-specification.md` §8, por lo que no es una desviación, pero no hay prueba que lo ejercite explícitamente.
- **Recomendación**: dejar constancia (como aquí) para que no se malinterprete como incumplimiento de RF-01 en una revisión futura sin este contexto.

### H10 — Corrección de `waitForFrame()` técnicamente sólida (hallazgo favorable, no es un defecto)

- **Clasificación**: observación.
- **Descripción**: verificación independiente del diff de `fecdbea`, sin apoyarse en las conclusiones ya escritas en `EXP-010-session-log.md` §18: la condición añadida compara contra el marcador `about:blank` del navegador (no contra una URL específica), el `setTimeout` de 5000 ms no se modificó, la ruta de reserva (`load` event) sigue intacta, y la comprobación está protegida con `try/catch`. El defecto original es reproducible y explicable como comportamiento documentado de la plataforma (un iframe recién insertado expone transitoriamente `about:blank` con `readyState === 'complete'` antes de navegar a `src`); los casos preexistentes `T005-10`/`T007-09` nunca lo expusieron porque verifican *ausencia* de referencias externas (trivialmente cierto también en `about:blank`), mientras que `T010-10`/`T010-11` verifican *presencia* de un elemento real, lo que sí lo expuso. El fix no altera ninguna aserción ni valor esperado de ningún caso existente.
- **Conclusión**: no se identifica indicio de que la corrección se haya diseñado para "hacer pasar" una prueba en lugar de resolver una condición de carrera genuina del arnés compartido.

## 8. Clasificación resumida de hallazgos

| ID | Hallazgo | Clasificación |
|---|---|---|
| H1 | Estado desactualizado en `EXP-010-TB-14.md`, `EXP-010-test-plan.md`, `EXP-010-implementation-plan.md` | No bloqueante |
| H2 | Narrativa de VS-01 y fix de `waitForFrame` en commits desalineados con el código y el orden cronológico real | No bloqueante |
| H3 | Cita de RF-05 (filtro, trazado a VS-04) aplicada indebidamente al selector de creación de VS-01 en `EXP-010-TB-14.md` §9 | No bloqueante |
| H4 | Matriz de trazabilidad de EXP-009 con mapeo RF-04 → T010-11 desalineado tras renumeración de Gate 1 | Observación |
| H5 | Sin prueba automatizada del restablecimiento del selector a Media tras crear | No bloqueante |
| H6 | Conservación de `priority` en edición/completado verificada solo por inspección | Observación |
| H7 | Mensaje de error de prioridad (RF-21) inalcanzable desde la UI y sin prueba de DOM | Observación |
| H8 | Prioridad no visible durante edición inline | Observación |
| H9 | Efecto secundario de normalización al persistir vía `completeTask`/`updateTask` (correcto, no evidente) | Observación |
| H10 | Corrección de `waitForFrame()` técnicamente sólida y defecto verificado como real | Observación (favorable) |

No se identificó ningún hallazgo bloqueante.

## 9. Conclusión y veredicto

- CA-VS01-01 a CA-VS01-12: cumplidas, con evidencia verificada de forma independiente (§4), incluyendo reejecución real de la suite (no solo lectura de reportes previos).
- T010-01 a T010-14: las 14 en PASS en reejecución propia; regresión `T005-*`/`T007-*` (20/20) también en PASS en la misma reejecución; sin dependencias nuevas; sin alcance diferido implementado.
- La corrección de `waitForFrame()` es correcta, no depende de una URL exacta, no introduce esperas infinitas ni falsos negativos permanentes (H10).
- No se identifican defectos funcionales en VS-01.
- Se identifican tres hallazgos no bloqueantes de naturaleza documental/trazabilidad (H1, H2, H3) y cinco observaciones (H4, H6-H9) que no impiden el cierre pero deben registrarse para VS-02 y para la evaluación de Gate 4; H5 (no bloqueante) señala una brecha de cobertura de prueba concreta y corregible con bajo esfuerzo.
- El requisito de separación de contexto para Gate 3 (`EXP-010-TB-14.md` §12) se considera satisfecho por esta entrega, reemplazando el informe inválido anterior (§0).

**Veredicto: APROBADO, sin hallazgos bloqueantes.**

Se recomienda a Hugo Cornejo Villena: (a) resolver o aceptar explícitamente como excepción documentada H1, H2 y H3 antes de dar por cerrado Gate 4/el pull request; (b) registrar H4-H9 como deuda de trazabilidad/cobertura para VS-02, sin que bloqueen el avance a Gate 4 y Gate 5.

---

## 10. Cierre de hallazgos (entrega posterior a Gate 3)

Nota: esta sección se añade en una entrega posterior a la aprobación de Gate 3, autorizada explícitamente por Hugo Cornejo Villena como "ajuste previo a reversión". **No reabre ni reescribe el veredicto formal de §9** ("APROBADO, sin hallazgos bloqueantes"); documenta únicamente el cierre de cinco de los diez hallazgos originales.

| ID | Estado | Cómo se cerró |
|---|---|---|
| H1 | **Cerrado** | Actualizados los encabezados y las secciones de estado de `experiments/EXP-010-TB-14.md` (§11-§14), `experiments/EXP-010-test-plan.md` y `experiments/EXP-010-implementation-plan.md`, reflejando Gate 0, Gate 1 (fase roja), Gate 2 (implementación) y Gate 3 (esta revisión) como completados, y Gates 4-6 como pendientes. |
| H2 | Sin cambios | No formaba parte del alcance autorizado para esta entrega (no se instruyó reordenar ni readjuntar commits). Permanece como hallazgo no bloqueante pendiente de aceptación explícita como excepción, o de corrección en una futura entrega. |
| H3 | **Cerrado** | `experiments/EXP-010-TB-14.md` §8 (decisión 6) y §9 (tabla, filas T010-10/T010-11) ya no citan RF-05; citan CA-VS01-08 (y RI-02 para el conjunto de valores), conforme a la recomendación de este mismo hallazgo. |
| H4 | **Cerrado** | `experiments/EXP-009-traceability-matrix.md` §1, fila RF-04: `T010-11` corregido a `T010-12`. Verificado que era el único identificador `T010-1x` desalineado en ese archivo. No se alteraron requisitos, decisiones ni alcance de EXP-009. |
| H5 | **Cerrado** | Añadida `T010-15` en `test-runner.js`: ejerce un envío real (`dispatchEvent('submit')`) del formulario de creación dentro del iframe de `index.html` con una prioridad distinta de Media, y verifica que el `<select>` vuelve a mostrar Media seleccionada tras la creación. PASS en la reejecución de la suite completa (`experiments/EXP-010-session-log.md` §26). |
| H6 | **Cerrado** | Añadida `T010-16` en `test-runner.js`: crea una tarea con `priority: 'high'`, la edita (título/fecha) y la completa, verificando en cada paso que `priority` permanece `'high'`. PASS en la misma reejecución. |
| H7, H8, H9, H10 | Sin cambios | No formaban parte del alcance autorizado para esta entrega. H7-H9 permanecen como observaciones pendientes para VS-02; H10 permanece como hallazgo favorable sin acción pendiente. |

Verificación de la reejecución citada en esta sección: suite completa vía HTTP y Microsoft Edge headless, modo `normal` — 39 casos, 37 PASS, 0 FAIL, 2 NO EJECUTADO (únicamente los controles deliberados `T005-CONTROL-ASSERT`/`T005-CONTROL-EXCEPTION`). T010-01 a T010-16: las 16 en PASS. Regresión `T005-*`/`T007-*`/`T005-FINAL`: 20/20 en PASS. Ningún cambio de comportamiento productivo fue necesario: ni T010-15 ni T010-16 revelaron un defecto real en `app.js`, `index.html` o `styles.css`.

**El veredicto de §9 se mantiene: APROBADO, sin hallazgos bloqueantes.** Quedan abiertos, no bloqueantes: H2 (trazabilidad de commits). Quedan abiertas como observaciones sin acción requerida para el cierre de EXP-010: H7, H8, H9, H10.
