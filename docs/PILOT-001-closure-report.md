# Informe de cierre — PILOT-001

## 1. Identificación

- Piloto: PILOT-001
- Nombre: Validación inicial del workflow de desarrollo asistido por IA
- Responsable: Hugo Cornejo Villena
- Repositorio: `Huracomo42/workflow-ai-sandbox`
- Fecha de cierre: 17 de julio de 2026
- Rama de cierre: `docs/PILOT-001-closure-report`
- Estado: en consolidación

## 2. Objetivo del piloto

Validar en un entorno controlado la capacidad del workflow para:

- definir tareas antes de programar;
- separar preparación, implementación, revisión y cierre;
- controlar alcance y archivos autorizados;
- trabajar con ramas y pull requests;
- registrar sesiones y evidencias;
- ejecutar pruebas;
- evaluar resultados;
- manejar incidentes;
- ejecutar una reversión real y trazable;
- mantener intervención humana en decisiones clave.

## 3. Alcance ejecutado

El piloto incluyó cuatro experimentos:

| Experimento | Caso | Objetivo | Resultado |
|---|---|---|---|
| EXP-001 | TB-01 | Crear una aplicación mínima de tareas | Aprobado |
| EXP-002 | TB-03 | Validar títulos vacíos o con espacios | Aprobado |
| EXP-003 | TB-02 | Incorporar fecha límite opcional | Aprobado |
| EXP-004 | INC-01 | Recuperarse de datos corruptos en `localStorage` | Aprobado |

## 4. Resultados por experimento

### EXP-001 — Aplicación mínima

Se construyó una aplicación local con HTML, CSS y JavaScript puro para:

- crear tareas;
- listar tareas;
- marcar tareas como completadas;
- persistir tareas mediante `localStorage`.

Resultado:

- 5/5 pruebas superadas;
- evaluación: 40/50;
- pull request integrado;
- rama eliminada.

### EXP-002 — Validación del título

Se incorporó el rechazo de títulos vacíos o compuestos únicamente por espacios.

Resultado:

- mensaje exacto: `Escribe un título para la tarea.`;
- 8/8 pruebas superadas;
- evaluación: 45/50;
- pull request integrado;
- rama eliminada.

### EXP-003 — Fecha límite opcional

Se incorporó una fecha límite opcional para las tareas.

Resultado:

- almacenamiento en formato `YYYY-MM-DD`;
- visualización en formato `DD/MM/YYYY`;
- compatibilidad con tareas antiguas;
- 9/9 pruebas superadas;
- evaluación: 48/50;
- pull request integrado;
- rama eliminada.

### EXP-004 — Incidente de localStorage corrupto

Se reprodujo y corrigió un incidente causado por JSON inválido en `localStorage`.

Resultado:

- diagnóstico previo a la corrección;
- manejo de excepción en `loadTasks()`;
- recuperación mediante reemplazo por `[]`;
- 11/11 pruebas superadas;
- reversión real con `git revert`;
- restauración posterior verificada;
- evaluación: 49/50;
- pull request integrado;
- rama eliminada.

## 5. Evidencias consolidadas

### Gestión de versiones

- Todos los cambios funcionales se realizaron fuera de `main`.
- Cada experimento utilizó una rama exclusiva.
- Todos los cambios aprobados se integraron mediante pull request.
- Las ramas fueron eliminadas después del merge.
- No se utilizó force push.
- En EXP-004 no se reescribió el historial durante la reversión.

### Pruebas

- EXP-001: 5/5 PASS
- EXP-002: 8/8 PASS
- EXP-003: 9/9 PASS
- EXP-004: 11/11 PASS

Total de pruebas finales superadas:

**33/33**

### Evaluaciones

| Experimento | Puntaje |
|---|---:|
| EXP-001 | 40/50 |
| EXP-002 | 45/50 |
| EXP-003 | 48/50 |
| EXP-004 | 49/50 |

Promedio del piloto:

**45.5/50**

