# EXP-010 — Revisión técnica independiente

## 0. Nota de limitación de independencia (léase antes que el resto del informe)

Esta revisión se redacta en la **misma sesión y el mismo contexto de agente** que implementó VS-01, corrigió `waitForFrame()` y ejecutó las fases roja y verde (Gates 1 y 2). No es una revisión "en un contexto separado del de implementación" tal como lo exige `experiments/EXP-010-TB-14.md` §12 (Gate 3) y tal como lo exigió y documentó explícitamente EXP-007 (`experiments/EXP-007-TB-13.md` §12: *"El contexto de implementación no puede autoaprobar su propio resultado ni sustituir la revisión independiente exigida por el nivel de control alto"*).

Esto se registra como el **hallazgo F1** (§4), clasificado como **bloqueante** para el cierre formal de Gate 3, aunque no impide que el resto de esta revisión aporte valor técnico verificable. Todo el análisis que sigue se apoya en evidencia reproducible (diffs, commits, ejecución de pruebas) y no en la palabra de la sesión de implementación; donde fue posible, se verificó de forma independiente del razonamiento ya registrado en `experiments/EXP-010-session-log.md` (por ejemplo, releyendo el código en lugar de asumir las conclusiones ya escritas allí).

## 1. Identificación

- Experimento: EXP-010
- Tarea del banco: TB-14 — slice VS-01 (Prioridad base y compatibilidad)
- Fecha de la revisión: 19 de julio de 2026
- Contexto de revisión: el mismo contexto de agente que ejecutó Gate 1 y Gate 2 (ver §0)
- Responsable del piloto: Hugo Cornejo Villena

## 2. Alcance y commits revisados

Commits revisados, `main..HEAD` (rama `pilot-003/exp-010-priority-base`):

| Commit | Mensaje | Archivos |
|---|---|---|
| `d55f645` | docs: initialize EXP-010 implementation controls | `EXP-010-TB-14.md`, `EXP-010-implementation-plan.md`, `EXP-010-test-plan.md`, `EXP-010-session-log.md` |
| `9a64754` | test: establish EXP-010 red phase | `test-runner.js`, `EXP-010-session-log.md` |
| `fecdbea` | test: fix iframe readiness detection | `test-runner.js`, `EXP-010-session-log.md` |
| `02238a6` (HEAD) | feat: implement EXP-010 priority base | `app.js`, `index.html`, `styles.css`, `EXP-010-TB-14.md`, `EXP-010-test-plan.md` |

Archivos revisados en detalle: `app.js`, `index.html`, `styles.css`, `test-runner.js` (diff completo `main..HEAD`); `experiments/EXP-010-TB-14.md`, `experiments/EXP-010-test-plan.md`, `experiments/EXP-010-implementation-plan.md`, `experiments/EXP-010-session-log.md` (estado íntegro actual); fuentes vinculantes de EXP-009 citadas por esos artefactos.

No se modificó ningún archivo durante esta revisión.

## 3. Cumplimiento de CA-VS01-01 a CA-VS01-12

