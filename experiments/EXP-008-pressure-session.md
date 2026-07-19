# EXP-008 — Registro de Domain Pressure Session

- Fecha real de ejecución: pendiente
- Estado: no iniciado
- Responsable de decisiones: Hugo Cornejo Villena

## 1. Actores y objetivos

Pendiente.

## 2. Definiciones funcionales

Pendiente.

## 3. Entidades y atributos

Pendiente.

## 4. Estados y transiciones

Pendiente.

## 5. Reglas e invariantes

Pendiente.

## 6. Compatibilidad con datos anteriores

Pendiente.

## 7. Filtros y combinaciones

Pendiente.

## 8. Casos límite y estados inválidos

Pendiente.

## 9. Alternativas consideradas

Pendiente.

## 10. Decisiones humanas

Pendiente.

## 11. Preguntas abiertas

Pendiente. No puede cerrarse EXP-008 mientras exista una pregunta bloqueante.

## Decisión funcional 1 — Compatibilidad con tareas antiguas

- Fecha: 19 de julio de 2026
- Decisión: toda tarea cargada sin campo `priority` será tratada como prioridad `media`.
- Motivo: mantener un valor neutral, evitar clasificar artificialmente tareas antiguas como urgentes o irrelevantes y preservar compatibilidad.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 2 — Prioridad predeterminada en tareas nuevas

- Fecha: 19 de julio de 2026
- Decisión: toda tarea nueva se creará con prioridad `media` cuando el usuario no seleccione explícitamente otra prioridad.
- Motivo: evitar estados sin prioridad y mantener coherencia con las tareas antiguas.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 3 — Combinación de filtros

- Fecha: 19 de julio de 2026
- Decisión: los filtros de estado y prioridad se combinarán mediante lógica `AND`.
- Ejemplo: el filtro `pendientes + alta` mostrará únicamente tareas pendientes con prioridad `alta`.
- Motivo: asegurar resultados previsibles, precisos y verificables cuando ambos filtros estén activos.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 4 — Opción “Todas” en filtros

- Fecha: 19 de julio de 2026
- Decisión: los filtros de estado y prioridad incluirán una opción `Todas`.
- Comportamiento: seleccionar `Todas` desactiva únicamente ese filtro y conserva el otro filtro activo.
- Ejemplo: `estado = Todas` y `prioridad = alta` mostrará todas las tareas de prioridad alta, sin importar su estado.
- Motivo: permitir combinaciones claras sin obligar a restablecer ambos filtros.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 5 — Efecto no destructivo de los filtros

- Fecha: 19 de julio de 2026
- Decisión: los filtros afectarán únicamente la visualización de la lista.
- Restricciones:
  - no modificarán datos;
  - no eliminarán tareas;
  - no cambiarán el orden persistido;
  - no alterarán `localStorage`.
- Motivo: separar claramente filtrado y persistencia, evitando efectos laterales.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 6 — Edición de prioridad en tareas completadas

- Fecha: 19 de julio de 2026
- Decisión: la prioridad podrá modificarse tanto en tareas pendientes como completadas.
- Motivo: el estado de completitud no bloquea la corrección o actualización de metadatos.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 7 — Recuperación ante prioridad inválida

- Fecha: 19 de julio de 2026
- Decisión: si una tarea contiene un valor de prioridad inválido o desconocido en `localStorage`, se tratará como prioridad `media`.
- Comportamiento: la tarea seguirá cargándose y no bloqueará la carga de las demás.
- Motivo: preservar disponibilidad y compatibilidad ante datos defectuosos.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 8 — Persistencia de filtros

- Fecha: 19 de julio de 2026
- Decisión: los filtros de estado y prioridad no se persistirán en `localStorage`.
- Comportamiento: al recargar la página, ambos filtros volverán a `Todas`.
- Motivo: evitar estado adicional innecesario y mantener el alcance del piloto controlado.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 9 — Estado vacío por filtros

- Fecha: 19 de julio de 2026
- Decisión: cuando una combinación de filtros no produzca resultados, la interfaz mostrará el mensaje `No hay tareas que coincidan con los filtros seleccionados`.
- Distinción: este estado no debe confundirse con una aplicación sin tareas registradas.
- Motivo: hacer visible que existen tareas ocultas por los filtros activos.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 10 — Representación visible de prioridad

- Fecha: 19 de julio de 2026
- Decisión: la prioridad se mostrará mediante texto visible: `Baja`, `Media` y `Alta`.
- Restricción: el significado de la prioridad no dependerá únicamente de colores o iconos.
- Motivo: evitar ambigüedad y preservar accesibilidad básica.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 11 — Conservación del orden

- Fecha: 19 de julio de 2026
- Decisión: cambiar la prioridad de una tarea no modificará su posición en la lista.
- Restricción: la prioridad no producirá ordenamiento automático.
- Motivo: mantener separado el concepto de prioridad del orden de visualización y respetar el alcance aprobado.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 12 — Cancelación de cambios de prioridad

- Fecha: 19 de julio de 2026
- Decisión: cancelar la edición descartará cualquier cambio de prioridad no guardado.
- Comportamiento: la tarea conservará la prioridad que tenía antes de iniciar la edición.
- Motivo: mantener la edición como borrador temporal y evitar persistencia prematura.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 12 — Cancelación de cambios de prioridad

- Fecha: 19 de julio de 2026
- Decisión: cancelar la edición descartará cualquier cambio de prioridad no guardado.
- Comportamiento: la tarea conservará la prioridad que tenía antes de iniciar la edición.
- Motivo: mantener la edición como borrador temporal y evitar persistencia prematura.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión funcional 14 — Rechazo de creación por prioridad inválida

- Fecha: 19 de julio de 2026
- Decisión: si la prioridad seleccionada al crear una tarea es inválida, la creación será rechazada por completo.
- Comportamiento:
  - no se creará la tarea;
  - no se persistirá información parcial;
  - se mostrará un mensaje claro indicando el problema de prioridad.
- Motivo: mantener consistencia atómica entre creación y edición.
- Tipo: regla funcional congelable.
- Autoriza: Hugo Cornejo Villena.

## Decisión diferida 15 — Representación interna de prioridad

- Fecha: 19 de julio de 2026
- Preferencia considerada: representar internamente las prioridades como `low`, `medium` y `high`.
- Decisión metodológica: no se congela en EXP-008 porque corresponde al diseño técnico.
- Requisito funcional vigente: la interfaz mostrará `Baja`, `Media` y `Alta`.
- Próxima evaluación: EXP-009, durante el modelo de dominio y diseño modular.
- Autoriza el diferimiento: Hugo Cornejo Villena.
