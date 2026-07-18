# workflow-ai-sandbox
Proyecto de prueba para validar un workflow profesional de desarrollo asistido por IA

## Aplicación de gestión de tareas (EXP-001)

Aplicación local mínima de gestión de tareas, construida con HTML, CSS y JavaScript puro, sin frameworks, backend ni servicios externos. Las tareas se guardan en `localStorage` del navegador.

### Uso

1. Abrir `index.html` directamente en un navegador (no requiere instalación ni servidor).
2. Escribir un título y pulsar "Agregar tarea" para crear una tarea.
3. Las tareas creadas se muestran en la lista.
4. Pulsar "Completar" en una tarea para marcarla como completada.
5. Las tareas se conservan al recargar la página, mediante `localStorage`.
6. Un título vacío o compuesto únicamente por espacios no crea una tarea y muestra el mensaje "Escribe un título para la tarea.", que desaparece al crear una tarea válida.
7. Opcionalmente se puede indicar una fecha límite mediante el selector de fecha. Si se indica, se muestra junto a la tarea como "Fecha límite: DD/MM/YYYY"; si no se indica, la tarea se muestra solo con su título.
8. Si el contenido almacenado bajo la clave `tasks` no es un JSON válido (por ejemplo, texto corrupto o una cadena vacía), la aplicación no falla: lo trata como una lista vacía, reemplaza el contenido corrupto por `[]` en `localStorage` y permite seguir creando tareas con normalidad.
9. Pulsar "Editar" en una tarea (completada o pendiente) activa un formulario inline para modificar su título y su fecha límite, sin recargar la página. Solo una tarea puede editarse a la vez.
10. Mientras se edita, los cambios se mantienen en un borrador temporal en memoria; no se guardan en `localStorage` hasta pulsar "Guardar".
11. Pulsar "Cancelar" descarta el borrador sin modificar la tarea original.
12. Pulsar "Guardar" solo aplica los cambios si el título y la fecha límite son válidos; si alguno no lo es, se rechaza todo el guardado, la tarea original permanece intacta y el borrador sigue activo para poder corregirlo.
13. Editar una tarea no cambia su identificador ni su estado de completada.

### Edición de tareas (EXP-007)

- Campos editables: título y fecha límite. Ningún otro campo del modelo de tarea es editable.
- La interfaz de edición es inline: aparece directamente en la fila de la tarea seleccionada.
- El guardado es atómico: si el título o la fecha límite editados son inválidos, no se persiste ningún cambio.
- El identificador (`id`) de la tarea nunca se modifica como parte de la edición.

### Recuperación ante datos corruptos en localStorage

Si la clave `tasks` de `localStorage` contiene un valor que no es un JSON válido, `loadTasks()` captura el error, sobrescribe la clave `tasks` con `[]` y devuelve una lista vacía en lugar de lanzar una excepción. Los datos corruptos se pierden (se reemplazan por una lista vacía), pero la aplicación queda utilizable de inmediato.

**Limitación conocida:** esta recuperación cubre contenido que no es JSON sintácticamente válido (incluida una cadena vacía). No cubre el caso de un JSON válido cuyo resultado no sea un array (por ejemplo, `"{}"` o `"\"texto\""`); ese escenario queda fuera del alcance de esta corrección.

### Pruebas

Abrir `tests.html` en un navegador. La página ejecuta automáticamente las pruebas y muestra el resultado (PASS/FAIL) de cada caso:

- un almacenamiento vacío devuelve `[]`;
- un JSON válido sigue cargándose correctamente;
- un JSON corrupto no lanza una excepción no controlada;
- un JSON corrupto devuelve `[]`;
- después de la recuperación, `localStorage` contiene `[]`;
- se puede crear una tarea después de la recuperación;
- la validación del título vacío sigue funcionando;
- la fecha límite opcional sigue almacenándose correctamente;
- marcar una tarea como completada sigue funcionando;
- ausencia de dependencias externas, verificada directamente sobre `index.html`;
- una cadena vacía almacenada se recupera como `[]` y reemplaza el contenido (prueba adicional);
- activar la edición inline de una tarea y guardarla persiste el título y la fecha límite editados;
- editar una tarea completada conserva su estado de completada;
- un título inválido rechaza el guardado completo de la edición, incluida la fecha;
- una fecha límite inválida rechaza el guardado completo de la edición, incluido el título;
- solo una tarea puede estar en modo edición a la vez;
- mientras se edita, `localStorage` no se modifica hasta confirmar el guardado;
- cancelar la edición descarta el borrador sin alterar `localStorage`;
- el identificador de la tarea no cambia tras editarla;
- la edición de tareas no añadió referencias externas nuevas en `index.html`.
