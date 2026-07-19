# EXP-009 — Registro de sesión

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Sesión: EXP-009-S01
- Fecha: 19 de julio de 2026
- Ruta: estándar
- Nivel de control: alto
- Estado: diseño técnico completado; pendiente de revisión independiente

## 1. Condiciones de entrada

- EXP-008 cerrado y aprobado.
- PR #12 integrado en `main`.
- Gate P3-3 autorizado por Hugo Cornejo Villena.
- Rama creada: `pilot-003/exp-009-technical-design`.
- Árbol de trabajo limpio al iniciar.
- Prohibición vigente: no modificar código productivo ni pruebas ejecutables.

## 2. Objetivo de la sesión

Transformar los requisitos congelados de EXP-008 en:

- modelo conceptual del dominio;
- especificación funcional verificable;
- diseño modular proporcional;
- mapa de vertical slices;
- matriz de trazabilidad;
- selección de una slice limitada para EXP-010.

## 3. Inspección realizada

Se inspeccionaron:

- estructura completa del repositorio;
- historial reciente de Git;
- plantillas existentes de EXP-009 y EXP-010;
- `app.js`;
- `test-runner.js`;
- `index.html`;
- `styles.css`;
- documentación de arquitectura disponible;
- revisión independiente de EXP-007;
- requisitos congelados de EXP-008.

## 4. Hallazgos del sistema actual

### Aplicación

- Aplicación de una sola página.
- Sin frameworks ni dependencias externas.
- Persistencia única mediante `localStorage` bajo la clave `tasks`.
- Modelo actual: `id`, `title`, `completed`, `dueDate`.
- Código productivo concentrado en `app.js`.
- Interfaz definida en `index.html`.
- Estilos concentrados en `styles.css`.

### Operaciones existentes

- creación de tareas;
- validación de título y fecha;
- recuperación ante JSON corrupto;
- completado de tareas;
- edición inline;
- guardado atómico de título y fecha;
- cancelación de edición;
- renderizado completo de la colección.

### Brechas para TB-14

- no existe atributo `priority`;
- no existe normalización de prioridad;
- no existen filtros;
- no existe estado temporal de filtros;
- no existen estados vacíos diferenciados;
- `renderTasks()` muestra siempre toda la colección;
- el borrador de edición no incluye prioridad.

## 5. Decisiones técnicas adoptadas

### Prioridad

Valores internos:

- `low`
- `medium`
- `high`

Valor predeterminado:

- `medium`

Etiquetas visibles:

- Baja
- Media
- Alta

### Compatibilidad

- tareas antiguas o con prioridad inválida se normalizan en memoria como `medium`;
- la carga no escribe automáticamente en `localStorage`;
- una operación posterior que persista la colección podrá guardar los objetos normalizados.

### Estructura

- se mantiene el objeto plano;
- se mantiene la clave `tasks`;
- se mantiene `app.js` como único archivo JavaScript productivo;
- la separación será lógica mediante funciones pequeñas;
- no se introducirán clases, módulos, servicios, patrones ni dependencias nuevas.

### Filtros

Estado temporal previsto:

```text
{
  status: 'all',
  priority: 'all'
}
```

- no persistido;
- combinación mediante AND;
- conservación durante la sesión;
- restablecimiento al recargar;
- vista derivada no destructiva.

## 6. Artefactos elaborados

- `experiments/EXP-009-domain-model.md`
- `experiments/EXP-009-feature-specification.md`
- `experiments/EXP-009-modular-design.md`
- `experiments/EXP-009-vertical-slice-map.md`
- `experiments/EXP-009-traceability-matrix.md`

## 7. Vertical slices definidas

- VS-01 — prioridad base y compatibilidad;
- VS-02 — edición atómica de prioridad;
- VS-03 — filtro de estado;
- VS-04 — filtro de prioridad y combinación AND;
- VS-05 — coherencia bajo filtros activos;
- VS-06 — estados vacíos y regresión integral.

## 8. Slice seleccionada para EXP-010

Se selecciona:

**VS-01 — Prioridad base y compatibilidad**

Incluye:

- crear tareas con prioridad;
- prioridad Media predeterminada;
- normalización de tareas antiguas o inválidas;
- persistencia del atributo `priority`;
- selector de prioridad;
- texto visible;
- pruebas y regresión.

Excluye:

- edición de prioridad;
- filtros;
- estados vacíos diferenciados;
- conservación de filtros;
- combinación AND;
- refactor estructural no necesario.

## 9. Trazabilidad

Resultado:

- RF-01 a RF-22 asignados;
- RI-01 a RI-10 asignados;
- todos los casos límite asignados;
- cada requisito tiene criterio, slice, prueba prevista y evidencia esperada;
- no existen requisitos huérfanos;
- no existen preguntas técnicas bloqueantes.

## 10. Control del alcance

Durante la sesión:

- no se modificó `app.js`;
- no se modificó `index.html`;
- no se modificó `styles.css`;
- no se modificó `test-runner.js`;
- no se ejecutó implementación;
- no se iniciaron pruebas de EXP-010;
- no se añadieron dependencias;
- no se modificaron requisitos congelados de EXP-008.

## 11. Observaciones metodológicas

- Las decisiones se tomaron por bloques coherentes, corrigiendo la fragmentación observada en EXP-008.
- La arquitectura propuesta es deliberadamente proporcional al tamaño del sistema.
- EXP-010 queda limitado a una sola slice vertical.
- La revisión independiente deberá realizarse en contexto separado después de registrar este diseño en un commit.
- EXP-009 no puede aprobarse antes de completar la revisión independiente y la evaluación.

## 12. Estado de salida

- Diseño técnico: completado.
- Trazabilidad: completa.
- Preguntas bloqueantes: 0.
- Código o pruebas modificados: no.
- Revisión independiente: pendiente.
- Evaluación: pendiente.
- Gate de cierre de EXP-009: no autorizado.
