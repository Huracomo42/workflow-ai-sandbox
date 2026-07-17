# Project Charter  
## Workflow profesional de desarrollo de software asistido por IA

**Versión:** 1.0  
**Estado:** Aprobado para piloto controlado  
**Repositorio de validación:** `Huracomo42/workflow-ai-sandbox`  
**Responsable del proyecto:** Hugo Cornejo Villena  
**Fecha de aprobación:** 17 de julio de 2026  

---

## 1. Propósito

Este proyecto tiene como propósito diseñar, validar y documentar un workflow profesional, reutilizable y gobernable para el desarrollo de software asistido por inteligencia artificial.

El workflow debe permitir utilizar herramientas de IA para investigar, planificar, implementar, revisar, probar y documentar cambios de software, manteniendo en todo momento:

- control humano;
- trazabilidad;
- separación de responsabilidades;
- validación técnica;
- control de alcance;
- seguridad;
- capacidad de reversión;
- evidencia verificable;
- independencia frente a una herramienta específica.

El objetivo no es maximizar la cantidad de código generado por IA. El objetivo es construir un sistema de trabajo que produzca cambios confiables, comprensibles, revisables y reversibles.

---

## 2. Problema que busca resolver

El desarrollo asistido por IA puede acelerar la producción de software, pero también puede introducir:

- cambios fuera de alcance;
- decisiones técnicas no justificadas;
- dependencias innecesarias;
- código que aparentemente funciona pero no ha sido probado;
- errores difíciles de detectar;
- pérdida de trazabilidad;
- documentación inconsistente;
- exposición de información sensible;
- dependencia excesiva de una herramienta;
- dificultad para revertir cambios;
- falsa confianza en resultados generados automáticamente.

Este proyecto busca reducir esos riesgos mediante un workflow explícito, basado en controles proporcionales al tipo de trabajo y a su nivel de riesgo.

---

## 3. Objetivo general

Diseñar y validar un workflow profesional de desarrollo asistido por IA que pueda aplicarse posteriormente a proyectos reales, manteniendo control humano, evidencia verificable y criterios claros de aprobación.

---

## 4. Objetivos específicos

1. Definir las fases obligatorias del trabajo asistido por IA.
2. Separar las rutas de trabajo de los niveles de control.
3. Definir roles humanos y roles asistidos por IA.
4. Establecer criterios de entrada y salida por fase.
5. Validar herramientas, agentes, skills, repositorios y reglas antes de incorporarlos.
6. Crear mecanismos de revisión, prueba, documentación y reversión.
7. Medir el nivel de intervención humana requerido.
8. Detectar riesgos, fallos metodológicos y cambios fuera de alcance.
9. Construir evidencia que permita decidir qué componentes incorporar al workflow.
10. Evitar que una herramienta específica se convierta prematuramente en dependencia estructural.

---

## 5. Principios rectores

### 5.1 Control humano

La IA puede proponer, analizar y ejecutar acciones autorizadas, pero las decisiones relevantes deben conservar supervisión humana.

La IA no sustituye la responsabilidad del responsable del proyecto.

### 5.2 Evidencia antes que confianza

Ningún resultado se considerará válido únicamente porque una herramienta afirme que funciona.

Toda afirmación relevante deberá estar respaldada por una o más de estas evidencias:

- pruebas automatizadas;
- verificaciones manuales;
- logs;
- diferencias de archivos;
- commits;
- pull requests;
- documentación;
- resultados reproducibles;
- fuentes verificables.

### 5.3 Planificación antes de ejecución

Las tareas que impliquen cambios de código deberán contar con un plan revisado antes de modificar el proyecto, salvo incidentes urgentes en los que se aplique la ruta correspondiente.

### 5.4 Cambios mínimos y controlados

Cada tarea deberá realizar el cambio mínimo suficiente para cumplir el objetivo aprobado.

No se aceptarán refactorizaciones, nuevas dependencias, rediseños o mejoras adicionales que no formen parte del alcance.

### 5.5 Separación entre investigación y adopción

