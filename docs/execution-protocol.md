# Protocolo de ejecución del piloto

## Objetivo

Establecer el procedimiento obligatorio para ejecutar experimentos dentro del sandbox sin saltarse controles, mezclar etapas ni modificar directamente la rama `main`.

## 1. Selección de la tarea

Antes de iniciar:

- seleccionar una tarea del banco;
- confirmar la ruta de trabajo;
- confirmar el nivel de control;
- identificar qué capacidad del workflow se evaluará;
- definir si la tarea pertenece al primer piloto o a un ciclo posterior.

No se podrá ejecutar una tarea que no figure en el banco sin aprobarla previamente.

## 2. Diseño del experimento

Crear una copia de `experiment-template.md` y completar como mínimo:

- identificación;
- propósito;
- hipótesis;
- tarea;
- estado inicial;
- alcance permitido;
- alcance no permitido;
- resultado esperado;
- criterios de éxito;
- riesgos;
- procedimiento de reversión.

El experimento deberá estar marcado como `aprobado` antes de ejecutar cambios.

## 3. Preparación del repositorio

- confirmar que `main` está estable;
- registrar el commit inicial;
- crear una rama exclusiva;
- verificar que no existen cambios pendientes;
- completar la sección inicial del checklist;
- iniciar un registro de sesión.

Formato recomendado para la rama:

`experiment/EXP-ID-descripcion-breve`

Ejemplo:

`experiment/EXP-001-create-minimal-app`

## 4. Entrega de instrucciones a la IA

La herramienta recibirá:

- objetivo exacto;
- contexto necesario;
- archivos permitidos;
- restricciones;
- pruebas requeridas;
- acciones prohibidas;
- criterio de finalización.

La instrucción completa deberá copiarse en el registro de sesión.

## 5. Revisión obligatoria del plan

Antes de autorizar modificaciones, la IA deberá presentar un plan.

El responsable humano comprobará:

- que el plan responde al objetivo;
- que no amplía el alcance;
- que incluye pruebas;
- que contempla documentación;
- que identifica riesgos;
- que mantiene una vía de reversión.

Si el plan no cumple estos puntos, deberá corregirse antes de continuar.

## 6. Ejecución

Durante la ejecución:

- trabajar únicamente en la rama del experimento;
- registrar acciones relevantes;
- no añadir dependencias no aprobadas;
- no utilizar credenciales reales;
- no modificar archivos fuera del alcance;
- detenerse ante una condición no prevista;
- solicitar autorización para ampliar el alcance.

La IA no podrá considerar completada la tarea solo porque el código haya sido generado.

## 7. Verificación

Al finalizar los cambios:

- revisar los archivos modificados;
- ejecutar las pruebas definidas;
- realizar verificaciones manuales cuando corresponda;
- comprobar que no existen cambios accidentales;
- actualizar la documentación necesaria;
- conservar logs y evidencias;
- completar el checklist.

Sin pruebas ejecutadas no existe resultado aprobado.

## 8. Evaluación

Aplicar `evaluation-rubric.md`.

Registrar:

- puntuación por criterio;
- evidencia que justifica cada puntuación;
- puntuación total;
- reglas de bloqueo;
- decisión preliminar.

Las reglas de bloqueo prevalecen sobre la puntuación total.

## 9. Reversión

La reversión deberá ejecutarse cuando:

- exista una acción destructiva;
- aparezcan cambios fuera del alcance;
- fallen pruebas críticas;
- se pierda trazabilidad;
- el cambio no pueda validarse;
- se active una regla de bloqueo;
- el experimento exija probar explícitamente la reversión.

Después de revertir:

- verificar el estado de los archivos;
- iniciar la aplicación;
- ejecutar nuevamente las pruebas iniciales;
- registrar la evidencia.

## 10. Decisión

El experimento concluirá con una de estas decisiones:

- aprobado;
- aprobado con correcciones;
- repetir;
- rechazado.

Además, el componente evaluado recibirá una decisión:

- incorporar;
- incorporar con restricciones;
- experimentar nuevamente;
- posponer;
- rechazar.

Toda decisión deberá estar sustentada en evidencia, no en impresión personal.

## 11. Integración a `main`

Solo podrá integrarse un cambio cuando:

- el experimento esté aprobado;
- las pruebas hayan sido superadas;
- la documentación esté actualizada;
- no exista una regla de bloqueo;
- la revisión técnica haya concluido;
- el responsable humano autorice la integración.

La integración deberá realizarse mediante pull request. No se harán cambios funcionales directamente en `main`.

## 12. Cierre

Antes de cerrar:

- completar el registro de sesión;
- completar la ficha del experimento;
- guardar el resultado de la rúbrica;
- registrar commits y pull request;
- actualizar el tablero de resultados;
- definir el próximo paso;
- conservar o eliminar la rama según la decisión.

## Regla metodológica

No se podrá pasar a instalación o ejecución práctica mientras falte algún instrumento obligatorio del paquete operativo.
