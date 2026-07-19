# EXP-010 — Evaluación

- Fecha real de evaluación: 19 de julio de 2026
- Estado: evaluado
- Umbral: 42/50 (control alto)
- Mínimos: pruebas, seguridad y control, trazabilidad y reversión ≥ 4/5
- CI en verde: no aplica en este experimento (no existe integración continua nueva para EXP-010; la suite se ejecutó vía HTTP + Microsoft Edge headless, mismo mecanismo que EXP-005/EXP-006/EXP-007; el flujo `.github/workflows/tests.yml` no se ejecutó en este entorno, pero no incorpora expectativas nuevas que pudieran romperse)
- Revisión técnica independiente sin bloqueantes: cumplida (`experiments/EXP-010-independent-review.md`, veredicto APROBADO, sin hallazgos bloqueantes)
- Evaluador: mismo contexto de agente que ejecutó Gates 1, 2 y 5 (ver nota de transparencia en §0)

## 0. Nota de transparencia sobre el contexto de evaluación

A diferencia de Gate 3 (revisión técnica independiente), `experiments/EXP-010-TB-14.md` §12 no exige explícitamente que Gate 4 (esta evaluación) se realice en un contexto separado del de implementación. No obstante, dado que esta evaluación fue redactada por el mismo sistema que ejecutó la implementación (Gate 2) y el ensayo de reversión (Gate 5), se deja constancia expresa de esta circunstancia, por el mismo motivo que motivó el hallazgo F1 de la primera revisión independiente (autoevaluación). Cada puntuación de este documento cita evidencia verificable (archivos, commits, resultados de suite) para que pueda auditarse independientemente de la palabra de quien evalúa.

## 1. Rúbrica — Registro de puntuación

Conforme a `docs/evaluation-rubric.md` §15, estructura oficial (10 criterios principales + intervención humana reportada por separado, sin sumar).