Investigar una herramienta, skill, dependencia o repositorio no implica autorizar su instalación o incorporación.

Toda adopción deberá sustentarse en evidencia y una decisión explícita.

### 5.6 Reversibilidad

Todo cambio deberá contar con una forma identificable de restaurar el proyecto a un estado estable.

La reversión deberá:

- documentarse en tareas normales;
- probarse obligatoriamente en experimentos específicos de reversión;
- ejecutarse cuando ocurra una regla de bloqueo o un fallo grave.

### 5.7 Neutralidad tecnológica

El workflow no dependerá estructuralmente de un lenguaje, framework, proveedor o modelo de IA sin validación previa.

Las tecnologías utilizadas en el sandbox son instrumentos de prueba, no decisiones definitivas para proyectos futuros.

### 5.8 Proporcionalidad

La cantidad de controles deberá ser proporcional al riesgo, impacto y reversibilidad del cambio.

No se aplicará el mismo nivel de burocracia a una corrección documental que a una modificación crítica.

### 5.9 Trazabilidad completa

Debe ser posible reconstruir:

- qué se solicitó;
- quién lo autorizó;
- qué propuso la IA;
- qué se modificó;
- qué pruebas se ejecutaron;
- qué falló;
- qué intervención humana ocurrió;
- por qué se aprobó o rechazó el resultado.

### 5.10 No automatización de decisiones irreversibles

Las decisiones destructivas, sensibles, costosas o de alto impacto no podrán quedar completamente delegadas a una herramienta de IA.

---

## 6. Alcance del proyecto

El proyecto incluye:

- investigación del estado del arte;
- identificación de repositorios y soluciones reutilizables;
- evaluación de herramientas de IA para desarrollo;
- definición de roles y especialistas;
- diseño del ciclo de vida;
- definición de rutas de trabajo;
- definición de niveles de control;
- creación de instrumentos operativos;
- diseño y ejecución de pilotos;
- evaluación de resultados;
- documentación de decisiones;
- definición de controles;
- validación de mecanismos de reversión;
- propuesta de mejoras al workflow.

---

## 7. Exclusiones

Durante el piloto inicial quedan fuera de alcance:

- uso en sistemas de producción;
- información real o confidencial;
- credenciales reales;
- datos personales;
- infraestructura crítica;
- operaciones financieras;
- sistemas médicos, legales o regulados;
- despliegues públicos;
- integraciones con servicios empresariales reales;
- decisiones tecnológicas definitivas;
- automatización autónoma sin supervisión;
- modificación directa de proyectos reales;
- evaluación de escenarios críticos o regulados.

El nivel crítico o regulado se define conceptualmente, pero no será validado durante el primer piloto.

---

## 8. Sandbox

El repositorio oficial del piloto es:

`Huracomo42/workflow-ai-sandbox`

Su propósito exclusivo es:

- ejecutar experimentos controlados;
- probar el workflow;
- evaluar herramientas;
- introducir errores deliberados;
- validar pruebas;
- probar revisiones;
- practicar reversiones;
- almacenar evidencia;
- documentar decisiones.

El sandbox no deberá contener información real, confidencial o necesaria para una operación productiva.

---

## 9. Separación entre rutas y niveles de control

El workflow utiliza dos dimensiones independientes:

1. **Ruta de trabajo:** determina la naturaleza del proceso.
2. **Nivel de control:** determina la intensidad de supervisión y evidencia.

Una ruta no implica automáticamente un nivel de control.

Ejemplo:

- una tarea ligera puede requerir control alto si afecta seguridad;
- una tarea estándar puede requerir control bajo si es documental;
- una investigación exploratoria puede requerir control medio;
- un incidente puede requerir control alto.

---

## 10. Rutas de trabajo

### 10.1 Ruta ligera

Se utiliza para cambios pequeños, localizados, conocidos y fácilmente reversibles.

Ejemplos:

- actualización de documentación;
- corrección de texto;
- cambio funcional pequeño;
- validación sencilla;
- ajuste localizado sin impacto arquitectónico.