| Criterio | Evidencia en código | Evidencia en pruebas | Resultado |
|---|---|---|---|
| CA-VS01-01 — crear sin prioridad persiste `medium` | `app.js` `createTask`: `priority: priority === undefined ? DEFAULT_PRIORITY : priority` | `T010-01` PASS | Cumple |
| CA-VS01-02 — crear con `low`/`medium`/`high` persiste ese valor exacto | mismo bloque | `T010-02`, `T010-03`, `T010-04` PASS | Cumple |
| CA-VS01-03 — prioridad explícita inválida rechaza la creación completa | `if (priority !== undefined && !isValidPriority(priority)) return null;`, verificado **antes** de `loadTasks()`/`push`/`saveTasks()` | `T010-05` PASS (incluye verificación de `loadTasks().length === 0`) | Cumple, y de forma atómica (ver §5) |
| CA-VS01-04 — tarea sin `priority` carga como `medium` | `loadTasks()`: `parsed.map(normalizeTask)`; `normalizePriority` devuelve `DEFAULT_PRIORITY` si no es válida | `T010-06` PASS | Cumple |
| CA-VS01-05 — prioridad desconocida carga como `medium` | mismo mecanismo | `T010-07` PASS | Cumple |
| CA-VS01-06 — normalización no escribe automáticamente | rama de éxito de `loadTasks()` no invoca `saveTasks()`; solo la rama `catch` (JSON corrupto) la invoca, sin cambios respecto de antes | `T010-08` PASS (compara `localStorage` antes/después) | Cumple |
| CA-VS01-07 — una tarea inválida no bloquea la carga de las demás | `Array.prototype.map` procesa todas las entradas; `normalizePriority` nunca lanza | `T010-09` PASS | Cumple |
| CA-VS01-08 — selector exclusivo Baja/Media/Alta, Media inicial | `index.html`: `<select id="task-priority">` con tres `<option>`, `medium` con `selected` | `T010-10`, `T010-11` PASS | Cumple |
| CA-VS01-09 — texto visible de prioridad en cada tarea | `renderReadRow`: `prioritySpan.textContent = 'Prioridad: ' + getPriorityLabel(task.priority)` | `T010-12` PASS | Cumple (matiz en §6, hallazgo F6) |
| CA-VS01-10 — el significado no depende solo de color/icono | el texto `"Prioridad: Baja/Media/Alta"` es contenido textual, no solo color; el CSS añadido (`.priority-label`) solo fija tamaño/color, no es el único portador de significado | inspección de código | Cumple |
| CA-VS01-11 — EXP-005/EXP-007 sin regresión | ningún cambio en `createTask`/`loadTasks`/`updateTask`/`completeTask` elimina comportamiento previo; solo añade | `T005-01..10`, `T007-01..09`, `T005-FINAL`: 20/20 PASS | Cumple |
| CA-VS01-12 — sin dependencias nuevas | `index.html` sin `<script src="http...">` ni `<link href="http...">` nuevos | `T005-10`, `T007-09`, `T010-14` PASS | Cumple |

**Las 12 CA se cumplen con evidencia verificable.**

## 4. Hallazgos

### F1 — Revisión no realizada en contexto separado del de implementación

- **Severidad**: bloqueante para el cierre formal de Gate 3.
- **Descripción**: ver §0. El mismo contexto que escribió `app.js`/`index.html`/`styles.css`/el fix de `waitForFrame()` es quien redacta este informe.
- **Riesgo**: sesgo de confirmación — un implementador tiende a no ver sus propios puntos ciegos, precisamente el riesgo que la separación de contextos busca mitigar (`docs/WORKFLOW-METHODOLOGY-v2.md`, citado en `experiments/EXP-007-TB-13.md` §12).
- **Recomendación**: antes de considerar Gate 3 formalmente superado, ejecutar una revisión adicional en un contexto/sesión que no haya participado en la implementación de VS-01, análoga a la practicada en EXP-007. Alternativamente, si el responsable humano decide aceptar esta revisión como suficiente pese a la limitación, debe registrarse explícitamente como excepción (motivo, riesgo aceptado, responsable que la acepta), siguiendo el mismo patrón usado para el hallazgo H2 de EXP-007.

### F2 — Documentación de estado desactualizada en tres artefactos congelados

- **Severidad**: no bloqueante.
- **Descripción**: `experiments/EXP-010-TB-14.md` (encabezado, §12 Gate 1 "No cumplido todavía", §13 "Prohibiciones vigentes en esta entrega" listando la modificación de `app.js`/`index.html`/`styles.css`/`test-runner.js` como prohibida, §14 "Implementación: no autorizada todavía"), `experiments/EXP-010-test-plan.md` (encabezado "pruebas no ejecutadas") y `experiments/EXP-010-implementation-plan.md` (encabezado "implementación no autorizada todavía") no se actualizaron tras Gate 1 ni Gate 2, y ahora contradicen el estado real (documentado correctamente en `experiments/EXP-010-session-log.md`).
- **Causa**: en cada entrega se autorizó explícitamente actualizar solo el registro de sesión ("Actualiza únicamente experiments/EXP-010-session-log.md"), por lo que la ficha y los planes quedaron congelados en su redacción original de Gate 0.
- **Riesgo**: reproduce el patrón de riesgo ya identificado en `docs/results-dashboard.md` ("Vacíos documentales que solo se detectan al intentar cerrar el piloto formalmente", EXP-005/EXP-006/EXP-007). Alguien que consulte solo `EXP-010-TB-14.md` (sin leer `EXP-010-session-log.md` completo) concluiría erróneamente que la implementación no ha comenzado.
- **Recomendación**: actualizar los encabezados de estado y las secciones §12-§14 de `EXP-010-TB-14.md`, y los encabezados de `EXP-010-test-plan.md`/`EXP-010-implementation-plan.md`, antes del cierre de EXP-010 (Gate 4 o al preparar el pull request).

### F3 — Trazabilidad de commits: narrativa y código en commits distintos, orden invertido

