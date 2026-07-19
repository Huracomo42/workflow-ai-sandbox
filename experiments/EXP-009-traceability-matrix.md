# EXP-009 — Matriz de trazabilidad

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Estado: borrador técnico para revisión

## 1. Matriz principal

| Requisito congelado | Criterio de aceptación verificable | Regla de dominio | Slice | Prueba prevista | Evidencia esperada |
|---|---|---|---|---|---|
| RF-01 | Tarea sin prioridad carga como Media sin escritura automática | RI-01, RI-03 | VS-01 | T010-06, T010-08 | tarea normalizada en memoria; `localStorage` intacto |
| RF-02 | Creación sin prioridad explícita persiste `medium` | RI-01, RI-02 | VS-01 | T010-01 | objeto persistido con `priority: "medium"` |
| RF-03 | Prioridad editable en tareas pendientes y completadas | RI-08 | VS-02 | T011-01, T011-02 | prioridad actualizada conservando estado |
| RF-04 | Prioridad visible mediante texto Baja, Media o Alta | RI-01, RI-02 | VS-01 | T010-12 | texto visible en fila renderizada |
| RF-05 | Filtro de prioridad ofrece Todas, Baja, Media y Alta | RI-02 | VS-04 | T013-01 | opciones exactas del selector |
| RF-06 | Filtro de estado ofrece Todas, Pendientes y Completadas | RI-05 | VS-03 | T012-01 | opciones exactas del selector |
| RF-07 | Ambos filtros se combinan mediante AND | RI-05, RI-09 | VS-04 | T013-02, T013-03 | solo tareas que cumplen ambas condiciones |
| RF-08 | Cambio de filtro actualiza la vista inmediatamente | RI-09 | VS-03, VS-04 | T012-02, T013-04 | renderizado inmediato sin botón Aplicar |
| RF-09 | Filtrar no modifica datos, orden ni `localStorage` | RI-04 | VS-03, VS-04 | T012-03, T013-05 | colección y almacenamiento sin cambios |
| RF-10 | Recargar restablece ambos filtros a Todas | RI-10 | VS-03, VS-04 | T012-04, T013-06 | filtros inicializados en `all` |
| RF-11 | Crear, editar o completar conserva filtros durante la sesión | RI-09 | VS-03, VS-04, VS-05 | T014-01, T014-02, T014-03 | estado `activeFilters` conservado |
| RF-12 | Tarea nueva no coincidente se guarda pero no se muestra | RI-04, RI-09 | VS-05 | T014-04 | tarea persistida y ausente de vista |
| RF-13 | Tarea editada que deja de coincidir desaparece de la vista | RI-09 | VS-05 | T014-05 | tarea persistida y vista reevaluada |
| RF-14A | Pendiente → Completada reevalúa inmediatamente la visibilidad | RI-09 | VS-03 | T012-05 | tarea desaparece o aparece según filtros |
| RF-14B | Completada → Pendiente reevalúa inmediatamente la visibilidad | RI-09 | VS-03 | T012-06 | tarea desaparece o aparece según filtros |
| RF-15 | Restablecer ambos filtros muestra todas las tareas sin alterar datos | RI-04, RI-05 | VS-04 | T013-07 | colección completa visible y almacenamiento intacto |
| RF-16 | Colección vacía muestra `No hay tareas registradas` | RI-09 | VS-06 | T015-01 | mensaje exacto |
| RF-17 | Sin coincidencias muestra mensaje diferenciado | RI-09 | VS-06 | T015-02 | mensaje exacto de filtros |
| RF-18 | Cambiar prioridad conserva posición | RI-07 | VS-02, VS-05 | T011-03, T014-06 | mismo índice antes y después |
| RF-19 | Cancelar edición conserva prioridad original | RI-06 | VS-02 | T011-04 | borrador descartado; almacenamiento intacto |
| RF-20 | Prioridad inválida rechaza edición completa | RI-06 | VS-02 | T011-05 | título, fecha y prioridad originales |
| RF-21 | Prioridad inválida rechaza creación completa | RI-01, RI-02 | VS-01 | T010-05 | ninguna tarea ni persistencia parcial |
| RF-22 | Prioridad inválida almacenada se trata como Media sin bloquear otras tareas | RI-03 | VS-01 | T010-07, T010-09 | todas las tareas cargan; inválida normalizada |

## 2. Cobertura de invariantes