Características:

- alcance reducido;
- planificación breve;
- pocas dependencias;
- verificación focalizada;
- documentación proporcional.

No autoriza omitir pruebas cuando el cambio afecta comportamiento.

### 10.2 Ruta estándar

Se utiliza para trabajo de desarrollo normal con múltiples pasos y necesidad de planificación formal.

Ejemplos:

- creación de funcionalidades;
- corrección de defectos;
- refactorización;
- incorporación aprobada de dependencias;
- cambios que afectan varios archivos;
- revisión técnica completa.

Características:

- ficha de experimento obligatoria;
- plan previo;
- rama exclusiva;
- pruebas;
- revisión;
- documentación;
- evaluación mediante rúbrica.

### 10.3 Ruta exploratoria

Se utiliza cuando existe incertidumbre técnica o se requiere investigar antes de decidir.

Ejemplos:

- búsqueda de repositorios;
- comparación de librerías;
- análisis de skills;
- evaluación de herramientas;
- prototipos desechables;
- pruebas de concepto.

Características:

- hipótesis explícita;
- tiempo limitado;
- separación entre exploración y adopción;
- resultado documentado;
- no incorporación automática.

La ruta exploratoria no autoriza instalar o adoptar una solución sin aprobación posterior.

### 10.4 Ruta de incidente

Se utiliza ante fallos, regresiones, pérdida de estabilidad o necesidad urgente de restauración.

Ejemplos:

- pruebas fallidas;
- integración continua rota;
- regresión funcional;
- cambio defectuoso;
- necesidad de rollback;
- comportamiento inesperado.

Características:

- prioridad en contención;
- registro del estado inicial;
- diagnóstico;
- cambio mínimo;
- validación posterior;
- reversión cuando sea necesaria;
- informe del incidente.

---

## 11. Niveles de control

### 11.1 Control bajo

Aplicable cuando:

- el impacto es reducido;
- la reversión es sencilla;
- no se procesa información sensible;
- no existe riesgo significativo;
- el alcance está claramente delimitado.

Requisitos mínimos:

- instrucción clara;
- registro básico;
- revisión del cambio;
- evidencia proporcional;
- ausencia de reglas de bloqueo.

Puntuación mínima recomendada: **35 de 50**.

### 11.2 Control medio

Aplicable cuando:

- el cambio afecta comportamiento funcional;
- intervienen varios archivos;
- existen pruebas obligatorias;
- hay riesgo moderado;
- se requiere revisión humana formal.

Requisitos mínimos:

- ficha de experimento;
- rama exclusiva;
- plan revisado;
- pruebas;
- documentación;
- registro de sesión;
- rúbrica;
- reversión documentada.

Puntuación mínima: **38 de 50**.

Además:

- seguridad y control: mínimo 3;
- calidad de pruebas: mínimo 3;
- ninguna regla de bloqueo activa.

### 11.3 Control alto

Aplicable cuando:

- existe impacto amplio;
- se incorporan dependencias;
- se modifica arquitectura;
- se afecta seguridad;
- existe dificultad de reversión;
- el cambio puede comprometer estabilidad;
- se investiga una acción potencialmente destructiva.

Requisitos mínimos:

- aprobación humana explícita;
- plan detallado;
- análisis de riesgos;
- pruebas reforzadas;
- revisión técnica independiente;
- procedimiento de reversión;
- evidencia completa;
- pull request obligatorio.

Puntuación mínima: **42 de 50**.

Además:

- seguridad y control: mínimo 4;
- calidad de pruebas: mínimo 4;
- capacidad de reversión: mínimo 4;
- ninguna regla de bloqueo activa.

### 11.4 Control crítico o regulado

Aplicable a sistemas con:

- impacto legal;
- impacto médico;
- impacto financiero;
- seguridad física;
- datos altamente sensibles;
- regulación específica;
- consecuencias irreversibles.

Este nivel no se autoriza durante el primer piloto.

Su diseño requerirá posteriormente:

- segregación formal de funciones;
- aprobaciones múltiples;
- auditoría independiente;
- controles regulatorios;
- pruebas especializadas;
- gestión de secretos;
- trazabilidad reforzada;
- validación por especialistas.

---

## 12. Fases del ciclo de vida

### Fase 1. Definición

Objetivo:

- comprender el problema;
- identificar restricciones;
- establecer criterios de éxito;
- determinar ruta y nivel de control.

Salida obligatoria:

- tarea definida;
- alcance aprobado;
- ruta asignada;
- nivel de control asignado.

### Fase 2. Investigación

Objetivo:

- revisar documentación;
- identificar soluciones existentes;
- analizar repositorios, skills o dependencias;
- detectar riesgos y restricciones.

Salida obligatoria cuando corresponda:

- evidencia revisada;
- alternativas;
- recomendación;
- decisión de continuar o detener.

### Fase 3. Diseño y planificación

Objetivo:

- definir la solución;
- identificar archivos afectados;
- establecer pruebas;
- prever riesgos;
- definir reversión.

Salida obligatoria:

- plan revisado;
- alcance confirmado;
- criterios de verificación;
- procedimiento de reversión.

### Fase 4. Ejecución

Objetivo:

- realizar únicamente los cambios autorizados.

Condiciones:

- rama exclusiva;
- estado inicial registrado;
- alcance confirmado;
- plan aprobado.

### Fase 5. Verificación

Objetivo:

- comprobar que el resultado funciona;
- detectar regresiones;
- revisar cambios accidentales;
- validar documentación.

Salida obligatoria:

- pruebas ejecutadas;
- evidencia conservada;
- resultado verificable.

### Fase 6. Revisión

Objetivo:

- evaluar calidad;
- identificar riesgos;
- comprobar cumplimiento del alcance;
- detectar defectos y pruebas faltantes.

La revisión deberá ser independiente cuando el nivel de control sea alto.

### Fase 7. Decisión

Objetivo:

- aprobar;
- aprobar con correcciones;
- repetir;
- rechazar;
- revertir.

La decisión debe sustentarse en evidencia.

### Fase 8. Integración

Objetivo:

- incorporar el cambio aprobado a `main`.

Condiciones:

- pull request;
- pruebas superadas;
- documentación actualizada;
- autorización humana;
- ausencia de bloqueos.

### Fase 9. Cierre y aprendizaje

Objetivo:

- completar registros;
- actualizar el tablero;
- documentar aprendizajes;
- proponer mejoras.

---

## 13. Roles

### 13.1 Responsable humano del proyecto

Responsabilidades:

- aprobar alcance;
- seleccionar ruta y control;
- revisar planes;
- autorizar acciones;
- evaluar resultados;
- aprobar integraciones;
- decidir cambios al workflow;
- detener experimentos.

Durante el piloto, este rol corresponde a Hugo Cornejo Villena.

### 13.2 Revisor metodológico

Responsabilidades:

- comprobar que no se omitan fases;
- detectar adelantos indebidos;
- identificar contradicciones;
- revisar coherencia entre instrumentos;
- proponer cambios sustentados.

El revisor metodológico no modifica el Project Charter unilateralmente.

Todo cambio deberá presentarse como propuesta y requerirá aprobación humana.

### 13.3 Investigador técnico

Responsabilidades:

- buscar repositorios;
- revisar documentación;
- comparar soluciones;
- analizar mantenimiento, licencia y compatibilidad;
- identificar riesgos;
- separar investigación de adopción.

### 13.4 Code Engineer

Responsabilidades:

- analizar requisitos técnicos;
- proponer diseño;
- implementar cambios autorizados;
- mantener calidad de código;
- crear o actualizar pruebas;
- documentar decisiones técnicas;
- respetar alcance y restricciones.

El Code Engineer no es solo un generador de código. Es responsable de la coherencia técnica de la implementación, aunque sus decisiones deben ser revisadas.

### 13.5 Ejecutor de código

Responsabilidades:

- operar sobre el repositorio;
- crear y modificar archivos;
- ejecutar comandos;
- realizar pruebas;
- producir commits;
- preparar pull requests.

Durante el primer piloto se evaluará inicialmente a **Claude Code** como ejecutor.

Su uso no implica adopción definitiva.

### 13.6 Revisor técnico

Responsabilidades:

- revisar código y pruebas;
- identificar defectos;
- detectar cambios fuera de alcance;
- revisar seguridad y mantenibilidad;
- recomendar aprobación o rechazo.

Cuando sea posible, no deberá ser la misma sesión o herramienta que realizó la implementación.

### 13.7 Especialistas adicionales

Podrán incorporarse especialistas en:

- arquitectura;
- seguridad;
- pruebas;
- datos;
- frontend;
- backend;
- DevOps;
- documentación;
- experiencia de usuario;
- dominio del negocio.

Su incorporación dependerá de la tarea y del nivel de control.

---

## 14. Distribución de herramientas

### ChatGPT

Se utilizará para:

- investigación;
- análisis;
- comparación;
- diseño metodológico;
- documentación;
- preparación de experimentos;
- revisión del workflow;
- interpretación de resultados;
- apoyo a decisiones.

ChatGPT no será utilizado como entorno principal de ejecución de código durante el piloto.

### Herramienta de ejecución de código

La programación, modificación de archivos, ejecución de pruebas y operación del repositorio se realizará mediante herramientas diseñadas para trabajar directamente con código.

La herramienta inicial a evaluar será Claude Code.

### GitHub

Se utilizará para:

- control de versiones;
- ramas;
- commits;
- pull requests;
- historial;
- revisión;
- integración;
- reversión;
- evidencia.

---

## 15. Artefactos obligatorios

El paquete operativo está compuesto por:

1. `PROJECT_CHARTER.md`
2. `docs/session-log-template.md`
3. `docs/evaluation-rubric.md`
4. `docs/experiment-template.md`
5. `docs/task-bank.md`
6. `docs/setup-rollback-checklist.md`
7. `docs/execution-protocol.md`
8. `docs/component-decision-template.md`
9. `docs/results-dashboard.md`

Cada experimento deberá producir, como mínimo:

- ficha de experimento;
- registro de sesión;
- rama;
- commits;
- evidencia de pruebas;
- evaluación;
- decisión;
- actualización del tablero.

---

## 16. Política de ramas

### Rama `main`

`main` representa el último estado aprobado y estable.

A partir del inicio de los experimentos:

- no se realizarán cambios funcionales directamente en `main`;
- los cambios deberán integrarse mediante pull request;
- `main` deberá permanecer ejecutable y estable.

La creación inicial del paquete operativo constituye una excepción previa al inicio de los experimentos.

### Ramas de experimentos

Formato:

`experiment/EXP-ID-descripcion-breve`

Ejemplo:

`experiment/EXP-001-create-minimal-app`

Cada experimento deberá utilizar una rama exclusiva.

### Integración

Solo se integrará una rama cuando:

- el experimento esté aprobado;
- las pruebas hayan sido superadas;
- la documentación esté actualizada;
- no existan reglas de bloqueo;
- el responsable humano lo autorice.

---

## 17. Política de commits

Los commits deberán:

- describir un cambio identificable;
- evitar mezclar tareas no relacionadas;
- utilizar mensajes claros;
- conservar trazabilidad;
- facilitar reversión.

Formato recomendado:

`tipo: descripción breve`

Ejemplos:

- `docs: add project charter`
- `feat: add task creation`
- `test: cover empty title validation`
- `fix: persist completed task state`
- `refactor: extract task storage`
- `revert: restore state before EXP-004`

No se exige perfección formal en los commits del paquete inicial, pero sí durante los experimentos.

---

## 18. Política de pull requests

Cada pull request deberá incluir:

- experimento relacionado;
- objetivo;
- alcance;
- archivos modificados;
- pruebas ejecutadas;
- resultados;
- riesgos;
- método de reversión;
- decisión de la rúbrica;
- limitaciones conocidas.

