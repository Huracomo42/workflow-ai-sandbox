# Paquete operativo formal — PILOT-003

## 1. Identificación

- **Piloto:** PILOT-003
- **Nombre:** Validación acumulativa de requisitos, diseño de ingeniería e implementación mediante vertical slices
- **Responsable humano:** Hugo Cornejo Villena
- **Repositorio:** `Huracomo42/workflow-ai-sandbox`
- **Fecha de preparación:** 19 de julio de 2026
- **Estado:** Aprobado para incorporación al repositorio
- **Gate actual:** P3-0B — Incorporación documental en curso
- **Inicio de ejecución:** No autorizado

## 2. Propósito

Validar si el workflow profesional de desarrollo asistido por IA puede transformar una necesidad funcional incompleta en una solución implementable, verificable y trazable mediante una secuencia explícita de:

1. presión y aclaración de requisitos;
2. modelado básico del dominio;
3. congelamiento de requisitos;
4. especificación funcional;
5. diseño modular;
6. división en vertical slices;
7. implementación controlada;
8. pruebas automatizadas;
9. integración continua;
10. revisión técnica independiente;
11. evaluación y cierre.

## 3. Hipótesis del piloto

La incorporación de artefactos de ingeniería previos a la programación reducirá ambigüedades, cambios improvisados y desviaciones de alcance, sin producir una carga documental desproporcionada.

## 4. Alcance

PILOT-003 comprenderá tres experimentos acumulativos:

- **EXP-008:** Domain Pressure Session y congelamiento de requisitos.
- **EXP-009:** especificación funcional, diseño modular y Vertical Slice Map.
- **EXP-010:** implementación, pruebas y revisión independiente de una vertical slice.

Los artefactos aprobados en EXP-008 serán entradas obligatorias para EXP-009. Los artefactos aprobados en EXP-009 serán entradas obligatorias para EXP-010.

No se permitirá saltar directamente a EXP-010.

## 5. Fuera de alcance

Quedan excluidos:

- bases de datos externas;
- autenticación y autorización;
- información sensible;
- despliegue en producción;
- servicios externos;
- incorporación de frameworks;
- coordinación multiagente;
- nivel crítico o regulado;
- rediseño integral de la aplicación;
- cambios no incluidos en la vertical slice aprobada.

## 6. Capacidades que se validarán

- presión sistemática de requisitos;
- identificación de ambigüedades y decisiones pendientes;
- modelado de entidades, estados, reglas e invariantes;
- formulación de criterios de aceptación verificables;
- separación entre requisitos, diseño e implementación;
- diseño modular proporcional;
- división de una función en vertical slices;
- trazabilidad requisito–criterio–prueba–cambio;
- implementación guiada por pruebas;
- control de alcance;
- integración continua;
- revisión independiente;
- reversión segura;
- cierre secuencial de gates.

## 7. Tarea funcional del piloto

La función concreta deberá ampliar de forma controlada la aplicación de tareas existente y tener suficiente complejidad para exigir reglas, estados y decisiones de diseño.

La tarea seleccionada es:

### TB-14 — Priorización y filtrado de tareas

Permitir que cada tarea tenga una prioridad controlada y que el usuario pueda filtrar la lista por prioridad y estado, preservando compatibilidad con los datos existentes.

### Resultado esperado

El usuario podrá:

- asignar una prioridad válida al crear o editar una tarea;
- visualizar la prioridad;
- filtrar tareas por prioridad;
- combinar el filtro de prioridad con el estado pendiente o completado;
- seguir utilizando datos creados antes de la incorporación del nuevo campo.

### Restricciones

- prioridades permitidas: baja, media y alta;
- no se permiten prioridades personalizadas;
- las tareas antiguas deben recibir un comportamiento predeterminado definido durante EXP-008;
- los filtros no modificarán ni eliminarán datos;
- no se incorporarán dependencias externas;
- no se cambiará el sistema de identificación;
- no se implementará ordenamiento automático;
- no se implementarán etiquetas, categorías ni búsqueda textual.

## 8. Clasificación

