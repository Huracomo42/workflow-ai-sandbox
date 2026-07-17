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
- una cadena vacía almacenada se recupera como `[]` y reemplaza el contenido (prueba adicional).
