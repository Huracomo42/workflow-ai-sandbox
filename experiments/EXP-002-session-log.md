# Registro de sesión — EXP-002

## 1. Identificación

- ID de sesión: EXP-002-S01
- Fecha: 17 de julio de 2026
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Rama: `experiment/EXP-002-validate-task-title`
- Commit inicial: `8fa6a6ce5bc7cd2082ece6cb5f3601c784bc069a`
- Herramienta de ejecución: Claude Code
- Modelo utilizado: Claude Sonnet 5 (claude-sonnet-5)

## 2. Clasificación

- Tarea: TB-03
- Ruta: ligera
- Nivel de control: medio
- Componente evaluado: workflow base
- Estado de la sesión: pull request creado, pendiente de revisión final

## 3. Objetivo

Impedir la creación de tareas sin título o con un título compuesto únicamente por espacios.

## 4. Estado inicial

- La aplicación de EXP-001 está integrada en `main`.
- La creación de tareas válidas funciona.
- El listado de tareas funciona.
- El marcado como completada funciona.
- La persistencia mediante `localStorage` funciona.
- Actualmente se pueden crear tareas con título vacío.
- No existen cambios pendientes en la rama.

## 5. Instrucción proporcionada a Claude Code

Se solicitó primero un plan (sin modificar archivos) para implementar la validación de título obligatorio definida en `experiments/EXP-002-TB-03.md`: rechazar títulos vacíos o compuestos únicamente por espacios (usando `trim()`), mostrar el mensaje "Escribe un título para la tarea.", ocultarlo al crear una tarea válida, y preservar la creación, listado, completado y persistencia de tareas válidas. Sin frameworks, paquetes, backend ni servicios externos.

El responsable humano condicionó la aprobación del plan a registrar el punto de restauración operativo mediante `git rev-parse HEAD` (en lugar de un commit fijado de antemano), y luego autorizó la implementación bajo estas condiciones: trabajar únicamente en `experiment/EXP-002-validate-task-title`; modificar solo `app.js`, `index.html`, `styles.css`, `tests.html`, `README.md` y `experiments/EXP-002-session-log.md`; no crear ni modificar `PROJECT_CHARTER.md` ni archivos de `docs/`; no añadir dependencias ni funcionalidades fuera de TB-03; implementar exactamente las ocho pruebas obligatorias; ejecutar las pruebas en Microsoft Edge headless y conservar evidencia; hacer commits separados por implementación, pruebas y documentación; hacer push a la rama remota; no abrir pull request ni hacer merge.

## 6. Plan propuesto por Claude Code

Plan corregido y aprobado:

- Punto de restauración operativo confirmado mediante `git rev-parse HEAD`: `7ea291d187fe0f7b933a9960177e692b08519be4`.
- `app.js`: añadir `TASK_TITLE_ERROR_MESSAGE`, `isValidTitle(title)` (válido si, tras `trim()`, tiene longitud mayor que 0), `createTask()` devuelve `null` si el título es inválido, `showTitleError(el)`/`hideTitleError(el)`; actualizar el listener de `submit` para mostrar/ocultar el mensaje según corresponda.
- `index.html`: añadir `<p id="task-error" class="error-message" hidden></p>` entre el formulario y la lista.
- `styles.css`: añadir regla `.error-message` para el color del mensaje.
- `tests.html`: sustituir las 5 pruebas de EXP-001 por las 8 pruebas obligatorias de EXP-002.
- `README.md`: actualizar "Uso" y "Pruebas" con el nuevo comportamiento.
- Orden de implementación: `app.js` → `index.html` → `styles.css` → `tests.html` → `README.md`.
- Verificación: ejecutar `tests.html` en Microsoft Edge headless (`--dump-dom`) y confirmar PASS en los 8 casos; revisar `git status` para confirmar ausencia de cambios fuera de alcance.
- Reversión: `git reset --hard 7ea291d187fe0f7b933a9960177e692b08519be4` dentro de la rama, o eliminar la rama y volver a `main`.

## 7. Acciones realizadas

