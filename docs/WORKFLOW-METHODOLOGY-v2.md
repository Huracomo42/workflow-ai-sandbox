# Metodología operativa del workflow asistido por IA — v2

## 1. Estado del documento

- Versión: 2.0
- Estado: propuesta de incorporación aprobada metodológicamente
- Fecha: 17 de julio de 2026
- Responsable: Hugo Cornejo Villena
- Origen: hallazgos y decisiones de PILOT-001
- Rama de trabajo: `docs/workflow-methodology-v2`

## 2. Propósito

Este documento establece las reglas operativas del workflow para desarrollo de software asistido por IA.

Su objetivo es asegurar que la investigación, planificación, implementación, revisión, pruebas, reversión, integración y cierre se realicen de forma:

- controlada;
- trazable;
- proporcional al riesgo;
- revisable por una persona;
- reproducible;
- adaptable a distintos tipos de trabajo.

La IA puede asistir en el análisis, la documentación, la implementación y la revisión, pero no sustituye las decisiones humanas de autorización.

## 3. Principios generales

El workflow se rige por los siguientes principios:

1. No se implementa antes de definir el objetivo y el alcance.
2. Todo cambio se realiza fuera de la rama principal.
3. Toda tarea debe tener archivos autorizados.
4. Toda implementación debe incluir pruebas proporcionales al riesgo.
5. Todo cambio debe tener un punto de restauración.
6. Las decisiones relevantes deben quedar registradas.
7. La integración a `main` requiere revisión humana.
8. La IA no puede ampliar el alcance sin autorización.
9. La IA no puede modificar por sí sola el Project Charter.
10. La IA no puede autorizar su propio trabajo.
11. La profundidad del proceso depende de dos dimensiones separadas:
    - ruta de trabajo;
    - nivel de control.
12. La evidencia debe preservarse mediante commits, registros, evaluaciones y pull requests.

## 4. Dimensiones de clasificación

### 4.1. Ruta de trabajo

La ruta describe la naturaleza del trabajo.

#### Ruta ligera

Se utiliza para cambios pequeños, conocidos, reversibles y de bajo riesgo.

Ejemplos:

- corrección de texto;
- ajuste menor de estilo;
- cambio simple de configuración;
- documentación sin impacto funcional.

#### Ruta estándar

Se utiliza para funciones o modificaciones cuyo objetivo y solución general son conocidos.

Ejemplos:

- añadir una validación;
- incorporar una función pequeña;
- modificar comportamiento existente;
- realizar una mejora funcional controlada.

#### Ruta exploratoria

Se utiliza cuando existe incertidumbre relevante sobre la solución, la viabilidad, la tecnología o el comportamiento esperado.

Ejemplos:

- prueba de una nueva librería;
- evaluación de arquitectura;
- prototipo técnico;
- comparación de alternativas;
- investigación de repositorios reutilizables.

La ruta exploratoria no debe convertirse automáticamente en implementación productiva.

#### Ruta de incidente

Se utiliza para diagnosticar y resolver fallos, degradaciones o comportamientos inesperados.

Debe separar:

1. reproducción;
2. diagnóstico;
3. propuesta de corrección;
4. autorización;
5. implementación;
6. pruebas;
7. reversión o restauración cuando corresponda;
8. cierre.

### 4.2. Nivel de control

El nivel de control determina la profundidad documental, las aprobaciones, las pruebas y las exigencias de reversión.

#### Nivel bajo

Aplicable a cambios pequeños, reversibles y con impacto limitado.

Requiere como mínimo:

- objetivo;
- alcance;
- archivos autorizados;
- pruebas mínimas;
- resultado;
- punto de restauración;
- revisión antes del merge.

No exige normalmente un registro de sesión extenso ni una reversión real.

#### Nivel medio

Aplicable a cambios funcionales relevantes, incidentes controlados o modificaciones con impacto moderado.

Requiere:

- ficha de trabajo o experimento;
- registro de sesión;
- objetivo y criterios de aceptación;
- alcance y exclusiones;
- archivos autorizados;
- punto de restauración;
- plan aprobado antes de implementar;
- pruebas documentadas;
- registro de limitaciones;
- evaluación;
- pull request;
- revisión humana;
- integración continua para las pruebas principales.

#### Nivel alto

Aplicable a cambios de impacto importante, alta complejidad o riesgo considerable.

Requiere todo lo del nivel medio, además de:

- análisis formal de riesgos;
- revisión técnica independiente;
- evidencia reforzada;
- plan detallado de reversión;
- reversión ensayada cuando sea viable;
- pruebas de regresión;
- aprobación adicional antes del merge;
- protección de la rama principal.

#### Nivel crítico o regulado

Aplicable a sistemas con:

- datos sensibles;
- seguridad;
- impacto severo;
- obligaciones regulatorias;
- consecuencias financieras, legales, sanitarias o institucionales críticas.

