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
