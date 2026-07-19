# EXP-009 — Especificación funcional de TB-14

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Requisitos de entrada: EXP-008 cerrado y requisitos congelados
- Estado: borrador técnico para revisión

## 1. Objetivo funcional

Incorporar prioridades controladas y filtros de estado y prioridad en la aplicación de tareas, preservando la compatibilidad con los datos existentes y sin introducir efectos destructivos sobre la colección persistida.

## 2. Alcance

EXP-009 especifica el comportamiento esperado de TB-14 para:

- prioridad Baja, Media y Alta;
- prioridad predeterminada Media;
- visualización textual de prioridad;
- edición de prioridad;
- filtro de estado;
- filtro de prioridad;
- combinación de filtros mediante lógica AND;
- estados vacíos diferenciados;
- compatibilidad con tareas antiguas o inválidas;
- conservación del orden;
- validación atómica;
- conservación temporal de filtros durante la sesión.

## 3. Exclusiones

No forman parte de TB-14:

- prioridades personalizadas;
- categoría Sin prioridad;
- ordenamiento automático por prioridad;
- persistencia de filtros;
- búsqueda textual;
- etiquetas o categorías;
- nuevos estados de tarea;
- eliminación de tareas;
- cambios al sistema de identificación;
- dependencias o frameworks nuevos;
- bases de datos externas;
- autenticación;
- despliegue en producción.

## 4. Actor y casos de uso

### Actor

Usuario de la aplicación local de gestión de tareas.

### Casos de uso

- CU-01: crear una tarea con prioridad.
- CU-02: visualizar la prioridad de una tarea.
- CU-03: editar la prioridad de una tarea pendiente.
- CU-04: editar la prioridad de una tarea completada.
- CU-05: cancelar una edición de prioridad.
- CU-06: filtrar tareas por estado.
- CU-07: filtrar tareas por prioridad.
- CU-08: combinar filtros de estado y prioridad.
- CU-09: restablecer ambos filtros.
- CU-10: cargar tareas antiguas o con prioridad inválida.
- CU-11: crear, editar o completar tareas bajo filtros activos.
- CU-12: distinguir una lista vacía de una vista sin coincidencias.

## 5. Requisitos funcionales y criterios de aceptación

### RF-01 — Prioridad predeterminada para tareas antiguas

**Dado** que existe una tarea persistida sin atributo `priority`,  
**cuando** la aplicación la carga,  
**entonces** deberá tratarla funcionalmente como prioridad Media,  
**y** deberá continuar cargando el resto de tareas,  
**y** no deberá escribir automáticamente en `localStorage`.

### RF-02 — Prioridad predeterminada para tareas nuevas

**Dado** que el usuario crea una tarea sin cambiar la prioridad predeterminada,  
**cuando** confirma la creación con título válido,  
**entonces** la tarea deberá persistirse con `priority: "medium"`.

### RF-03 — Prioridad editable

**Dado** que existe una tarea pendiente o completada,  
**cuando** el usuario activa la edición, selecciona una prioridad válida y guarda,  
**entonces** la prioridad deberá actualizarse,  
**y** deberán conservarse `id`, `completed` y posición.

### RF-04 — Representación visible

**Dado** que una tarea tiene prioridad válida,  
**cuando** se renderiza,  
**entonces** deberá mostrarse el texto Baja, Media o Alta,  
**y** el significado no dependerá únicamente de color o iconos.

### RF-05 — Opciones del filtro de prioridad

El control deberá ofrecer exclusivamente:

- Todas
- Baja
- Media
- Alta

No deberá aceptar prioridades personalizadas.

### RF-06 — Opciones del filtro de estado

El control deberá ofrecer exclusivamente:

- Todas
- Pendientes
- Completadas

### RF-07 — Combinación de filtros

**Dado** que ambos filtros tienen valores distintos de Todas,  
**cuando** se calcula la vista,  
**entonces** una tarea solo deberá mostrarse si cumple simultáneamente ambos filtros.

### RF-08 — Aplicación inmediata

**Dado** que el usuario cambia cualquiera de los filtros,  
**cuando** el valor cambia,  
**entonces** la lista deberá actualizarse inmediatamente,  
**sin** botón Aplicar.

### RF-09 — Efecto no destructivo

**Dado** cualquier cambio de filtros,  
**cuando** se actualiza la vista,  
**entonces** no deberá modificarse:

- la colección persistida;
- el orden persistido;
- el estado de completitud;
- la prioridad;
- `localStorage`.

### RF-10 — Persistencia de filtros

**Dado** que existen filtros activos,  
**cuando** se recarga la página,  
**entonces** ambos filtros deberán volver a Todas.

### RF-11 — Conservación durante la sesión

**Dado** que existen filtros activos,  
**cuando** el usuario crea, edita o completa una tarea,  
**entonces** los filtros deberán conservarse mientras la página permanezca abierta.

### RF-12 — Creación bajo filtros activos

**Dado** que existen filtros activos,  
**cuando** se crea una tarea válida que no coincide con ellos,  
**entonces** la tarea deberá persistirse,  
**pero** no deberá aparecer en la vista actual.

### RF-13 — Reevaluación tras edición

**Dado** que una tarea visible está siendo editada,  
**cuando** se guarda una prioridad que deja de coincidir con los filtros,  
**entonces** deberá desaparecer inmediatamente de la vista,  
**sin** ser eliminada ni reordenada.