| N.º | Acción | Herramienta | Resultado |
|---|---|---|---|
| 1 | Crear la definición de EXP-002 | GitHub y Git | Completado |
| 2 | Crear la rama del experimento | Git | Completado |
| 3 | Crear el registro de sesión | Git | Completado |
| 4 | Presentar plan inicial (sin modificar archivos) | Claude Code | Completado |
| 5 | Corregir el plan según indicación del responsable (punto de restauración) | Claude Code | Completado |
| 6 | Registrar punto de restauración con `git rev-parse HEAD` | Claude Code | Completado |
| 7 | Implementar validación de título en `app.js`, `index.html`, `styles.css` | Claude Code | Completado |
| 8 | Reescribir `tests.html` con las 8 pruebas obligatorias | Claude Code | Completado |
| 9 | Ejecutar `tests.html` en Microsoft Edge headless (`--dump-dom`) | Claude Code | Completado |
| 10 | Verificar carga de `index.html` en modo headless | Claude Code | Completado |
| 11 | Actualizar `README.md` | Claude Code | Completado |
| 12 | Actualizar el registro de sesión con evidencia | Claude Code | Completado |

## 8. Cambios efectuados

- Archivos creados: ninguno (excepto este registro, ya existente)
- Archivos modificados: `app.js`, `index.html`, `styles.css`, `tests.html`, `README.md`, `experiments/EXP-002-session-log.md`
- Archivos eliminados: ninguno
- Dependencias añadidas: ninguna

## 9. Evidencias

- Commit inicial de la rama: `8fa6a6ce5bc7cd2082ece6cb5f3601c784bc069a`
- Punto de restauración operativo de EXP-002: `7ea291d187fe0f7b933a9960177e692b08519be4`
- Rama: `experiment/EXP-002-validate-task-title`
- Pruebas ejecutadas: `tests.html` mediante `msedge --headless --dump-dom`. Resultado — 8/8 PASS:
  - PASS - Un título válido crea y muestra una tarea
  - PASS - Un título vacío no crea ni guarda una tarea
  - PASS - Un título de solo espacios no crea ni guarda una tarea
  - PASS - Se muestra el mensaje de error esperado
  - PASS - Una tarea válida oculta el mensaje de error
  - PASS - Marcar una tarea como completada sigue funcionando
  - PASS - La persistencia mediante localStorage sigue funcionando
  - PASS - No se añadieron dependencias externas
- `index.html` verificado en modo headless: el elemento `#task-error` se renderiza oculto (`hidden=""`) por defecto, junto con `#task-form` y `#task-list`.
- Verificación de alcance: `git status` confirma que solo se modificaron los archivos autorizados; no se crearon ni modificaron `PROJECT_CHARTER.md` ni archivos de `docs/`; no se añadieron dependencias.
- Pull request: https://github.com/Huracomo42/workflow-ai-sandbox/pull/2

## 10. Problemas encontrados

Ninguno. No fue necesario ampliar el alcance ni tomar decisiones técnicas no previstas en el plan aprobado.

Limitación registrada: igual que en EXP-001, la prueba de ausencia de dependencias externas inspecciona el propio documento (`tests.html`), no `index.html` directamente; la ausencia de referencias externas en `index.html` se confirmó mediante revisión del archivo.

## 11. Intervención humana

El responsable aprobó el experimento y el plan, condicionó la aprobación a registrar el punto de restauración mediante `git rev-parse HEAD` en lugar de un commit predefinido, y autorizó la implementación con condiciones explícitas de alcance, commits separados y no integración a `main`.

## 12. Reversión

- Punto de restauración: commit `7ea291d187fe0f7b933a9960177e692b08519be4`
- Método: `git reset --hard 7ea291d187fe0f7b933a9960177e692b08519be4` dentro de la rama, o eliminar la rama `experiment/EXP-002-validate-task-title` y regresar a `main`
- Reversión ejecutada: no; no corresponde en esta etapa (no hubo fallo grave ni regla de bloqueo)

## 13. Evaluación preliminar

45/50, aprobado

## 14. Decisión

aprobado

## 15. Próximo paso

Revisión final del pull request y decisión de merge hacia main.