| Invariante | Diseño que la materializa | Slice principal | Evidencia prevista |
|---|---|---|---|
| RI-01 | validación y normalización cerrada de prioridad | VS-01 | T010-01 a T010-07 |
| RI-02 | conjunto `low`, `medium`, `high` | VS-01 | T010-02 a T010-05 |
| RI-03 | `normalizePriority()` y `normalizeTask()` | VS-01 | T010-06 a T010-09 |
| RI-04 | `filterTasks()` como función derivada no persistente | VS-03, VS-04 | comparación de colección y almacenamiento |
| RI-05 | condiciones de estado y prioridad combinadas con AND | VS-04 | T013-02, T013-03 |
| RI-06 | validación previa a mutación en edición | VS-02 | T011-04, T011-05 |
| RI-07 | actualización in situ sin ordenar | VS-02 | T011-03 |
| RI-08 | borrador y actualización permiten tareas completadas | VS-02 | T011-02 |
| RI-09 | renderizado usa colección visible derivada | VS-03, VS-04, VS-05, VS-06 | pruebas de visibilidad y estados vacíos |
| RI-10 | filtros iniciales no persistidos | VS-03, VS-04 | pruebas de recarga |

## 3. Cobertura por slice

| Slice | Requisitos asignados | Cobertura |
|---|---|---|
| VS-01 | RF-01, RF-02, RF-04, RF-21, RF-22 | completa para prioridad base y compatibilidad |
| VS-02 | RF-03, RF-18, RF-19, RF-20 | completa para edición de prioridad |
| VS-03 | RF-06, RF-08, RF-09, RF-10, RF-11, RF-14 | completa para filtro de estado |
| VS-04 | RF-05, RF-07, RF-08, RF-09, RF-10, RF-11, RF-15 | completa para prioridad y combinación |
| VS-05 | RF-11, RF-12, RF-13, RF-18 | completa para coherencia bajo filtros |
| VS-06 | RF-16, RF-17 y regresión transversal | completa para estados vacíos y cierre |

## 4. Cobertura de casos límite

| Caso límite | Slice | Prueba prevista |
|---|---|---|
| aplicación sin tareas | VS-06 | T015-01 |
| tarea antigua sin prioridad | VS-01 | T010-06 |
| tarea con prioridad inválida | VS-01 | T010-07 |
| creación sin selección explícita | VS-01 | T010-01 |
| creación con prioridad inválida | VS-01 | T010-05 |
| edición de tarea pendiente | VS-02 | T011-01 |
| edición de tarea completada | VS-02 | T011-02 |
| cancelación de edición | VS-02 | T011-04 |
| rechazo atómico de edición | VS-02 | T011-05 |
| filtros sin coincidencias | VS-06 | T015-02 |
| creación que no coincide | VS-05 | T014-04 |
| edición que deja de coincidir | VS-05 | T014-05 |
| Pendiente → Completada reevalúa la vista | VS-03 | T012-05 |
| Completada → Pendiente reevalúa la vista | VS-03 | T012-06 |
| restablecimiento de filtros | VS-04 | T013-07 |
| recarga con filtros activos | VS-03, VS-04 | T012-04, T013-06 |
| conservación de orden | VS-02, VS-05 | T011-03, T014-06 |
| una tarea inválida no bloquea otras | VS-01 | T010-09 |

## 5. Regresión obligatoria

Cada slice deberá ejecutar:

- todas las pruebas `T005-*`;
- todas las pruebas `T007-*`;
- controles finales aplicables;
- prueba de ausencia de dependencias externas.

La numeración `T010-*` a `T015-*` es provisional y podrá ajustarse al experimento real, pero no podrá eliminarse la cobertura descrita.

## 6. Brechas

No se identifican requisitos sin:

- criterio de aceptación;
- regla de dominio;
- vertical slice;
- prueba prevista;
- evidencia esperada.

No existen brechas funcionales bloqueantes.

## 7. Decisiones técnicas cerradas

La trazabilidad confirma que quedan resueltas las decisiones diferidas por EXP-008:

- valores internos de prioridad;
- estructura del objeto persistido;
- momento de normalización;
- política de persistencia de normalización;
- frontera lógica entre dominio, interfaz y persistencia;
- archivos potencialmente afectados;
- distribución en vertical slices;
- selección de VS-01 para EXP-010.

## 8. Condición de aprobación

Esta matriz podrá aprobarse si la revisión independiente confirma:

- cobertura de RF-01 a RF-22;
- cobertura de RI-01 a RI-10;
- ausencia de requisitos huérfanos;
- ausencia de slices sin valor funcional;
- coherencia entre pruebas previstas y evidencia;
- alcance limitado de EXP-010 a VS-01.