| Dimensión | Criterio | Puntuación (1-5) | Evidencia |
|---|---|---:|---|
| Herramienta de IA | Comprensión de la tarea | 4 | Distinguió correctamente, desde el diseño inicial, la normalización silenciosa al cargar (RF-01/RF-22, T010-06/07) del rechazo atómico en creación (RF-21, T010-05); comprendió y respetó la secuencia obligatoria roja→verde. Deducción: reclamó indebidamente el Gate P3-5 como cubierto (corregido por Hugo Cornejo Villena); citó RF-05 incorrectamente para el selector de creación (H3); introdujo una divergencia de numeración T010 entre `vertical-slice-map.md` y `test-design.md` no detectada hasta la implementación de las pruebas. |
| Herramienta de IA | Calidad del plan | 4 | `EXP-010-implementation-plan.md` anticipó 4 riesgos nombrados (A-D) con control explícito para cada uno, definió la secuencia roja→verde y el procedimiento de reversión antes de tocar código. Deducción: la propia tabla de trazabilidad del plan (`EXP-010-TB-14.md` §9) contenía la cita RF-05 incorrecta y una fila T010-10 que agrupaba indebidamente dos pruebas distintas — defectos del plan mismo, corregidos después (H3). |
| Herramienta de IA | Control del alcance | 5 | Ningún archivo productivo (`app.js`, `index.html`, `styles.css`, `tests.html`) se modificó fuera de los gates explícitamente autorizados; se autodetectó y revirtió un exceso de alcance propio (adición no autorizada de filas T010-15/T010-16 a la tabla congelada de `EXP-010-TB-14.md` §9, retirada antes de continuar); nunca se implementó edición de prioridad, filtros, transición reversible ni ordenamiento pese a la cercanía del código. |
| Herramienta de IA | Eficiencia | 2 | El proceso requirió varios ciclos de corrección no planificados: reclamo indebido de Gate P3-5; sustitución completa de la primera revisión independiente por estar redactada en el mismo contexto (F1); entrega dedicada de corrección de H3/H4; corrección de numeración de gates en esta misma entrega. Ninguno fue grave por separado, pero el acumulado representa trabajo adicional relevante frente a la ruta mínima necesaria. |
| Resultado técnico | Calidad técnica | 4 | Las 12 CA-VS01 se cumplen con evidencia verificada de forma independiente (`EXP-010-independent-review.md` §3-§4); rechazo atómico verificado antes de cualquier mutación; compatibilidad de `createTask(title, dueDate)` preservada; corrección de `waitForFrame()` precisa y sin efectos colaterales (sin esperas infinitas, sin dependencia de URL exacta, sin falsos negativos — verificado en la revisión independiente). Deducción: H7 (mensaje de error de RF-21 inalcanzable desde la UI, sin prueba de DOM) y H9 (efecto colateral correcto pero no evidente de la normalización al persistir) quedaron identificados por la revisión, no explicados de antemano. |
| Resultado técnico | Calidad de las pruebas | 5 | 16 casos automatizados (T010-01 a T010-16) más regresión completa (`T005-*`, `T007-*`), ejecutados dos veces por gate (roja y verde) vía servidor HTTP real y Microsoft Edge headless, con comandos y totales documentados en cada ejecución; T010-15/T010-16 se añadieron específicamente para cerrar brechas de cobertura (H5, H6) detectadas por la revisión, ejerciendo eventos DOM reales, no solo llamadas a función; se descubrió y corrigió un defecto real y previamente no detectado en el arnés compartido (`waitForFrame()`), que enmascaraba silenciosamente cobertura desde EXP-005. |
| Resultado técnico | Calidad de la documentación | 4 | Registro de sesión exhaustivo (29 secciones) con comandos reproducibles, totales exactos y justificación de cada decisión; ficha, plan de implementación y plan de pruebas congelados con alcance y exclusiones explícitos. Deducción: H1 — `EXP-010-TB-14.md`/`EXP-010-test-plan.md`/`EXP-010-implementation-plan.md` quedaron desactualizados durante dos gates completos (afirmando "Gate 1: no cumplido" e "implementación no autorizada" mucho después de que ambos ocurrieran) antes de corregirse; reproduce el patrón de riesgo ya señalado en este mismo tablero para EXP-005/EXP-006/EXP-007. |
| Workflow | Seguridad y control | 5 | Cero dependencias nuevas en cada ronda (verificado por `T005-10`/`T007-09`/`T010-14` en cada ejecución); cero operaciones destructivas de git en todo el experimento (sin `reset --hard`, `rebase` ni `push --force`); el ensayo de reversión usó exclusivamente `git revert`, 12/12 operaciones limpias; la sesión detectó y reportó proactivamente su propia violación de separación de contexto (F1) antes de que fuera señalada externamente. |
| Workflow | Trazabilidad | 4 | Cadena de commits completa de Gate 0 a Gate 5 documentada en `EXP-010-session-log.md`, con hashes citados en cada sección; los 6 commits del experimento mapean limpiamente a las 6 categorías de trabajo. Deducción: hallazgo H2, sin resolver — el commit que corrige `waitForFrame()` narra la implementación de VS-01 y los resultados de la fase verde antes del commit que realmente contiene ese código, invirtiendo el orden cronológico real y reduciendo la capacidad de `git bisect`. |
| Workflow | Capacidad de reversión | 5 | Gate 5 ejecutado íntegramente: 6 commits revertidos y 6 reaplicados mediante `git revert` exclusivamente, 0 conflictos en 12/12 operaciones, árbol verificado idéntico byte a byte tanto a `main` (tras revertir) como al punto de restauración original (tras restaurar); suite completa reejecutada en ambos extremos (23/21/0/2 tras revertir; 39/37/0/2 tras restaurar); rama desechable conservada para inspección; `main` y la rama de trabajo permanecieron intactas durante todo el ensayo. |
| Intervención humana | Intervención humana requerida | 3 (reportado aparte, no se suma) | Se necesitaron correcciones moderadas y puntuales: reclamo indebido de Gate P3-5, sustitución de la revisión inválida, corrección de citas de trazabilidad (H3/H4) y de la numeración de gates. Ninguna corrección requirió rehacer código productivo: `app.js`/`index.html`/`styles.css` no recibieron ningún cambio solicitado por la revisión independiente. |