- **Severidad**: no bloqueante (precedente: hallazgo H2 de EXP-007, aceptado como excepción operativa, no bloqueante).
- **Descripción**: el commit `fecdbea` ("test: fix iframe readiness detection") contiene, además del fix real de `waitForFrame()`, la totalidad de la narrativa de sesión sobre las decisiones de VS-01 (§17), el hallazgo del defecto (§18) y los resultados de la fase verde (§19-23) — es decir, documenta un código que **todavía no existe en ese commit** (VS-01 se añade recién en el commit siguiente, `02238a6`). El commit `02238a6` ("feat: implement EXP-010 priority base"), que sí contiene el código real de VS-01, no lleva ninguna actualización propia de `EXP-010-session-log.md`. Además, el orden cronológico narrado (implementar VS-01 → ejecutar fase verde → descubrir el defecto de `waitForFrame` → corregirlo) no coincide con el orden de los commits (`fecdbea`, el fix, antecede a `02238a6`, la implementación).
- **Riesgo**: reduce la capacidad de auditar o hacer `git bisect` commit a commit; alguien que revise `fecdbea` en aislamiento encontrará documentación que describe un estado del código que ese commit todavía no alcanza.
- **Recomendación**: documentar como excepción de trazabilidad (igual que H2 de EXP-007: regla omitida, motivo, riesgo, medida compensatoria, responsable que acepta la excepción), o rehacer el historial antes del pull request si el proyecto lo permite sin reescribir commits ya revisados externamente.

### F4 — Sin prueba automatizada del restablecimiento del selector a Media tras crear

- **Severidad**: no bloqueante.
- **Descripción**: el ítem 10 de las instrucciones de Gate 2 ("Restablecer el selector a Media después de una creación correcta") está implementado (`app.js`, manejador `submit`: `if (priorityInput) { priorityInput.value = DEFAULT_PRIORITY; }`), verificado por inspección de código, pero **ningún caso T010-01 a T010-14 ejerce el envío real del formulario** (`form.dispatchEvent`/`submitButton.click()`) para confirmarlo automatizadamente. `T010-11` solo inspecciona el estado inicial estático del `<select>` en el DOM del iframe, no el comportamiento tras un envío.
- **Contexto atenuante**: el mismo patrón preexistía para `dueDateInput.value = ''` (limpieza de fecha tras crear), tampoco cubierto por una prueba dedicada; no es una regresión de cobertura nueva introducida por VS-01, sino una laguna preexistente que VS-01 replica.
- **Recomendación**: considerar añadir una prueba de integración de formulario (similar en técnica a `T007-01`, que sí ejerce clics/eventos reales) en una futura consolidación, sin que esto bloquee el cierre de VS-01.

### F5 — Conservación de `priority` en edición verificada solo por inspección de código

- **Severidad**: observación.
- **Descripción**: `updateTask`, `completeTask` y `saveEditTask` no tocan `task.priority`, por lo que la prioridad se conserva implícitamente al editar título/fecha o al completar una tarea. Esto se confirmó leyendo el código (§3, CA-VS01-11 y verificación manual de las tres funciones), no mediante una prueba automatizada que cree una tarea con prioridad no-`medium`, la edite o la complete, y verifique explícitamente que `priority` no cambió.
- **Cobertura indirecta**: la edición está fuera de alcance de VS-01 (diferida a VS-02), por lo que la ausencia de una prueba dedicada a esta interacción es coherente con el alcance congelado, no una omisión de VS-01 propiamente.
- **Recomendación**: VS-02 debería incluir explícitamente un caso que confirme que editar título/fecha no altera `priority`.

### F6 — Efecto secundario correcto pero no evidente: `completeTask`/`updateTask` pueden persistir prioridades normalizadas de otras tareas

- **Severidad**: observación.
- **Descripción**: dado que `loadTasks()` ahora normaliza en memoria toda la colección, cualquier operación posterior que persista la colección (`completeTask`, `updateTask`) escribirá en `localStorage` la versión ya normalizada de **todas** las tareas cargadas en esa llamada, no solo de la tarea mutada. Esto está expresamente contemplado y permitido por `experiments/EXP-009-feature-specification.md` §8 ("La siguiente operación válida que persista la colección podrá guardar el objeto ya normalizado"), por lo que **no es una desviación**, pero no hay ninguna prueba que lo ejercite explícitamente (por ejemplo: colección con una tarea de prioridad inválida y otra válida; completar la tarea válida; verificar que la inválida quedó normalizada en `localStorage`).
- **Recomendación**: dejar constancia explícita (como se hace aquí) para que no se malinterprete como incumplimiento de RF-01 en una revisión futura que no tenga este contexto.

