# Informe de cierre — PILOT-003

## 1. Identificación

- Piloto: PILOT-003
- Nombre: Ciclo completo de una tarea desde presión de requisitos hasta implementación controlada, revisión independiente, evaluación por rúbrica y reversión demostrada (TB-14)
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Fecha de inicio: 19 de julio de 2026 (paquete operativo aprobado, PR #11; EXP-008 autorizado, Gate P3-1)
- Fecha de cierre de este informe: 19 de julio de 2026
- Rama de cierre: `docs/PILOT-003-closure-report`
- Estado: **APROBADO CON RESTRICCIONES**

## 2. Objetivo de PILOT-003

`docs/PILOT-002-closure-report.md` §18 exigía preparar y aprobar el paquete operativo formal de PILOT-003 (Ajuste E) antes de seleccionar o ejecutar cualquier experimento, incorporando los Ajustes F a J y las condiciones de su sección 16. Ese paquete se redactó y aprobó mediante pull request #11 (`docs/PILOT-003-operational-package.md`), a diferencia de PILOT-002, que se ejecutó sin ese instrumento previo.

El objetivo declarado de PILOT-003, tomado de su paquete operativo, fue validar un **ciclo completo de una sola tarea** (TB-14 — priorización y filtrado de tareas) a través de las fases que PILOT-001 y PILOT-002 habían ejercitado solo de forma fragmentada o aislada:

1. presión y congelamiento de requisitos ambiguos (EXP-008);
2. especificación funcional, diseño técnico proporcional y división en vertical slices (EXP-009);
3. implementación controlada de una única vertical slice, con fase roja/verde, revisión técnica independiente en contexto separado, evaluación mediante rúbrica y ensayo de reversión (EXP-010).

A diferencia de PILOT-001 (varias tareas pequeñas independientes) y PILOT-002 (tres experimentos técnicamente independientes entre sí — HTTP, CI, edición), PILOT-003 es el primer piloto que encadena estas fases como partes de una misma tarea, con gates explícitos entre cada una.

## 3. Alcance ejecutado

Ejecutado en su totalidad conforme al paquete operativo: EXP-008, EXP-009 y EXP-010, los tres sobre TB-14. No se ejecutó ningún otro experimento fuera de esta cadena. No se abrió ninguna otra vertical slice (VS-02 a VS-06 permanecen diferidas, sin iniciar).

| Experimento | Caso | Objetivo | Ficha formal | Registro de sesión | Revisión independiente | Evaluación por rúbrica | Resultado |
|---|---|---|---|---|---|---|---|
| EXP-008 | TB-14 | Presión y congelamiento de requisitos ambiguos | Sí | Sí | No aplica (ruta exploratoria, control medio) | Sí (`EXP-008-evaluation.md`) | Aprobado, 47/50 |
| EXP-009 | TB-14 | Especificación funcional, diseño técnico y mapa de vertical slices | Sí | Sí | Sí (aprobada en segunda revisión) | Sí (`EXP-009-evaluation.md`) | Aprobado, 48/50 |
| EXP-010 | TB-14 | Implementación de VS-01 — Prioridad base y compatibilidad | Sí | Sí (8 entregas documentadas) | Sí (primer informe inválido, reemplazado por revisión en contexto separado) | Sí (`EXP-010-evaluation.md`) | Aprobado con restricciones, 42/50 |

Ningún experimento de PILOT-003 se ejecutó como excepción documental (a diferencia de EXP-005/EXP-006 en PILOT-002, conforme al Ajuste F de `docs/PILOT-002-closure-report.md`).

## 4. Resultados y puntajes

### EXP-008 — Presión y congelamiento de requisitos

Fuente: `experiments/EXP-008-pressure-session.md`, `experiments/EXP-008-frozen-requirements.md`, `experiments/EXP-008-session-log.md`, `experiments/EXP-008-evaluation.md`; pull request #12 (commit de merge `3d559b7`).

- Ruta: exploratoria. Control: medio. Gates P3-1 (autorizado) y P3-2 (cerrado, Gate 5 interno de EXP-008).
- Resultado: 24 decisiones funcionales congeladas más una decisión diferida (15) hacia EXP-009; requisitos RF-01 a RF-22 e invariantes RI-01 a RI-10 consolidados.
- Puntaje: **47/50**. Comprensión 5, Plan 4, Alcance 5, Calidad del artefacto 5, Verificabilidad 5, Calidad de validación 4, Documentación 5, Gestión de riesgos 4, Trazabilidad 5, Capacidad de corrección 5.
- Observación registrada en su propia evaluación: la sesión fue trazable, pero excesivamente fragmentada en microdecisiones (§4, `experiments/EXP-008-evaluation.md`).
- Código o pruebas modificados: no.

### EXP-009 — Especificación, diseño y vertical slices

Fuente: `experiments/EXP-009-feature-specification.md`, `experiments/EXP-009-modular-design.md`, `experiments/EXP-009-vertical-slice-map.md`, `experiments/EXP-009-test-design.md`, `experiments/EXP-009-traceability-matrix.md`, `experiments/EXP-009-independent-review.md`, `experiments/EXP-009-evaluation.md`, `experiments/EXP-009-session-log.md`; pull request #13 (commit de merge `43185f4`).

- Ruta: estándar. Control: alto. Gates P3-3 (autorizado) y P3-4 (cerrado).
- Revisión técnica independiente: aprobada en **segunda** revisión — la primera identificó 2 hallazgos bloqueantes (H1: transición Completada → Pendiente ausente del diseño; H2: artefactos obligatorios faltantes), ambos resueltos antes de la segunda revisión.
- Puntaje: **48/50**. Comprensión 5, Plan 4, Alcance 5, Diseño técnico 5, Verificabilidad 5, Calidad de validación 4, Documentación 5, Gestión de riesgos 5, Trazabilidad 5, Capacidad de corrección 5.
- Limitación registrada en su propia evaluación: "la ejecución documental tuvo varias correcciones operativas; esto no afectó el resultado técnico final, pero constituye una oportunidad de mejora del proceso" (§4, `experiments/EXP-009-evaluation.md`).
- Slice seleccionada para EXP-010: VS-01 — Prioridad base y compatibilidad.
- Código o pruebas modificados: no.

### EXP-010 — Implementación de VS-01

Fuente: `experiments/EXP-010-TB-14.md`, `experiments/EXP-010-implementation-plan.md`, `experiments/EXP-010-test-plan.md`, `experiments/EXP-010-session-log.md`, `experiments/EXP-010-independent-review.md`, `experiments/EXP-010-reversal-test.md`, `experiments/EXP-010-evaluation.md`; pull request #14 (commit de merge `aa89057`).

- Ruta: estándar. Control: alto. Seis gates internos (0 a 6), ejecutados en ocho entregas documentadas separadamente en `experiments/EXP-010-session-log.md`.
- Fase roja (Gate 1): T010-01 a T010-14 incorporadas antes del código productivo; fallo esperado confirmado (11 FAIL + 1 NO EJECUTADO), regresión `T005-*`/`T007-*` íntegra.
- Fase verde (Gate 2): `app.js`, `index.html`, `styles.css` implementados; se detectó y corrigió, además, un defecto real preexistente en el arnés de pruebas compartido (`waitForFrame()` resolviendo contra `about:blank`), no introducido por EXP-010 pero expuesto por sus pruebas nuevas.
- Revisión técnica independiente (Gate 3): el **primer informe fue inválido** — redactado en el mismo contexto que la implementación, violando el requisito de separación de contexto; ese propio informe se autodetectó como bloqueante (hallazgo F1) antes de ser señalado externamente. Fue reemplazado íntegramente por una revisión en contexto separado, que concluyó **APROBADO, sin hallazgos bloqueantes**, con 10 hallazgos (H1-H10): 3 no bloqueantes (H1, H2, H3), 1 no bloqueante adicional cerrado con pruebas nuevas (H5) y observaciones (H4, H6-H9), más un hallazgo favorable (H10).
- Cinco hallazgos (H1, H3, H4, H5, H6) se cerraron mediante una entrega dedicada, incluyendo dos pruebas automatizadas nuevas (T010-15, T010-16).
- Evaluación mediante rúbrica (Gate 4): **42/50** — exactamente el umbral mínimo de control alto. Comprensión 4, Plan 4, Alcance 5, Eficiencia 2, Calidad técnica 4, Pruebas 5, Documentación 4, Seguridad y control 5, Trazabilidad 4, Reversión 5. Intervención humana (no sumada): 3/5.
- Ensayo de reversión (Gate 5): ejecutado en la rama desechable `pilot-003/exp-010-reversal-test` — 6 commits revertidos y 6 reaplicados mediante `git revert` exclusivamente, **0 conflictos en 12/12 operaciones**, árbol y suite verificados idénticos en ambos extremos (23/21/0/2 tras revertir; 39/37/0/2 tras restaurar). Rama conservada, no fusionada, no eliminada (verificada existente al momento de este informe).
- Hallazgo H2 (narrativa de sesión y código en commits distintos, orden cronológico invertido): **aceptado como excepción documentada** por Hugo Cornejo Villena, conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15 (ver sección 9 de este informe).
- Gate 6: pull request #14 revisado y fusionado mediante commit de merge `aa89057`.
- Código o pruebas modificados: sí — `app.js`, `index.html`, `styles.css`, `test-runner.js`, ahora integrados en `main`.

## 5. Componentes validados

| Componente | Experimentos | Decisión |
|---|---|---|
| Presión y congelamiento de requisitos ambiguos mediante ruta exploratoria | EXP-008 | Incorporado al workflow |
| Especificación funcional, diseño modular proporcional y vertical slicing | EXP-009 | Incorporado al workflow |
| Ciclo rojo/verde con pruebas incorporadas antes del código productivo | EXP-010 (Gates 1-2) | Incorporado al workflow |
| Revisión técnica independiente en contexto separado, nivel de control alto | EXP-010 (Gate 3), tras corrección del primer intento inválido | Incorporado al workflow, **con la condición explícita de verificar la separación de contexto antes de redactar el informe, no después** |
| Evaluación mediante rúbrica oficial de `docs/evaluation-rubric.md` para un experimento de implementación | EXP-010 (Gate 4) | Incorporado al workflow |
| Ensayo de reversión sobre rama desechable, con reversión y restauración completas mediante `git revert` | EXP-010 (Gate 5) | Incorporado al workflow — primera vez en el proyecto que se ensayan y verifican **ambos sentidos** (revertir y restaurar), con suite completa en cada extremo |
| Aceptación formal de excepciones conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15 | EXP-010 (H2) | Confirmado como mecanismo repetible |

Ruta exploratoria (EXP-008) y nivel de control alto con revisión independiente y reversión ejecutada (EXP-010) quedan validados por primera vez de forma completa en este piloto; PILOT-002 solo los había validado parcialmente (EXP-007: control alto sin ensayo de reversión sobre la rama real, revisión independiente reconstruida tardíamente).

## 6. Controles que funcionaron

- **Separación de gates con autorización humana explícita en cada uno**: EXP-010 registró ocho entregas separadas, cada una autorizada mediante instrucción explícita antes de proceder (Gate 0 a Gate 6), sin que ninguna avanzara sin autorización previa.
- **Ciclo rojo/verde real**: las 14 pruebas de VS-01 se incorporaron y ejecutaron antes del código productivo, con fallo documentado, y solo después se implementó — evidencia de ejecución real en ambos extremos, no solo declarada.
- **Autodetección de desviaciones propias**: la sesión que redactó el primer informe de revisión independiente detectó y reportó su propia violación del requisito de separación de contexto (F1) antes de que fuera señalada externamente; también autodetectó y revirtió un exceso de alcance propio (adición no autorizada de filas a una tabla congelada).
- **Descubrimiento de un defecto real en infraestructura compartida**: el defecto de `waitForFrame()` llevaba activo, sin detectar, desde EXP-005; las pruebas de EXP-010 lo expusieron porque verificaban presencia de un elemento, no solo ausencia.
- **Ensayo de reversión bidireccional**: por primera vez en el proyecto, se verificó no solo que revertir funciona, sino que restaurar después también funciona, con suite completa y comparación de árbol byte a byte en ambos extremos.
- **Cero reglas de bloqueo activadas** en los tres experimentos.
- **Cero dependencias externas nuevas** en todo el piloto.

## 7. Controles que fallaron o necesitaron intervención

- **Separación de contexto para la revisión independiente falló en su primer intento**: el primer informe de revisión de EXP-010 fue redactado en el mismo contexto que la implementación, exactamente la condición que el Gate 3 existe para prevenir. Aunque el propio informe se autodetectó como inválido, el hecho de que haya podido redactarse en absoluto demuestra que la instrucción por sí sola no garantiza la separación; se requiere un mecanismo verificable, no solo una regla declarada.
- **Numeración de gates inconsistente**: durante EXP-010, una instrucción llamó "Gate 4" a lo que la ficha técnica (`EXP-010-TB-14.md`) definía como Gate 5, generando una entrega completa registrada bajo el número equivocado, corregida recién en una entrega posterior.
- **Reclamo indebido de autorización**: en una entrega temprana de EXP-010 se afirmó erróneamente que el gate general P3-5 había sido autorizado, cuando no lo había sido; corregido por el responsable humano.
- **Cita de trazabilidad incorrecta propagada por dos gates**: `EXP-010-TB-14.md` citó RF-05 (que describe el filtro de prioridad, diferido a VS-04) como si aplicara al selector de creación de VS-01, desde su redacción original en Gate 0 hasta que la revisión independiente lo detectó (H3).
- **Documentación de estado desactualizada durante dos gates completos**: `EXP-010-TB-14.md`, `EXP-010-test-plan.md` e `EXP-010-implementation-plan.md` siguieron afirmando "implementación no autorizada" mucho después de que la implementación ya había ocurrido (H1) — recurrencia directa del riesgo ya señalado en `docs/results-dashboard.md` para PILOT-002 ("vacíos documentales que solo se detectan al intentar cerrar").
- **Correspondencia commit↔narrativa invertida (H2)**: el commit que corrige `waitForFrame()` documenta resultados de un código que todavía no existía en ese commit; recurrencia del mismo tipo de hallazgo que H2 de EXP-007 (`docs/PILOT-002-closure-report.md` Ajuste I), pese a que ese ajuste ya estaba formalmente vigente para PILOT-003.
- **EXP-008 y EXP-009 registraron correcciones operativas evitables** en sus propias evaluaciones (fragmentación en microdecisiones; iteraciones evitables), sin llegar a bloquear ningún resultado.

## 8. Excepciones documentadas

| Excepción | Experimento | Descripción | Aceptada por | Fuente |
|---|---|---|---|---|
| H2 — narrativa y código en commits distintos, orden invertido | EXP-010 | El commit `fecdbea` (corrección de `waitForFrame()`) documenta las decisiones de VS-01 y los resultados de la fase verde antes del commit `02238a6`, que contiene ese código. No se reescribió el historial para simular una separación que no ocurrió. | Hugo Cornejo Villena, 19 de julio de 2026 | `experiments/EXP-010-evaluation.md` §8, conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15 |

Precedente directo: la misma clase de excepción (H2, Gate 0 y Gate 2 mezclados en un único commit) ya había sido aceptada en EXP-007 (`docs/PILOT-002-closure-report.md` §12). El Ajuste I de PILOT-002 exigía evitarla; volvió a ocurrir, en una forma distinta (orden invertido en vez de mezcla en un solo commit), lo que se trata en la sección 11 como hallazgo recurrente y en la sección 12 como lección obligatoria reforzada.

No se registraron excepciones documentales por artefactos faltantes (a diferencia de EXP-005/EXP-006 en PILOT-002): los tres experimentos de PILOT-003 tuvieron ficha, registro de sesión y evaluación desde su inicio, conforme al Ajuste F de PILOT-002.

## 9. Carga operativa y eficiencia

- EXP-010 por sí solo generó **8 entregas documentadas separadamente** en su registro de sesión (Gate 0 a Gate 6, más el ajuste de H1/H3/H4 y la aceptación de H2), para implementar una vertical slice cuyo cambio productivo neto es de aproximadamente 150 líneas repartidas en 4 archivos (`app.js`, `index.html`, `styles.css`, `test-runner.js`).
- La puntuación de Eficiencia de EXP-010 (2/5, `experiments/EXP-010-evaluation.md`) documenta explícitamente varios ciclos de corrección no planificados (reclamo indebido de P3-5, revisión inválida reemplazada por completo, corrección de H3/H4, corrección de numeración de gates).
- EXP-008 registró en su propia evaluación una sesión "excesivamente fragmentada en microdecisiones" (§4, `EXP-008-evaluation.md`); EXP-009 registró "iteraciones operativas evitables" (§4, `EXP-009-evaluation.md`).
- El Ajuste A propuesto en `docs/PILOT-001-closure-report.md` §11 ("plantillas documentales reducidas para tareas ligeras... plantillas completas para rutas estándar, exploratorias e incidentes") **no se implementó** en ningún piloto posterior; PILOT-003 usó el mismo nivel de detalle documental máximo en los tres experimentos, incluyendo el exploratorio (EXP-008).
- **Conclusión de esta sección**: la carga documental sigue siendo desproporcionada respecto del tamaño del cambio técnico entregado, un patrón ya señalado en PILOT-001 (§8.3) y no resuelto en tres pilotos consecutivos.

## 10. Hallazgos recurrentes

1. **Vacíos o desactualizaciones documentales que solo se detectan al cerrar o al ser revisados externamente** (PILOT-002: EXP-005/EXP-006/EXP-007; PILOT-003: H1 de EXP-010).
2. **Mezcla o desalineación entre commits y su narrativa de sesión** (EXP-007 H2 en PILOT-002; EXP-010 H2 en PILOT-003 — misma clase de hallazgo, dos pilotos consecutivos, pese a un ajuste formal ya vigente que debía prevenirlo).
3. **Carga documental desproporcionada al tamaño del cambio técnico**, señalada en PILOT-001 y nunca resuelta mediante plantillas diferenciadas por nivel de control (Ajuste A, nunca implementado).
4. **Mecanismos declarados pero no verificables**: tanto la separación de contexto (Gate 3) como la numeración de gates dependieron de que la instrucción humana y la sesión coincidieran; cuando no coincidieron, el error se coló hasta que algo (la propia sesión, o una entrega posterior) lo detectó.

## 11. Lecciones obligatorias para PILOT-004

Continuando la numeración de ajustes de `docs/PILOT-002-closure-report.md` §14 (Ajustes E a J). Los Ajustes K a O se formalizan aquí como **condiciones de entrada y controles obligatorios de PILOT-004** (sección 15); su validación ocurre **durante el propio piloto end-to-end**, no mediante un experimento aislado previo. Estos ajustes quedan propuestos y vigentes para PILOT-004 a través de este informe de cierre; no se incorporan todavía al texto de `docs/WORKFLOW-METHODOLOGY-v2.md` — cualquier cambio permanente a la metodología base requiere una aprobación separada, conforme a esa misma metodología §15.

### Ajuste K — Verificación explícita de separación de contexto antes de redactar, no después

Cuando una fase exija contexto separado del de implementación (equivalente al Gate 3), la sesión que la ejecute debe verificar y declarar esa condición **antes** de comenzar a redactar el entregable. Motivado por el primer informe inválido de revisión independiente de EXP-010.

### Ajuste L — Correspondencia commit↔narrativa en el mismo commit y en orden cronológico (refuerzo del Ajuste I)

El Ajuste I de PILOT-002 exigía cierre secuencial de gates sin mezclar commits; no impidió la recurrencia del mismo tipo de hallazgo en una forma distinta (H2 de EXP-010: commits separados pero con narrativa y código desalineados cronológicamente). Se refuerza explícitamente: cada commit de código productivo debe llevar, en el mismo commit, la actualización correspondiente del registro de sesión, y ningún commit puede narrar resultados de un código que ese mismo commit no contiene todavía.

### Ajuste M — Numeración de gates fijada y verificada antes de cada entrega

Toda ficha técnica que defina gates numerados debe tratarse como fuente única de verdad; ninguna instrucción operativa debe introducir una numeración alternativa sin verificarla primero contra la ficha. Motivado por la inconsistencia de numeración detectada en EXP-010 (Gate 4 vs. Gate 5).

### Ajuste N — Plantillas documentales por nivel de control (reactivación del Ajuste A de PILOT-001)

El Ajuste A de `docs/PILOT-001-closure-report.md` §11 nunca se implementó. Se reactiva como condición obligatoria antes de PILOT-004: definir y aplicar variantes de plantilla proporcionales a la ruta y al nivel de control, para que un experimento exploratorio o de control medio no exija el mismo volumen documental que uno de control alto con revisión independiente.

### Ajuste O — Decisión explícita sobre independencia de contexto para la evaluación por rúbrica

`experiments/EXP-010-TB-14.md` §12 no exige contexto separado para el Gate 4 (rúbrica), a diferencia del Gate 3. La evaluación de EXP-010 fue redactada por el mismo contexto que ejecutó la implementación y el ensayo de reversión, con nota de transparencia explícita, pero sin resolución formal. Antes de PILOT-004 debe decidirse si la evaluación mediante rúbrica en control alto requiere también contexto separado.

## 12. Deuda diferida

- **VS-02 a VS-06 de TB-14** (edición de prioridad, filtro de estado, filtro de prioridad y combinación AND, coherencia bajo filtros activos, estados vacíos y regresión integral) permanecen sin iniciar, según `experiments/EXP-009-vertical-slice-map.md` §11. Se registran expresamente como **deuda funcional diferida, no como camino crítico**: completar TB-14 no es una condición para validar el workflow como producto reutilizable, y no forman parte de las condiciones de entrada de PILOT-004 (sección 15). Su ejecución queda para cuando se decida retomar TB-14, sin fecha ni prioridad asignada por este informe.
- Hallazgos H7, H8, H9 de `experiments/EXP-010-independent-review.md` (mensaje de error de RF-21 sin prueba de DOM; prioridad no visible en edición inline; efecto colateral de normalización no ejercitado explícitamente) quedan como deuda de cobertura para VS-02, con la misma condición: diferida, no crítica.
- El Ajuste A de PILOT-001 (plantillas por nivel de control), reactivado en esta entrega como Ajuste N, sigue sin implementarse; solo queda formalmente exigido, no resuelto.
- La limitación heredada de PILOT-001 (`docs/PILOT-001-closure-report.md` §8.5: la aplicación acepta JSON válido cuyo resultado no sea un array) permanece sin atender, ahora heredada por tercer piloto consecutivo.
- La rama desechable `pilot-003/exp-010-reversal-test` permanece sin eliminar (por instrucción expresa); su eliminación queda pendiente de una decisión futura separada.

## 13. Evaluación global del piloto (síntesis, no promedio mecánico)

Los puntajes individuales (47/50, 48/50, 42/50) no se promedian mecánicamente como medida del éxito de PILOT-003: el objetivo del piloto no era maximizar puntajes aislados, sino demostrar que la **cadena completa** —de requisitos ambiguos a un cambio integrado, revisado, evaluado y revertible— funciona como un sistema. Evaluada de esa forma:

### ¿PILOT-003 demostró que el workflow puede pasar de requisitos ambiguos a implementación controlada?

**Sí.** Es la primera vez en el proyecto que una misma tarea (TB-14) atraviesa presión de requisitos (EXP-008), diseño técnico (EXP-009) e implementación de una slice acotada (EXP-010) como fases encadenadas y con gates explícitos entre cada una, terminando en un pull request fusionado con evidencia verificable en cada etapa. PILOT-001 y PILOT-002 validaron partes de esta cadena por separado; PILOT-003 es el primero en recorrerla de punta a punta para una sola pieza de trabajo.

### ¿La separación entre presión, diseño, implementación y revisión funcionó?

**Sí, con una falla real y corregida.** Las tres fases (EXP-008/EXP-009/EXP-010) mantuvieron límites de alcance claros y gates de entrada propios. Dentro de EXP-010, la separación roja/verde funcionó sin fisuras. La separación de contexto para la revisión independiente **falló en su primer intento** (informe redactado en el mismo contexto que la implementación) y tuvo que rehacerse por completo. La falla fue real, no cosmética; su corrección también fue real y verificable.

### ¿La carga documental sigue siendo excesiva?

**Sí.** Ocho entregas documentadas para una vertical slice de ~150 líneas de código neto, puntaje de Eficiencia de 2/5 en EXP-010, y fragmentación reconocida en las propias evaluaciones de EXP-008 y EXP-009. El Ajuste A de PILOT-001, pensado exactamente para este problema, nunca se implementó.

### ¿Los gates fueron suficientemente claros?

**No completamente.** Funcionalmente, ningún gate se saltó ni se ejecutó sin autorización. Pero la numeración misma requirió corrección durante el piloto (Gate 4 vs. Gate 5), y el reclamo indebido de un gate general (P3-5) muestra que la relación entre los gates internos de un experimento y los gates generales del piloto no estaba suficientemente fijada.

### ¿La revisión independiente fue realmente efectiva?

**Sí, pero únicamente en su segundo intento.** El primer informe no era independiente y no debía contar como Gate 3 superado; el segundo, genuinamente separado, encontró 10 hallazgos reales (citas de trazabilidad incorrectas, brechas de cobertura, un problema de trazabilidad de commits) que la implementación no había detectado por sí sola. La revisión independiente demuestra valor real cuando la condición que la define —separación de contexto— efectivamente se cumple, y ese es precisamente el punto que falló primero.

### ¿Qué debe cambiar obligatoriamente antes del piloto end-to-end?

Los cinco ajustes de la sección 11 (K a O) deben quedar **formalizados como condiciones de entrada y controles obligatorios de PILOT-004** (sección 15): verificación explícita de separación de contexto antes de redactar; correspondencia commit↔narrativa en el mismo commit; numeración de gates fijada contra la ficha técnica desde el inicio; plantillas documentales proporcionales al nivel de control; y una decisión explícita sobre si la evaluación por rúbrica también requiere contexto separado. Estos ajustes se validan **dentro** de PILOT-004, no antes.

### ¿El workflow está listo para una validación end-to-end o requiere otro experimento aislado?

**El workflow está listo para una validación end-to-end controlada.** PILOT-003 demostró la cadena completa —de requisitos ambiguos a una implementación integrada, revisada, evaluada y revertible— con evidencia real en cada etapa. Los dos controles que fallaron en su primera ejecución (separación de contexto de la revisión, correspondencia commit↔narrativa) fueron detectados y corregidos dentro del propio piloto, lo que demuestra que el sistema es capaz de autocorregirse, no que el workflow sea inviable. Continuar encadenando experimentos aislados sobre TB-14 (como VS-02) no pondría a prueba nada que PILOT-003 no haya puesto a prueba ya: un proyecto que **ya existe**, con un repositorio ya configurado, una metodología ya en marcha y patrones ya conocidos. Repetirlo produciría rendimientos decrecientes y dejaría sin validar el vacío más importante que queda: la experiencia completa de iniciar, instalar, operar y cerrar un proyecto nuevo desde una idea vaga, con el workflow incorporándose desde cero. Los Ajustes K a O (sección 11) se incorporan como condiciones de entrada y controles obligatorios de PILOT-004 mismo, y se validan durante su ejecución.

**Conclusión estratégica**: "El workflow está listo para una validación end-to-end controlada. Continuar con experimentos aislados produciría rendimientos decrecientes y no resolvería el principal vacío pendiente: la experiencia completa de iniciar, instalar, operar y cerrar un proyecto nuevo desde una idea vaga."

## 14. Decisión final sobre PILOT-003

**PILOT-003 APROBADO CON RESTRICCIONES. Cerrado formalmente. Suficiente para avanzar a PILOT-004 end-to-end.**

El piloto demostró, por primera vez en el proyecto, un ciclo completo de una tarea desde requisitos ambiguos hasta una implementación controlada, revisada de forma independiente, evaluada mediante rúbrica oficial y con reversión ejecutada y verificada en ambos sentidos, integrada a `main` mediante pull request. Los tres experimentos fueron aprobados (47/50, 48/50, 42/50), sin reglas de bloqueo activadas en ninguno. Las dos fallas de control detectadas (separación de contexto de la revisión, correspondencia commit↔narrativa) fueron reales, pero se autodetectaron y corrigieron dentro del propio piloto, y quedan convertidas en los Ajustes K a O (sección 11).

Esta aprobación **no queda condicionada a la ejecución de ningún experimento adicional, aislado o de validación previa**. Los Ajustes K a O se incorporan como condiciones de entrada y controles obligatorios de PILOT-004 (sección 15) y se validan durante ese mismo piloto end-to-end, no antes. La deuda diferida (sección 12) —incluyendo VS-02 a VS-06— queda registrada como backlog funcional explícito, fuera del camino crítico hacia PILOT-004.

## 15. Condición de entrada para PILOT-004

PILOT-004 podrá iniciarse cuando su paquete operativo formal incorpore, como mínimo:

1. **Alcance formal aprobado** para el piloto end-to-end, incluyendo el proyecto y la funcionalidad concretos a construir.
2. **Proyecto nuevo y repositorio nuevo**: PILOT-004 debe ejecutarse sobre un repositorio distinto de `workflow-ai-sandbox`, partiendo de una idea vaga, no de una base de código y una metodología ya en marcha.
3. **Mecanismo definido de instalación o incorporación del workflow** en ese proyecto nuevo, documentado como parte del paquete operativo.
4. **Separación verificable de contextos** para toda fase que la requiera (equivalente al Gate 3), con un mecanismo de verificación explícito, no solo una instrucción (Ajuste K).
5. **Gates numerados y congelados desde el inicio**, tratando la ficha técnica como fuente única de verdad, sin numeraciones alternativas introducidas por instrucciones operativas (Ajuste M).
6. **Artefactos proporcionales** al nivel de control y a la ruta de cada fase, conforme a plantillas diferenciadas (Ajuste N).
7. **Commits y narrativa sincronizados**: cada commit de código productivo debe llevar, en el mismo commit, su actualización de registro de sesión correspondiente, en orden cronológico real (Ajuste L).
8. **Criterio de éxito end-to-end** definido de antemano: qué constituye haber validado la experiencia completa de iniciar, instalar, operar y cerrar el proyecto.
9. **Prohibición explícita de iniciar código antes de aprobar el paquete operativo** del piloto.

Estas nueve condiciones, junto con la decisión explícita sobre el Ajuste O (independencia de contexto para Gate 4), deben quedar incorporadas al paquete operativo de PILOT-004 antes de su aprobación. Ninguna de ellas exige, por sí misma, un experimento aislado previo: se cumplen mediante el diseño del paquete operativo y se validan durante la ejecución del propio PILOT-004.

## 16. Confirmación explícita: PILOT-004 no ha sido iniciado

Este informe **no declara iniciado PILOT-004**. No se ha creado paquete operativo, banco de tareas, rúbrica, protocolo, repositorio ni experimento alguno para PILOT-004. PILOT-004 end-to-end se identifica en este informe como el siguiente hito estratégico, listo para iniciarse (sección 13), pero su inicio y su diseño quedan expresamente fuera del alcance de este documento y requieren una aprobación separada y posterior, sujeta a que su paquete operativo incorpore las nueve condiciones de la sección 15.

## 17. Estado final por experimento

- EXP-008: cerrado, aprobado (47/50), integrado a `main` mediante pull request #12 (commit `3d559b7`).
- EXP-009: cerrado, aprobado (48/50), integrado a `main` mediante pull request #13 (commit `43185f4`).
- EXP-010: cerrado, aprobado con restricciones (42/50), integrado a `main` mediante pull request #14 (commit `aa89057`); hallazgo H2 aceptado como excepción documentada; H7-H9 diferidos a VS-02 (deuda funcional, fuera del camino crítico).
- PILOT-003: **aprobado con restricciones, cerrado formalmente**. El workflow queda considerado suficiente para avanzar a PILOT-004 end-to-end.
- VS-02 a VS-06: deuda funcional diferida de TB-14, sin fecha asignada; no forman parte del camino crítico hacia PILOT-004.
- Rama desechable `pilot-003/exp-010-reversal-test`: conservada, no fusionada, no eliminada.
- Siguiente hito: preparar el paquete operativo de PILOT-004, incorporando las nueve condiciones de entrada de la sección 15 (incluyendo los Ajustes K a O como controles obligatorios a validar durante el propio piloto). PILOT-004 no iniciado (sección 16).