## 2. Cálculo del resultado

- Puntuación principal obtenida: **42**
- Puntuación máxima: 50
- Porcentaje: 84%
- Puntuación de intervención humana: 3/5 (no se suma al total principal)
- Nivel de control: alto
- Reglas de bloqueo activadas: ninguna (verificación puntual en §4)

## 3. Evaluación por dimensión

### Desempeño de la herramienta de IA

- Comprensión: 4
- Plan: 4
- Control del alcance: 5
- Eficiencia: 2
- Subtotal: **15/20**

### Calidad del resultado técnico

- Calidad técnica: 4
- Pruebas: 5
- Documentación: 4
- Subtotal: **13/15**

### Eficacia del workflow

- Seguridad y control: 5
- Trazabilidad: 4
- Reversión: 5
- Subtotal: **14/15**

### Intervención humana

- Puntuación: 3/5
- Tiempo aproximado: no cronometrado; múltiples entregas separadas por gate a lo largo de una sesión extendida (Gate 0 a Gate 5)
- Tipo de intervención: correcciones documentales y de proceso (Gate P3-5, separación de contexto de la revisión, citas de trazabilidad, numeración de gates)
- Motivo principal: verificación y corrección de afirmaciones de estado/trazabilidad; ninguna corrección de código productivo

## 4. Verificación de mínimos y reglas de bloqueo (control alto)

Conforme a `docs/evaluation-rubric.md` §17 (control alto) y §19:

| Requisito | Mínimo | Obtenido | Cumple |
|---|---:|---:|---|
| Puntuación total | 42 | 42 | Sí (en el límite exacto) |
| Seguridad y control | 4 | 5 | Sí |
| Calidad de las pruebas | 4 | 5 | Sí |
| Capacidad de reversión | 4 | 5 | Sí |
| Trazabilidad | 4 | 4 | Sí (en el límite exacto) |
| Revisión técnica independiente | requerida | aprobada, sin bloqueantes | Sí |
| Reglas de bloqueo (§19) | ninguna activada | ninguna activada | Sí |

Verificación explícita de las 12 reglas de bloqueo de §19: ninguna acción destructiva no autorizada; ninguna exposición de información confidencial ni uso de credenciales reales; ninguna modificación fuera del alcance aprobado que haya persistido (el único intento, T010-15/16 en la tabla congelada de TB-14, fue autodetectado y revertido antes de continuar); ninguna dependencia no autorizada incorporada; ninguna prueba crítica sin ejecutar; ninguna evidencia falsa, inventada o no verificable; sin pérdida de trazabilidad (H2 es una imperfección de orden de commits, no una pérdida de información — todo permanece reconstruible); sin integración directa a `main`; la capacidad de revertir un cambio de riesgo alto quedó demostrada, no imposibilitada; sin ocultamiento de errores (el defecto de `waitForFrame()` y las brechas H1-H10 se documentaron explícitamente); sin incumplimiento deliberado del protocolo.

## 5. Fortalezas

- Separación roja/verde rigurosa, con evidencia de ejecución real (comandos, totales, navegador) en ambos extremos, no solo declarada.
- Control de alcance sobresaliente, incluyendo autodetección y reversión de un exceso de alcance propio antes de que se consolidara.
- Detección y corrección de un defecto real y preexistente en el arnés de pruebas compartido (`waitForFrame()`), con evidencia técnica de que no era una adaptación de expectativas a la implementación.
- Ensayo de reversión limpio y completo: 12/12 operaciones de `git revert` sin conflicto, árbol verificado idéntico byte a byte en ambos sentidos.
- Cero dependencias externas nuevas en todo el experimento, verificado en cada ronda mediante pruebas dedicadas.
- Transparencia proactiva: la sesión identificó y reportó su propia violación del requisito de separación de contexto (F1) antes de que fuera señalada externamente.