### RF-14 — Reevaluación tras cambio de estado

**Dado** que una tarea visible cambia a completada,  
**cuando** deja de coincidir con el filtro de estado,  
**entonces** deberá desaparecer inmediatamente de la vista.

### RF-15 — Restablecimiento de vista

**Dado** que existen filtros activos,  
**cuando** ambos se seleccionan como Todas,  
**entonces** deberán mostrarse nuevamente todas las tareas,  
**sin** recargar, reordenar ni modificar datos.

### RF-16 — Estado vacío sin tareas

**Dado** que la colección persistida está vacía,  
**cuando** se renderiza la aplicación,  
**entonces** deberá mostrarse:

`No hay tareas registradas`

### RF-17 — Estado vacío por filtros

**Dado** que existen tareas persistidas,  
**y** ninguna coincide con los filtros activos,  
**cuando** se renderiza la vista,  
**entonces** deberá mostrarse:

`No hay tareas que coincidan con los filtros seleccionados`

### RF-18 — Conservación del orden

**Dado** que una tarea cambia de prioridad,  
**cuando** se guarda la edición,  
**entonces** conservará su posición en la colección y en cualquier vista donde continúe visible.

### RF-19 — Cancelación de edición

**Dado** que el usuario modifica el borrador de prioridad,  
**cuando** cancela la edición,  
**entonces** deberá conservarse la prioridad original,  
**y** `localStorage` deberá permanecer intacto.

### RF-20 — Rechazo atómico durante edición

**Dado** que título, fecha o prioridad son inválidos,  
**cuando** el usuario intenta guardar,  
**entonces** el guardado completo deberá rechazarse,  
**y** no se modificará ningún campo persistido,  
**y** el borrador permanecerá activo.

### RF-21 — Rechazo durante creación

**Dado** que se intenta crear una tarea con prioridad explícitamente inválida,  
**cuando** se confirma la creación,  
**entonces** no deberá crearse ni persistirse ninguna tarea,  
**y** deberá mostrarse un mensaje claro sobre la prioridad.

### RF-22 — Recuperación ante datos inválidos

**Dado** que una tarea persistida contiene prioridad ausente, desconocida o inválida,  
**cuando** la aplicación la carga,  
**entonces** deberá tratarla como Media,  
**y** no deberá impedir la carga de las demás tareas.

## 6. Reglas del dominio

- Solo `low`, `medium` y `high` son prioridades internas válidas.
- `medium` es el valor predeterminado funcional.
- La prioridad es independiente de `completed`.
- Los filtros representan estado de vista, no datos persistidos.
- La combinación de filtros usa lógica AND.
- El filtrado produce una colección derivada.
- Crear, editar o completar no reinicia filtros.
- La validación de edición es atómica.
- La normalización de datos antiguos ocurre durante la carga sin escritura automática.
- Cambiar prioridad no altera el orden.

## 7. Casos límite obligatorios

La implementación y las pruebas posteriores deberán cubrir:

1. aplicación sin tareas;
2. tareas antiguas sin prioridad;
3. tareas con prioridad inválida;
4. creación sin selección explícita de prioridad;
5. creación con prioridad inválida;
6. edición de tarea pendiente;
7. edición de tarea completada;
8. cancelación de edición;
9. rechazo atómico de edición;
10. combinación de filtros sin coincidencias;
11. tarea creada que no coincide con filtros activos;
12. tarea editada que deja de coincidir;
13. cambio de estado que elimina la tarea de la vista;
14. restablecimiento de ambos filtros a Todas;
15. recarga de página con filtros activos;
16. conservación del orden tras editar prioridad;
17. carga de varias tareas donde solo una tiene prioridad inválida.

## 8. Compatibilidad con datos existentes

El formato persistido seguirá siendo un arreglo de objetos bajo la clave `tasks`.

Formato esperado después de TB-14:

```json
[
  {
    "id": "123",
    "title": "Ejemplo",
    "completed": false,
    "dueDate": "",
    "priority": "medium"
  }
]
```

Las tareas anteriores sin `priority` seguirán siendo utilizables.

La carga deberá normalizarlas en memoria como `medium`, sin escribir automáticamente el valor corregido.

La siguiente operación válida que persista la colección podrá guardar el objeto ya normalizado.

## 9. Mensajes funcionales

Mensajes obligatorios:

- Sin tareas: `No hay tareas registradas`
- Sin coincidencias: `No hay tareas que coincidan con los filtros seleccionados`

La validación de prioridad inválida deberá producir un mensaje claro y específico. El texto exacto podrá definirse durante el diseño modular, pero no deberá confundirse con los errores de título o fecha.

## 10. Preguntas abiertas

No quedan preguntas funcionales bloqueantes.

Quedan para los artefactos técnicos posteriores:

- ubicación exacta de los controles en `index.html`;
- nombres concretos de funciones;
- distribución interna de responsabilidades dentro de `app.js`;
- estructura exacta de pruebas;
- slice seleccionada para EXP-010.

## 11. Criterio de aprobación

Esta especificación podrá aprobarse cuando:

- RF-01 a RF-22 tengan comportamiento verificable;
- no existan contradicciones con los requisitos congelados;
- todos los casos límite estén cubiertos;
- la matriz de trazabilidad asigne cada requisito a una prueba prevista y una vertical slice;
- la revisión independiente no encuentre brechas bloqueantes.
