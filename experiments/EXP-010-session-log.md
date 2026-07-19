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
