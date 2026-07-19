# EXP-009 — Diseño modular proporcional

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Estado: borrador técnico para revisión

## 1. Decisión principal

TB-14 se implementará manteniendo la estructura física actual:

- `index.html`
- `app.js`
- `styles.css`
- `test-runner.js`

No se crearán módulos JavaScript adicionales, clases, servicios, repositorios, controladores ni capas físicas separadas.

La separación se realizará mediante funciones pequeñas, responsabilidades explícitas y estado de interfaz controlado dentro de `app.js`.

## 2. Justificación de proporcionalidad

La aplicación:

- es pequeña;
- se ejecuta íntegramente en navegador;
- no usa sistema de módulos;
- no tiene proceso de compilación;
- no contiene dependencias externas;
- persiste una única colección en `localStorage`;
- tiene una única pantalla;
- posee un conjunto reducido de operaciones.

Separar físicamente dominio, persistencia e interfaz obligaría a introducir carga modular o múltiples scripts sin resolver un problema real del tamaño actual.

La decisión correcta no es conservar el desorden existente, sino mejorar la separación lógica sin añadir infraestructura.

## 3. Responsabilidades actuales

Actualmente `app.js` concentra:

### Persistencia

- `loadTasks()`
- `saveTasks()`

### Validación y transformación

- `isValidTitle()`
- `isValidDueDate()`
- `isValidEditableDueDate()`
- `formatDueDate()`

### Operaciones del dominio

- `createTask()`
- `completeTask()`
- `updateTask()`

### Estado de edición

- `editingDraft`
- `getEditingDraft()`
- `beginEditTask()`
- `cancelEditTask()`
- `saveEditTask()`

### Renderizado

- `renderReadRow()`
- `renderEditRow()`
- `renderTasks()`

### Inicialización y eventos

- listener de `DOMContentLoaded`;
- envío del formulario;
- interacción con botones.

Esta concentración es aceptable por tamaño, pero TB-14 exige fronteras lógicas más claras.

## 4. Responsabilidades propuestas

### 4.1. Constantes y valores permitidos

Se añadirán constantes para:

- prioridades válidas;
- textos visibles de prioridad;
- valores válidos del filtro de estado;
- valores válidos del filtro de prioridad;
- mensajes de estados vacíos;
- mensaje de prioridad inválida.

Ejemplo conceptual:

```text
VALID_PRIORITIES = ['low', 'medium', 'high']
DEFAULT_PRIORITY = 'medium'
```

### 4.2. Validación y normalización

Funciones propuestas:

- `isValidPriority(priority)`
- `normalizePriority(priority)`
- `normalizeTask(task)`
- `isValidStatusFilter(value)`
- `isValidPriorityFilter(value)`

Responsabilidad:

- validar entrada nueva;
- recuperar datos antiguos;
- evitar que datos inválidos bloqueen la aplicación;
- no producir escritura automática durante la carga.

### 4.3. Persistencia

Funciones:

- `loadTasks()`
- `saveTasks(tasks)`

Cambio previsto:

- `loadTasks()` seguirá manejando JSON corrupto;
- después de parsear, normalizará cada tarea en memoria;
- no guardará automáticamente por una prioridad ausente o inválida;
- conservará el comportamiento vigente ante JSON corrupto.

No se creará una abstracción de repositorio porque solo existe una clave y un único mecanismo de almacenamiento.

### 4.4. Operaciones del dominio

Funciones existentes modificadas:

- `createTask(title, dueDate, priority)`
- `updateTask(id, changes)`
- `completeTask(id)`

Funciones puras o auxiliares propuestas:

- `taskMatchesStatus(task, statusFilter)`
- `taskMatchesPriority(task, priorityFilter)`
- `filterTasks(tasks, filters)`

Reglas:

- creación y edición validarán prioridad;
- filtrado será puro y no persistente;
- cambiar prioridad no reordenará;
- completar conservará prioridad.

### 4.5. Estado temporal de interfaz

Estado propuesto:

```text
let activeFilters = {
  status: 'all',
  priority: 'all'
}
```

Funciones propuestas:

- `getActiveFilters()`
- `setStatusFilter(value)`
- `setPriorityFilter(value)`
- `resetFilters()` solo si resulta necesaria para pruebas o eventos.

Los filtros:

- no se persistirán;
- no se reiniciarán al renderizar;
- se inicializarán en `all`;
- los valores inválidos se normalizarán a `all`.

El borrador de edición seguirá siendo independiente:

```text
let editingDraft = null
```

El borrador incorporará `priority`.

### 4.6. Vista derivada

`renderTasks(listElement)`:

1. cargará la colección completa normalizada;
2. calculará la colección visible mediante `filterTasks`;
3. distinguirá:
   - colección completa vacía;
   - colección existente sin coincidencias;
4. renderizará únicamente las tareas visibles;
5. conservará filtros y colección persistida.

Funciones auxiliares propuestas:

- `renderEmptyState(listElement, message)`
- `getPriorityLabel(priority)`

No se creará un sistema genérico de componentes.

### 4.7. Controles de interfaz

`index.html` incorporará:

- selector de prioridad en el formulario de creación;
- selector de filtro de estado;
- selector de filtro de prioridad.

La edición inline incorporará dinámicamente un selector de prioridad desde `app.js`.

Los filtros deberán existir fuera del formulario de creación para evitar envíos accidentales y diferenciar entrada de datos de control de vista.

### 4.8. Estilos

`styles.css` añadirá solo reglas necesarias para:

- grupo de filtros;
- selector de prioridad;
- texto visible de prioridad;
- estado vacío;
- adaptación del formulario existente.

