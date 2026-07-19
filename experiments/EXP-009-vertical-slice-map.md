# EXP-009 — Mapa de vertical slices

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de elaboración: 19 de julio de 2026
- Estado: borrador técnico para revisión

## 1. Principio de división

TB-14 se divide en vertical slices que entregan comportamiento observable de extremo a extremo.

Cada slice debe incluir, según corresponda:

- modelo y reglas;
- persistencia;
- interfaz;
- pruebas;
- regresión;
- evidencia documental.

No se aceptan slices puramente técnicas que dejen una función sin uso observable.

## 2. Mapa de slices

| Slice | Valor funcional de extremo a extremo | Requisitos cubiertos | Archivos previstos | Pruebas previstas | Riesgo | Estado |
|---|---|---|---|---|---|---|
| VS-01 | Cargar, crear y visualizar prioridades válidas preservando tareas antiguas | RF-01, RF-02, RF-04, RF-22; RI-01, RI-02, RI-03 | `app.js`, `index.html`, `styles.css`, `test-runner.js` | prioridad predeterminada; normalización; texto visible; compatibilidad; regresión | medio | candidata |
| VS-02 | Editar prioridad de tareas pendientes y completadas con guardado atómico y cancelación | RF-03, RF-18, RF-19, RF-20; RI-06, RI-07, RI-08 | `app.js`, `test-runner.js`, `styles.css` | edición válida; completada editable; cancelación; prioridad inválida; conservación de orden e id | medio-alto | diferida |
| | VS-03 | Filtrar por estado sin modificar ni persistir datos, incluyendo cambios reversibles de estado | RF-06, RF-08, RF-09, RF-10, RF-11, RF-14 | `index.html`, `app.js`, `styles.css`, `test-runner.js` | opciones; aplicación inmediata; no escritura; recarga; Pendiente → Completada; Completada → Pendiente; reevaluación inmediata | medio | diferida | | Filtrar por estado sin modificar ni persistir datos | RF-06, RF-08, RF-09, RF-10, RF-11, RF-14 | `index.html`, `app.js`, `styles.css`, `test-runner.js` | opciones; aplicación inmediata; no escritura; recarga; cambio a completada | medio | diferida |
| VS-04 | Filtrar por prioridad y combinar ambos filtros mediante AND | RF-05, RF-07, RF-08, RF-09, RF-10, RF-11, RF-15 | `index.html`, `app.js`, `styles.css`, `test-runner.js` | prioridad; combinación AND; restablecimiento; conservación temporal; no persistencia | medio-alto | diferida |
| VS-05 | Mantener coherencia de la vista después de crear o editar bajo filtros activos | RF-11, RF-12, RF-13, RF-18; RI-09, RI-11, RI-12 | `app.js`, `test-runner.js` | creación no visible; edición que desaparece; conservación de orden y filtros | alto | diferida |
| VS-06 | Diferenciar estados vacíos y validar la regresión integral de TB-14 | RF-16, RF-17 y cobertura transversal | `app.js`, `styles.css`, `test-runner.js`, posible `README.md` | sin tareas; sin coincidencias; suite completa; ausencia de dependencias | bajo-medio | diferida |

## 3. Dependencias entre slices

Secuencia recomendada:

```text
VS-01
  ↓
VS-02
  ↓
VS-03
  ↓
VS-04
  ↓
VS-05
  ↓
VS-06
```

Dependencias:

- VS-02 depende del modelo de prioridad de VS-01.
- VS-03 puede diseñarse de forma independiente, pero se ejecutará después de estabilizar prioridad.
- VS-04 depende del estado de filtros introducido en VS-03.
- VS-05 depende de filtros y edición.
- VS-06 valida el comportamiento acumulado y cierra estados vacíos y regresión.

## 4. Slice seleccionada para EXP-010

### VS-01 — Prioridad base y compatibilidad

Valor funcional:

> El usuario puede crear una tarea con prioridad Baja, Media o Alta y verla en la lista, mientras que las tareas antiguas o con prioridad inválida siguen cargándose como prioridad Media sin bloquear la aplicación.

## 5. Justificación de selección

VS-01 debe ser la primera implementación porque:

- establece el atributo `priority` que necesitan todas las slices posteriores;
- resuelve la principal deuda de compatibilidad;
- entrega valor visible de extremo a extremo;
- permite comprobar la decisión `low | medium | high`;
- modifica persistencia, dominio, interfaz y pruebas en un alcance controlado;
- no requiere todavía introducir el sistema completo de filtros;
- reduce el riesgo de mezclar demasiados comportamientos en EXP-010;
- permite revertir una unidad coherente.

No debe seleccionarse primero una slice de filtros porque filtraría sobre un modelo de prioridad aún inexistente o inestable.

## 6. Alcance exacto propuesto para EXP-010

EXP-010 deberá implementar únicamente VS-01:

### Incluye

- constantes de prioridades válidas;
- validación de prioridad;
- normalización de prioridad al cargar;
- prioridad Media predeterminada;
- prioridad explícita Baja, Media o Alta en creación;
- atributo `priority` persistido en nuevas tareas;
- selector de prioridad en el formulario;
- texto visible de prioridad en la lista;
- compatibilidad con `createTask(title, dueDate)`;
- pruebas de prioridad, normalización y regresión;
- estilos mínimos;
- documentación y reversión exigidas por control alto.