### F7 — Prioridad no visible durante el modo de edición inline

- **Severidad**: observación.
- **Descripción**: `renderEditRow` (modo edición, preexistente de EXP-007) no incluye el `<span class="priority-label">`, que solo se añadió a `renderReadRow`. Mientras una tarea está en edición, su texto de prioridad desaparece temporalmente de la vista.
- **Contexto atenuante**: la edición de prioridad está explícitamente fuera de alcance de VS-01; no se identifica ningún requisito congelado que exija mostrar la prioridad durante la edición de título/fecha.
- **Recomendación**: considerar en VS-02, al incorporar la edición de prioridad, si el formulario de edición debe mostrar/editar también la prioridad de forma consistente con el modo lectura.

### F8 (positivo, no es un defecto) — La corrección de `waitForFrame()` es técnicamente sólida

- **Severidad**: observación (hallazgo favorable).
- **Verificación independiente del razonamiento ya registrado**: se releyó el diff de `fecdbea` sin apoyarse en las conclusiones de `experiments/EXP-010-session-log.md` §18, para confirmar de forma separada que:
  - **No depende del valor exacto de la URL de destino**: la condición añadida es `frame.contentWindow.location.href !== 'about:blank'`, una comparación contra el marcador de posición inicial del navegador para cualquier iframe sin navegación completada, no contra `"index.html"` ni ninguna ruta específica. Sigue siendo válida si `index.html` cambiara de nombre o ubicación.
  - **No introduce esperas infinitas**: el temporizador de 5000 ms preexistente (`window.setTimeout(..., 5000)`) no se tocó; si `isFrameReady()` devuelve `false`, el código cae al mismo `frame.addEventListener('load', finish, { once: true })` de siempre, con el mismo límite de tiempo.
  - **No introduce falsos negativos permanentes**: en el peor caso (frame aún no navegado), el código simplemente toma la ruta que ya existía (esperar el evento `load` real), que sigue disparándose normalmente cuando la navegación real concluye; no hay ninguna condición nueva bajo la cual un frame genuinamente cargado sea reportado como no cargado de forma irreversible.
  - **Está envuelta en `try/catch`**: un acceso cruzado de origen a `contentWindow.location` (no aplicable aquí, mismo origen, pero defensivo) no rompería el flujo, solo haría `isFrameReady()` devolver `false` y caer a la ruta segura.
- **Evidencia de que el defecto era real y no una adaptación de expectativas**: el defecto es reproducible de forma aislada e independiente de `test-runner.js` — un iframe recién insertado en el DOM expone transitoriamente un documento `about:blank` (con `readyState` ya `'complete'`) antes de que la navegación real a su `src` concluya; esto es comportamiento documentado de la plataforma web, no específico de este proyecto. Los casos `T005-10`/`T007-09` (preexistentes) nunca expusieron el defecto porque verifican **ausencia** de referencias externas — condición trivialmente satisfecha también en un documento `about:blank` vacío, por lo que "pasaban" independientemente de si el iframe había navegado de verdad. `T010-10`/`T010-11` verifican **presencia** de un elemento del DOM real de `index.html`, que no existe en `about:blank`, y por eso expusieron el defecto. El fix no cambia ninguna aserción de ningún caso de prueba ni ningún valor esperado: solo cambia el criterio interno de "¿ya terminó de cargar el iframe?" en una función compartida por cinco casos (`T005-10`, `T007-09`, `T010-10`, `T010-11` vía `findPrioritySelect`, `T010-14`).
- **Conclusión de F8**: no se identifica ningún indicio de que la corrección se haya diseñado para "hacer pasar" una prueba en lugar de corregir una condición de carrera genuina del arnés compartido.

## 5. Verificación puntual de los requisitos explícitamente listados en la solicitud de revisión

