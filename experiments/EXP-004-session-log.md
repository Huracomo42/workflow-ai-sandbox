# Registro de sesión — EXP-004

## 1. Identificación

- ID de sesión: EXP-004-S01
- Fecha: 17 de julio de 2026
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Rama: `incident/EXP-004-corrupt-localstorage`
- Commit inicial: `7e580e65432724c269cc77afaa4c4427371c90e6`
- Herramienta de ejecución: Claude Code
- Modelo utilizado: Claude Sonnet 5 (claude-sonnet-5)

## 2. Clasificación

- Caso: INC-01
- Ruta: incidente
- Nivel de control: medio
- Componente evaluado: diagnóstico y recuperación
- Estado de la sesión: implementación completada, pendiente de evaluación

## 3. Objetivo

Diagnosticar y corregir el fallo producido cuando la clave `tasks` de `localStorage` contiene un JSON inválido.

## 4. Estado inicial

- EXP-001 está integrado en `main`.
- EXP-002 está integrado en `main`.
- EXP-003 está integrado en `main`.
- La aplicación crea, lista y completa tareas.
- La validación de título vacío funciona.
- La fecha límite opcional funciona.
- La persistencia usa la clave `tasks` en `localStorage`.
- `loadTasks()` ejecuta `JSON.parse()` sin control de errores.
- No existen cambios pendientes en la rama.

## 5. Evidencia de reproducción

Reproducido sin modificar código, ejecutando el `app.js` real (commit `a2d2edd7934a30c22867ae641216e3c4b5d1ee65`) en Microsoft Edge headless mediante un script de reproducción ubicado fuera del repositorio, que cargó `app.js` en modo lectura vía `file://` y ejecutó exactamente:

```javascript
localStorage.setItem('tasks', '{datos-corruptos');
loadTasks();
```

Resultado observado (antes de la corrección):

```
localStorage.tasks (antes de loadTasks) = {datos-corruptos
EXCEPCION_LANZADA: true
ERROR_NAME: SyntaxError
ERROR_MESSAGE: Expected property name or '}' in JSON at position 1 (line 1 column 2)
ERROR_STACK: SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
    at JSON.parse (<anonymous>)
    at loadTasks (file:///C:/Users/hcornejo/workflow-ai-sandbox/app.js:6:21)
localStorage.tasks (después del intento) = {datos-corruptos
```

Se confirmó que, antes de la corrección, `localStorage` conservaba el contenido corrupto (sin recuperación) y que la excepción se propagaba sin control.

## 6. Diagnóstico

- Error observado: excepción no controlada (`SyntaxError`) lanzada por `JSON.parse()`.
- Mensaje exacto: `Expected property name or '}' in JSON at position 1 (line 1 column 2)`.
- Función donde ocurre: `loadTasks()` en `app.js`.
- Línea/expresión causante: `app.js:6:21` (versión previa a la corrección) → `return raw ? JSON.parse(raw) : [];`, específicamente `JSON.parse(raw)`.
- Causa técnica: `loadTasks()` invocaba `JSON.parse(raw)` sin `try/catch`; cualquier contenido no sintácticamente válido bajo la clave `tasks` provocaba una excepción no controlada.
- Impacto: `renderTasks()`, `createTask()` y `completeTask()` dependen de `loadTasks()`, por lo que la aplicación completa quedaba inutilizable (no listaba, no creaba ni completaba tareas) mientras el valor corrupto permaneciera almacenado.
- Alcance: limitado a las funciones que leen `localStorage` a través de `loadTasks()`; las funciones puras (`isValidTitle`, `isValidDueDate`, `formatDueDate`, `showTitleError`/`hideTitleError`) no se veían afectadas directamente.
- Confirmación de que el fallo existía antes de la corrección: confirmada empíricamente (ver sección 5).

## 7. Plan de corrección

Plan aprobado, con la corrección condicionada por el responsable a distinguir `raw === null` (ausencia de la clave) de una cadena vacía almacenada, que también debe tratarse como contenido corrupto:

```javascript
function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    saveTasks([]);
    return [];
  }
}
```