| Experimento | Ruta | Nivel de control |
|---|---|---|
| EXP-008 | Exploratoria | Medio |
| EXP-009 | Estándar | Alto |
| EXP-010 | Estándar | Alto |

EXP-008 es exploratorio porque su finalidad es resolver incertidumbres, no modificar código.

EXP-009 y EXP-010 tienen control alto porque condicionan la arquitectura y realizan un cambio funcional acumulativo con migración compatible de datos.

## 9. EXP-008 — Domain Pressure Session

### Objetivo

Convertir TB-14 en un conjunto de requisitos completos, explícitos y suficientemente estables para diseñar la solución.

### Actividades obligatorias

- inventario de actores y objetivos;
- identificación de entidades y atributos;
- identificación de estados y transiciones;
- preguntas sobre casos límite;
- análisis de compatibilidad con datos anteriores;
- identificación de reglas e invariantes;
- registro de alternativas;
- resolución humana de decisiones;
- congelamiento de requisitos.

### Artefactos

- `experiments/EXP-008-TB-14.md`
- `experiments/EXP-008-pressure-session.md`
- `experiments/EXP-008-frozen-requirements.md`
- `experiments/EXP-008-session-log.md`
- `experiments/EXP-008-evaluation.md`

### Criterios de aceptación

- **CA-008-01:** todos los términos funcionales relevantes están definidos.
- **CA-008-02:** las prioridades válidas están explícitamente delimitadas.
- **CA-008-03:** se define el tratamiento de tareas sin prioridad.
- **CA-008-04:** se define el comportamiento de cada combinación de filtros.
- **CA-008-05:** se identifican estados inválidos y reglas de rechazo.
- **CA-008-06:** se registran las decisiones humanas y sus alternativas.
- **CA-008-07:** no quedan preguntas bloqueantes abiertas.
- **CA-008-08:** los requisitos congelados no contienen decisiones técnicas de implementación.
- **CA-008-09:** la rúbrica y el dashboard quedan actualizados antes del cierre.
- **CA-008-10:** no se modifica código de la aplicación.

### Umbral

- mínimo: **40/50**;
- comprensión de requisitos: mínimo 4/5;
- trazabilidad: mínimo 4/5;
- control de alcance: mínimo 4/5;
- cualquier pregunta bloqueante abierta impide aprobar el experimento.

## 10. EXP-009 — Especificación y Vertical Slice Map

### Objetivo

Transformar los requisitos congelados en una especificación funcional verificable y en un diseño modular proporcional.

### Actividades obligatorias

- especificación funcional;
- criterios de aceptación detallados;
- modelo conceptual del dominio;
- responsabilidades por módulo;
- análisis de impacto sobre archivos existentes;
- matriz requisito–criterio–prueba;
- identificación de riesgos;
- división en vertical slices;
- selección de una slice para EXP-010;
- revisión técnica independiente del diseño.

### Artefactos

- `experiments/EXP-009-TB-14.md`
- `experiments/EXP-009-feature-specification.md`
- `experiments/EXP-009-domain-model.md`
- `experiments/EXP-009-modular-design.md`
- `experiments/EXP-009-vertical-slice-map.md`
- `experiments/EXP-009-traceability-matrix.md`
- `experiments/EXP-009-independent-review.md`
- `experiments/EXP-009-session-log.md`
- `experiments/EXP-009-evaluation.md`

### Criterios de aceptación

- **CA-009-01:** todos los requisitos congelados tienen criterios verificables.
- **CA-009-02:** cada criterio tiene al menos una prueba prevista.
- **CA-009-03:** el modelo identifica entidades, atributos, estados e invariantes.
- **CA-009-04:** las responsabilidades entre interfaz, dominio y persistencia están separadas.
- **CA-009-05:** todos los archivos potencialmente afectados están identificados.
- **CA-009-06:** el diseño no introduce abstracciones sin necesidad demostrable.
- **CA-009-07:** el mapa contiene slices funcionales de extremo a extremo.
- **CA-009-08:** se selecciona una única slice implementable para EXP-010.
- **CA-009-09:** existe revisión independiente separada antes del cierre.
- **CA-009-10:** no se modifica código de producción.

### Umbral

