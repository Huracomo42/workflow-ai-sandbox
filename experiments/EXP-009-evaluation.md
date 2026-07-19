# EXP-009 — Evaluación

* Piloto: PILOT-003
* Experimento: EXP-009
* Tarea: TB-14 — Priorización y filtrado de tareas
* Fecha real de evaluación: 19 de julio de 2026
* Estado: aprobado técnicamente; pendiente de autorización final de cierre
* Umbral: 42/50
* Mínimos obligatorios:

  * diseño técnico ≥ 4/5;
  * trazabilidad ≥ 4/5;
  * gestión de riesgos ≥ 4/5;
  * revisión independiente aprobada;
  * ninguna pregunta bloqueante abierta.

## 1. Resultado por criterio

| Criterio                   | Puntaje /5 | Evidencia                                                                                                                                                                                                                                 |
| -------------------------- | ---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comprensión del problema   |          5 | El diseño conserva los requisitos RF-01 a RF-22 y cubre prioridad, compatibilidad, filtros, edición, estados vacíos y transición reversible.                                                                                              |
| Calidad del plan           |          4 | El microplan estableció análisis, especificación, diseño modular, slices, trazabilidad y revisión separada. Durante la corrección hubo iteraciones operativas evitables, pero el proceso recuperó el control sin reescribir el historial. |
| Control del alcance        |          5 | No se modificaron `app.js`, `index.html`, `styles.css`, `test-runner.js` ni pruebas ejecutables. EXP-010 quedó limitado a VS-01.                                                                                                          |
| Calidad del diseño técnico |          5 | Se definieron modelo persistido, prioridades internas, normalización, validación, filtros no persistidos, vista derivada, responsabilidades y transición reversible.                                                                      |
| Verificabilidad            |          5 | Cada requisito dispone de criterio observable, slice, prueba prevista y evidencia esperada. RF-14 contempla pruebas distintas para ambas direcciones.                                                                                     |
| Calidad de validación      |          4 | La revisión independiente detectó dos brechas bloqueantes y confirmó posteriormente su resolución. No se ejecutaron pruebas nuevas porque EXP-009 fue exclusivamente documental.                                                          |
| Documentación              |          5 | Existen ficha, análisis del sistema actual, modelo de dominio, especificación, diseño modular, mapa de slices, diseño de pruebas, trazabilidad, registro de sesión y revisión independiente.                                              |
| Gestión de riesgos         |          5 | Se documentaron riesgos de normalización destructiva, persistencia de vistas filtradas, ruptura de firmas, validación parcial, sobrediseño y regresión.                                                                                   |
| Trazabilidad               |          5 | RF-01 a RF-22 y RI-01 a RI-10 están asignados. RF-14 se separó en RF-14A y RF-14B con pruebas directas e inversas.                                                                                                                        |
| Capacidad de corrección    |          5 | H1 y H2 se corrigieron mediante commits posteriores, preservando `ee7b32e`, restaurando artefactos completos y registrando una segunda revisión independiente.                                                                            |

## 2. Puntaje total

* Total: **48/50**
* Umbral requerido: **42/50**
* Diseño técnico: **5/5**
* Trazabilidad: **5/5**
* Gestión de riesgos: **5/5**
* Revisión independiente: **aprobada con observaciones no bloqueantes**
* Preguntas bloqueantes abiertas: **0**

## 3. Reglas de bloqueo

No se activa ninguna regla de bloqueo.

Los dos hallazgos bloqueantes de la primera revisión quedaron cerrados:

* H1 — transición Completada → Pendiente ausente: resuelto;
* H2 — artefactos obligatorios faltantes: resuelto.

## 4. Limitaciones

* EXP-009 no implementó código ni ejecutó las pruebas diseñadas.
* Los identificadores de pruebas de slices posteriores a VS-01 siguen siendo provisionales.
* La transición reversible se implementará en una slice posterior; no forma parte de EXP-010.
* EXP-010 deberá congelar su propio alcance, archivos y pruebas antes de modificar código.
* `completeTask(id)` deberá conservarse o migrarse con evidencia de regresión cuando corresponda.
* La ejecución documental tuvo varias correcciones operativas; esto no afectó el resultado técnico final, pero constituye una oportunidad de mejora del proceso.

## 5. Decisión recomendada

**Aprobar técnicamente EXP-009 con 48/50.**

El experimento transformó los requisitos congelados en un diseño verificable y proporcional, mantuvo el control del alcance, cerró los hallazgos de la revisión independiente y dejó VS-01 suficientemente delimitada para preparar EXP-010.

La aprobación técnica no autoriza por sí sola:

* iniciar EXP-010;
* modificar código productivo;
* integrar la rama en `main`.

El cierre final de EXP-009 y la apertura del pull request requieren autorización expresa de Hugo Cornejo Villena.