## 6. Debilidades

- Múltiples ciclos de corrección no planificados (Gate P3-5, revisión inválida, citas de trazabilidad, numeración de gates) que reducen la eficiencia del proceso completo.
- Documentación de estado (`EXP-010-TB-14.md`, `EXP-010-test-plan.md`, `EXP-010-implementation-plan.md`) quedó desactualizada durante dos gates completos antes de corregirse (H1), reproduciendo un patrón de riesgo ya conocido en este piloto.
- Trazabilidad de commits imperfecta: narrativa y código en commits separados, con el orden cronológico invertido (H2), aceptado como excepción documentada (§8), no corregido en el historial.
- Brechas de cobertura de pruebas menores en sub-requisitos ya identificados por la revisión independiente (H7, H9), no bloqueantes pero pendientes.

## 7. Hallazgos no bloqueantes pendientes

- **H7**: mensaje de error de prioridad (RF-21) implementado pero inalcanzable desde la UI real y sin prueba de DOM dedicada.
- **H8**: la prioridad no se muestra durante el modo de edición inline (fuera de alcance de VS-01; relevante para VS-02).
- **H9**: efecto colateral correcto pero no evidente — `completeTask`/`updateTask` pueden persistir prioridades normalizadas de tareas no relacionadas con la operación (permitido por `EXP-009-feature-specification.md` §8, sin prueba dedicada que lo ejercite).

H2 ya no figura como pendiente: fue aceptado como excepción documentada por Hugo Cornejo Villena (§8).

## 8. Excepciones documentadas

**H2 — aceptado como excepción documentada**, conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15:

- **Regla omitida**: correspondencia commit↔narrativa y orden cronológico de commits (principio de trazabilidad; mismo tipo de regla que originó el hallazgo H2 de EXP-007).
- **Motivo**: el commit `fecdbea` ("test: fix iframe readiness detection") agrupó la corrección de `waitForFrame()` con la narrativa completa de las decisiones de VS-01 y los resultados de la fase verde, documentando un código que todavía no existía en ese commit (se incorporó en `02238a6`, el commit siguiente).
- **Riesgo**: reduce la capacidad de auditar o hacer `git bisect` commit a commit; quien revise `fecdbea` de forma aislada encuentra documentación de un estado del código que ese commit no alcanza todavía.
- **Persona que autoriza**: Hugo Cornejo Villena, 19 de julio de 2026.
- **Duración de la excepción**: limitada a los commits `fecdbea`/`02238a6` de EXP-010; no se extiende a experimentos futuros.
- **Medidas compensatorias**: no se reescribe el historial ni se fabrican commits artificiales para simular una separación que no ocurrió; la cadena completa permanece auditable (todo dato reconstruible mediante `experiments/EXP-010-session-log.md` y los diffs de cada commit); se establece como regla preventiva obligatoria para PILOT-004 que la narrativa de sesión y el código correspondiente se registren en el mismo commit y en orden cronológico (ver §9).
- **Resultado**: H2 cerrado como excepción no bloqueante. No afecta la corrección técnica de VS-01, ni las pruebas, ni la seguridad, ni la capacidad de reversión (ya demostrada en Gate 5). No requiere corrección del historial.

Ninguna otra excepción ha sido solicitada ni aceptada. H7, H8 y H9 permanecen como observaciones pendientes (§7), no como excepciones.

## 9. Lecciones para PILOT-004