## 6. Capacidades validadas

El piloto permitió validar las siguientes capacidades del workflow:

1. Definición previa de requisitos.
2. Separación entre planificación e implementación.
3. Control de archivos y alcance.
4. Uso de ramas aisladas.
5. Registro de puntos de restauración.
6. Implementación asistida por IA.
7. Revisión humana antes de autorizar cambios.
8. Ejecución de pruebas funcionales.
9. Documentación de evidencia.
10. Evaluación mediante rúbrica.
11. Uso de pull requests.
12. Integración controlada a `main`.
13. Diagnóstico de incidentes.
14. Reversión trazable.
15. Restauración posterior.
16. Registro de limitaciones conocidas.

## 7. Fortalezas observadas

### 7.1. Control del proceso

El workflow evitó que la herramienta de IA avanzara directamente desde una solicitud general hacia cambios no controlados.

Cada experimento tuvo:

- objetivo;
- alcance;
- restricciones;
- pruebas;
- punto de restauración;
- revisión humana;
- decisión formal.

### 7.2. Trazabilidad

Las decisiones importantes quedaron respaldadas por:

- commits;
- registros de sesión;
- fichas de experimento;
- evaluaciones;
- resultados de pruebas;
- pull requests.

### 7.3. Mejora progresiva

Los puntajes aumentaron de 40/50 a 49/50, lo que sugiere que el proceso fue mejorando conforme se incorporaron controles y evidencia más rigurosa.

### 7.4. Manejo de incidentes

EXP-004 confirmó que el workflow puede usarse no solo para desarrollar funciones, sino también para:

- reproducir fallos;
- diagnosticar;
- autorizar un plan;
- corregir;
- revertir;
- restaurar;
- documentar el incidente.

## 8. Debilidades y problemas detectados

### 8.1. Pruebas bajo `file://`

Las pruebas automáticas presentan limitaciones de origen cruzado cuando intentan inspeccionar `index.html` desde `tests.html`.

Impacto:

- algunas verificaciones dependen de respaldo manual o indirecto;
- no existe todavía un entorno de prueba servido mediante HTTP.

### 8.2. Ejecutor de pruebas frágil

Durante la reversión de EXP-004, una excepción no controlada interrumpió la ejecución de pruebas posteriores.

Impacto:

- no todas las pruebas pudieron reportar un resultado individual durante el estado revertido;
- el ejecutor necesita aislar cada caso para continuar aunque uno falle.

### 8.3. Carga documental alta

La documentación fue útil, pero la creación manual de fichas, registros y evaluaciones puede resultar pesada en tareas pequeñas.

Impacto:

- el workflow necesita variantes según ruta y nivel de control;
- una tarea ligera no debería exigir el mismo volumen documental que un incidente de nivel medio o un proyecto crítico.

### 8.4. Ausencia de integración continua

El repositorio no cuenta con GitHub Actions u otro mecanismo de CI.

Impacto:

- las pruebas dependen de ejecución local;
- GitHub no bloquea automáticamente un merge cuando una prueba falla;
- la evidencia debe registrarse manualmente.

### 8.5. Validaciones técnicas todavía limitadas

La aplicación sigue aceptando JSON válido cuyo resultado no sea un array.

Este caso quedó documentado y fuera del alcance de EXP-004, pero representa una deuda técnica conocida.

## 9. Hallazgos metodológicos

### 9.1. Separar ruta y nivel de control fue correcto

El piloto confirmó que una ruta de trabajo y un nivel de control representan dimensiones distintas.

Ejemplos:

- EXP-002 y EXP-003 fueron tareas funcionales estándar.
- EXP-004 utilizó una ruta de incidente.
- La profundidad documental aumentó por la naturaleza del trabajo y por su nivel de control.

### 9.2. La intervención humana debe mantenerse

Las decisiones humanas fueron necesarias para:

- aprobar diagnósticos;
- corregir planes incompletos;
- evitar `git reset --hard`;
- autorizar la implementación;
- aprobar evaluaciones;
- autorizar merges.

