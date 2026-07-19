# Decisiones del piloto

## Objetivo

Registrar las excepciones al workflow y las decisiones vinculantes aprobadas por el responsable humano, conforme al formato exigido por `docs/WORKFLOW-METHODOLOGY-v2.md` §15. Una excepción no modifica permanentemente la metodología; los cambios permanentes requieren evidencia, propuesta formal y aprobación humana.

---

## Decisión 1 — Excepción documental para EXP-005 y EXP-006 (no repetible en PILOT-003)

- Fecha: 18 de julio de 2026
- Decisión: se aceptan EXP-005 (pruebas mediante HTTP) y EXP-006 (GitHub Actions) como excepciones documentales del piloto. Ambos se ejecutaron y se documentaron mediante informes narrativos (`docs/EXP-005-HTTP-TESTING.md`, `docs/EXP-006-GITHUB-ACTIONS.md`), sin entrada en `docs/task-bank.md`, sin ficha formal en `experiments/`, sin registro de sesión y sin evaluación mediante rúbrica.
- Motivo: ambos experimentos se ejecutaron antes de formalizarse plenamente el requisito documental completo por experimento. No se reconstruyen retroactivamente fichas, registros de sesión ni evaluaciones ficticias para no falsear su historial real.
- Riesgo: reduce la trazabilidad y la comparabilidad de EXP-005 y EXP-006 frente al resto de experimentos del piloto (ver `docs/results-dashboard.md`, notas de la tabla de criterios).
- Persona que autoriza: Hugo Cornejo Villena.
- Duración de la excepción: aplica únicamente a EXP-005 y EXP-006, dentro de PILOT-002. No se generaliza como práctica permanente.
- Medida compensatoria: la excepción queda documentada explícitamente aquí y en `docs/results-dashboard.md`, en vez de ocultarse o disimularse con datos inventados.
- Regla futura: esta excepción no podrá repetirse en PILOT-003. Ver Decisión 2.
- Fuente: `docs/EXP-005-HTTP-TESTING.md`, `docs/EXP-006-GITHUB-ACTIONS.md`; ausencia confirmada de `experiments/EXP-005-*.md` y `experiments/EXP-006-*.md` en el repositorio.
- Resultado: excepción aceptada; no bloquea la aprobación de EXP-005 ni de EXP-006.

## Decisión 2 — Requisito documental obligatorio para experimentos futuros

- Fecha: 18 de julio de 2026
- Decisión: todo experimento futuro, a partir de PILOT-003, debe contar con:
  - entrada en `docs/task-bank.md`;
  - ficha formal (`experiments/EXP-XXX-*.md`);
  - evaluación mediante rúbrica;
  - registro de sesión;
  - informe de revisión independiente separado, cuando el nivel de control lo exija.
- Motivo: EXP-005, EXP-006 (Decisión 1) y la regularización tardía de EXP-007 (Decisión 3) evidenciaron que omitir estos artefactos desde el inicio genera vacíos documentales que solo se detectan al intentar cerrar el piloto formalmente.
- Persona que autoriza: Hugo Cornejo Villena.
- Regla futura: aplica a PILOT-003 en adelante, sin excepciones salvo aprobación humana explícita, registrada conforme a este mismo formato.
- Fuente: decisión adoptada en la conversación de regularización documental de PILOT-002 (18 de julio de 2026); `docs/WORKFLOW-METHODOLOGY-v2.md` §15.

## Decisión 3 — Cierre de rúbrica y gates de EXP-007

- Fecha: 18 de julio de 2026
- Decisión: la rúbrica final de EXP-007 queda fijada en 44/50 (Comprensión 5, Plan 5, Control del alcance 4, Eficiencia 5, Calidad técnica 4, Pruebas 4, Documentación 4, Seguridad y control 5, Trazabilidad 4, Reversión 4). La reversión subió de 3/5 a 4/5 tras el ensayo documentado mediante `git revert` (hallazgo H1, `experiments/EXP-007-session-log.md` §12). Gates 3, 4 y 5 quedan cerrados. Para Gate 5: la aprobación humana explícita para realizar el merge ocurrió fuera de este repositorio, dentro de la sesión operativa del workflow; el commit `ac3a479` en `main` y el pull request #9 fusionado corroboran que la integración se ejecutó, pero el merge por sí solo no sustituye la evidencia de esa aprobación.
- Motivo: el ensayo de reversión y la revisión técnica independiente ya habían ocurrido en la práctica antes de esta decisión, y la integración ya se había ejecutado mediante el merge del pull request #9; faltaba únicamente su registro formal en artefactos separados.
- Persona que autoriza: Hugo Cornejo Villena.
- Regla futura: no aplica retroactividad adicional; esta decisión cierra formalmente la rúbrica y los gates de EXP-007.
- Fuente: `experiments/EXP-007-session-log.md`, `experiments/EXP-007-independent-review.md`, `experiments/EXP-007-evaluation.md`, commit de merge `ac3a479`.
- Resultado: EXP-007 aprobado, 44/50, sin reglas de bloqueo activadas.

## Decisión 4 — No reconstrucción retroactiva de artefactos inexistentes

- Fecha: 18 de julio de 2026
- Decisión: no se crean fichas retroactivas para EXP-005 ni EXP-006, ni un paquete operativo prospectivo que simule la existencia previa de una preparación formal de PILOT-002 (prevista en `docs/WORKFLOW-METHODOLOGY-v2.md` §18, pero nunca redactada antes de esta fecha).
- Motivo: preservar la integridad histórica de la documentación del piloto; evitar que el cierre formal se apoye en evidencia fabricada.
- Persona que autoriza: Hugo Cornejo Villena.
- Regla futura: cualquier vacío documental detectado en el futuro debe declararse explícitamente como tal, no rellenarse con contenido inventado (fechas, autores, puntajes, evidencias o aprobaciones).
- Fuente: decisión adoptada en la conversación de regularización documental de PILOT-002 (18 de julio de 2026).
