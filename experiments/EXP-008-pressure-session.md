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