No se realizará rediseño visual general.

## 5. Flujo técnico propuesto

### Carga inicial

```text
DOMContentLoaded
→ obtener controles
→ inicializar filtros en all
→ loadTasks
→ normalizar en memoria
→ calcular vista
→ renderizar
```

### Creación

```text
leer título, fecha y prioridad
→ validar conjuntamente
→ crear y persistir
→ limpiar formulario
→ conservar filtros
→ renderizar vista derivada
```

### Edición

```text
crear borrador con título, fecha y prioridad
→ modificar borrador
→ validar conjuntamente al guardar
→ persistir todos los cambios o ninguno
→ conservar filtros
→ renderizar vista derivada
```

### Cambio de filtros

```text
validar nuevo filtro
→ actualizar activeFilters
→ no escribir localStorage
→ renderizar vista derivada
```

### Cambiar estado de una tarea

La operación recomendada es `toggleTaskCompletion(id)` o equivalente.

```text
localizar tarea existente
→ invertir completed
→ permitir Pendiente → Completada
→ permitir Completada → Pendiente
→ conservar id, título, fecha, prioridad y posición
→ persistir
→ conservar filtros
→ reevaluar visibilidad
→ renderizar vista derivada
```

## 6. Archivos potencialmente afectados en EXP-010

| Archivo | Cambio previsto |
|---|---|
| `app.js` | prioridad, normalización, filtros, edición y renderizado |
| `index.html` | selector de prioridad y controles de filtros |
| `styles.css` | estilos mínimos para nuevos controles y estados |
| `test-runner.js` | pruebas de TB-14 y regresión |
| `README.md` | documentación funcional solo si el alcance aprobado lo exige |

EXP-010 deberá congelar su lista exacta de archivos antes de implementar.

## 7. Dependencias entre responsabilidades

- Persistencia depende de normalización para producir tareas operativas.
- Creación y edición dependen de validación.
- Renderizado depende de carga, filtrado y etiquetas visibles.
- Eventos de interfaz dependen de operaciones de dominio y renderizado.
- Las pruebas dependerán de funciones accesibles en el contexto global actual.
- Ninguna responsabilidad requiere una dependencia externa.

## 8. Riesgos de diseño

### R1 — Escribir normalización durante la carga

Riesgo: alterar datos solo por abrir la aplicación.

Control: normalizar en memoria y persistir únicamente en operaciones posteriores.

### R2 — Reiniciar filtros en cada renderizado

Riesgo: incumplir la conservación durante la sesión.

Control: mantener `activeFilters` fuera de `renderTasks()`.

### R3 — Filtrar antes de conservar la colección completa

Riesgo: sobrescribir `localStorage` con una vista parcial.

Control: `filterTasks()` devolverá una colección derivada que nunca se enviará a `saveTasks()`.

### R4 — Validar prioridad después de modificar la tarea

Riesgo: persistencia parcial.

Control: validar todos los cambios antes de mutar el objeto persistido.

### R5 — Acoplar textos visibles con valores internos

Riesgo: almacenar Baja, Media y Alta y dificultar cambios de presentación.

Control: usar mapa explícito entre valores internos y etiquetas.

### R6 — Sobrediseñar la aplicación

Riesgo: introducir módulos, capas o abstracciones más costosas que la función.

Control: conservar cuatro archivos operativos y separar responsabilidades con funciones.

### R7 — Romper pruebas existentes

Riesgo: modificar firmas y datos esperados por EXP-005 y EXP-007.

Control:

- mantener compatibilidad de `createTask(title, dueDate)` asignando Media por defecto;
- conservar las funciones globales usadas por pruebas;
- añadir el atributo `priority` sin eliminar los existentes;
- ejecutar regresión completa.

## 9. Abstracciones descartadas

Se descartan expresamente:

- clase `Task`;
- clase o servicio `TaskRepository`;
- patrón MVC;
- event bus;
- state manager;
- módulos ES;
- archivos separados de dominio, persistencia y UI;
- componente genérico de filtros;
- migración versionada de esquema;
- framework de pruebas nuevo;
- biblioteca de validación.

Estas abstracciones no son proporcionales al problema actual.

## 10. Nombres técnicos recomendados

La implementación deberá evaluar y preferir nombres directos:

- `VALID_PRIORITIES`
- `DEFAULT_PRIORITY`
- `PRIORITY_LABELS`
- `activeFilters`
- `isValidPriority`
- `normalizePriority`
- `normalizeTask`
- `filterTasks`
- `taskMatchesStatus`
- `taskMatchesPriority`
- `getPriorityLabel`
- `renderEmptyState`

Los nombres definitivos podrán ajustarse en EXP-010 sin alterar el diseño aprobado.

## 11. Decisiones congeladas por este diseño

- valores internos: `low`, `medium`, `high`;
- valor predeterminado: `medium`;
- normalización durante carga;
- ausencia de escritura automática por normalización;
- filtros en memoria y no persistidos;
- combinación AND;
- vista derivada no destructiva;
- mantenimiento de `app.js` como único archivo JavaScript productivo;
- separación lógica mediante funciones;
- ausencia de nuevas dependencias;
- compatibilidad de firmas existentes cuando sea viable.

## 12. Criterio de suficiencia

El diseño es suficiente para EXP-010 cuando:

- cada responsabilidad tiene una ubicación prevista;
- no quedan decisiones técnicas bloqueantes;
- la matriz de trazabilidad cubre todos los requisitos;
- las vertical slices pueden ejecutarse sin rediseñar la arquitectura;
- la revisión independiente confirma que la solución es proporcional.