- Archivos modificados: `app.js` (corrección), `tests.html` (pruebas), `README.md` (documentación).
- Diez pruebas obligatorias más una prueba adicional de cadena vacía corrupta, ejecutadas en Microsoft Edge headless.
- Método de reversión corregido (sin `git reset --hard`): `git revert` para una reversión trazable de los commits de este experimento, o eliminación de la rama `incident/EXP-004-corrupt-localstorage` únicamente si todavía no ha sido integrada a `main`.

## 8. Acciones realizadas

| N.º | Acción | Herramienta | Resultado |
|---|---|---|---|
| 1 | Crear la definición de EXP-004 | GitHub y Git | Completado |
| 2 | Crear la rama del incidente | Git | Completado |
| 3 | Crear el registro de sesión | Git | Completado |
| 4 | Registrar punto de restauración con `git rev-parse HEAD` | Claude Code | Completado |
| 5 | Reproducir el incidente sin modificar código (script fuera del repositorio, `app.js` en modo lectura) | Claude Code | Completado |
| 6 | Presentar diagnóstico y plan de corrección | Claude Code | Completado |
| 7 | Corregir el plan según indicación del responsable (`raw === null`, sin `git reset --hard`) | Claude Code | Completado |
| 8 | Implementar la corrección en `loadTasks()` | Claude Code | Completado |
| 9 | Incorporar las diez pruebas obligatorias y la prueba adicional en `tests.html` | Claude Code | Completado |
| 10 | Ejecutar las pruebas en Microsoft Edge headless (`--dump-dom`) | Claude Code | Completado |
| 11 | Re-ejecutar la reproducción original contra el `app.js` corregido | Claude Code | Completado |
| 12 | Documentar el comportamiento de recuperación y la limitación conocida en `README.md` | Claude Code | Completado |
| 13 | Verificar `git status` y `git diff --stat main..HEAD` para confirmar alcance | Claude Code | Completado |
| 14 | Actualizar el registro de sesión con evidencia | Claude Code | Completado |

## 9. Cambios efectuados

- Archivos creados: ninguno (este registro ya existía)
- Archivos modificados: `app.js`, `tests.html`, `README.md`, `experiments/EXP-004-session-log.md`
- Archivos eliminados: ninguno
- Dependencias añadidas: ninguna

## 10. Evidencias

- Commit inicial de la rama: `7e580e65432724c269cc77afaa4c4427371c90e6`
- Punto de restauración operativo de EXP-004: `a2d2edd7934a30c22867ae641216e3c4b5d1ee65`
- Rama: `incident/EXP-004-corrupt-localstorage`
- Entorno de pruebas: Microsoft Edge en modo headless (`msedge --headless --disable-gpu --dump-dom`), sobre `tests.html` cargado vía `file://`.
- Pruebas ejecutadas — 11/11 PASS (10 obligatorias + 1 adicional):
  - PASS - Un almacenamiento vacío devuelve []
  - PASS - Un JSON válido sigue cargándose correctamente
  - PASS - Un JSON corrupto no lanza una excepción no controlada
  - PASS - Un JSON corrupto devuelve []
  - PASS - Después de la recuperación, localStorage contiene []
  - PASS - Se puede crear una tarea después de la recuperación
  - PASS - La validación del título vacío sigue funcionando
  - PASS - La fecha límite opcional sigue almacenándose correctamente
  - PASS - Marcar una tarea como completada sigue funcionando
  - PASS - No se añadieron dependencias externas (index.html) — con nota de limitación (ver sección 11)
  - PASS - Una cadena vacía almacenada se recupera como [] y reemplaza el contenido (prueba adicional)
- Verificación adicional: se re-ejecutó el script de reproducción original (`localStorage.setItem('tasks', '{datos-corruptos'); loadTasks();`) contra el `app.js` corregido. Resultado: `loadTasks() devolvio sin lanzar excepcion: []` y `localStorage.tasks (después del intento) = []`, confirmando la recuperación real.
- Verificación de alcance: `git status` y `git diff --stat main..HEAD` confirman que solo se modificaron los archivos autorizados (`app.js`, `tests.html`, `README.md`, este registro); no se tocó `PROJECT_CHARTER.md`, `docs/`, `EXP-004-INC-01.md` ni la interfaz (`index.html`, `styles.css`); no se añadieron dependencias.
- Pull request: todavía no creado

