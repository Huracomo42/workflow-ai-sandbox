# EXP-009 — Revisión técnica independiente

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha de revisión: 19 de julio de 2026
- Commit revisado: `ee7b32e`
- Base comparada: `main` (`3d559b7`)
- Contexto: revisión separada posterior al commit y publicación de la rama
- Resultado: cambios solicitados

## 1. Alcance revisado

La revisión comparó `main` contra `pilot-003/exp-009-technical-design`.

Archivos revisados:

- `experiments/EXP-009-TB-14.md`
- `experiments/EXP-009-domain-model.md`
- `experiments/EXP-009-feature-specification.md`
- `experiments/EXP-009-modular-design.md`
- `experiments/EXP-009-session-log.md`
- `experiments/EXP-009-traceability-matrix.md`
- `experiments/EXP-009-vertical-slice-map.md`

La rama está un commit por delante de `main`, sin divergencia y sin cambios de código productivo o pruebas.

## 2. Resultado general

El diseño tiene una base sólida:

- representación interna de prioridades explícita;
- compatibilidad con datos antiguos;
- normalización no destructiva;
- separación lógica proporcional;
- slices limitadas y ordenadas;
- VS-01 correctamente aislada para EXP-010;
- trazabilidad nominal de RF-01 a RF-22.

Sin embargo, la trazabilidad declarada como completa no es todavía verdadera. Existen dos hallazgos bloqueantes.

## 3. Hallazgos

### H1 — La transición Completada → Pendiente está ausente

**Severidad:** bloqueante.

RF-14 congelado exige reevaluar la visibilidad al **marcar o desmarcar** una tarea como completada.

El diseño actual solo documenta:

```text
tarea pendiente existente
→ completed = true
```

Además:

- el diseño modular conserva `completeTask(id)` como única operación de estado;
- VS-03 habla únicamente de cambiar una tarea a completada;
- la matriz asigna RF-14 a una prueba donde la tarea desaparece al completarse;
- no existe criterio, función prevista ni prueba para volver de Completada a Pendiente.

Esto produce una falsa cobertura de RF-14.

**Corrección obligatoria:**

- modelar ambas transiciones:
  - Pendiente → Completada;
  - Completada → Pendiente;
- proponer una operación simétrica, preferentemente `toggleTaskCompletion(id)` o equivalente;
- actualizar diseño modular;
- actualizar especificación verificable de RF-14;
- actualizar mapa de slices;
- añadir prueba prevista para desmarcar;
- actualizar matriz de trazabilidad;
- conservar `completeTask()` solo si se justifica compatibilidad con pruebas existentes.

### H2 — Faltan artefactos obligatorios del microplan aprobado

**Severidad:** bloqueante metodológico.

El microplan aprobado exigió, como mínimo:

- `experiments/EXP-009-current-system-analysis.md`
- `experiments/EXP-009-test-design.md`

Ninguno existe en el commit revisado.

Parte del análisis está incluida en `EXP-009-session-log.md`, y parte del diseño de pruebas aparece distribuida entre la especificación, el mapa de slices y la matriz. Eso no sustituye los artefactos aprobados sin una modificación formal del microplan.

**Corrección obligatoria:**

- crear `EXP-009-current-system-analysis.md` con estructura actual, flujos, restricciones, puntos de extensión y riesgos;
- crear `EXP-009-test-design.md` con niveles de prueba, aislamiento, datos, regresión, navegador, criterios de ejecución y mapa de pruebas;
- enlazar ambos desde `EXP-009-TB-14.md` y el registro de sesión;
- no fingir ejecución de pruebas: EXP-009 solo diseña.

## 4. Observaciones no bloqueantes

### O1 — Numeración futura de pruebas

Los identificadores `T011-*` a `T015-*` son provisionales. Esto está declarado, pero EXP-010 deberá congelar únicamente `T010-*` para VS-01. Las demás numeraciones no deben interpretarse como experimentos ya autorizados.

### O2 — Compatibilidad de `completeTask()`

Las pruebas existentes usan `completeTask()`. Si se introduce una operación reversible, conviene mantener `completeTask()` como envoltorio compatible o actualizarla únicamente cuando exista autorización y prueba de regresión.

### O3 — Alcance físico proporcional

La decisión de mantener un solo `app.js` es apropiada para el tamaño actual. No se recomienda dividir archivos para resolver H1 o H2.

## 5. Evaluación por dimensión

| Dimensión | Resultado | Justificación |
|---|---|---|
| Comprensión funcional | Parcial | falta una transición exigida por RF-14 |
| Trazabilidad | No cumple | RF-14 aparece cubierto, pero solo parcialmente |
| Control de alcance | Cumple | no se modificó código ni pruebas |
| Proporcionalidad | Cumple | no hay sobrediseño |
| Verificabilidad | Parcial | falta prueba de desmarcado y artefacto de diseño de pruebas |
| Cumplimiento metodológico | No cumple | faltan dos artefactos aprobados |

## 6. Decisión

**Solicitar cambios.**

EXP-009 no puede pasar a evaluación final ni considerarse listo para cierre mientras H1 y H2 permanezcan abiertos.

No se autoriza:

- abrir el PR como listo para merge;
- aprobar EXP-009;
- iniciar EXP-010;
- modificar código productivo.

## 7. Condición para una segunda revisión

La segunda revisión podrá recomendar aprobación cuando:

- RF-14 cubra ambas direcciones del cambio de estado;
- exista prueba prevista para desmarcar una tarea;
- existan los dos artefactos faltantes;
- la trazabilidad deje de declarar cobertura falsa;
- los cambios queden registrados en un commit posterior, sin reescribir `ee7b32e`.