### Excluye

- edición de prioridad;
- filtros;
- combinación AND;
- estados vacíos diferenciados;
- conservación de filtros;
- reevaluación de tareas bajo filtros;
- ordenamiento por prioridad;
- cualquier refactor estructural no necesario.

## 7. Criterios de aceptación de VS-01

### CA-VS01-01

Crear una tarea sin argumento de prioridad debe persistir `priority: "medium"`.

### CA-VS01-02

Crear una tarea con `low`, `medium` o `high` debe persistir exactamente ese valor.

### CA-VS01-03

Crear una tarea con prioridad explícitamente inválida debe rechazar la creación completa.

### CA-VS01-04

Una tarea sin `priority` debe cargarse operativamente con `priority: "medium"`.

### CA-VS01-05

Una tarea con prioridad desconocida debe cargarse operativamente con `priority: "medium"`.

### CA-VS01-06

La normalización de prioridad durante la carga no debe escribir automáticamente en `localStorage`.

### CA-VS01-07

Las tareas válidas restantes deben continuar cargándose cuando otra tarea tenga prioridad inválida.

### CA-VS01-08

La interfaz de creación debe ofrecer exclusivamente Baja, Media y Alta, con Media seleccionada inicialmente.

### CA-VS01-09

Cada tarea renderizada debe mostrar el texto visible de su prioridad.

### CA-VS01-10

La prioridad visible no debe depender únicamente de color o iconos.

### CA-VS01-11

Las pruebas existentes de EXP-005 y EXP-007 deben seguir pasando.

### CA-VS01-12

No deben añadirse dependencias externas.

## 8. Archivos previstos para EXP-010

Lista preliminar:

- `app.js`
- `index.html`
- `styles.css`
- `test-runner.js`
- `experiments/EXP-010-TB-14.md`
- `experiments/EXP-010-implementation-plan.md`
- `experiments/EXP-010-test-plan.md`
- `experiments/EXP-010-session-log.md`
- `experiments/EXP-010-independent-review.md`
- `experiments/EXP-010-reversal-test.md`
- `experiments/EXP-010-evaluation.md`
- `docs/results-dashboard.md` al cierre

La ficha de EXP-010 deberá congelar la lista definitiva antes de modificar código.

## 9. Pruebas previstas para VS-01

Propuesta inicial:

| ID previsto | Comportamiento |
|---|---|
| T010-01 | creación sin prioridad usa Media |
| T010-02 | creación con Baja persiste `low` |
| T010-03 | creación con Media persiste `medium` |
| T010-04 | creación con Alta persiste `high` |
| T010-05 | prioridad inválida rechaza creación completa |
| T010-06 | tarea antigua sin prioridad se normaliza en memoria |
| T010-07 | prioridad desconocida se normaliza en memoria |
| T010-08 | normalización no escribe automáticamente |
| T010-09 | una tarea inválida no bloquea las restantes |
| T010-10 | selector contiene solo tres opciones y Media predeterminada |
| T010-11 | renderizado muestra etiqueta textual correcta |
| T010-12 | no existen dependencias externas nuevas |

Los identificadores definitivos se congelarán en el plan de pruebas de EXP-010.

## 10. Riesgos específicos de VS-01

### Riesgo A — Cambio incompatible de firma

Control:

- `createTask(title, dueDate, priority)` aceptará omisión de `priority`;
- la omisión producirá `medium`;
- las pruebas anteriores no necesitarán cambios para seguir siendo válidas.

### Riesgo B — Persistencia automática durante normalización

Control:

- comparar `localStorage` antes y después de `loadTasks()`;
- no llamar a `saveTasks()` por prioridad ausente o inválida.

### Riesgo C — Falsa recuperación de entrada inválida

Diferencia obligatoria:

- dato antiguo inválido al cargar: normalizar a Media;
- entrada nueva explícitamente inválida: rechazar.

### Riesgo D — Slice demasiado amplia

Control:

- no implementar edición;
- no implementar filtros;
- no introducir estados vacíos;
- no refactorizar fuera de lo requerido.

## 11. Slices diferidas

Quedan expresamente diferidas:

- VS-02 — edición atómica de prioridad;
- VS-03 — filtro de estado;
- VS-04 — filtro de prioridad y combinación AND;
- VS-05 — coherencia bajo filtros activos;
- VS-06 — estados vacíos y regresión integral.

Su implementación requerirá experimentos o autorizaciones posteriores. EXP-010 no podrá incorporarlas silenciosamente.

## 12. Condición de aprobación del mapa

El mapa podrá aprobarse cuando:

- todos los requisitos estén asignados al menos a una slice;
- la slice seleccionada entregue valor de extremo a extremo;
- EXP-010 tenga un alcance limitado y verificable;
- las dependencias estén explícitas;
- ninguna slice viole las exclusiones congeladas;
- la matriz de trazabilidad confirme cobertura total.