## 11. Problemas encontrados

Ninguno que impidiera cumplir el objetivo. No fue necesario ampliar el alcance.

Limitaciones registradas:
- La corrección no cubre el caso de un JSON sintácticamente válido cuyo resultado no sea un array (por ejemplo, `"{}"` o `"\"texto\""`); ese escenario queda explícitamente fuera del alcance de esta corrección mínima, según lo acordado, y se documentó en el README como limitación conocida.
- La prueba de ausencia de dependencias externas sobre `index.html` reprodujo la misma limitación observada en EXP-003: el navegador bloqueó el acceso a `contentDocument` del iframe por política de origen cruzado bajo `file://`, y la prueba usó como respaldo automático la inspección de `tests.html`, dejando registrado el mensaje exacto en el resultado.

## 12. Intervención humana

El responsable aprobó EXP-004, revisó y aprobó el diagnóstico, y condicionó la aprobación del plan de corrección a dos correcciones: distinguir `raw === null` de una cadena vacía almacenada (ambas deben pasar por la recuperación salvo la ausencia real de la clave) y sustituir `git reset --hard` por `git revert` como método de reversión trazable.

## 13. Reversión

- Punto de restauración: commit `a2d2edd7934a30c22867ae641216e3c4b5d1ee65`
- Método previsto (corregido): `git revert` de los commits de este experimento para una reversión trazable; eliminación de la rama `incident/EXP-004-corrupt-localstorage` únicamente si todavía no ha sido integrada a `main`. No se usará `git reset --hard`.
- Reversión ejecutada: sí, como ejercicio controlado y trazable (ver sección 13.1). No correspondió por fallo grave ni regla de bloqueo, sino por solicitud explícita del responsable para validar la capacidad de reversión del workflow.

### 13.1 Ejercicio de reversión trazable (rollback exercise)

**Objetivo:** demostrar que la corrección de EXP-004 puede revertirse y restaurarse de forma trazable, sin `git reset`, sin descartar cambios y sin reescribir el historial.

**Confirmaciones previas al ejercicio:**
- Rama: `incident/EXP-004-corrupt-localstorage`.
- Árbol de trabajo limpio (`git status` sin cambios pendientes).
- HEAD antes del ejercicio: `b47118cbb2900717ab88a0b8b2a51ac01cd42cd6`.
- Commit a revertir confirmado en la historia: `5bde3280913d6c637ab519a753eb736fb3bdabcf` (`fix: recover from corrupt localStorage`).

**Paso 1 — Reversión de la corrección:**
```
git revert 5bde328 --no-edit
```
- Commit de reversión: `2885d47020a2e0f0db846b0084db5dd92968393d` ("Revert 'fix: recover from corrupt localStorage'").
- `app.js` volvió a `return raw ? JSON.parse(raw) : [];` en `loadTasks()` (versión sin corrección).

**Resultado de las 11 pruebas durante la reversión** (Microsoft Edge headless, `tests.html`, sin modificar el archivo de pruebas):

- PASS (2):
  - Un almacenamiento vacío devuelve []
  - Un JSON válido sigue cargándose correctamente
- FAIL (3):
  - Un JSON corrupto no lanza una excepción no controlada
  - Un JSON corrupto devuelve []
  - Después de la recuperación, localStorage contiene []
- No ejecutadas (6): la prueba "Se puede crear una tarea después de la recuperación" invoca `createTask()`, que internamente llama a `loadTasks()` sobre el mismo `localStorage` corrupto que no fue recuperado (porque la corrección estaba revertida); esto generó una excepción `SyntaxError` no controlada dentro de `runTests()` que interrumpió la ejecución del script antes de llegar a las pruebas restantes. En consecuencia, las siguientes pruebas no llegaron a ejecutarse ni a reportar resultado (no son FAIL, son ausentes del resultado):
  - Se puede crear una tarea después de la recuperación
  - La validación del título vacío sigue funcionando
  - La fecha límite opcional sigue almacenándose correctamente
  - Marcar una tarea como completada sigue funcionando
  - Una cadena vacía almacenada se recupera como [] y reemplaza el contenido (prueba adicional)
  - No se añadieron dependencias externas (index.html)