- mínimo: **42/50**;
- calidad del diseño: mínimo 4/5;
- trazabilidad: mínimo 4/5;
- riesgos: mínimo 4/5;
- revisión independiente: obligatoria;
- cualquier hallazgo bloqueante impide el cierre.

## 11. EXP-010 — Implementación de una vertical slice

### Slice prevista

Implementar la prioridad de extremo a extremo:

- selección durante la creación;
- validación;
- persistencia;
- compatibilidad con tareas antiguas;
- visualización;
- edición;
- pruebas automatizadas.

El filtrado por prioridad solo será incluido si EXP-009 demuestra que cabe dentro de una única slice sin ampliar excesivamente el alcance. En caso contrario quedará como slice posterior no ejecutada.

### Artefactos

- `experiments/EXP-010-TB-14.md`
- `experiments/EXP-010-implementation-plan.md`
- `experiments/EXP-010-test-plan.md`
- `experiments/EXP-010-session-log.md`
- `experiments/EXP-010-independent-review.md`
- `experiments/EXP-010-reversal-test.md`
- `experiments/EXP-010-evaluation.md`

### Criterios de aceptación preliminares

Los criterios definitivos dependerán de EXP-009, pero deberán cubrir como mínimo:

- prioridades válidas;
- rechazo de valores inválidos;
- valor predeterminado para datos anteriores;
- persistencia;
- edición;
- visualización;
- compatibilidad de carga;
- regresión completa;
- CI en verde;
- reversión ensayada;
- ausencia de cambios fuera del alcance.

### Umbral

- mínimo: **42/50**;
- calidad de pruebas: mínimo 4/5;
- seguridad y control: mínimo 4/5;
- trazabilidad: mínimo 4/5;
- reversión: mínimo 4/5;
- revisión independiente sin hallazgos bloqueantes;
- CI obligatorio en verde antes del merge.

## 12. Rúbrica común

Cada experimento será evaluado sobre 50 puntos:

1. comprensión del problema — 5;
2. calidad del plan — 5;
3. control del alcance — 5;
4. calidad del artefacto o implementación — 5;
5. verificabilidad — 5;
6. calidad de pruebas o validación — 5;
7. documentación — 5;
8. gestión de riesgos — 5;
9. trazabilidad — 5;
10. reversibilidad o capacidad de corrección — 5.

En experimentos sin código, “reversibilidad” evaluará la capacidad de corregir decisiones sin ocultar su historial.

## 13. Gates

### Gates generales del piloto

- **P3-0A:** diseño conceptual aprobado — cerrado.
- **P3-0B:** paquete operativo aprobado — incorporación documental en curso.
- **P3-1:** EXP-008 autorizado.
- **P3-2:** EXP-008 cerrado y aprobado.
- **P3-3:** EXP-009 autorizado.
- **P3-4:** EXP-009 cerrado y aprobado.
- **P3-5:** EXP-010 autorizado.
- **P3-6:** implementación concluida y CI en verde.
- **P3-7:** revisión independiente y reversión concluidas.
- **P3-8:** merge autorizado.
- **P3-9:** PILOT-003 evaluado y cerrado.

Cada gate deberá registrarse antes de avanzar al siguiente.

## 14. Estrategia de ramas

### Rama documental del paquete

`docs/PILOT-003-operational-package`

### Ramas experimentales

- `pilot-003/exp-008-requirements`
- `pilot-003/exp-009-design`
- `pilot-003/exp-010-priority-slice`

Cada experimento partirá de `main` actualizado después del cierre del experimento anterior.

No se encadenarán ramas experimentales sin que el experimento precedente haya sido aprobado e integrado.

## 15. Estrategia de commits

Los gates no podrán mezclarse en un único commit.

Secuencia mínima:

1. artefactos previos del experimento;
2. registro de aprobación del plan;
3. artefactos producidos o implementación;
4. pruebas y evidencia;
5. revisión independiente;
6. correcciones derivadas de revisión;
7. evaluación;
8. actualización del dashboard;
9. cierre del experimento.

Una excepción requerirá autorización humana previa y registro en `docs/decisions.md`.