La IA no debe decidir por sí sola:

- ampliar alcance;
- aceptar limitaciones;
- integrar cambios;
- modificar el Project Charter;
- eliminar evidencia.

### 9.3. La reversión debe ser una capacidad operativa

Documentar un punto de restauración no equivale a comprobar que la reversión funciona.

EXP-004 demostró que el workflow debe distinguir entre:

- reversión prevista;
- reversión ejecutada;
- restauración verificada.

### 9.4. Las pruebas deben diseñarse para fallar de forma aislada

Cada prueba debería capturar su propio error y registrar PASS o FAIL sin detener las pruebas siguientes.

Esto debe incorporarse como requisito del futuro estándar de pruebas.

## 10. Decisiones propuestas

Se propone aprobar las siguientes decisiones para la siguiente versión del workflow:

1. Mantener la separación entre rutas de trabajo y niveles de control.
2. Mantener la intervención humana obligatoria antes de implementación, merge y cambios de alcance.
3. Adoptar `git revert` como mecanismo preferido para reversión trazable.
4. Exigir reversión ejecutada únicamente cuando el nivel de control o el riesgo lo justifique.
5. Crear plantillas documentales reducidas para tareas ligeras.
6. Crear plantillas completas para rutas estándar, exploratorias e incidentes.
7. Incorporar un servidor HTTP local para pruebas.
8. Mejorar el ejecutor para aislar fallos.
9. Incorporar integración continua en una segunda ronda de validación.
10. Mantener las limitaciones conocidas como entradas explícitas del backlog.

## 11. Ajustes propuestos al workflow

Los siguientes ajustes deben ser revisados y aprobados antes de incorporarse formalmente:

### Ajuste A — Plantillas por nivel de control

Crear variantes:

- bajo: registro mínimo;
- medio: ficha, sesión, pruebas y evaluación;
- alto: revisión independiente, reversión y evidencias reforzadas;
- crítico o regulado: aprobaciones múltiples, auditoría y controles adicionales.

### Ajuste B — Protocolo de pruebas

Añadir como requisitos:

- ejecución mediante servidor HTTP local;
- aislamiento de cada prueba;
- reporte completo aunque existan fallos;
- separación entre prueba automática y verificación manual;
- evidencia del navegador y entorno utilizado.

### Ajuste C — Protocolo de reversión

Distinguir:

- punto de restauración registrado;
- plan de reversión;
- reversión ensayada;
- reversión ejecutada;
- restauración posterior.

### Ajuste D — Integración continua

Evaluar una segunda ronda con:

- GitHub Actions;
- ejecución automática de pruebas;
- validación del alcance;
- bloqueo de merge cuando las pruebas fallen.

## 12. Decisión del piloto

**PILOT-001 APROBADO CON AJUSTES**

El workflow demostró ser viable para controlar tareas funcionales e incidentes pequeños en un repositorio real.

No se considera todavía validado para:

- proyectos con múltiples desarrolladores;
- cambios de arquitectura;
- dependencias externas;
- bases de datos;
- despliegues;
- seguridad;
- sistemas críticos o regulados;
- desarrollo paralelo complejo;
- integración continua.

## 13. Recomendación de siguiente etapa

Preparar una segunda ronda de pilotos orientada a validar:

1. pruebas mediante HTTP;
2. integración continua;
3. ejecución automática en pull requests;
4. tareas con dependencias;
5. revisión especializada de código;
6. coordinación entre varios agentes;
7. una ruta exploratoria;
8. un nivel de control alto.

Antes de iniciar PILOT-002, deben aprobarse los ajustes metodológicos señalados en este informe.

## 14. Estado final

- EXP-001: cerrado
- EXP-002: cerrado
- EXP-003: cerrado
- EXP-004: cerrado
- PILOT-001: aprobado con ajustes
- Siguiente hito: revisión y aprobación de ajustes metodológicos