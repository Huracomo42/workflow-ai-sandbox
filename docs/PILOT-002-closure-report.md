# Informe de cierre — PILOT-002

## 1. Identificación

- Piloto: PILOT-002
- Nombre: Segunda ronda de validación del workflow — pruebas mediante HTTP, integración continua y revisión técnica independiente con nivel de control alto
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Fecha de inicio: 17 de julio de 2026 (primer commit de PILOT-002, rama `pilot-002/exp-005-http-test-isolation`, pull request #7)
- Fecha de cierre: 18 de julio de 2026
- Rama de cierre: `docs/PILOT-002-closure-report`
- Commit de regularización documental previa: `76918ec — docs: regularize PILOT-002 evidence`
- Estado: **APROBADO CON AJUSTES**

## 2. Objetivo del piloto

`docs/PILOT-001-closure-report.md` §13 recomendaba orientar una segunda ronda a validar: pruebas mediante HTTP, integración continua, ejecución automática en pull requests, tareas con dependencias, revisión especializada de código, coordinación entre varios agentes, una ruta exploratoria y un nivel de control alto. `docs/WORKFLOW-METHODOLOGY-v2.md` §16 clasificaba estas mismas capacidades como "aún no validadas" tras PILOT-001.

**Vacío documental**: `docs/WORKFLOW-METHODOLOGY-v2.md` §18 exigía preparar y aprobar un paquete operativo formal antes de iniciar PILOT-002 (objetivo del piloto, capacidades a validar, banco de tareas, criterios de aceptación, rúbrica, protocolo de pruebas, configuración de CI, funciones de implementación y revisión). Ese paquete operativo **no fue redactado ni aprobado formalmente** antes de iniciar EXP-005. PILOT-002 se ejecutó sin ese instrumento previo, lo que constituye una desviación respecto a lo exigido por la metodología. Este informe no reconstruye retroactivamente ese paquete inexistente (Decisión 4, `docs/decisions.md`); lo declara como vacío.

De lo efectivamente ejecutado en PILOT-002 (EXP-005, EXP-006, EXP-007), el objetivo cubierto en la práctica fue:

- validar pruebas mediante HTTP y su aislamiento entre casos (EXP-005);
- validar integración continua mediante GitHub Actions en pull requests (EXP-006);
- validar un experimento de nivel de control alto con revisión técnica independiente, sobre una funcionalidad estándar de edición de tareas (EXP-007).

No se ejecutaron en PILOT-002: una ruta exploratoria, tareas con dependencias externas, coordinación entre varios agentes, ni el nivel de control crítico o regulado. Estas capacidades permanecen sin validar.

## 3. Alcance ejecutado

| Experimento | Caso | Objetivo | Ficha formal | Registro de sesión | Evaluación por rúbrica | Resultado |
|---|---|---|---|---|---|---|
| EXP-005 | Pruebas mediante HTTP | Ejecutar la suite bajo un origen HTTP local y demostrar aislamiento entre casos | No (excepción documental) | No (excepción documental) | No (excepción documental) | Aprobado |
| EXP-006 | Integración continua | Validar que la suite se ejecute automáticamente en pull requests y bloquee visualmente un resultado incorrecto | No (excepción documental) | No (excepción documental) | No (excepción documental) | Aprobado |
| EXP-007 | TB-13 | Edición inline de tareas existentes, con implementación y revisión técnica independiente en contextos separados, nivel de control alto | Sí (`experiments/EXP-007-TB-13.md`) | Sí (`experiments/EXP-007-session-log.md`) | Sí (`experiments/EXP-007-evaluation.md`, creada en regularización posterior) | Aprobado, 44/50 |

EXP-005 y EXP-006 se ejecutaron sin entrada en `docs/task-bank.md` y sin los artefactos documentales exigidos por `docs/WORKFLOW-METHODOLOGY-v2.md` §4.2 para su nivel de control aparente. Se aceptan como excepciones documentales de este piloto (Decisión 1, `docs/decisions.md`); ver sección 12.

## 4. Resultados de EXP-005

Fuente: `docs/EXP-005-HTTP-TESTING.md`; pull request #7 (commit de merge `1795629`, 17 de julio de 2026).

- Propósito: ejecutar la suite del gestor de tareas bajo un origen HTTP local y demostrar que un fallo o una excepción en un caso no detiene los casos posteriores.
- Archivos del experimento: `tests.html`, `test-runner.js`, `docs/EXP-005-HTTP-TESTING.md`. No se modificaron `app.js`, `index.html` ni `styles.css`.
- Resultados observados por modo de ejecución:

| Modo | PASS | FAIL | No ejecutado | Estado general | `T005-FINAL` |
|---|---:|---:|---:|---|---|
| Normal | 12 | 0 | 2 | PASS CON NO EJECUTADOS | Ejecutado |
| Assertion failure | 12 | 1 | 1 | FAIL | Ejecutado |
| Exception | 12 | 1 | 1 | FAIL | Ejecutado |
| Skip | 11 | 0 | 3 | PASS CON NO EJECUTADOS | Ejecutado |

- Criterio de éxito: cumplido — un caso en `FAIL` o una excepción controlada no impide que `T005-FINAL` se ejecute y el resumen conserva todos los estados.
- Limitaciones registradas en la fuente: suite deliberadamente ligera, sin framework de pruebas; automatización sin interfaz gráfica evaluada posteriormente en EXP-006; en el equipo Windows usado, Python y Node.js no estaban disponibles por restricciones de la organización.
- Resultado: aprobado.

## 5. Resultados de EXP-006

Fuente: `docs/EXP-006-GITHUB-ACTIONS.md`; pull request #8 (commit de merge `66d46b0`, 18 de julio de 2026).

- Objetivo: validar que la suite se ejecute automáticamente al abrir o actualizar un pull request y que GitHub Actions detecte resultados incorrectos.
- Cambio realizado: workflow `.github/workflows/tests.yml`, que se activa en pull requests hacia `main`, descarga el repositorio, prepara Python, levanta un servidor HTTP local, ejecuta la suite en Chromium headless, verifica el estado general de la suite, confirma la ejecución de `T005-FINAL` y detiene el servidor al finalizar.
- Evidencia observada:
  - Ejecución inicial: PASS. GitHub Actions ejecutó correctamente el check al abrir el pull request.
  - Prueba roja controlada: se modificó temporalmente la expectativa del estado general de `PASS CON NO EJECUTADOS` a `PASS` (incorrecta). Resultado: FAIL, con el check del pull request en rojo.
  - Recuperación: se restauró la expectativa correcta. Resultado: PASS, check nuevamente en verde.
- Criterios de éxito cumplidos: el workflow se activa en pull requests; la suite se ejecuta automáticamente; un error intencional produce un check rojo; la corrección produce nuevamente un check verde; la aplicación no fue modificada.
- Resultado: aprobado.

## 6. Resultados de EXP-007

Fuentes: `experiments/EXP-007-TB-13.md`, `experiments/EXP-007-session-log.md`, `experiments/EXP-007-independent-review.md`, `experiments/EXP-007-evaluation.md`; pull request #9 (commit de merge `ac3a479`, 18 de julio de 2026).

- Tarea: TB-13 — edición inline de título y fecha límite de tareas existentes, con implementación y revisión técnica independiente en contextos separados, ruta estándar, nivel de control alto.
- Gates de control: los seis gates definidos en `experiments/EXP-007-TB-13.md` §16 quedaron superados — Gate 0 (documentación previa), Gate 1 (autorización de implementación), Gate 2 (implementación completa, `T007-01` a `T007-09` en PASS), Gate 3 (revisión técnica independiente), Gate 4 (rúbrica y umbral de control alto) y Gate 5 (aprobación humana e integración). El cierre formal de Gates 3, 4 y 5 se registró mediante la regularización documental del 18 de julio de 2026 (`experiments/EXP-007-session-log.md` §16).
- Hallazgos de la revisión técnica independiente (`experiments/EXP-007-independent-review.md`):
  - **H1 — Reversión no ensayada**: resuelto. Ensayo realizado en la rama desechable `pilot-002/exp-007-reversal-test` mediante `git revert` (commit `151c8df`); resultado 12 PASS, 0 FAIL, 2 NO EJECUTADOS, `T005-FINAL` en PASS.
  - **H2 — Gate 0 y Gate 2 registrados en un único commit** (`06adeb7`): aceptado y documentado como excepción operativa, no revertido; ver sección 12.
  - **H3 — El plan de reversión recomendaba `git reset --hard`**: resuelto; corregido a `git revert` como procedimiento normal.
- Criterios de aceptación CA-01 a CA-10: cumplidos en su totalidad, con evidencia de pruebas citada en `experiments/EXP-007-independent-review.md` §3.
- Rúbrica final (`experiments/EXP-007-evaluation.md`): 44/50 — Comprensión 5, Plan 5, Control del alcance 4, Eficiencia 5, Calidad técnica 4, Calidad de las pruebas 4, Documentación 4, Seguridad y control 5, Trazabilidad 4, Reversión 4 (subió de 3/5 a 4/5 tras el ensayo del hallazgo H1). Umbral de control alto (42/50) y todos los mínimos por criterio (seguridad ≥4, pruebas ≥4, reversión ≥4, trazabilidad ≥4) cumplidos. Sin reglas de bloqueo activadas.
- Intervención humana: sin puntuación numérica asignada (no forma parte de los diez criterios principales de la rúbrica y no fue especificada por el responsable). Evidencia cualitativa: aprobación explícita de Gate 1 registrada en `experiments/EXP-007-session-log.md` §11; aprobación explícita de Gate 5 (autorización del merge) ocurrida dentro de la sesión operativa del workflow, fuera de este repositorio — el commit `ac3a479` y el pull request #9 fusionado corroboran que la integración se ejecutó, pero no sustituyen por sí solos la evidencia de esa aprobación.
- **Vacío documental corregido mediante regularización**: la revisión técnica independiente y la evaluación por rúbrica no se registraron como artefactos separados en el momento en que se realizaron; se documentaron posteriormente, el 18 de julio de 2026, con posterioridad al merge del pull request #9. La fecha original exacta en que se realizó la revisión técnica independiente **no está documentada en el repositorio** (`experiments/EXP-007-independent-review.md` §0-§1); no se afirma ni se infiere esa fecha en ningún documento de este piloto.
- Resultado: aprobado, integrado a `main`.

## 7. Evidencias consolidadas

### Gestión de versiones

- EXP-005: rama `pilot-002/exp-005-http-test-isolation`, integrada mediante pull request #7 (commit de merge `1795629`).
- EXP-006: rama `pilot-002/exp-006-github-actions`, integrada mediante pull request #8 (commit de merge `66d46b0`).
- EXP-007: rama `pilot-002/exp-007-task-editing`, integrada mediante pull request #9 (commit de merge `ac3a479`); rama adicional desechable `pilot-002/exp-007-reversal-test` para el ensayo de reversión (hallazgo H1).
- Ningún cambio funcional se realizó directamente en `main`.
- No se usó `git push --force` en ningún experimento de este piloto.
- La regularización documental posterior al merge de PR #9 quedó registrada en el commit `76918ec` (previo a este informe).

### Pruebas

- EXP-005 (modo normal): 12 PASS, 0 FAIL, 2 no ejecutados.
- EXP-006: check de GitHub Actions verificado en verde, rojo y verde nuevamente (ejecución inicial, prueba roja controlada, recuperación).
- EXP-007: `T007-01` a `T007-09`: 9/9 PASS. Regresión `T005-01` a `T005-10`: 10/10 PASS, sin cambios respecto a la línea base de EXP-005. Suite completa tras implementar: 21/23 PASS, 0 FAIL, 2 NO EJECUTADOS (controles no aplicables en modo normal).

### Evaluaciones

| Experimento | Puntaje | Evaluación formal por rúbrica |
|---|---:|---|
| EXP-005 | N/A | No (excepción documental) |
| EXP-006 | N/A | No (excepción documental) |
| EXP-007 | 44/50 | Sí (`experiments/EXP-007-evaluation.md`) |

### Tablero de resultados

`docs/results-dashboard.md` fue completado el 18 de julio de 2026, como parte de la regularización documental, cubriendo EXP-001 a EXP-007. No se actualizó al cierre de cada experimento individual de PILOT-002; ver Ajuste H (sección 14).

## 8. Capacidades validadas

Respecto a la lista de capacidades "aún no validadas" de `docs/WORKFLOW-METHODOLOGY-v2.md` §16:

| Capacidad | Estado tras PILOT-002 |
|---|---|
| Integración continua | Validada (EXP-006) |
| Revisión técnica independiente | Validada en su sustancia (EXP-007, hallazgos H1–H3), con la salvedad de que su artefacto documental se generó de forma tardía (ver sección 12) |
| Nivel de control alto | Validado (EXP-007, 44/50, umbral y mínimos cumplidos) |
| Ruta exploratoria | No validada |
| Nivel crítico o regulado | No validado (explícitamente fuera de alcance, `PROJECT_CHARTER.md` §7) |
| Múltiples agentes | No validada |
| Arquitectura, dependencias, bases de datos, despliegues, seguridad | No validadas |
| Equipos con varios desarrolladores | No validada |
| Aislamiento de pruebas bajo HTTP | Validado (EXP-005) |

## 9. Fortalezas observadas

- Control del proceso mediante gates y restricciones explícitas, confirmado en el esquema de 6 gates de EXP-007.
- Trazabilidad respaldada por commits, registros de sesión, fichas y evaluaciones cuando estos artefactos existieron (EXP-007).
- Manejo de reversión trazable mediante `git revert`, sin reescritura de historial, ensayado en rama desechable (EXP-007, hallazgo H1).
- La integración continua (GitHub Actions) detecta correctamente una expectativa incorrecta y produce un check en rojo, y se recupera al corregirla (EXP-006).
- El aislamiento de pruebas bajo HTTP evita que un fallo o una excepción en un caso detenga los casos posteriores (EXP-005).

## 10. Debilidades y problemas detectados

- **Ausencia de paquete operativo formal de PILOT-002**: exigido por `docs/WORKFLOW-METHODOLOGY-v2.md` §18, nunca redactado ni aprobado antes de iniciar EXP-005. Ver sección 2 y Ajuste E.
- EXP-005 y EXP-006 se ejecutaron sin entrada en `docs/task-bank.md`, sin ficha formal, sin registro de sesión y sin evaluación mediante rúbrica.
- La revisión técnica independiente y la evaluación mediante rúbrica de EXP-007 no se registraron como artefactos separados en el momento en que se realizaron, sino mediante una regularización documental posterior al merge del pull request #9.
- Gate 0 y Gate 2 de EXP-007 quedaron registrados en un único commit (`06adeb7`) en lugar de en commits separados por gate (hallazgo H2), apartándose de `docs/execution-protocol.md` §14 y `docs/WORKFLOW-METHODOLOGY-v2.md` (principio 6 y §13).
- `docs/results-dashboard.md` permaneció como plantilla vacía durante toda la ejecución de PILOT-002 y solo se completó al final, no al cierre de cada experimento.
- La aprobación humana explícita del merge de EXP-007 (Gate 5) ocurrió fuera de este repositorio, dentro de la sesión operativa del workflow; el repositorio solo conserva evidencia de que la integración se ejecutó (commit `ac3a479`, pull request #9), no un registro directo de la aprobación en sí.
- En EXP-007, el ensayo de reversión se realizó sobre una rama desechable y no sobre la rama real de la implementación (limita la puntuación de reversión a 4/5 en vez de 5/5).
- Limitación heredada de PILOT-001, aún sin resolver: la aplicación sigue aceptando JSON válido cuyo resultado no sea un array (`docs/PILOT-001-closure-report.md` §8.5).

## 11. Hallazgos metodológicos

### 11.1. Los vacíos documentales solo se detectan al intentar cerrar el piloto

EXP-005, EXP-006 y la revisión/evaluación de EXP-007 evidenciaron que omitir los artefactos documentales exigidos en el momento del experimento genera vacíos que solo se hacen visibles al preparar el cierre formal, cuando ya no pueden completarse sin volverse una reconstrucción retroactiva.

### 11.2. La evidencia de ejecución no equivale a evidencia de aprobación

El commit de merge `ac3a479` y el pull request #9 fusionado demuestran que la integración de EXP-007 se ejecutó, pero no documentan por sí solos que la aprobación humana explícita haya ocurrido; esa aprobación tuvo lugar fuera del repositorio, dentro de la sesión operativa del workflow. Esta distinción debe mantenerse expresamente en informes futuros para no presentar un hecho de ejecución como si fuera, además, la evidencia documental de una decisión.

### 11.3. Las excepciones necesitan una regla explícita para no repetirse

Aceptar una excepción documental (EXP-005, EXP-006) sin fijar una regla explícita sobre su no repetición deja abierta la posibilidad de que se normalice. `docs/decisions.md` (Decisión 1 y 2) corrige esto para PILOT-003.

### 11.4. Los gates deben cerrarse en commits separados salvo excepción aprobada

El hallazgo H2 de EXP-007 mostró que, sin una regla explícita, la documentación previa y la implementación pueden mezclarse en un único commit, reduciendo la trazabilidad commit a commit entre gates.

## 12. Excepciones documentales aceptadas

| Excepción | Descripción | Aceptada por | Fuente |
|---|---|---|---|
| EXP-005 sin artefactos completos | Ejecutado sin entrada en `docs/task-bank.md`, ficha, registro de sesión ni evaluación por rúbrica | Hugo Cornejo Villena | Decisión 1, `docs/decisions.md` |
| EXP-006 sin artefactos completos | Ejecutado sin entrada en `docs/task-bank.md`, ficha, registro de sesión ni evaluación por rúbrica | Hugo Cornejo Villena | Decisión 1, `docs/decisions.md` |
| EXP-007 — H2, Gate 0 y Gate 2 en un único commit | Documentación previa e implementación registradas en el commit `06adeb7` en lugar de en commits separados por gate; no se reescribió el historial para simular una separación que no ocurrió | Hugo Cornejo Villena | `experiments/EXP-007-session-log.md` §9; `experiments/EXP-007-independent-review.md` §4 |
| EXP-007 — regularización documental posterior | Revisión técnica independiente y evaluación por rúbrica registradas como artefactos separados el 18 de julio de 2026, con posterioridad al merge del pull request #9, reconstruyendo fielmente lo efectivamente realizado sin fijar una fecha original no documentada | Hugo Cornejo Villena | `experiments/EXP-007-independent-review.md`, `experiments/EXP-007-evaluation.md` |
| Ausencia de paquete operativo formal de PILOT-002 | No se preparó ni aprobó el paquete operativo exigido por `docs/WORKFLOW-METHODOLOGY-v2.md` §18 antes de iniciar el piloto; no se reconstruye retroactivamente | Hugo Cornejo Villena | Decisión 4, `docs/decisions.md` |

Todas estas excepciones quedan expresamente declaradas como **no repetibles en PILOT-003** (Decisión 1 y 2, `docs/decisions.md`; Ajustes E a J, sección 14).

## 13. Deudas pendientes

- Crear entradas retroactivas en `docs/task-bank.md` para EXP-005 y EXP-006 **no corresponde**; en su lugar, la deuda es asegurar que experimentos equivalentes en ciclos futuros sí las tengan desde el inicio (Ajuste F).
- Definir un puntaje de intervención humana para EXP-007 queda pendiente; no fue especificado por el responsable junto con los diez criterios principales de la rúbrica.
- El mensaje de error de guardado rechazado en la edición inline de EXP-007 no distingue si el problema es el título, la fecha, o ambos (limitación registrada, no bloqueante).
- El descarte silencioso del borrador de edición al iniciar la edición de una segunda tarea, sin advertencia al usuario, permanece como comportamiento no señalizado (EXP-007).
- La verificación manual se realizó y fue aprobada durante la sesión operativa, pero sus capturas no quedaron archivadas como artefactos dentro del repositorio.
- La aplicación continúa aceptando JSON válido cuyo resultado no sea un array (deuda heredada de PILOT-001, aún no atendida).
- `docs/results-dashboard.md` requiere actualizarse al cierre de cada experimento futuro, no solo al final del piloto (Ajuste H).

## 14. Ajustes obligatorios al workflow

Se formalizan los siguientes ajustes, de cumplimiento obligatorio desde PILOT-003:

### Ajuste E — Paquete operativo aprobado antes de comenzar

Todo piloto debe tener su paquete operativo formal (objetivo, capacidades a validar, banco de tareas, criterios de aceptación, rúbrica, protocolo de pruebas, configuración de CI, funciones de implementación y revisión) redactado y aprobado **antes** de ejecutar su primer experimento. PILOT-002 se ejecutó sin este paquete (sección 2, sección 10); esto no podrá repetirse.

### Ajuste F — Artefactos mínimos por experimento

Todo experimento debe tener: entrada en `docs/task-bank.md`, ficha formal, registro de sesión y evaluación por rúbrica. Ver Decisión 2, `docs/decisions.md`.

### Ajuste G — Informe de revisión independiente como artefacto separado antes del merge

Cuando el nivel de control exija revisión independiente, el informe de revisión debe existir como artefacto separado **antes** del merge, no reconstruirse después. EXP-007 no cumplió este ajuste (sección 6, sección 10); queda formalizado para que no se repita.

### Ajuste H — Actualización del tablero al cierre de cada experimento

`docs/results-dashboard.md` debe actualizarse al cierre de cada experimento, no solo al final del piloto. Permaneció vacío durante toda la ejecución de PILOT-002.

### Ajuste I — Cierre secuencial de gates, sin mezclar commits

Los gates documentales deben cerrarse antes de avanzar al gate siguiente; no deben mezclarse en un único commit, salvo excepción aprobada y registrada explícitamente conforme a `docs/WORKFLOW-METHODOLOGY-v2.md` §15. El hallazgo H2 de EXP-007 (sección 12) es el precedente que motiva este ajuste.

### Ajuste J — Prohibición de reconstrucción retroactiva simulada

Ningún piloto futuro podrá reconstruir retroactivamente artefactos para simular que existieron en un momento en que no existían. Los vacíos deberán registrarse como excepciones reales, con su fecha real de creación y sin atribuir fechas originales no documentadas. Ver Decisión 4, `docs/decisions.md`, y el tratamiento de fechas en `experiments/EXP-007-independent-review.md` §0-§1.

## 15. Decisión final del piloto

**PILOT-002 APROBADO CON AJUSTES**

El piloto validó integración continua, revisión técnica independiente (en su sustancia) y nivel de control alto sobre un cambio funcional real, integrado a `main`. La aprobación queda condicionada a la formalización de los Ajustes E a J (sección 14) y al cumplimiento de las condiciones de la sección 16 antes de iniciar PILOT-003.

## 16. Condiciones obligatorias antes de PILOT-003

- Paquete operativo formal aprobado.
- Tareas del banco seleccionadas o creadas.
- Criterios de aceptación definidos.
- Rúbricas preparadas.
- Protocolo de revisión independiente preparado cuando corresponda.
- Dashboard inicializado.
- Decisiones y excepciones actualizadas.
- Estrategia de ramas, commits, CI y reversión definida.

Ninguna de estas condiciones se da por cumplida mediante este informe; deberán prepararse y aprobarse por separado antes de declarar iniciado PILOT-003.

## 17. Estado final por experimento

- EXP-005: cerrado, aprobado, excepción documental aceptada (sin ficha, sesión ni evaluación).
- EXP-006: cerrado, aprobado, excepción documental aceptada (sin ficha, sesión ni evaluación).
- EXP-007: cerrado, aprobado (44/50), Gates 0 a 5 superados, integrado a `main` mediante pull request #9 (commit `ac3a479`); hallazgos H1 y H3 resueltos, H2 aceptado como excepción documentada.
- PILOT-002: aprobado con ajustes.
- Siguiente hito: preparación y aprobación del paquete operativo formal de PILOT-003, conforme a los Ajustes E a J y a las condiciones de la sección 16.

## 18. Próxima etapa recomendada

Preparar el paquete operativo formal de PILOT-003 (Ajuste E), incorporando explícitamente los Ajustes F a J y las condiciones de la sección 16, antes de seleccionar o ejecutar cualquier experimento de PILOT-003.

Este informe **no declara iniciado PILOT-003**. El inicio de PILOT-003 requiere una aprobación separada, posterior a la preparación del paquete operativo formal exigido por el Ajuste E.
