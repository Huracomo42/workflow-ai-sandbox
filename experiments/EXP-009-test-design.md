# EXP-009 — Diseño de pruebas

- Piloto: PILOT-003
- Experimento: EXP-009
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha: 19 de julio de 2026
- Estado: completado; pruebas no ejecutadas

## 1. Propósito

Definir cómo se verificará TB-14 antes de implementar.

EXP-009 diseña pruebas. No afirma que las pruebas nuevas hayan sido ejecutadas.

## 2. Estrategia

Se mantendrá el ejecutor actual en navegador y el aislamiento mediante `localStorage`.

Cada prueba deberá:

- preparar su estado inicial;
- ejecutar una única conducta principal;
- verificar resultado funcional y persistencia;
- limpiar almacenamiento y estado temporal;
- no depender del orden de otras pruebas.

## 3. Niveles de prueba

### Dominio

Validará:

- prioridades permitidas;
- prioridad predeterminada;
- normalización;
- coincidencia de filtros;
- combinación AND;
- cambio reversible de estado;
- validación atómica.

### Persistencia

Validará:

- formato guardado;
- ausencia de escritura automática por normalización;
- ausencia de persistencia de filtros;
- ausencia de persistencia parcial;
- compatibilidad con tareas antiguas.

### Integración de interfaz

Validará:

- opciones de selectores;
- prioridad visible;
- edición de prioridad;
- actualización inmediata de filtros;
- estados vacíos;
- desaparición o aparición de tareas tras cambios.

### Regresión

Ejecutará:

- `T005-*`;
- `T007-*`;
- controles finales aplicables;
- ausencia de dependencias externas.

## 4. Aislamiento

Se reutilizarán patrones equivalentes a:

```text
beforeEach:
  limpiar localStorage
  cancelar edición
  restablecer filtros

afterEach:
  limpiar localStorage
  cancelar edición
  restablecer filtros
```

Las pruebas de recarga deberán recrear el estado de interfaz o recargar el iframe sin depender de memoria previa.

## 5. Datos de prueba

Se usarán tareas con:

- prioridad `low`;
- prioridad `medium`;
- prioridad `high`;
- prioridad ausente;
- prioridad desconocida;
- estado pendiente;
- estado completado;
- fecha vacía;
- fecha válida;
- título válido e inválido.

Para filtros se requerirán colecciones con combinaciones suficientes para distinguir:

- coincidencia total;
- coincidencia parcial;
- cero coincidencias;
- colección vacía.

## 6. Pruebas previstas para VS-01 / EXP-010

| ID provisional | Conducta |
|---|---|
| T010-01 | omitir prioridad crea `medium` |
| T010-02 | crear con `low` |
| T010-03 | crear con `medium` |
| T010-04 | crear con `high` |
| T010-05 | prioridad explícita inválida rechaza creación |
| T010-06 | tarea sin prioridad se normaliza |
| T010-07 | prioridad desconocida se normaliza |
| T010-08 | normalización no escribe automáticamente |
| T010-09 | una tarea inválida no bloquea otras |
| T010-10 | selector ofrece solo Baja, Media y Alta |
| T010-11 | Media aparece seleccionada inicialmente |
| T010-12 | prioridad se muestra mediante texto |
| T010-13 | regresión completa |
| T010-14 | ausencia de dependencias externas |

## 7. Pruebas previstas para slices posteriores

### VS-02

- editar prioridad de pendiente;
- editar prioridad de completada;
- cancelar edición;
- prioridad inválida rechaza todos los cambios;
- conservar `id`, estado y posición.

### VS-03

- filtro de estado;
- aplicación inmediata;
- no escritura;
- recarga restablece;
- Pendiente → Completada reevalúa vista;
- Completada → Pendiente reevalúa vista.

### VS-04

- filtro de prioridad;
- combinación AND;
- restablecimiento;
- no persistencia;
- conservación durante sesión.

### VS-05

- creación no coincidente;
- edición que deja de coincidir;
- cambio reversible de estado bajo filtros;
- conservación del orden.

### VS-06

- colección vacía;
- vista sin coincidencias;
- mensajes exactos;
- regresión integral.

## 8. Prueba obligatoria de transición reversible

RF-14 requiere dos pruebas distintas:

### Estado directo

```text
Pendiente
→ marcar como Completada
→ reevaluar filtros
```

### Estado inverso

```text
Completada
→ desmarcar a Pendiente
→ reevaluar filtros
```

No se considerará cubierta RF-14 con una sola dirección.

## 9. Pruebas de no efecto

Deberá comprobarse que:

- filtrar no escribe;
- cambiar filtros no reordena;
- normalizar prioridad no escribe;
- cancelar edición no escribe;
- una validación fallida no escribe parcialmente;
- recargar no conserva filtros.

## 10. Navegador

La suite continuará ejecutándose mediante servidor HTTP local y Microsoft Edge headless.

Se mantendrá:

- carga por iframe;
- detección de estado general;
- clasificación PASS, FAIL y NO EJECUTADO;
- ejecución secuencial.

## 11. Evidencia

Cada experimento de implementación deberá registrar:

- comando de ejecución;
- modo usado;
- totales PASS, FAIL y NO EJECUTADO;
- identificadores fallidos;
- captura o salida suficiente;
- commit probado;
- navegador;
- limitaciones.

## 12. Criterio de aprobación

Una slice no podrá aprobarse si:

- falta una conducta prevista;
- una prueba nueva falla;
- existe regresión;
- hay escritura no autorizada;
- la evidencia no identifica el commit probado;
- una transición bidireccional se prueba solo en una dirección.
