# Evaluación de EXP-007

## Nota de regularización documental

Esta evaluación se redacta el 18 de julio de 2026, con posterioridad al merge del pull request #9 (commit `ac3a479`), como cierre documental de la rúbrica aplicada a EXP-007. Los puntajes fueron fijados por decisión explícita del responsable del piloto en el marco de la regularización documental de PILOT-002.

## 1. Identificación

- Experimento: EXP-007
- Tarea: TB-13
- Ruta: estándar
- Nivel de control: alto
- Componente evaluado: gestión de tareas (edición inline de título y fecha límite)
- Herramienta: Claude Code
- Resultado: aprobado

## 2. Puntuación

| Dimensión | Criterio | Puntuación | Justificación |
|---|---|---:|---|
| Herramienta de IA | Comprensión de la tarea | 5 | La instrucción de la sesión (`experiments/EXP-007-session-log.md` §5) siguió íntegramente el microplan aprobado (`EXP-007-TB-13.md` §9) y el orden obligatorio de ejecución, sin aclaraciones adicionales registradas. |
| Herramienta de IA | Calidad del plan | 5 | El plan ejecutado respetó exactamente el orden exigido: pruebas nuevas primero, demostración de fallo previo, implementación, suite completa, regresión de EXP-005 (`experiments/EXP-007-session-log.md` §6-§9). |
| Herramienta de IA | Control del alcance | 4 | Los archivos modificados coinciden con el alcance autorizado (`EXP-007-TB-13.md` §7), pero el hallazgo H2 (Gate 0 y Gate 2 en un único commit, `EXP-007-independent-review.md` §4) refleja una desviación operativa aceptada como excepción, no un cumplimiento perfecto. |
| Herramienta de IA | Eficiencia | 5 | La implementación completa (pruebas nuevas, código, regresión) se realizó en una sola sesión, sin iteraciones fallidas documentadas. |
| Resultado técnico | Calidad técnica | 4 | CA-01 a CA-10 cumplidos (`EXP-007-independent-review.md` §3); persisten limitaciones menores no bloqueantes registradas en `experiments/EXP-007-session-log.md` §9 (descarte silencioso de borrador al cambiar de tarea, mensaje de error genérico). |
| Resultado técnico | Calidad de las pruebas | 4 | `T007-01` a `T007-09`: 9/9 PASS; regresión de `T005-01` a `T005-10`: 10/10 PASS sin cambios. No se realizó verificación manual con interacción real de usuario, solo ejecución headless (`EXP-007-independent-review.md` §5), lo que limita el puntaje. |
| Resultado técnico | Documentación | 4 | `README.md` actualizado y registro de sesión extenso y trazable; la revisión independiente y la evaluación se completaron mediante esta regularización documental posterior, no en el momento original. |
| Workflow | Seguridad y control | 5 | Sin dependencias externas añadidas (`T007-09`), sin cambios fuera de alcance, sistema de identificadores no modificado. |
| Workflow | Trazabilidad | 4 | Existen commits, registro de sesión, ficha e informe independiente, pero el hallazgo H2 (commits de Gate 0 y Gate 2 mezclados) reduce la granularidad de la trazabilidad commit a commit, aceptado como excepción documentada conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15. |
| Workflow | Capacidad de reversión | 4 | Subió de 3/5 a 4/5 tras el ensayo de reversión (hallazgo H1, resuelto): el ensayo se realizó mediante `git revert` en la rama desechable `pilot-002/exp-007-reversal-test`, con resultado 12 PASS, 0 FAIL, 2 NO EJECUTADOS y `T005-FINAL` en PASS. No alcanza 5/5 porque el ensayo no se ejecutó sobre la rama real de la implementación, conforme a la definición de la escala en `docs/evaluation-rubric.md` §13 (4 = "validada mediante revisión o prueba parcial"; 5 = "ejecutada con éxito... sobre el estado restaurado"). |

## 3. Resultado principal

- Puntuación total: **44/50**
- Umbral exigido (control alto, `docs/evaluation-rubric.md` §17): 42/50 — cumplido
- Seguridad y control ≥ 4: 5/5 — cumplido
- Calidad de las pruebas ≥ 4: 4/5 — cumplido
- Capacidad de reversión ≥ 4: 4/5 — cumplido
- Trazabilidad ≥ 4: 4/5 — cumplido
- Revisión técnica independiente: cumplida (`experiments/EXP-007-independent-review.md`)
- Reglas de bloqueo (`EXP-007-TB-13.md` §19): ninguna activada

## 4. Intervención humana

Puntuación numérica: no asignada en esta regularización documental (no forma parte de los diez criterios principales de la rúbrica, conforme a `docs/evaluation-rubric.md` §16, y no fue especificada por el responsable junto con los diez criterios principales).

Evidencia cualitativa disponible:

- Aprobación explícita de Gate 1 (inicio de implementación), conforme a `experiments/EXP-007-session-log.md` §11.
- Aprobación explícita de Gate 5 (autorización del merge): ocurrió dentro de la sesión operativa del workflow, fuera de este repositorio; no está registrada literalmente en `experiments/EXP-007-session-log.md` §11. El commit de merge `ac3a479` y el pull request #9 fusionado corroboran que la integración se ejecutó, pero por sí solos son evidencia de ejecución, no sustituto de la evidencia de esa aprobación.
- Corrección explícita del plan de reversión (hallazgo H3) y aceptación explícita de la excepción de trazabilidad (hallazgo H2), ambas atribuidas a decisión del responsable del piloto.

## 5. Decisión final

- Resultado: **aprobado**
- Puntuación: 44/50
- Justificación: se cumplen el umbral de control alto y todos los mínimos exigidos (seguridad, pruebas, reversión, trazabilidad); CA-01 a CA-10 cumplidos; sin reglas de bloqueo.
- Integración a `main`: **ya ejecutada** con anterioridad a esta evaluación. El pull request #9 y el commit de merge `ac3a479` corroboran que esa integración se ejecutó; la aprobación humana que la autorizó ocurrió fuera de este repositorio, dentro de la sesión operativa del workflow (ver Gate 5 en `experiments/EXP-007-session-log.md` §16). Esta evaluación se redacta como regularización documental del Gate 4, posterior al merge efectivo.
- Limitaciones registradas: ensayo de reversión no ejecutado sobre la rama real; verificación manual con interacción de usuario no realizada; mensaje de error de guardado rechazado no distingue el campo inválido (ver `experiments/EXP-007-session-log.md` §9).

## 6. Decisión sobre el componente

- Componente: edición inline de tareas existentes (título y fecha límite), con separación de contextos de implementación y revisión
- Decisión: **incorporar al workflow**
- Justificación: EXP-007 alcanzó 44/50 con los mínimos de control alto cumplidos, revisión técnica independiente registrada, y el cambio ya está integrado en `main`.
- Riesgos pendientes no bloqueantes: ver `experiments/EXP-007-session-log.md` §9 ("Riesgos pendientes no relacionados con H1/H2/H3").
