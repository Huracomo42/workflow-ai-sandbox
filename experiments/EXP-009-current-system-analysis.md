# EXP-009 — Análisis del sistema actual

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha: 19 de julio de 2026
- Estado: completado

## 1. Estructura actual

La aplicación está compuesta por:

- `index.html`: estructura de la interfaz;
- `app.js`: dominio, persistencia, estado temporal, eventos y renderizado;
- `styles.css`: presentación;
- `test-runner.js`: pruebas ejecutables en navegador;
- `tests.html`: contenedor de la suite;
- `localStorage`: persistencia bajo la clave `tasks`.

No existen frameworks, módulos, proceso de compilación ni dependencias externas.

## 2. Modelo persistido actual

Cada tarea contiene:

```json
{
  "id": "string",
  "title": "string",
  "completed": false,
  "dueDate": ""
}
```

TB-14 añadirá:

```json
{
  "priority": "low | medium | high"
}
```

## 3. Flujo de carga

`loadTasks()`:

1. lee `localStorage`;
2. devuelve `[]` cuando no existe contenido;
3. parsea JSON;
4. ante JSON corrupto, reemplaza el contenido por `[]`;
5. actualmente devuelve los objetos sin normalización.

Punto de extensión:

- normalizar prioridad después del parseo;
- preservar la recuperación actual ante JSON corrupto;
- no escribir automáticamente por prioridad ausente o inválida.

## 4. Flujo de creación

`createTask(title, dueDate)`:

1. valida título;
2. carga la colección;
3. crea un objeto con `id`, `title`, `completed` y `dueDate`;
4. añade al final;
5. persiste la colección.

Punto de extensión:

- aceptar prioridad opcional;
- usar `medium` cuando se omite;
- rechazar prioridad explícitamente inválida;
- mantener compatibilidad con llamadas existentes.

## 5. Flujo de edición

La aplicación usa un único borrador global:

```text
editingDraft
```

`beginEditTask()` copia:

- `id`;
- `title`;
- `dueDate`.

`saveEditTask()` delega en `updateTask()`.

Puntos de extensión:

- incorporar `priority` al borrador;
- validar título, fecha y prioridad antes de mutar;
- conservar guardado atómico;
- permitir edición de tareas completadas;
- no alterar `id`, `completed` ni posición.

## 6. Flujo de estado

Actualmente `completeTask(id)` solo realiza:

```text
Pendiente → Completada
```

No existe operación para:

```text
Completada → Pendiente
```

TB-14 exige ambas direcciones para cumplir RF-14.

Diseño previsto:

- incorporar `toggleTaskCompletion(id)` o una operación equivalente;
- conservar `completeTask(id)` como envoltorio compatible para las pruebas existentes;
- reevaluar la visibilidad después de cualquier cambio de estado.

## 7. Flujo de renderizado

`renderTasks()`:

1. carga todas las tareas;
2. limpia la lista;
3. renderiza cada tarea;
4. decide entre fila de lectura o edición.

Brechas:

- no existe prioridad visible;
- no existe vista derivada;
- no existen filtros;
- no existen estados vacíos diferenciados.

Puntos de extensión:

- calcular tareas visibles mediante una función pura;
- no pasar la vista filtrada a `saveTasks()`;
- distinguir colección vacía de vista sin coincidencias;
- conservar estado de filtros fuera de `renderTasks()`.

## 8. Interfaz actual

`index.html` contiene:

- campo de título;
- campo de fecha;
- botón Agregar;
- mensaje de error;
- lista de tareas.

Puntos de extensión:

- selector de prioridad en creación;
- selector de filtro de estado;
- selector de filtro de prioridad;
- control reversible del estado o equivalente funcional;
- etiquetas accesibles y texto visible de prioridad.

## 9. Pruebas actuales

La suite cubre:

- almacenamiento vacío;
- JSON válido y corrupto;
- creación;
- título inválido;
- fecha;
- completar;
- ausencia de dependencias;
- edición inline;
- guardado atómico;
- cancelación;
- edición de completadas;
- conservación de `id`.

Brechas:

- prioridad;
- normalización;
- cambio Completada → Pendiente;
- filtros;
- vistas vacías diferenciadas.

## 10. Restricciones

- sin dependencias nuevas;
- sin cambio de clave de almacenamiento;
- sin base de datos;
- sin autenticación;
- sin ordenamiento por prioridad;
- sin persistencia de filtros;
- sin eliminar compatibilidad con pruebas existentes;
- sin refactor general ajeno a TB-14.

## 11. Riesgos

- escribir normalización durante la carga;
- sobrescribir almacenamiento con una vista filtrada;
- romper firmas usadas por pruebas;
- cubrir solo una dirección del cambio de estado;
- mezclar filtros con persistencia;
- introducir arquitectura desproporcionada.

## 12. Conclusión

El sistema admite TB-14 sin una reorganización física.

La estrategia correcta es:

- mantener los archivos actuales;
- separar responsabilidades mediante funciones;
- añadir normalización y filtros como lógica explícita;
- introducir transición reversible de estado;
- conservar compatibilidad y regresión.
