# EXP-008 — Requisitos congelados de TB-14

- Piloto: PILOT-003
- Experimento: EXP-008
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de congelamiento: 19 de julio de 2026
- Versión: 1.0
- Estado: congelado y aprobado
- Responsable de aprobación: Hugo Cornejo Villena

## 1. Propósito funcional

Incorporar prioridades controladas y filtros de estado y prioridad en la aplicación de tareas, preservando la compatibilidad con los datos existentes y sin introducir efectos destructivos sobre la información almacenada.

## 2. Definiciones funcionales

### 2.1. Prioridades

Las únicas prioridades funcionalmente válidas son:

- Baja
- Media
- Alta

No se permiten prioridades personalizadas ni una categoría separada de “Sin prioridad”.

### 2.2. Estados

Los únicos estados funcionales disponibles son:

- Pendiente
- Completada

No se incorporarán estados adicionales durante PILOT-003.

### 2.3. Filtros

Existirán dos filtros independientes:

- filtro de estado;
- filtro de prioridad.

Cada filtro incluirá una opción `Todas` que desactiva únicamente ese filtro.

## 3. Requisitos funcionales

### RF-01 — Prioridad predeterminada para tareas antiguas

Toda tarea cargada sin una prioridad válida será tratada como prioridad `Media`.

### RF-02 — Prioridad predeterminada para tareas nuevas

Toda tarea nueva se creará con prioridad `Media` cuando el usuario no seleccione explícitamente otra prioridad válida.

### RF-03 — Prioridad editable

La prioridad podrá modificarse tanto en tareas pendientes como completadas.

### RF-04 — Representación visible

La prioridad deberá mostrarse mediante texto visible: `Baja`, `Media` o `Alta`.

El significado no podrá depender únicamente de colores o iconos.

### RF-05 — Opciones del filtro de prioridad

El filtro de prioridad tendrá únicamente:

- Todas
- Baja
- Media
- Alta

### RF-06 — Opciones del filtro de estado

El filtro de estado tendrá únicamente:

- Todas
- Pendientes
- Completadas

### RF-07 — Combinación de filtros

Cuando ambos filtros estén activos, se combinarán mediante lógica `AND`.

Ejemplo: `Pendientes + Alta` mostrará únicamente tareas pendientes de prioridad alta.

### RF-08 — Aplicación inmediata

Los filtros se aplicarán inmediatamente al cambiar una opción.

No existirá un botón adicional de `Aplicar`.

### RF-09 — Efecto no destructivo

Los filtros afectarán únicamente la visualización.

No podrán:

- modificar datos;
- eliminar tareas;
- cambiar el orden persistido;
- alterar `localStorage`.

### RF-10 — Persistencia de filtros

Los filtros no se persistirán.

Al recargar la página, ambos volverán a `Todas`.

### RF-11 — Conservación durante la sesión

Después de crear o editar una tarea, los filtros activos deberán conservarse mientras la página siga abierta.

### RF-12 — Creación bajo filtros activos

Una tarea nueva se guardará correctamente aunque no coincida con los filtros activos.

Si no coincide, no aparecerá en la vista actual.

### RF-13 — Reevaluación tras edición

Después de guardar una edición, la tarea será reevaluada contra los filtros activos.

Si deja de coincidir, desaparecerá inmediatamente de la vista filtrada.

### RF-14 — Reevaluación tras cambio de estado

Al marcar o desmarcar una tarea como completada, será reevaluada inmediatamente contra los filtros activos.

Si deja de coincidir, desaparecerá de la vista actual.

### RF-15 — Restablecimiento de vista

Al seleccionar `Todas` en ambos filtros, se mostrarán nuevamente todas las tareas:

- sin recargar la página;
- conservando el orden actual;
- sin modificar datos persistidos.

### RF-16 — Estado vacío sin tareas

Cuando no existan tareas registradas, se mostrará:

`No hay tareas registradas`

### RF-17 — Estado vacío por filtros

Cuando existan tareas, pero ninguna coincida con los filtros activos, se mostrará:

`No hay tareas que coincidan con los filtros seleccionados`

Los dos estados vacíos deberán distinguirse funcionalmente.

### RF-18 — Conservación del orden

Cambiar la prioridad de una tarea no modificará su posición en la lista.

La prioridad no producirá ordenamiento automático.

### RF-19 — Cancelación de edición

Cancelar una edición descartará cualquier cambio de prioridad no guardado y conservará el valor anterior.

