# EXP-009 — Modelo conceptual del dominio

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Estado: corregido tras revisión independiente

## 1. Entidad principal

### Tarea

| Atributo | Tipo conceptual | Obligatorio | Regla |
|---|---|---:|---|
| `id` | cadena | sí | estable durante edición |
| `title` | cadena | sí | no vacío |
| `completed` | booleano | sí | `false` Pendiente; `true` Completada |
| `dueDate` | cadena | sí | vacía o `YYYY-MM-DD` |
| `priority` | prioridad | sí funcionalmente | `low`, `medium` o `high` |

## 2. Prioridad

Valores internos:

- `low`
- `medium`
- `high`

Valor predeterminado:

- `medium`

Etiquetas visibles:

- `low` → Baja
- `medium` → Media
- `high` → Alta

## 3. Estados y transiciones

Estados:

- Pendiente: `completed === false`
- Completada: `completed === true`

Transiciones obligatorias:

```text
Pendiente → Completada
Completada → Pendiente
```

Ambas transiciones:

- conservan `id`, título, fecha, prioridad y posición;
- persisten la colección;
- provocan reevaluación inmediata contra filtros activos.

La operación técnica recomendada es `toggleTaskCompletion(id)` o equivalente.

`completeTask(id)` podrá conservarse como envoltorio compatible para pruebas anteriores.

## 4. Estado temporal de vista

```text
activeFilters = {
  status: 'all' | 'pending' | 'completed',
  priority: 'all' | 'low' | 'medium' | 'high'
}
```

No se persiste y vuelve a `all` al recargar.

## 5. Normalización

- prioridad válida: conservar;
- prioridad ausente o inválida: usar `medium`;
- normalización en memoria;
- sin escritura automática durante carga.

## 6. Creación

- omisión de prioridad: `medium`;
- prioridad válida explícita: conservar;
- prioridad inválida explícita: rechazar creación completa.

## 7. Edición

El borrador incluye:

```text
{
  id,
  title,
  dueDate,
  priority
}
```

Título, fecha y prioridad se validan antes de mutar.

La edición es atómica.

## 8. Operaciones

### Crear

```text
validar → crear pendiente → añadir al final → persistir
```

### Editar

```text
crear borrador → validar todo → actualizar sin cambiar id, estado ni posición → persistir
```

### Cancelar

```text
descartar borrador → no persistir
```

### Alternar estado

```text
localizar tarea → invertir completed → conservar demás campos → persistir → reevaluar vista
```

### Filtrar

```text
colección normalizada + filtros → AND → vista derivada → no persistir
```

## 9. Invariantes

- RI-01 a RI-10 congeladas permanecen vigentes.
- RI-11: crear, editar o alternar estado no reinicia filtros.
- RI-12: una tarea puede persistir aunque no sea visible.
- RI-13: el cambio de estado es reversible.
- RI-14: ambas direcciones del cambio de estado producen reevaluación de vista.

## 10. Estados inválidos

- título vacío;
- fecha inválida;
- prioridad inválida en entrada;
- borrador sin tarea;
- filtro inválido.

Datos antiguos inválidos se recuperan; entrada nueva inválida se rechaza.

## 11. Supuestos

- clave `tasks`;
- objetos planos;
- sin módulos ni dependencias;
- un borrador activo;
- orden de inserción;
- vista derivada;
- transición reversible.

## 12. Trazabilidad

Cubre RF-01 a RF-22 y corrige RF-14 para incluir:

- marcar;
- desmarcar;
- reevaluar en ambas direcciones.