No se aprobará un pull request únicamente porque el código compile o la herramienta declare éxito.

---

## 19. Reglas de aprobación

Un experimento podrá aprobarse cuando:

- cumpla el objetivo;
- respete el alcance;
- supere las pruebas;
- alcance la puntuación mínima;
- cumpla los mínimos por criterio;
- no active reglas de bloqueo;
- mantenga trazabilidad;
- tenga reversión definida;
- actualice documentación;
- sea autorizado por el responsable humano.

---

## 20. Reglas de bloqueo

El experimento no podrá aprobarse cuando ocurra cualquiera de estas condiciones:

- acción destructiva no autorizada;
- exposición de información confidencial;
- uso de credenciales reales;
- modificación fuera del alcance aprobado;
- dependencia no autorizada;
- pruebas críticas no ejecutadas;
- falsificación o invención de evidencia;
- pérdida de trazabilidad;
- imposibilidad de revertir un cambio de riesgo alto;
- integración directa no autorizada a `main`;
- ocultamiento de errores;
- incumplimiento deliberado del protocolo.

Una regla de bloqueo prevalece sobre cualquier puntuación total.

---

## 21. Gestión de dependencias

No podrá incorporarse una nueva dependencia sin:

1. necesidad justificada;
2. investigación previa;
3. revisión de mantenimiento;
4. revisión de licencia;
5. revisión de compatibilidad;
6. evaluación de riesgos;
7. aprobación;
8. actualización de documentación;
9. mecanismo de reversión.

La comodidad de implementación no constituye por sí sola justificación suficiente.

---

## 22. Seguridad y privacidad

Durante el piloto queda prohibido:

- utilizar secretos reales;
- subir contraseñas;
- usar tokens personales;
- incorporar datos de clientes;
- utilizar información privada;
- exponer archivos locales;
- habilitar acceso innecesario a servicios externos;
- ejecutar acciones destructivas sin autorización.

Se utilizarán únicamente datos ficticios.

---

## 23. Gestión de la reversión

### Reversión documentada

Será obligatoria en todos los experimentos.

Debe indicar:

- commit inicial;
- estado de restauración;
- método;
- comandos o procedimiento;
- validación posterior.

### Reversión ejecutada

Será obligatoria:

- en `TB-10`;
- cuando se active una regla de bloqueo;
- cuando el experimento falle gravemente;
- cuando se pierda estabilidad;
- cuando el objetivo específico sea evaluar rollback.

No será obligatorio destruir y restaurar físicamente todos los resultados aprobados de tareas normales.

---

## 24. Gestión de cambios al workflow

El Project Charter no podrá modificarse informalmente durante un experimento.

Todo cambio deberá seguir este proceso:

1. identificar evidencia;
2. describir el problema;
3. proponer la modificación;
4. evaluar impacto;
5. obtener aprobación humana;
6. actualizar el documento;
7. registrar la decisión;
8. aplicar el cambio a experimentos posteriores.

Los resultados de un experimento no podrán usarse retroactivamente para alterar sus propias reglas.

---

## 25. Criterios de entrada al piloto

El piloto podrá iniciar cuando:

- el Project Charter esté aprobado;
- los instrumentos operativos estén completos;
- las contradicciones críticas hayan sido corregidas;
- el sandbox esté disponible;
- la herramienta de ejecución esté definida;
- el primer experimento esté diseñado;
- el alcance esté aprobado;
- exista un punto de restauración;
- se haya creado una rama exclusiva.

---

## 26. Criterios de salida del piloto

El primer ciclo podrá considerarse completado cuando:

- se hayan ejecutado las tareas previstas;
- exista evidencia suficiente;
- las rúbricas estén completas;
- se hayan probado rutas diferentes;
- se haya probado al menos una reversión;
- se hayan documentado incidentes;
- se hayan emitido decisiones por componente;
- el tablero esté actualizado;
- se hayan identificado cambios necesarios en el workflow.

---

## 27. Primer ciclo del piloto