### RF-20 — Rechazo atómico durante edición

Si la prioridad seleccionada durante una edición es inválida, el guardado completo será rechazado.

No se actualizarán:

- título;
- fecha límite;
- prioridad.

### RF-21 — Rechazo durante creación

Si la prioridad seleccionada al crear una tarea es inválida:

- no se creará la tarea;
- no se persistirá información parcial;
- se mostrará un mensaje claro sobre el problema de prioridad.

### RF-22 — Recuperación ante datos inválidos

Si una tarea almacenada contiene una prioridad inválida o desconocida:

- será tratada como prioridad `Media`;
- seguirá cargándose;
- no bloqueará la carga de las demás tareas.

## 4. Reglas e invariantes

- RI-01: toda tarea operativa tendrá exactamente una prioridad funcional válida.
- RI-02: las prioridades funcionales válidas son únicamente Baja, Media y Alta.
- RI-03: una tarea sin prioridad válida se normaliza funcionalmente como Media.
- RI-04: los filtros nunca modifican la colección persistida.
- RI-05: los filtros de estado y prioridad se combinan mediante `AND`.
- RI-06: la edición rechazada no puede producir persistencia parcial.
- RI-07: la prioridad no altera automáticamente el orden de tareas.
- RI-08: la completitud de una tarea no impide editar su prioridad.
- RI-09: el estado visible debe corresponder siempre a los filtros activos.
- RI-10: los filtros no sobreviven a una recarga de página.

## 5. Compatibilidad con datos existentes

Las tareas creadas antes de TB-14, o aquellas con un valor de prioridad ausente, inválido o desconocido, deberán seguir siendo utilizables.

Funcionalmente serán tratadas como prioridad `Media`.

EXP-008 no determina todavía:

- si la normalización se persiste inmediatamente;
- si se aplica solo durante la carga;
- qué valores internos representarán las prioridades.

Estas decisiones pertenecen a EXP-009.

## 6. Casos límite obligatorios

La especificación y las pruebas posteriores deberán cubrir:

- aplicación sin tareas;
- tareas antiguas sin prioridad;
- tareas con prioridad inválida;
- creación sin selección explícita de prioridad;
- creación con prioridad inválida;
- edición de tarea pendiente;
- edición de tarea completada;
- cancelación de edición;
- rechazo atómico de edición;
- combinación de filtros sin coincidencias;
- tarea creada que no coincide con filtros activos;
- tarea editada que deja de coincidir;
- cambio de estado que elimina la tarea de la vista;
- restablecimiento de ambos filtros a `Todas`;
- recarga de página con filtros activos.

## 7. Exclusiones confirmadas

No forman parte de TB-14 ni de PILOT-003:

- prioridades personalizadas;
- categoría “Sin prioridad”;
- ordenamiento automático por prioridad;
- persistencia de filtros;
- etiquetas;
- categorías;
- búsqueda textual;
- nuevos estados de tarea;
- eliminación de tareas;
- cambios al sistema de identificación;
- dependencias o frameworks nuevos;
- bases de datos externas;
- autenticación;
- despliegue en producción.

## 8. Decisiones técnicas diferidas a EXP-009

EXP-008 no congela:

- los valores internos de prioridad;
- la estructura exacta del objeto persistido;
- el momento exacto de normalización de datos antiguos;
- la distribución de responsabilidades entre interfaz, dominio y persistencia;
- los archivos concretos que deberán modificarse;
- la forma visual exacta de los controles;
- la división definitiva en vertical slices.

La preferencia `low`, `medium`, `high` podrá evaluarse en EXP-009, pero no constituye todavía una decisión aprobada.

## 9. Preguntas bloqueantes

No quedan preguntas funcionales bloqueantes abiertas.

## 10. Trazabilidad de decisiones

Los requisitos anteriores consolidan las decisiones funcionales 1 a 24 y la decisión técnica diferida 15 registradas en `experiments/EXP-008-pressure-session.md`.

## 11. Aprobación

Estos requisitos quedan congelados para iniciar EXP-009 únicamente después de:

1. completar la evaluación de EXP-008;
2. actualizar `docs/results-dashboard.md`;
3. cerrar los gates restantes de EXP-008;
4. obtener aprobación humana del cierre de EXP-008.

Cualquier cambio posterior requerirá:

- identificar el requisito afectado;
- justificar el cambio;
- registrar su impacto;
- obtener aprobación humana;
- crear un nuevo commit sin reescribir el historial.
