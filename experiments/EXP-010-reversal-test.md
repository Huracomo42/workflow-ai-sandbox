# EXP-010 — Ensayo de reversión

- Fecha real del ensayo: 19 de julio de 2026
- Rama desechable: `pilot-003/exp-010-reversal-test`, creada desde `pilot-003/exp-010-priority-base` en el commit `a840a1b`
- Punto de restauración registrado: `pilot-003/exp-010-priority-base` @ `a840a1b0460b78ca928d21717d31dd235bcc7c13`
- Estado: ejecutado — reversión y restauración completas, sin conflictos, con evidencia de suite en ambos sentidos
- Rama principal (`main`) y rama de trabajo (`pilot-003/exp-010-priority-base`): no tocadas por este ensayo

## Objetivo

Demostrar que los cambios de EXP-010 pueden revertirse y restaurarse de forma trazable, mediante `git revert` exclusivamente, sin reescribir historial (`git reset --hard`, `rebase` o `push --force`) y sin afectar `main`.

## Commits identificados como propios de EXP-010 (`main..pilot-003/exp-010-priority-base`)

En orden cronológico (de más antiguo a más reciente):

| # | Commit | Mensaje | Categoría |
|---|---|---|---|
| 1 | `d55f645` | docs: initialize EXP-010 implementation controls | Documentación inicial (Gate 0) |
| 2 | `9a64754` | test: establish EXP-010 red phase | Fase roja (Gate 1) |
| 3 | `fecdbea` | test: fix iframe readiness detection | Corrección de `waitForFrame()` |
| 4 | `02238a6` | feat: implement EXP-010 priority base | Implementación VS-01 (Gate 2) |
| 5 | `42ff4d3` | docs: record invalid same-context review | Revisión independiente (borrador inválido, luego reemplazado en el mismo archivo) |
| 6 | `a840a1b` | test: close EXP-010 review findings | Cierre de hallazgos (H1, H3, H4, H5, H6) |

Los seis commits existentes en el momento del ensayo cubren exactamente las seis categorías solicitadas. No existe un commit separado para la revisión formal H1-H10 (fue una sustitución de contenido dentro del mismo archivo entre los commits 5 y 6, no un commit propio); se documenta esta correspondencia para que quede trazable.

## Procedimiento ejecutado

1. Registrado el commit actual de `pilot-003/exp-010-priority-base` (`a840a1b`) como punto de restauración.
2. Creada la rama desechable `pilot-003/exp-010-reversal-test` desde ese commit (`git checkout -b`).
3. Identificados los 6 commits de la tabla anterior mediante `git log main..HEAD --oneline`.
4. Reversión mediante `git revert --no-edit <sha>`, en orden inverso (del más reciente al más antiguo): `a840a1b` → `42ff4d3` → `02238a6` → `fecdbea` → `9a64754` → `d55f645`. No se usó `git reset --hard`, `rebase`, `push --force` ni edición manual de archivos para simular la reversión.
5. **Conflictos encontrados: ninguno**, en las 6 reversiones. No fue necesaria ninguna resolución manual.
6. Verificación de árbol: `git diff main --stat` (para `app.js`, `index.html`, `styles.css`, `test-runner.js`) sin salida — el árbol revertido es idéntico a `main` en esos archivos. `grep -c priority app.js` → 0. `grep -c T010 test-runner.js` → 0.
7. Ejecución de la suite completa mediante servidor HTTP local y Microsoft Edge headless (mismo mecanismo que EXP-005/EXP-006/EXP-007/EXP-010), modo `normal`.
8. Restauración mediante `git revert --no-edit <sha-del-revert>` sobre los 6 commits de reversión, en el orden que reaplica los cambios originales cronológicamente (del más antiguo al más reciente): revert de `f0dafc5` (reaplica `d55f645`) → revert de `ca4b8ac` (reaplica `9a64754`) → revert de `244ce34` (reaplica `fecdbea`) → revert de `098d807` (reaplica `02238a6`) → revert de `85c836c` (reaplica `42ff4d3`) → revert de `7d7b799` (reaplica `a840a1b`).
9. **Conflictos encontrados en la restauración: ninguno**, en las 6 operaciones.
10. Verificación de árbol restaurado: `git diff a840a1b --stat` sin salida — el árbol restaurado es idéntico, archivo por archivo, al punto de restauración original.
11. Ejecución de la suite completa nuevamente.
12. Regreso a `pilot-003/exp-010-priority-base` (`git checkout`). `main` verificado sin cambios (`43185f4`, sin commits nuevos). La rama desechable `pilot-003/exp-010-reversal-test` no se fusionó ni se eliminó; permanece disponible para inspección.

## Commits de reversión creados (en la rama desechable)

| Orden | Commit | Mensaje | Revierte |
|---|---|---|---|
| 1 | `7d7b799` | Revert "test: close EXP-010 review findings" | `a840a1b` |
| 2 | `85c836c` | Revert "docs: record invalid same-context review" | `42ff4d3` |
| 3 | `098d807` | Revert "feat: implement EXP-010 priority base" | `02238a6` |
| 4 | `244ce34` | Revert "test: fix iframe readiness detection" | `fecdbea` |
| 5 | `ca4b8ac` | Revert "test: establish EXP-010 red phase" | `9a64754` |
| 6 | `f0dafc5` | Revert "docs: initialize EXP-010 implementation controls" | `d55f645` |

