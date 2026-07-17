# Protocolo de ejecución del piloto

## 1. Objetivo

Establecer el procedimiento obligatorio para ejecutar experimentos dentro del sandbox de manera controlada, trazable y reversible.

Este protocolo desarrolla operativamente el `PROJECT_CHARTER.md`.

Cuando exista una contradicción entre ambos documentos, prevalecerá el Project Charter.

---

## 2. Regla general

Ningún experimento podrá ejecutarse sin cumplir estas condiciones:

- tarea seleccionada del banco;
- ficha de experimento completa;
- ruta de trabajo definida;
- nivel de control definido;
- alcance autorizado;
- estado inicial registrado;
- procedimiento de reversión definido;
- rama exclusiva creada;
- aprobación humana;
- registro de sesión iniciado.

La ejecución de código antes de cumplir estas condiciones constituye una desviación metodológica.

---

## 3. Selección de la tarea

Antes de iniciar, se deberá:

1. seleccionar una tarea de `docs/task-bank.md`;
2. confirmar que pertenece al ciclo autorizado;
3. identificar la capacidad del workflow que se evaluará;
4. identificar el componente principal evaluado;
5. evitar evaluar múltiples variables principales simultáneamente;
6. definir la ruta de trabajo;
7. definir el nivel de control.

No se podrá ejecutar una tarea no incluida en el banco sin aprobación previa y actualización documental.

---

## 4. Clasificación por ruta

### 4.1 Ruta ligera

Se utilizará para cambios pequeños, localizados y fácilmente reversibles.

Requiere:

- alcance breve;
- registro de sesión;
- revisión proporcional;
- pruebas cuando exista cambio funcional;
- evidencia suficiente;
- reversión documentada.

### 4.2 Ruta estándar

Se utilizará para desarrollo funcional, corrección de defectos, refactorización o cambios de varios pasos.

Requiere:

- ficha de experimento;
- plan previo;
- rama exclusiva;
- pruebas;
- documentación;
- rúbrica;
- revisión humana;
- pull request.

### 4.3 Ruta exploratoria

Se utilizará para investigación, comparación, prototipos y evaluación de alternativas.

Requiere:

- hipótesis;
- pregunta de investigación;
- límite temporal;
- criterios de comparación;
- fuentes revisadas;
- resultado documentado;
- decisión separada de adopción.

La investigación no autoriza instalación ni incorporación automática.

### 4.4 Ruta de incidente

Se utilizará ante fallos, regresiones o pérdida de estabilidad.

Requiere:

- contención;
- registro del estado inicial;
- diagnóstico;
- cambio mínimo;
- verificación posterior;
- reversión cuando corresponda;
- informe del incidente.

---

## 5. Clasificación por nivel de control

### 5.1 Control bajo

Aplicable a cambios de bajo impacto y reversión sencilla.

Requisitos mínimos:

- instrucción clara;
- registro básico;
- revisión del cambio;
- evidencia proporcional;
- ausencia de reglas de bloqueo.

### 5.2 Control medio

Aplicable a cambios funcionales o de riesgo moderado.

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

### 5.3 Control alto

Aplicable a cambios de impacto amplio, dependencias, arquitectura, seguridad o reversión compleja.

Requisitos mínimos:

- aprobación humana explícita;
- análisis de riesgos;
- plan detallado;
- pruebas reforzadas;
- revisión técnica independiente;
- reversión validada;
- trazabilidad completa;
- pull request obligatorio.

### 5.4 Control crítico o regulado

No está autorizado durante el primer piloto.

---

## 6. Diseño del experimento

Crear una copia de `docs/experiment-template.md`.

El archivo deberá almacenarse en:

```text
experiments/EXP-ID-descripcion-breve.md
