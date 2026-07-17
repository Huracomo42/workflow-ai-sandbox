# Registro de sesión — EXP-003

## 1. Identificación

- ID de sesión: EXP-003-S01
- Fecha: 17 de julio de 2026
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Rama: `experiment/EXP-003-optional-due-date`
- Commit inicial: `a203ff61ead3c16f7c8ac831e2caaaaa46c124f8`
- Herramienta de ejecución: Claude Code
- Modelo utilizado: Claude Sonnet 5 (claude-sonnet-5)

## 2. Clasificación

- Tarea: TB-02
- Ruta: ligera
- Nivel de control: bajo
- Componente evaluado: workflow base
- Estado de la sesión: evaluación completada, pendiente de pull request

## 3. Objetivo

Añadir una fecha límite opcional a cada tarea, preservando la creación, validación, listado, completado y persistencia existentes.

## 4. Estado inicial

- EXP-001 está integrado en `main`.
- EXP-002 está integrado en `main`.
- La creación de tareas válidas funciona.
- La validación de título vacío funciona.
- El listado de tareas funciona.
- El marcado como completada funciona.
- La persistencia mediante `localStorage` funciona.
- Las tareas actuales no contienen una propiedad de fecha límite.
- No existen cambios pendientes en la rama.

## 5. Instrucción proporcionada a Claude Code

Se solicitó primero un plan (sin modificar archivos) para añadir una fecha límite opcional a las tareas, conforme a `experiments/EXP-003-TB-02.md`: campo `<input type="date">` opcional, almacenamiento en formato `YYYY-MM-DD`, cadena vacía cuando no se proporcione, visualización `Fecha límite: DD/MM/YYYY` solo cuando exista, compatibilidad con tareas antiguas sin la propiedad `dueDate`, y preservación de la creación, validación de título, listado, completado y persistencia existentes. Sin frameworks, paquetes, backend ni servicios externos, sin edición/eliminación de tareas, sin filtros, recordatorios, hora límite ni calendarios externos.

El responsable humano condicionó la aprobación del plan a registrar el punto de restauración operativo mediante `git rev-parse HEAD`, y luego autorizó la implementación con estas condiciones adicionales: implementar `createTask(title, dueDate)` con fecha opcional; mejorar la prueba de dependencias externas de EXP-002 para que inspeccione `index.html` directamente (con técnica local, registrando cualquier limitación real si no puede automatizarse completamente); las pruebas debían verificar comportamiento real (`renderTasks()`, tarea legacy sin `dueDate`, relectura de `localStorage`) y no solo funciones aisladas; ejecutar las pruebas en Microsoft Edge headless y conservar el resultado exacto; verificar `git status`, `git diff --stat main..HEAD`, ausencia de archivos fuera de alcance y de dependencias; commits separados por implementación, pruebas y documentación; push a la rama remota; sin pull request ni merge.

## 6. Plan propuesto por Claude Code

Plan corregido y aprobado:

- Punto de restauración operativo confirmado mediante `git rev-parse HEAD`: `d143af89a9c21841b3249dba9f06614b54b22522`.
- `app.js`: añadir `isValidDueDate(dueDate)`, `formatDueDate(dueDate)` (conversión textual `YYYY-MM-DD` → `DD/MM/YYYY` sin usar `Date`); `createTask(title, dueDate)` añade `dueDate: isValidDueDate(dueDate) ? dueDate : ''` a la tarea; `renderTasks` construye un contenedor `.task-info` con el título y, solo si `task.dueDate || ''` no está vacío, un `<span class="due-date">`; el listener de `submit` lee `#task-due-date` y lo limpia tras crear una tarea válida.
- `index.html`: añadir `<input type="date" id="task-due-date">` en el formulario.
- `styles.css`: añadir `.task-info` y `.due-date`.
- `tests.html`: sustituir las 8 pruebas de EXP-002 por las 9 pruebas obligatorias de EXP-003, con la prueba de dependencias externas verificando `index.html` mediante un `<iframe>` local (con respaldo documentado si el navegador bloquea el acceso al documento del iframe).
- `README.md`: actualizar "Uso" y "Pruebas".
- Orden de implementación: `app.js` → `index.html` → `styles.css` → `tests.html` → `README.md`.
- Reversión: `git reset --hard d143af89a9c21841b3249dba9f06614b54b22522` dentro de la rama, o eliminar la rama y volver a `main`.

## 7. Acciones realizadas

