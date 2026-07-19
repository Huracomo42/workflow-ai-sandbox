# EXP-009 — Diseño modular proporcional

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14
- Fecha: 19 de julio de 2026
- Estado: corregido tras revisión independiente

## Decisión

Se mantienen `index.html`, `app.js`, `styles.css` y `test-runner.js`.

La separación será lógica, no física.

## Responsabilidades

### Validación y normalización

- `isValidPriority`
- `normalizePriority`
- `normalizeTask`
- validación de filtros

### Persistencia

- `loadTasks`
- `saveTasks`

### Dominio

- `createTask`
- `updateTask`
- `toggleTaskCompletion`
- `filterTasks`
- coincidencia por estado y prioridad

### Compatibilidad

`completeTask(id)` podrá mantenerse como envoltorio:

```text
si la tarea está pendiente:
  marcarla completada
si ya está completada:
  conservarla completada
```

Esto protege pruebas anteriores mientras la nueva interfaz usa una operación reversible.

### Estado temporal

- `editingDraft`
- `activeFilters`

### Vista

- prioridad visible;
- filtros;
- estados vacíos;
- control reversible del estado.

## Riesgo corregido

El diseño anterior cubría solo Pendiente → Completada.

Ahora se exige:

```text
toggleTaskCompletion(id)
```

o equivalente para ambas direcciones.

Las pruebas deberán demostrar:

- Pendiente → Completada;
- Completada → Pendiente;
- reevaluación de filtros en ambas;
- conservación de prioridad y posición.

## Proporcionalidad

No se introducen clases, módulos, servicios, MVC ni dependencias.