Requiere todo lo del nivel alto, además de:

- múltiples aprobaciones;
- segregación de funciones;
- auditoría;
- trazabilidad completa;
- ambientes separados;
- pruebas independientes;
- reversión validada;
- controles regulatorios específicos;
- prohibición de que una sola persona o IA controle todo el ciclo.

## 5. Regla de combinación

La ruta y el nivel de control son dimensiones independientes.

La ruta define cómo se organiza el trabajo.

El nivel de control define cuánto rigor, evidencia y aprobación se requiere.

Ejemplos:

- ruta ligera + nivel bajo;
- ruta estándar + nivel medio;
- ruta exploratoria + nivel alto;
- ruta de incidente + nivel medio;
- ruta de incidente + nivel crítico.

No se debe inferir automáticamente el nivel de control únicamente por la ruta.

## 6. Inicio de una tarea

Antes de programar debe registrarse como mínimo:

- nombre de la tarea;
- problema u oportunidad;
- objetivo;
- ruta de trabajo;
- nivel de control;
- alcance;
- exclusiones;
- criterios de aceptación;
- archivos autorizados;
- riesgos iniciales;
- pruebas previstas;
- punto de restauración.

Cuando falte información esencial, la implementación debe detenerse.

## 7. Planificación

Antes de modificar código, la herramienta de IA debe presentar un plan que indique:

- diagnóstico o entendimiento del problema;
- archivos que pretende modificar;
- cambios previstos;
- pruebas que ejecutará;
- riesgos;
- limitaciones;
- procedimiento de reversión;
- elementos fuera de alcance.

La implementación solo puede comenzar después de la aprobación humana del plan cuando el nivel sea medio, alto o crítico.

En nivel bajo, la aprobación puede ser simplificada, pero debe existir.

## 8. Control de alcance

La IA solo puede modificar los archivos expresamente autorizados.

Cualquier necesidad de ampliar el alcance debe:

1. detener la implementación;
2. explicar la causa;
3. identificar los nuevos archivos;
4. describir el impacto;
5. solicitar autorización.

No se permite incorporar cambios “aprovechando” la tarea sin registrarlos.

## 9. Protocolo de pruebas

Toda implementación debe contar con pruebas proporcionales al nivel de control.

### 9.1. Reglas generales

Las pruebas deben:

- definirse antes de implementar cuando sea viable;
- ejecutarse de forma aislada;
- evitar que un fallo detenga los casos posteriores;
- reportar todos los resultados;
- distinguir PASS, FAIL y no ejecutado;
- separar evidencia automática y manual;
- registrar navegador, sistema, versión o entorno;
- documentar limitaciones conocidas;
- repetirse después de una corrección;
- repetirse después de una restauración cuando corresponda.

### 9.2. Uso de HTTP

Cuando el comportamiento dependa del origen del navegador, las pruebas deben ejecutarse mediante un servidor HTTP local.

No debe utilizarse `file://` como evidencia principal cuando produzca restricciones de origen cruzado o diferencias respecto al entorno esperado.

### 9.3. Aplicación por nivel

#### Nivel bajo

- pruebas mínimas;
- resultado documentado;
- verificación manual permitida cuando sea suficiente.

#### Nivel medio

- pruebas definidas;
- evidencia de ejecución;
- aislamiento de fallos;
- registro de limitaciones;
- integración continua para pruebas principales.

#### Nivel alto

- pruebas automáticas;
- regresión;
- revisión independiente;
- evidencia reforzada;
- entorno reproducible.

#### Nivel crítico o regulado

- entorno controlado;
- segregación de pruebas;
- trazabilidad completa;
- criterios regulatorios;
- revisión independiente obligatoria.

## 10. Protocolo de reversión

Todo cambio debe registrar un punto de restauración.

El workflow distingue cinco estados:

### 10.1. Punto de restauración registrado

Commit, etiqueta o referencia exacta desde la cual podría recuperarse el estado anterior.

### 10.2. Plan de reversión

Pasos concretos y previamente definidos para deshacer el cambio.

### 10.3. Reversión ensayada

Prueba del procedimiento en un entorno seguro sin afectar la versión estable.

### 10.4. Reversión ejecutada

Deshacer realmente el cambio mediante un mecanismo trazable.

### 10.5. Restauración posterior

Volver a aplicar o recuperar la versión correcta y verificar nuevamente el sistema.

### 10.6. Aplicación por nivel

#### Nivel bajo

- punto de restauración obligatorio;
- reversión real solo cuando el riesgo lo justifique.

#### Nivel medio

- punto de restauración obligatorio;
- plan de reversión obligatorio;
- ensayo o ejecución cuando exista riesgo para datos, persistencia o continuidad.

#### Nivel alto