| N.º | Acción | Herramienta | Resultado |
|---|---|---|---|
| 1 | Crear la definición de EXP-003 | GitHub y Git | Completado |
| 2 | Crear la rama del experimento | Git | Completado |
| 3 | Crear el registro de sesión | Git | Completado |
| 4 | Presentar plan inicial (sin modificar archivos) | Claude Code | Completado |
| 5 | Corregir el plan según indicación del responsable (punto de restauración) | Claude Code | Completado |
| 6 | Registrar punto de restauración con `git rev-parse HEAD` | Claude Code | Completado |
| 7 | Implementar fecha límite opcional en `app.js`, `index.html`, `styles.css` | Claude Code | Completado |
| 8 | Reescribir `tests.html` con las 9 pruebas obligatorias, incluyendo verificación directa de `index.html` | Claude Code | Completado |
| 9 | Ejecutar `tests.html` en Microsoft Edge headless (`--dump-dom`) | Claude Code | Completado |
| 10 | Verificar carga de `index.html` en modo headless | Claude Code | Completado |
| 11 | Actualizar `README.md` | Claude Code | Completado |
| 12 | Verificar `git status` y `git diff --stat main..HEAD` para confirmar alcance | Claude Code | Completado |
| 13 | Actualizar el registro de sesión con evidencia | Claude Code | Completado |

## 8. Cambios efectuados

- Archivos creados: ninguno (este registro ya existía)
- Archivos modificados: `app.js`, `index.html`, `styles.css`, `tests.html`, `README.md`, `experiments/EXP-003-session-log.md`
- Archivos eliminados: ninguno
- Dependencias añadidas: ninguna

## 9. Evidencias

- Commit inicial de la rama: `a203ff61ead3c16f7c8ac831e2caaaaa46c124f8`
- Punto de restauración operativo de EXP-003: `d143af89a9c21841b3249dba9f06614b54b22522`
- Rama: `experiment/EXP-003-optional-due-date`
- Pruebas ejecutadas: `tests.html` mediante `msedge --headless --dump-dom`. Resultado — 9/9 PASS:
  - PASS - Una tarea sin fecha límite se crea y muestra
  - PASS - Una tarea con fecha límite guarda YYYY-MM-DD
  - PASS - La fecha límite se muestra en DD/MM/YYYY
  - PASS - Una tarea sin fecha límite no muestra texto de fecha
  - PASS - Una tarea antigua sin propiedad de fecha sigue cargándose
  - PASS - La validación de título vacío sigue funcionando
  - PASS - Marcar una tarea como completada sigue funcionando
  - PASS - La fecha límite persiste en localStorage
  - PASS - No se añadieron dependencias externas (index.html) — con nota de limitación (ver sección 10)
- `index.html` verificado en modo headless: `#task-due-date`, `#task-error` y `#task-list` se cargan correctamente.
- Verificación de alcance: `git status` y `git diff --stat main..HEAD` confirman que solo se modificaron los archivos autorizados; no se crearon ni modificaron `PROJECT_CHARTER.md`, archivos de `docs/` ni `EXP-003-TB-02.md`; no se añadieron dependencias.
- Pull request: todavía no creado

## 10. Problemas encontrados

Ninguno que impidiera cumplir el objetivo. No fue necesario ampliar el alcance ni tomar decisiones técnicas no previstas en el plan aprobado.

Limitación registrada: la prueba 9 intentó verificar la ausencia de dependencias externas directamente sobre `index.html` mediante un `<iframe>` local. El navegador bloqueó el acceso a `contentDocument` del iframe por política de origen cruzado bajo `file://` (mensaje real: "Blocked a frame with origin 'null' from accessing a cross-origin frame"). La prueba capturó ese error y usó como respaldo la inspección de `tests.html`, dejando registrado el mensaje exacto de la limitación en el resultado de la prueba. La ausencia de referencias externas en `index.html` fue confirmada adicionalmente mediante revisión manual del archivo.

## 11. Intervención humana

El responsable aprobó el experimento y el plan, condicionó la aprobación a registrar el punto de restauración mediante `git rev-parse HEAD`, y autorizó la implementación con condiciones explícitas sobre la firma de `createTask`, la mejora de la prueba de dependencias, la verificación de comportamiento real, los commits separados y la no integración a `main`.

## 12. Reversión

- Punto de restauración: commit `d143af89a9c21841b3249dba9f06614b54b22522`
- Método: `git reset --hard d143af89a9c21841b3249dba9f06614b54b22522` dentro de la rama, o eliminar la rama `experiment/EXP-003-optional-due-date` y regresar a `main`
- Reversión ejecutada: no; no corresponde en esta etapa (no hubo fallo grave ni regla de bloqueo)

## 13. Evaluación preliminar

48/50, aprobado

## 14. Decisión

aprobado

## 15. Próximo paso

crear pull request hacia main