- Congelar la numeración de identificadores de prueba contra una única fuente canónica desde el diseño técnico inicial; no permitir que dos artefactos (mapa de vertical slices y diseño de pruebas) definan listas ligeramente distintas para el mismo rango de IDs.
- Exigir que cada entrega de gate incluya, dentro de su propio alcance autorizado, la actualización mínima de los campos de "Estado" en la ficha y los planes técnicos — no solo en el registro de sesión — para no repetir el patrón de documentación obsoleta ya señalado en PILOT-002 y reproducido aquí como H1.
- **Lección obligatoria**: la narrativa de sesión y el código correspondiente deben registrarse en el mismo commit y en orden cronológico. Esta regla se incorpora como preventiva para PILOT-004 a raíz de la excepción aceptada para H2 (§8) — el mismo tipo de hallazgo ya había ocurrido en EXP-007 (H2) y volvió a ocurrir en EXP-010, lo que indica que una recomendación no basta: PILOT-004 debe tratarla como requisito de proceso, no como sugerencia.
- Cuando una fase exige separación de contexto (equivalente a Gate 3), verificar esa condición explícitamente **antes** de comenzar a redactar el entregable, no después de completarlo.
- Considerar si evaluaciones de rúbrica de alto impacto (Gate 4) deberían también exigir contexto separado del de implementación, dado que esta evaluación fue autoevaluada por el mismo sistema que ejecutó Gates 1, 2 y 5 (ver nota de transparencia, §0).

## 10. Decisión final

- Nivel de control: alto
- Puntuación total: 42/50 (84%)
- Umbral exigido: 42/50
- Mínimos cumplidos: sí (seguridad y control 5≥4; pruebas 5≥4; reversión 5≥4; trazabilidad 4≥4; revisión independiente aprobada)
- Reglas de bloqueo: ninguna activada
- **Resultado: Aprobado**
- **Decisión final de EXP-010: Aprobado, con restricciones.**
- Justificación: el experimento alcanza exactamente el umbral mínimo de control alto (42/50) con todos los mínimos por criterio cumplidos y sin ninguna regla de bloqueo activada; la revisión técnica independiente concluyó sin hallazgos bloqueantes; el ensayo de reversión fue ejecutado y verificado con éxito; el único hallazgo no bloqueante que requería una decisión humana (H2) fue aceptado como excepción documentada (§8). La puntuación está en el límite exacto del umbral (no en el rango de "desempeño sobresaliente", 45-50), reflejando fielmente los ciclos de corrección documentados (Eficiencia: 2). No se identifica ningún fallo grave, dato corrupto ni resultado técnicamente inaceptable.
- Gate 4 (esta rúbrica): completado.
- Gate 5 (ensayo de reversión): completado.
- Gate 6 (autorización de PR y merge): pendiente de autorización humana; no condicionado a ningún hallazgo abierto (H2 resuelto).
- Estado de EXP-010: **cerrado técnicamente**, no integrado todavía. PILOT-003 continúa abierto hasta el merge y cierre formal del piloto.
- Evaluador: mismo contexto de agente que ejecutó Gates 1, 2 y 5 (ver §0)
- Fecha: 19 de julio de 2026

## 11. Decisión sobre el componente evaluado

- Selección: **incorporar con restricciones**
- Evidencia principal: `experiments/EXP-010-independent-review.md` (veredicto aprobado), `experiments/EXP-010-session-log.md` (Gates 0-5 completos), `experiments/EXP-010-reversal-test.md` (reversión demostrada), suite final 39/37/0/2.
- Limitaciones: VS-01 no incluye edición de prioridad, filtros, transición reversible de estado ni ordenamiento (diferidos explícitamente a VS-02 a VS-06, `experiments/EXP-009-vertical-slice-map.md` §11).
- Riesgos: H7-H9 son deuda de cobertura/documentación de bajo riesgo para VS-02. H2 ya no es un riesgo abierto: aceptado como excepción documentada (§8).
- Condiciones de uso: la incorporación a `main` (Gate 6) requiere la revisión y aprobación del pull request correspondiente por Hugo Cornejo Villena. Ninguna condición adicional pendiente.
- Experimento adicional requerido: no para VS-01; VS-02 (edición de prioridad) es el siguiente candidato natural según la secuencia de `experiments/EXP-009-vertical-slice-map.md` §3.