## Commits de restauración creados (en la rama desechable)

| Orden | Commit | Mensaje | Reaplica |
|---|---|---|---|
| 1 | `0a036b2` | Reapply "docs: initialize EXP-010 implementation controls" | `d55f645` (vía revert de `f0dafc5`) |
| 2 | `84f2eff` | Reapply "test: establish EXP-010 red phase" | `9a64754` (vía revert de `ca4b8ac`) |
| 3 | `500fe44` | Reapply "test: fix iframe readiness detection" | `fecdbea` (vía revert de `244ce34`) |
| 4 | `0afbf73` | Reapply "feat: implement EXP-010 priority base" | `02238a6` (vía revert de `098d807`) |
| 5 | `3e9c568` | Reapply "docs: record invalid same-context review" | `42ff4d3` (vía revert de `85c836c`) |
| 6 | `d750d4a` | Reapply "test: close EXP-010 review findings" | `a840a1b` (vía revert de `7d7b799`) |

## Validación posterior a la reversión

- Servidor: `python -m http.server 8013`. Navegador: Microsoft Edge headless 150.0.4078.83. Comando: `--headless --disable-gpu --virtual-time-budget=8000 --dump-dom`, modo `normal`.
- Resultado: `data-test-status="pass"`, `data-test-general-status="PASS CON NO EJECUTADOS"`.
- Totales: **23 casos — 21 PASS, 0 FAIL, 2 NO EJECUTADO.**
- Composición: `T005-01` a `T005-10` (10 PASS), `T007-01` a `T007-09` (9 PASS), `T005-CONTROL-SKIP` (PASS), `T005-FINAL` (PASS); `T005-CONTROL-ASSERT` y `T005-CONTROL-EXCEPTION` en NO EJECUTADO (controles deliberados, modo `normal`).
- **VS-01 ya no existe**: `app.js` sin atributo `priority` ni funciones relacionadas; `index.html` sin selector de prioridad; `styles.css` sin las reglas añadidas. Verificado por `grep -c priority app.js` → 0.
- **El comportamiento previo sigue funcionando**: las 19 pruebas de EXP-005/EXP-007 permanecen en PASS, sin cambios de expectativa.
- **La suite refleja correctamente la ausencia de T010**: no aparece ningún caso `T010-*` en el listado de resultados (ni como FAIL ni como NO EJECUTADO); simplemente no existen, porque `test-runner.js` volvió a su estado previo a EXP-010. No se interpretó la ausencia como una regresión ni se generó un estado de error.
- **Sin corrupción**: el ejecutor completó su ciclo con normalidad (`data-test-status` presente, sin mensaje de "FAIL crítico del ejecutor"); ningún dato quedó en un estado intermedio o inconsistente.

## Validación posterior a la restauración

- Mismo mecanismo (servidor HTTP local, Edge headless, modo `normal`), servidor en el puerto 8014.
- Resultado: `data-test-status="pass"`, `data-test-general-status="PASS CON NO EJECUTADOS"`.
- Totales confirmados: **39 casos — 37 PASS, 0 FAIL, 2 NO EJECUTADO** (idéntico al resultado vigente antes de iniciar el ensayo, registrado en `experiments/EXP-010-session-log.md` §26).
- Árbol de trabajo restaurado verificado como idéntico al punto de restauración mediante `git diff a840a1b --stat` (sin salida).

## Conflictos encontrados

Ninguno, ni en la fase de reversión (6 operaciones) ni en la fase de restauración (6 operaciones). Las 12 operaciones de `git revert` se completaron de forma limpia y automática, sin intervención manual de resolución de conflictos ni modificación de archivos fuera del propio mecanismo de `git revert`.

## Resultado

- Reversibilidad de EXP-010: **demostrada**, de forma trazable, mediante `git revert` exclusivamente.
- `main`: sin cambios (`43185f4` antes y después del ensayo).
- `pilot-003/exp-010-priority-base`: sin cambios (`a840a1b` antes y después del ensayo; el ensayo completo ocurrió en la rama desechable).
- Rama desechable `pilot-003/exp-010-reversal-test`: conservada, no fusionada, no eliminada, con las 12 commits de reversión/restauración disponibles para inspección.
- Historial: preservado en todo momento; no se usó `git reset --hard`, `rebase` ni `push --force` en ningún punto del ensayo.

## Limitaciones

- El ensayo cubre los 6 commits existentes en el momento de su ejecución. Trabajo posterior de EXP-010 (si lo hubiera) requerirá un ensayo adicional o una extensión de este.
- No se ensayó la reversión de un subconjunto parcial de commits (por ejemplo, revertir solo la implementación de VS-01 sin revertir también la fase roja); el procedimiento aprobado exigía revertir la totalidad de los commits propios de EXP-010, no una reversión selectiva.