**Confirmación de que el incidente reaparece:** confirmada. Con logging de consola habilitado (`--enable-logging=stderr`), se capturó el error real del navegador:
```
Uncaught SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)
```
Este error apareció tanto al ejecutar `tests.html` como, de forma independiente, al cargar `index.html` (mediante el `<iframe>` de verificación de dependencias ya presente en `tests.html`), confirmando que el incidente no solo afecta a las pruebas sino a la aplicación real, replicando exactamente el impacto documentado en el diagnóstico original (sección 6): la aplicación queda inutilizable mientras el contenido corrupto permanece en `localStorage`.

**Evidencia de que la reversión fue efectiva:** el código de `loadTasks()` volvió verificablemente a la versión sin corrección (confirmado por el diff del propio `git revert` y por la reaparición exacta del comportamiento fallido descrito en el diagnóstico), y las pruebas relacionadas con la recuperación fallaron o no pudieron ejecutarse, mientras que las pruebas no relacionadas con la recuperación (título vacío, fecha límite, completado, dependencias) tampoco pudieron confirmarse como funcionales en esta ejecución, ya que el script se interrumpió antes de alcanzarlas — un hallazgo adicional relevante: el incidente no produce fallos aislados, sino una interrupción en cadena de toda la suite de pruebas.

**Paso 2 — Restauración de la corrección:**
```
git revert 2885d47020a2e0f0db846b0084db5dd92968393d --no-edit
```
- Commit de restauración: `1790afd82645ca97ae1aa493b6a931418633c953` ("Reapply 'fix: recover from corrupt localStorage'").
- `app.js` volvió a contener la corrección (`if (raw === null) { return []; } try { return JSON.parse(raw); } catch (error) { saveTasks([]); return []; }`), verificado por lectura directa del archivo.

**Resultado de las 11 pruebas después de restaurar** (Microsoft Edge headless, `tests.html`, sin modificar el archivo de pruebas): **11/11 PASS**, incluyendo la prueba adicional de cadena vacía y la prueba de dependencias externas (con la misma nota de limitación de origen cruzado ya documentada).

**Confirmación de que no se reescribió el historial:** `git log --oneline` sobre la rama muestra los commits `5bde328` (corrección original) y `2885d47` (reversión) intactos y alcanzables, con `1790afd` (restauración) añadido a continuación como un nuevo commit. No se usó `git reset`, `git checkout` para descartar cambios, `git rebase` ni `push --force`; toda la secuencia quedó registrada como commits nuevos y trazables.

**Conclusión del ejercicio:** el mecanismo de reversión mediante `git revert` funcionó de forma trazable y reversible en ambos sentidos: revertir la corrección reprodujo fielmente el incidente original (incluyendo su efecto en cascada sobre pruebas no relacionadas), y revertir la reversión restauró exactamente el comportamiento corregido (11/11 PASS). El experimento demuestra que el workflow permite ejecutar y documentar una reversión real sin pérdida de trazabilidad ni reescritura de historial.

**Intervención humana que autorizó la reversión:** el responsable solicitó explícitamente este ejercicio de reversión trazable como parte del cierre de EXP-004, especificando el commit a revertir (`5bde328`), el punto de restauración operativo (`a2d2edd7934a30c22867ae641216e3c4b5d1ee65`), el procedimiento obligatorio (`git revert --no-edit`, sin `git reset` ni reescritura de historial) y los resultados esperados en cada etapa.

## 14. Evaluación preliminar

Implementación funcional y dentro del alcance. Pendiente de aplicar la rúbrica y emitir decisión final.

## 15. Decisión

Pendiente de decisión final por el responsable humano.

## 16. Próximo paso

Revisión humana de los archivos y de la evidencia de pruebas; aplicación de la rúbrica; decisión sobre creación de pull request.