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

### Pruebas

Abrir `tests.html` en un navegador. La página ejecuta automáticamente las pruebas y muestra el resultado (PASS/FAIL) de cada caso:

- un título válido crea y muestra una tarea;
- un título vacío no crea ni guarda una tarea;
- un título de solo espacios no crea ni guarda una tarea;
- se muestra el mensaje de error esperado;
- una tarea válida oculta el mensaje de error;
- marcar una tarea como completada sigue funcionando;
- la persistencia mediante `localStorage` sigue funcionando;
- ausencia de dependencias externas.
