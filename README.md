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

### Pruebas

Abrir `tests.html` en un navegador. La página ejecuta automáticamente las pruebas y muestra el resultado (PASS/FAIL) de cada caso:

- una tarea sin fecha límite se crea y muestra correctamente;
- una tarea con fecha límite guarda la fecha en formato `YYYY-MM-DD`;
- la fecha límite se muestra en formato `DD/MM/YYYY`;
- una tarea sin fecha límite no muestra texto de fecha;
- una tarea antigua sin la propiedad de fecha sigue cargándose correctamente;
- la validación de título vacío sigue funcionando;
- marcar una tarea como completada sigue funcionando;
- la fecha límite persiste después de leer nuevamente `localStorage`;
- ausencia de dependencias externas, verificada directamente sobre `index.html`.
