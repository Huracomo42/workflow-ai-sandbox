# EXP-009 — Modelo conceptual del dominio

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Estado: borrador técnico para revisión

## 1. Entidad principal

### Tarea

Una tarea es la única entidad persistida del dominio.

Atributos:

| Atributo | Tipo conceptual | Obligatorio | Regla |
|---|---|---:|---|
| `id` | cadena | sí | Identificador estable; no cambia durante edición |
| `title` | cadena | sí | Debe contener al menos un carácter distinto de espacio |
| `completed` | booleano | sí | `false` representa Pendiente y `true` representa Completada |
| `dueDate` | cadena | sí | Vacía o fecha válida en formato `YYYY-MM-DD` |
| `priority` | prioridad | sí funcionalmente | Solo `low`, `medium` o `high` |

## 2. Valor de prioridad

La representación interna recomendada y adoptada por el diseño es:

- `low`
- `medium`
- `high`

La representación visible será:

| Valor interno | Texto visible |
|---|---|
| `low` | Baja |
| `medium` | Media |
| `high` | Alta |

Justificación:

- evita almacenar textos dependientes del idioma;
- permite validación mediante un conjunto cerrado;
- mantiene una correspondencia directa y simple;
- no introduce enumeraciones, clases ni dependencias adicionales.

## 3. Estados de una tarea

Los estados funcionales son:

- Pendiente: `completed === false`
- Completada: `completed === true`

La prioridad es independiente del estado.

Una tarea completada:

- conserva su prioridad;
- puede cambiar de prioridad;
- puede editar título y fecha;
- no adquiere un estado nuevo.

## 4. Estado no persistido de la vista

Los filtros pertenecen al estado temporal de la interfaz, no a la entidad Tarea.

Estado conceptual:

```text
activeFilters = {
  status: 'all' | 'pending' | 'completed',
  priority: 'all' | 'low' | 'medium' | 'high'
}
```

Valores iniciales:

```text
status = 'all'
priority = 'all'
```

Este estado:

- vive únicamente mientras la página está abierta;
- no se guarda en `localStorage`;
- no modifica las tareas;
- se conserva después de crear, editar o completar una tarea;
- vuelve a sus valores iniciales al recargar.

## 5. Normalización de tareas cargadas

Toda tarea recuperada desde `localStorage` deberá ser normalizada funcionalmente.

Regla de prioridad:

```text
si priority es low, medium o high:
    conservar el valor
en cualquier otro caso:
    usar medium
```

La normalización se aplicará durante la carga y devolverá objetos operativos válidos para la aplicación.

Decisión de persistencia:

- la normalización no escribirá automáticamente en `localStorage`;
- el dato normalizado se persistirá únicamente cuando una operación posterior guarde la colección;
- cargar tareas antiguas no producirá por sí mismo un efecto de escritura.

Justificación:

- cumple la compatibilidad funcional;
- evita modificar datos solo por abrir la aplicación;
- preserva el carácter no destructivo de la carga;
- reduce efectos secundarios ocultos.

## 6. Creación de tareas

Una tarea nueva tendrá prioridad `medium` cuando:

- no se reciba una prioridad explícita;
- se reciba una cadena vacía;
- la interfaz mantenga la selección predeterminada Media.

Una prioridad explícitamente inválida deberá rechazar la creación completa.

No se persistirá ningún dato parcial.

## 7. Edición de tareas

El borrador de edición deberá incluir:

```text
{
  id,
  title,
  dueDate,
  priority
}
```

La edición será atómica.

Antes de modificar la colección persistida deberán validarse conjuntamente:

- título;
- fecha;
- prioridad.

Si cualquiera es inválido:

- no se modificará título;
- no se modificará fecha;
- no se modificará prioridad;
- el borrador permanecerá activo;
- `localStorage` permanecerá intacto.

Cancelar la edición eliminará el borrador y conservará íntegramente la tarea original.

## 8. Transiciones

### Crear

```text
datos válidos
→ crear tarea pendiente
→ asignar prioridad válida
→ añadir al final de la colección
→ persistir colección completa
```

### Editar

```text
tarea existente
→ crear borrador
→ modificar borrador sin persistir
→ validar todos los campos
→ sustituir valores editables
→ conservar id y completed
→ persistir colección completa
```

### Cancelar edición

```text
borrador activo
→ descartar borrador
→ no modificar colección
→ no escribir en localStorage
```

### Completar

```text
tarea pendiente existente
→ completed = true
→ conservar id, título, fecha, prioridad y posición
→ persistir colección completa
```

### Filtrar

```text
colección normalizada + filtros activos
→ evaluar estado
→ evaluar prioridad
→ combinar condiciones mediante AND
→ producir vista derivada
→ no modificar ni persistir colección
```

## 9. Reglas e invariantes

- RI-01: toda tarea operativa tiene exactamente una prioridad válida.
- RI-02: las prioridades válidas son únicamente `low`, `medium` y `high`.
- RI-03: una prioridad ausente, desconocida o inválida se interpreta como `medium` al cargar.
- RI-04: los filtros generan una vista derivada y nunca modifican la colección.
- RI-05: los filtros de estado y prioridad se combinan mediante lógica AND.
- RI-06: una edición rechazada no produce persistencia parcial.
- RI-07: cambiar la prioridad no altera la posición de una tarea.
- RI-08: una tarea completada continúa siendo editable.
- RI-09: la lista visible debe corresponder a los filtros activos.
- RI-10: los filtros no sobreviven a una recarga.
- RI-11: crear, editar o completar una tarea no reinicia los filtros.
- RI-12: una tarea puede existir correctamente aunque no sea visible bajo los filtros activos.

## 10. Estados inválidos

Se consideran estados inválidos:

- tarea con título vacío o compuesto solo por espacios;
- fecha no vacía fuera del formato admitido;
- prioridad distinta de `low`, `medium` o `high` durante creación o edición;
- borrador de edición sin una tarea asociada;
- filtro con un valor fuera de su conjunto permitido.

Tratamiento:

- los datos persistidos antiguos con prioridad inválida se recuperan como `medium`;
- los datos introducidos por creación o edición con prioridad inválida se rechazan;
- los filtros inválidos deberán volver a `all` en lugar de afectar datos.

## 11. Supuestos aprobados por este diseño

- Se mantiene `localStorage` bajo la clave `tasks`.
- Se mantiene el objeto plano como estructura persistida.
- No se introducen clases, módulos, frameworks ni dependencias.
- Se mantiene un único borrador de edición activo.
- Se mantiene el orden de inserción actual.
- La lista filtrada será una derivación en memoria de la colección completa.
- La función de carga podrá normalizar objetos devueltos sin persistir inmediatamente esa normalización.

## 12. Trazabilidad

Este modelo cubre:

- RF-01 a RF-04;
- RF-07 a RF-15;
- RF-18 a RF-22;
- RI-01 a RI-10;
- decisiones técnicas diferidas sobre representación, persistencia, normalización y estado de filtros.

Los controles visuales, estados vacíos y distribución concreta de funciones se detallarán en los artefactos posteriores de EXP-009.