- **Compatibilidad con `createTask(title, dueDate)`**: confirmado — el tercer parámetro es opcional (`priority` puede ser `undefined`); todas las llamadas de dos argumentos en `T005-*`/`T007-*` siguen funcionando sin cambios, con 20/20 en PASS.
- **Rechazo atómico de prioridad explícita inválida**: confirmado — la validación de `priority` ocurre antes de `loadTasks()`, `tasks.push()` y `saveTasks()`; no existe ninguna ruta de código donde una prioridad inválida deje una escritura parcial.
- **Normalización en memoria sin escritura automática**: confirmado — `loadTasks()` no invoca `saveTasks()` en la rama de éxito del `try`; solo la rama de recuperación ante JSON corrupto lo hace (comportamiento preexistente, sin cambios).
- **Preservación de la recuperación ante JSON corrupto**: confirmado — el bloque `catch` es textualmente el mismo que antes de VS-01 (`saveTasks([]); return [];`); `T005-03`, `T005-04`, `T005-09` en PASS.
- **Selector con Baja, Media y Alta**: confirmado, tres `<option>` exactas.
- **Media predeterminada y restablecida tras creación**: la parte "predeterminada" está probada (`T010-11`); la parte "restablecida tras creación" está implementada pero no probada automáticamente (F4).
- **Prioridad visible mediante texto**: confirmado en modo lectura (F7 matiza el modo edición).
- **Ausencia de edición de prioridad, filtros, transición reversible, ordenamiento o refactor general**: confirmado por inspección — no existe ningún control de edición de prioridad, ningún filtro, ninguna función de alternancia de estado nueva, ningún criterio de ordenamiento nuevo. El único cambio de tipo "refactor" es el renombrado de `showTitleError`/`hideTitleError` a `showFieldError`/`hideFieldError` con un parámetro de mensaje; es un cambio de bajo riesgo, acotado a dos funciones internas sin uso fuera de `app.js` (no referenciadas por `test-runner.js`), y directamente necesario para distinguir el mensaje de error de título del de prioridad conforme a `experiments/EXP-009-feature-specification.md` §9. No se considera un "refactor general".
- **Ausencia de dependencias nuevas**: confirmado (`T005-10`, `T007-09`, `T010-14`).
- **Conservación de prioridad al editar título o fecha**: confirmado por inspección de código (F5 matiza la falta de prueba dedicada).
- **Regresión T005 y T007**: 20/20 en PASS.
- **Corrección de `waitForFrame()` sin esperas infinitas, falsos negativos ni dependencia de URL exacta**: confirmado, ver F8.
- **Evidencia de que el defecto de `about:blank` era real**: confirmado, ver F8.
- **Separación y trazabilidad de commits**: parcialmente lograda (commits separados por gate, mejor que EXP-007), pero con un problema de correspondencia código↔narrativa entre `fecdbea` y `02238a6` (F3).
- **Cambios documentales inconsistentes**: identificados en F2.

## 6. Clasificación resumida de hallazgos

| ID | Hallazgo | Clasificación |
|---|---|---|
| F1 | Revisión no realizada en contexto separado del de implementación | **Bloqueante** |
| F2 | Estado desactualizado en `EXP-010-TB-14.md`, `EXP-010-test-plan.md`, `EXP-010-implementation-plan.md` | No bloqueante |
| F3 | Narrativa de VS-01 y del fix de `waitForFrame` en commits desalineados con el código y con el orden cronológico real | No bloqueante |
| F4 | Sin prueba automatizada del restablecimiento del selector a Media tras crear | No bloqueante |
| F5 | Conservación de `priority` en edición verificada solo por inspección | Observación |
| F6 | Efecto secundario de normalización al persistir vía `completeTask`/`updateTask` (correcto, no evidente) | Observación |
| F7 | Prioridad no visible durante edición inline | Observación |
| F8 | Corrección de `waitForFrame()` técnicamente sólida y defecto verificado como real | Observación (favorable) |

## 7. Conclusión y recomendación

- CA-VS01-01 a CA-VS01-12: cumplidas con evidencia verificable (§3).
- T010-01 a T010-14: las 14 en PASS; regresión T005/T007 20/20 en PASS; sin dependencias nuevas; sin alcance diferido implementado.
- No se identifican defectos funcionales en VS-01 ni en la corrección de `waitForFrame()`.
- **El único hallazgo bloqueante (F1) es metodológico, no técnico**: esta revisión no satisface el requisito de contexto separado exigido por el nivel de control alto para Gate 3.
- **Recomendación**: no dar por superado formalmente el Gate 3 con este único informe. El responsable humano debe decidir entre (a) encargar una revisión adicional en un contexto genuinamente independiente antes de avanzar a Gate 4, o (b) aceptar explícitamente esta limitación como excepción documentada, con las mismas condiciones de registro que se exigieron para el hallazgo H2 de EXP-007. Los hallazgos F2 y F3 deberían resolverse (o aceptarse como excepción) antes del cierre de EXP-010; F4 a F7 no bloquean el avance pero deben quedar registrados para VS-02 y para la evaluación de Gate 4 (trazabilidad, calidad de pruebas).