El orden previsto es:

1. `TB-01` — Creación inicial de una aplicación mínima.
2. `TB-03` — Validación de entrada.
3. `TB-02` — Cambio funcional pequeño.
4. `TB-04` — Corrección de defecto.
5. `TB-11` — Actualización de documentación.
6. `TB-10` — Reversión de cambios.

Este orden podrá cambiar únicamente mediante decisión documentada.

---

## 28. Definición preliminar de EXP-001

### Identificación

- Experimento: `EXP-001`
- Tarea: `TB-01`
- Ruta: estándar
- Nivel de control: medio
- Componente principal evaluado: workflow base
- Ejecutor inicial: Claude Code
- Entorno: sandbox
- Estado: pendiente de diseño detallado

### Objetivo

Evaluar si el workflow base permite crear una aplicación mínima funcional manteniendo planificación, control de alcance, pruebas, documentación y trazabilidad.

### Restricciones iniciales

La aplicación:

- será un gestor de tareas;
- utilizará datos ficticios;
- no tendrá autenticación;
- no utilizará servicios externos;
- no será desplegada en producción;
- no contendrá información sensible;
- deberá poder ejecutarse localmente;
- deberá contar con pruebas;
- deberá documentar su instalación;
- deberá poder revertirse al commit inicial.

### Decisión tecnológica

La tecnología concreta no queda aprobada mediante este Charter.

Deberá definirse dentro de la preparación de `EXP-001`, con una opción mínima y proporcional al objetivo.

No se permitirá que el ejecutor elija una arquitectura compleja sin aprobación.

---

## 29. Métricas principales

El piloto medirá:

- puntuación media por experimento;
- calidad técnica;
- calidad de pruebas;
- número de cambios fuera de alcance;
- nivel de intervención humana;
- tiempo de ejecución;
- número de correcciones;
- reglas de bloqueo activadas;
- reversiones exitosas;
- defectos no detectados por la IA;
- documentación producida;
- trazabilidad;
- estabilidad de `main`.

---

## 30. Riesgos del proyecto

### Riesgo: exceso de burocracia

Control:

- aplicar proporcionalidad;
- diferenciar rutas;
- ajustar instrumentos según evidencia.

### Riesgo: falsa sensación de seguridad

Control:

- exigir pruebas y evidencia;
- mantener revisión humana;
- no aceptar autovalidación de la IA.

### Riesgo: dependencia de una herramienta

Control:

- evaluar componentes por separado;
- conservar neutralidad;
- documentar decisiones;
- comparar alternativas posteriormente.

### Riesgo: complejidad prematura

Control:

- usar un sandbox mínimo;
- limitar arquitectura;
- prohibir dependencias no justificadas.

### Riesgo: atribución incorrecta de resultados

Control:

- evaluar inicialmente un componente principal por experimento;
- registrar herramientas y modelos;
- evitar cambiar múltiples variables simultáneamente.

### Riesgo: documentación extensa pero inútil

Control:

- registrar solo información que sirva para decidir, reproducir, revisar o revertir.

---

## 31. Autoridad del documento

Este Project Charter es la fuente rectora del piloto.

Cuando exista contradicción entre este documento y otro instrumento operativo:

1. prevalecerá este Charter;
2. la contradicción deberá registrarse;
3. el instrumento secundario deberá corregirse antes de continuar cuando la diferencia afecte seguridad, aprobación, alcance o reversión.

---

## 32. Aprobación

Con la aprobación de este documento se autoriza:

- cerrar la fase de preparación metodológica;
- corregir los instrumentos operativos;
- diseñar `EXP-001`;
- seleccionar la tecnología mínima del sandbox;
- preparar el entorno de ejecución.

La aprobación de este Charter no autoriza todavía la ejecución de código.

La ejecución de `EXP-001` requerirá una ficha de experimento completa y aprobada.

---

## 33. Registro de aprobación

- Responsable: Hugo Cornejo Villena
- Estado: Aprobado
- Fecha: 17 de julio de 2026
- Observaciones:
