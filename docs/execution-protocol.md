# Protocolo de ejecución del piloto

## 1. Objetivo

Establecer el procedimiento obligatorio para ejecutar experimentos en el sandbox de forma controlada, trazable y reversible.

Este protocolo desarrolla operativamente el `PROJECT_CHARTER.md`. Si existe contradicción, prevalece el Project Charter.

## 2. Condiciones obligatorias antes de ejecutar

Ningún experimento podrá iniciar sin:

- tarea seleccionada del banco;
- ficha de experimento completa;
- ruta de trabajo definida;
- nivel de control definido;
- componente principal evaluado;
- alcance permitido y no permitido;
- estado inicial registrado;
- procedimiento de reversión;
- rama exclusiva;
- herramienta de ejecución definida;
- aprobación humana;
- registro de sesión iniciado.

Ejecutar código antes de cumplir estas condiciones constituye una desviación metodológica.

## 3. Selección de tarea

Se deberá:

1. seleccionar una tarea de `docs/task-bank.md`;
2. confirmar que pertenece al ciclo autorizado;
3. definir la capacidad del workflow que se evaluará;
4. identificar un componente principal;
5. evitar modificar varias variables principales simultáneamente;
6. asignar una ruta;
7. asignar un nivel de control.

Una tarea nueva requiere aprobación y actualización del banco antes de ejecutarse.

## 4. Rutas de trabajo

### Ruta ligera

Para cambios pequeños, localizados y fácilmente reversibles.

Requiere alcance breve, registro, revisión proporcional, pruebas cuando exista cambio funcional y reversión documentada.

### Ruta estándar

Para desarrollo funcional, corrección de defectos, refactorización o cambios de varios pasos.

Requiere ficha, plan previo, rama exclusiva, pruebas, documentación, revisión, rúbrica y pull request.

### Ruta exploratoria

Para investigación, comparación, prototipos y evaluación de alternativas.

Requiere hipótesis, pregunta de investigación, límite temporal, criterios de comparación, fuentes y decisión separada de adopción.

Investigar no autoriza instalar ni incorporar.

### Ruta de incidente

Para fallos, regresiones o pérdida de estabilidad.

Requiere contención, registro del estado inicial, diagnóstico, cambio mínimo, verificación y reversión cuando corresponda.

## 5. Niveles de control

### Control bajo

Para cambios de bajo impacto y reversión sencilla.

Requisitos mínimos:

- instrucción clara;
- registro básico;
- revisión;
- evidencia proporcional;
- ausencia de bloqueos.

### Control medio

Para cambios funcionales o de riesgo moderado.

Requisitos mínimos:

- ficha de experimento;
- rama exclusiva;
- plan revisado;
- pruebas;
- documentación;
- registro de sesión;
- rúbrica;
- reversión documentada;
- aprobación humana antes de integrar.

### Control alto

Para dependencias, arquitectura, seguridad, impacto amplio o reversión compleja.

Requisitos mínimos:

- aprobación humana explícita;
- análisis de riesgos;
- plan detallado;
- pruebas reforzadas;
- revisión técnica independiente;
- reversión validada;
- trazabilidad completa;
- pull request obligatorio.

### Control crítico

No está autorizado durante el primer piloto.

## 6. Diseño del experimento

Crear una copia de `docs/experiment-template.md` y guardarla en:

`experiments/EXP-ID-descripcion-breve.md`

Debe incluir como mínimo:

- identificación;
- propósito;
- hipótesis;
- componente evaluado;
- herramienta utilizada;
- ruta;
- nivel de control;
- tarea;
- estado inicial;
- alcance permitido;
- alcance no permitido;
- instrucción inicial;
- resultado esperado;
- criterios de éxito;
- evidencias;
- riesgos;
- procedimiento de ejecución;
- procedimiento de reversión.

El estado debe figurar como `aprobado` antes de ejecutar.

## 7. Preparación del repositorio

Antes de trabajar:

1. confirmar que `main` está estable;
2. registrar el commit inicial;
3. comprobar que no hay cambios pendientes;
4. crear una rama exclusiva;
5. confirmar que parte del commit aprobado;
6. completar el checklist;
7. iniciar el registro de sesión.

Formato de rama:

`experiment/EXP-ID-descripcion-breve`

Ejemplo:

`experiment/EXP-001-create-minimal-app`

No se realizarán cambios funcionales directamente en `main`.

## 8. Preparación del entorno

Antes de instalar o ejecutar:

- identificar lenguaje y runtime;
- registrar versiones;
- verificar herramientas;
- confirmar ausencia de credenciales reales;
- confirmar ausencia de información confidencial;
- documentar dependencias;
- ejecutar pruebas iniciales cuando existan;
- registrar el estado funcional inicial.

No se instalarán dependencias no autorizadas.

## 9. Instrucción a la IA

La instrucción deberá indicar:

- objetivo;
- contexto;
- archivos permitidos;
- archivos prohibidos;
- requisitos funcionales;
- restricciones;
- dependencias autorizadas;
- pruebas;
- documentación;
- acciones prohibidas;
- condiciones de detención;
- criterio de finalización.

La instrucción completa deberá copiarse en el registro de sesión.

No se aceptarán órdenes vagas como “haz la aplicación”, “corrige todo” o “usa la mejor arquitectura”.

## 10. Revisión del plan

Antes de modificar archivos, la IA deberá presentar un plan.

El responsable humano verificará que:

- responda al objetivo;
- respete el alcance;
- evite complejidad innecesaria;
- identifique archivos afectados;
- incluya pruebas;
- incluya documentación;
- identifique riesgos;
- contemple reversión;
- no añada dependencias no aprobadas;
- explique cómo verificará el resultado.

La decisión será:

- plan aprobado;
- plan aprobado con correcciones;
- plan rechazado;
- se requiere aclaración.

## 11. Condiciones de detención

La herramienta deberá detenerse cuando:

- exista una ambigüedad relevante;
- necesite modificar archivos fuera del alcance;
- quiera añadir una dependencia;
- el plan deje de ser viable;
- aparezca un riesgo nuevo;
- fallen pruebas críticas;
- exista riesgo de pérdida de información;
- se requieran credenciales;
- aparezca información sensible;
- surja una decisión arquitectónica no aprobada.

Continuar sin autorización será una desviación.

## 12. Ejecución

Durante la ejecución se deberá:

- trabajar solo en la rama del experimento;
- realizar el cambio mínimo suficiente;
- registrar acciones relevantes;
- conservar logs;
- evitar cambios no relacionados;
- no ocultar errores;
- no declarar éxito sin verificación;
- no modificar el Project Charter;
- no ampliar el alcance sin aprobación;
- no integrar directamente a `main`.

Generar código no significa completar la tarea.

## 13. Dependencias

Una dependencia nueva requiere:

1. necesidad justificada;
2. investigación previa;
3. revisión de mantenimiento;
4. revisión de licencia;
5. verificación de compatibilidad;
6. evaluación de riesgos;
7. aprobación humana;
8. documentación;
9. procedimiento de eliminación o reversión.

La comodidad no basta como justificación.

## 14. Commits

Los commits deberán:

- representar cambios identificables;
- evitar mezclar tareas;
- usar mensajes claros;
- facilitar revisión y reversión.

Formato recomendado:

`tipo: descripción breve`

Ejemplos:

- `feat: add task creation`
- `test: cover task creation`
- `docs: document local setup`
- `fix: persist completed state`

## 15. Verificación técnica

Al finalizar:

1. revisar archivos modificados;
2. comprobar que no existen cambios accidentales;
3. ejecutar pruebas automatizadas;
4. realizar verificaciones manuales;
5. comprobar criterios de aceptación;
6. revisar errores y advertencias;
7. confirmar que la documentación coincide con el resultado;
8. conservar logs;
9. registrar evidencia.

Sin pruebas ejecutadas no existe resultado aprobado.

La afirmación de la IA no sustituye el log real.

## 16. Revisión técnica

La revisión comprobará:

- cumplimiento funcional;
- calidad del código;
- calidad de las pruebas;
- alcance;
- seguridad;
- mantenibilidad;
- documentación;
- dependencias;
- reversión;
- regresiones.