- plan detallado;
- ensayo antes del merge cuando sea viable;
- evidencia de recuperación.

#### Nivel crítico o regulado

- reversión validada en entorno separado;
- aprobación independiente;
- evidencia completa;
- criterios de recuperación previamente acordados.

### 10.7. Mecanismos preferidos

Se priorizarán mecanismos que preserven el historial, como:

```bash
git revert
```

No se utilizarán como procedimiento normal:

```bash
git reset --hard
git push --force
```

Estos comandos solo podrán considerarse en situaciones excepcionales, justificadas y autorizadas, debido al riesgo de perder evidencia o reescribir el historial.

## 11. Integración continua

Las verificaciones automáticas deben incorporarse progresivamente según el nivel de control.

### 11.1. Requisitos mínimos

La integración continua debe permitir:

- ejecutar pruebas al crear o actualizar un pull request;
- mostrar resultados visibles;
- conservar registros;
- distinguir fallos del código y del entorno;
- volver a ejecutar verificaciones;
- impedir el merge cuando fallen verificaciones obligatorias.

### 11.2. Aplicación por nivel

#### Nivel bajo

La CI es recomendada.

En repositorios experimentales puede no bloquear el merge, siempre que exista revisión humana.

#### Nivel medio

La CI es obligatoria para las pruebas principales.

Los fallos deben impedir el merge, salvo excepción humana explícita, justificada y registrada.

#### Nivel alto

La CI es obligatoria e incluye:

- pruebas principales;
- regresión;
- controles adicionales de calidad;
- revisión técnica independiente.

#### Nivel crítico o regulado

Requiere:

- múltiples verificaciones obligatorias;
- protección de ramas;
- aprobaciones independientes;
- evidencia auditable;
- controles específicos del dominio.

## 12. Revisión especializada de código

La herramienta de implementación no debe considerarse automáticamente una revisión independiente.

Según el nivel de control, se debe incorporar un revisor especializado que evalúe:

- corrección;
- claridad;
- mantenibilidad;
- seguridad;
- rendimiento;
- manejo de errores;
- compatibilidad;
- pruebas;
- cumplimiento del alcance.

En niveles alto y crítico, la revisión independiente es obligatoria.

## 13. Pull request e integración

Todo cambio funcional debe integrarse mediante pull request.

El pull request debe incluir:

- resumen;
- alcance;
- archivos modificados;
- pruebas;
- resultados;
- riesgos;
- limitaciones;
- reversión;
- evaluación o decisión;
- evidencia de CI cuando corresponda.

El merge requiere aprobación humana.

Una IA no puede aprobar por sí sola su propia implementación ni autorizar el merge final.

## 14. Cierre

Una tarea se considera cerrada cuando:

- se cumplieron los criterios de aceptación;
- las pruebas fueron ejecutadas;
- los resultados están documentados;
- las limitaciones fueron registradas;
- se realizó la evaluación requerida;
- el pull request fue revisado;
- el cambio fue integrado;
- las ramas temporales fueron eliminadas;
- el repositorio local quedó sincronizado;
- las deudas o pendientes fueron incorporados al backlog.

## 15. Excepciones

Toda excepción al workflow debe registrar:

- regla omitida;
- motivo;
- riesgo;
- persona que autoriza;
- duración de la excepción;
- medidas compensatorias;
- resultado.

Una excepción no modifica permanentemente la metodología.

Los cambios permanentes requieren evidencia, propuesta formal y aprobación humana.

## 16. Estado de validación

PILOT-001 validó parcialmente:

- rutas estándar y de incidente;
- niveles bajo y medio;
- uso de ramas;
- pull requests;
- pruebas locales;
- documentación;
- evaluación;
- reversión trazable.

Aún no están validados plenamente:

- ruta exploratoria;
- nivel alto;
- nivel crítico o regulado;
- integración continua;
- revisión técnica independiente;
- múltiples agentes;
- arquitectura;
- dependencias;
- bases de datos;
- despliegues;
- seguridad;
- equipos con varios desarrolladores.

Estas capacidades deberán evaluarse en pilotos posteriores.

## 17. Decisiones aprobadas incorporadas

Esta versión incorpora formalmente:

- Ajuste A: plantillas y controles según nivel de control;
- Ajuste B: protocolo de pruebas aisladas y uso de HTTP;
- Ajuste C: protocolo gradual y trazable de reversión;
- Ajuste D: incorporación progresiva de integración continua.

## 18. Siguiente hito

Antes de iniciar PILOT-002 deberá prepararse y aprobarse su paquete operativo, incluyendo:

- objetivo del piloto;
- capacidades que se validarán;
- ruta y nivel de control;
- banco de tareas;
- criterios de aceptación;
- rúbrica;
- protocolo de pruebas;
- configuración de CI;
- funciones de implementación y revisión;
- condiciones de cierre.
