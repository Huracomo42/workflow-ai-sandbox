# Registro de sesión — EXP-001

## 1. Identificación

- ID de sesión: EXP-001-S01
- Fecha: 17 de julio de 2026
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Rama: `experiment/EXP-001-create-minimal-app`
- Commit inicial: `65cd9d9bc2826539243a7ed4c4acfcd6d73b0b10`
- Herramienta de ejecución: Claude Code
- Modelo utilizado: Claude Sonnet 5 (claude-sonnet-5)

## 2. Clasificación

- Tarea: TB-01
- Ruta: estándar
- Nivel de control: medio
- Componente evaluado: workflow base
- Estado de la sesión: pull request creado, pendiente de revisión final

## 3. Objetivo

Crear una aplicación local mínima de gestión de tareas siguiendo las reglas de `EXP-001`.

## 4. Estado inicial

- Aplicación existente: ninguna
- Código funcional: ninguno
- Dependencias: ninguna
- Pruebas: ninguna
- Rama creada desde el commit aprobado
- `main` permanece sin cambios

## 5. Instrucción proporcionada a Claude Code

Se solicitó primero un plan (sin modificar archivos) para crear una aplicación local mínima de gestión de tareas, conforme a `experiments/EXP-001-TB-01.md`: crear tarea, listar tareas, marcar como completada, persistencia mediante `localStorage`, sin frameworks, backend, base de datos externa ni servicios externos.

Tras la primera propuesta de plan, el responsable humano introdujo dos correcciones obligatorias:

1. Eliminar de `tests.html` cualquier prueba o implementación de validación de título vacío, por pertenecer a `TB-03` y quedar fuera del alcance de `EXP-001`.
2. Ejecutar únicamente `git rev-parse HEAD` antes de implementar, y usar ese hash como punto de restauración operativo (en lugar del commit de `main` previo a la rama), y acotar `tests.html` a exactamente cinco comprobaciones: creación, visualización, marcado como completada, persistencia mediante `localStorage` y ausencia de dependencias externas.

Tras la aprobación del plan corregido, se autorizó la implementación bajo estas condiciones: trabajar únicamente en `experiment/EXP-001-create-minimal-app`; crear o modificar solo `app.js`, `index.html`, `styles.css`, `tests.html`, `README.md` y `experiments/EXP-001-session-log.md`; no añadir dependencias, frameworks, backend, base de datos externa ni servicios externos; no modificar `PROJECT_CHARTER.md` ni archivos dentro de `docs/`; ejecutar las pruebas definidas; conservar evidencia verificable; detenerse ante cualquier necesidad de ampliar el alcance; no hacer merge a `main`.

## 6. Plan propuesto por Claude Code

Plan corregido y aprobado:

- Punto de restauración operativo confirmado mediante `git rev-parse HEAD`: `15014a62981e1dd3558b3c7fb48761a9e3fbc105`.
- Archivos a crear: `app.js` (lógica de creación, listado, completado y persistencia en `localStorage`, sin validación de título vacío), `index.html` (estructura y formulario), `styles.css` (estilos mínimos), `tests.html` (cinco pruebas: creación, visualización, marcado como completada, persistencia, ausencia de dependencias externas).
- Archivo a modificar: `README.md` (instrucciones de instalación y uso).
- Orden de implementación: `app.js` → `index.html` → `styles.css` → `tests.html` → `README.md`.
- Verificación: ejecutar `tests.html` en un navegador y confirmar PASS en los cinco casos; revisar `git status`/`git diff` para confirmar ausencia de dependencias y de cambios fuera de alcance.
- Reversión: `git reset --hard 15014a62981e1dd3558b3c7fb48761a9e3fbc105` dentro de la rama, o eliminar la rama y volver a `main`.

## 7. Acciones realizadas

| N.º | Acción | Herramienta | Resultado |
|---|---|---|---|
| 1 | Crear la definición de EXP-001 | GitHub | Completado |
| 2 | Crear la rama del experimento | GitHub | Completado |
| 3 | Crear el registro de sesión | GitHub | Completado |
| 4 | Presentar plan inicial (sin modificar archivos) | Claude Code | Completado |
| 5 | Corregir el plan según indicaciones del responsable | Claude Code | Completado |
| 6 | Registrar punto de restauración con `git rev-parse HEAD` | Claude Code | Completado |
| 7 | Crear `app.js`, `index.html`, `styles.css`, `tests.html` | Claude Code | Completado |
| 8 | Ejecutar `tests.html` en Microsoft Edge en modo headless (`--dump-dom`) | Claude Code | Completado |
| 9 | Verificar carga de `index.html` en modo headless | Claude Code | Completado |
| 10 | Actualizar `README.md` con instrucciones de uso | Claude Code | Completado |
| 11 | Actualizar el registro de sesión con evidencia | Claude Code | Completado |

## 8. Cambios efectuados

- Archivos creados: `app.js`, `index.html`, `styles.css`, `tests.html`
- Archivos modificados: `README.md`, `experiments/EXP-001-session-log.md`
- Archivos eliminados: ninguno
- Dependencias añadidas: ninguna

## 9. Evidencias

- Commit inicial de la rama: `65cd9d9bc2826539243a7ed4c4acfcd6d73b0b10`
- Punto de restauración operativo de EXP-001: `15014a62981e1dd3558b3c7fb48761a9e3fbc105`
- Rama: `experiment/EXP-001-create-minimal-app`
- Pruebas ejecutadas: `tests.html` mediante `msedge --headless --dump-dom`. Resultado — 5/5 PASS:
  - PASS - Creación de una tarea
  - PASS - Visualización de la tarea creada
  - PASS - Marcado como completada
  - PASS - Persistencia mediante localStorage
  - PASS - Ausencia de dependencias externas
- `index.html` verificado en modo headless: el formulario (`task-form`, `task-title`) y la lista (`task-list`) se cargan correctamente.
- Verificación de alcance: `git status` confirma que solo se crearon/modificaron los archivos autorizados; no se añadieron dependencias, `package.json`, ni referencias a scripts o recursos externos.
- Pull request: https://github.com/Huracomo42/workflow-ai-sandbox/pull/1

## 10. Problemas encontrados

Ninguno. No fue necesario ampliar el alcance ni tomar decisiones técnicas no previstas en el plan aprobado.

Limitación registrada: la prueba automática de ausencia de dependencias externas inspecciona `tests.html`. La ausencia de referencias externas en `index.html` fue confirmada mediante revisión del archivo, no mediante esa prueba automática.

## 11. Intervención humana

El responsable aprobó el experimento, corrigió el plan inicial en dos puntos (alcance de `tests.html` y método de registro del punto de restauración) y autorizó la implementación con condiciones explícitas de alcance, commits y no integración a `main`.

## 12. Reversión

- Punto de restauración: commit `15014a62981e1dd3558b3c7fb48761a9e3fbc105`
- Método: `git reset --hard 15014a62981e1dd3558b3c7fb48761a9e3fbc105` dentro de la rama, o eliminar la rama `experiment/EXP-001-create-minimal-app` y regresar a `main`
- Reversión ejecutada: no; no corresponde en esta etapa (no hubo fallo grave ni regla de bloqueo)

## 13. Evaluación preliminar

40/50, aprobado

## 14. Decisión

aprobado

## 15. Próximo paso

Revisión final del pull request y decisión de merge hacia main.