Para control alto, la revisión deberá ser independiente.

## 17. Rúbrica y umbrales

Se aplicará `docs/evaluation-rubric.md`.

### Control bajo

- mínimo 35 de 50;
- sin bloqueos;
- calidad técnica y pruebas mínimas de 3 cuando exista cambio funcional.

### Control medio

- mínimo 38 de 50;
- seguridad mínima 3;
- calidad técnica mínima 3;
- pruebas mínimas 3;
- reversión documentada;
- sin bloqueos.

### Control alto

- mínimo 42 de 50;
- seguridad mínima 4;
- pruebas mínimas 4;
- trazabilidad mínima 4;
- reversión mínima 4;
- revisión independiente;
- sin bloqueos.

## 18. Reglas de bloqueo

El experimento no podrá aprobarse si ocurre:

- acción destructiva no autorizada;
- exposición de información confidencial;
- uso de credenciales reales;
- cambio fuera del alcance;
- dependencia no autorizada;
- pruebas críticas no ejecutadas;
- evidencia falsa;
- pérdida de trazabilidad;
- integración directa no autorizada a `main`;
- imposibilidad de revertir un cambio de riesgo alto;
- ocultamiento de errores;
- incumplimiento deliberado del protocolo.

Un bloqueo prevalece sobre cualquier puntuación.

## 19. Reversión

Todos los experimentos deberán documentar:

- commit inicial;
- estado estable;
- método;
- comandos o procedimiento;
- archivos afectados;
- verificación posterior.

La reversión física será obligatoria:

- en `TB-10`;
- cuando el objetivo sea probar rollback;
- ante una regla de bloqueo;
- ante fallo grave;
- ante pérdida de estabilidad;
- cuando lo ordene el responsable humano.

Después de revertir:

1. verificar archivos;
2. reinstalar dependencias si corresponde;
3. iniciar la aplicación;
4. ejecutar pruebas iniciales;
5. confirmar restauración;
6. conservar evidencia;
7. actualizar el registro.

## 20. Decisión

El resultado del experimento será:

- aprobado;
- aprobado con correcciones;
- repetir;
- rechazado.

El componente evaluado recibirá una decisión independiente:

- incorporar;
- incorporar con restricciones;
- mantener en experimentación;
- posponer;
- rechazar.

## 21. Pull request e integración

Todo cambio funcional aprobado deberá integrarse mediante pull request.

El pull request incluirá:

- ID del experimento;
- tarea;
- objetivo;
- alcance;
- archivos modificados;
- pruebas;
- resultados;
- riesgos;
- reversión;
- puntuación;
- bloqueos;
- limitaciones.

Solo podrá integrarse cuando:

- el experimento esté aprobado;
- el umbral y los mínimos se cumplan;
- las pruebas hayan pasado;
- la documentación esté actualizada;
- no existan bloqueos;
- la revisión haya concluido;
- exista autorización humana.

Después de integrar se verificará que `main` siga estable.

## 22. Cierre

Antes de cerrar:

- completar el registro de sesión;
- completar la ficha;
- guardar la rúbrica;
- registrar commits;
- registrar el pull request;
- actualizar el tablero;
- registrar la decisión del componente;
- documentar incidentes;
- definir el siguiente paso.

## 23. Cambios metodológicos

El Project Charter y los instrumentos no podrán modificarse informalmente durante un experimento.

Cualquier mejora deberá:

1. registrar evidencia;
2. describir el problema;
3. proponer el cambio;
4. evaluar impacto;
5. obtener aprobación humana;
6. actualizar el documento;
7. aplicarse a experimentos posteriores.

No se cambiarán las reglas de un experimento en curso para mejorar su resultado.

## 24. Regla final

No se podrá ejecutar un experimento mientras falte alguno de estos elementos:

- Project Charter aprobado;
- paquete operativo completo;
- contradicciones críticas corregidas;
- ficha aprobada;
- rama creada;
- estado inicial registrado;
- herramienta definida;
- alcance aprobado;
- reversión definida.
