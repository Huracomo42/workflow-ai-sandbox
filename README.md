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

### Pruebas

Abrir `tests.html` en un navegador. La página ejecuta automáticamente las pruebas y muestra el resultado (PASS/FAIL) de cada caso:

- creación de una tarea;
- visualización de la tarea creada;
- marcado como completada;
- persistencia mediante `localStorage`;
- ausencia de dependencias externas.