## 16. Protocolo de pruebas y CI

Para EXP-010:

- pruebas definidas antes de modificar el comportamiento;
- ejecución local mediante servidor HTTP;
- casos aislados;
- reporte PASS, FAIL y no ejecutado;
- regresión de toda la suite;
- GitHub Actions en cada pull request;
- prueba roja controlada cuando resulte viable;
- ninguna integración con CI en rojo;
- evidencia del resultado archivada en el registro de sesión.

EXP-008 y EXP-009 usarán validaciones documentales, matrices de cobertura y revisión independiente en lugar de pruebas de software.

## 17. Revisión independiente

Será obligatoria en EXP-009 y EXP-010.

El revisor:

- trabajará en un contexto separado;
- no recibirá las conclusiones del implementador como hechos;
- contrastará el resultado con los requisitos aprobados;
- clasificará hallazgos como bloqueantes, mayores, menores u observaciones;
- verificará pruebas, alcance, riesgos y trazabilidad;
- emitirá una recomendación explícita.

El informe deberá existir como archivo separado antes del cierre del experimento y, en EXP-010, antes del merge.

## 18. Reversión

### Documentación

Las decisiones se corregirán mediante nuevos commits. No se reescribirá el historial para ocultar decisiones sustituidas.

### Implementación

- se identificará el commit previo a la implementación;
- se preparará un procedimiento con `git revert`;
- la reversión se ensayará en una rama desechable;
- se ejecutará la suite completa después del revert;
- se documentará el resultado;
- `git reset --hard` no será el procedimiento normal de reversión.

## 19. Roles

### Responsable humano

- aprobar gates;
- resolver decisiones funcionales;
- autorizar ampliaciones de alcance;
- aprobar excepciones;
- autorizar merges;
- aprobar el cierre.

### Contexto de análisis y documentación

- preparar preguntas;
- estructurar requisitos;
- elaborar especificaciones;
- mantener matrices y registros;
- señalar desviaciones metodológicas.

### Contexto de implementación

- modificar exclusivamente archivos autorizados;
- ejecutar pruebas;
- documentar resultados;
- no autorizar su propio trabajo.

### Contexto de revisión

- revisar independientemente;
- no implementar salvo autorización posterior;
- emitir hallazgos y recomendación.

## 20. Aplicación de Ajustes E–J

- **E:** este paquete debe aprobarse antes de EXP-008.
- **F:** cada experimento tendrá banco, ficha, sesión y evaluación.
- **G:** EXP-009 y EXP-010 tendrán revisión independiente separada y previa al cierre o merge.
- **H:** el dashboard se actualizará al cerrar cada experimento.
- **I:** los gates tendrán cierres secuenciales y commits diferenciados.
- **J:** todos los artefactos tendrán fechas reales; los vacíos serán excepciones explícitas y nunca reconstrucciones simuladas.

## 21. Reglas de bloqueo

El experimento se detendrá cuando:

- falte un artefacto obligatorio;
- exista una pregunta funcional bloqueante;
- se necesite modificar un archivo no autorizado;
- cambien los requisitos congelados sin control formal;
- falle una prueba crítica;
- CI esté en rojo;
- exista un hallazgo bloqueante;
- no pueda demostrarse trazabilidad;
- no exista un procedimiento seguro de reversión;
- se intente avanzar sin cerrar el gate anterior.

## 22. Condiciones para iniciar EXP-008

Antes de cerrar P3-0B deberán existir en el repositorio:

- este paquete operativo;
- TB-14 en `docs/task-bank.md`;
- plantillas iniciales de las fichas EXP-008, EXP-009 y EXP-010;
- rúbrica preparada;
- protocolo de revisión;
- dashboard preparado;
- decisiones actualizadas;
- estrategia de ramas, commits, CI y reversión documentada.

## 23. Estado de aprobación

El contenido de este paquete fue aprobado por Hugo Cornejo Villena el 19 de julio de 2026.

La aprobación autoriza su incorporación documental al repositorio y la preparación del resto de artefactos previos. No autoriza ejecutar EXP-008.

La ejecución de EXP-008 requerirá una autorización separada en el Gate P3-1.
