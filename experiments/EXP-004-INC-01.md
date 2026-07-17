# EXP-004 — Recuperación ante localStorage corrupto

## 1. Identificación

- ID del experimento: EXP-004
- Caso: INC-01
- Nombre: Recuperación ante datos corruptos en localStorage
- Responsable: Hugo Cornejo Villena
- Estado: aprobado para preparación
- Fecha: 17 de julio de 2026

## 2. Clasificación

- Ruta: incidente
- Nivel de control: medio
- Componente evaluado: diagnóstico y recuperación
- Herramienta prevista: Claude Code

## 3. Contexto del incidente

La aplicación almacena las tareas mediante `localStorage`.

Actualmente, si la clave `tasks` contiene texto que no representa un JSON válido, `JSON.parse()` genera una excepción y puede impedir que la aplicación cargue y muestre las tareas.

Ejemplo controlado del incidente:

```javascript
localStorage.setItem('tasks', '{datos-corruptos');
```

## 4. Objetivo

Diagnosticar y corregir el fallo para que la aplicación pueda recuperarse de datos corruptos en `localStorage` sin quedar inutilizable.

## 5. Comportamiento esperado

Cuando el contenido almacenado sea válido:

- las tareas deben cargarse normalmente;
- no debe cambiar el comportamiento existente.

Cuando el contenido almacenado sea inválido:

- la aplicación no debe lanzar una excepción no controlada;
- debe devolver una lista vacía;
- debe reemplazar el contenido corrupto por una lista vacía válida;
- el usuario debe poder crear nuevas tareas después de la recuperación;
- no deben afectarse la validación del título, la fecha opcional ni el marcado como completado.

## 6. Alcance permitido

Se permite modificar únicamente:

- `app.js`
- `tests.html`
- `README.md`
- `experiments/EXP-004-session-log.md`

Se permite crear únicamente:

- `experiments/EXP-004-session-log.md`
- `experiments/EXP-004-evaluation.md`

## 7. Fuera de alcance

No se permite:

- cambiar la clave `tasks`;
- reemplazar `localStorage`;
- añadir bases de datos;
- añadir backend;
- añadir frameworks o paquetes;
- mostrar notificaciones nuevas al usuario;
- modificar la interfaz;
- editar o eliminar tareas;
- modificar `PROJECT_CHARTER.md`;
- modificar archivos dentro de `docs/`;
- modificar experimentos anteriores;
- realizar refactorizaciones no relacionadas.

## 8. Reproducción obligatoria

Antes de implementar la corrección debe demostrarse el incidente mediante:

```javascript
localStorage.setItem('tasks', '{datos-corruptos');
loadTasks();
```

Debe registrarse:

- error observado;
- función donde ocurre;
- causa técnica;
- impacto;
- alcance del incidente.

## 9. Corrección esperada

`loadTasks()` debe controlar los errores producidos por `JSON.parse()`.

Cuando detecte contenido inválido debe:

1. devolver `[]`;
2. guardar `[]` en la clave `tasks`;
3. permitir que la aplicación continúe funcionando.

La corrección debe ser mínima y localizada.

## 10. Pruebas obligatorias

Deben comprobarse como mínimo:

1. Un almacenamiento vacío devuelve `[]`.
2. Un JSON válido sigue cargándose correctamente.
3. Un JSON corrupto no lanza una excepción no controlada.
4. Un JSON corrupto devuelve `[]`.
5. Después de la recuperación, `localStorage` contiene `[]`.
6. Se puede crear una tarea después de la recuperación.
7. La validación del título vacío sigue funcionando.
8. La fecha límite opcional sigue almacenándose correctamente.
9. Marcar una tarea como completada sigue funcionando.
10. No se añadieron dependencias externas.

## 11. Criterios de aceptación

El experimento se considera satisfactorio cuando:

- el incidente se reproduce antes de corregirlo;
- se identifica correctamente la causa;
- pasan las diez pruebas;
- la corrección se limita a `loadTasks()` y a la documentación o pruebas necesarias;
- no existen cambios fuera de alcance;
- no se añaden dependencias;
- existe un punto de restauración;
- existe evidencia de diagnóstico y recuperación.

## 12. Estrategia de ejecución

1. Crear la ficha y el registro inicial.
2. Crear una rama exclusiva desde `main`.
3. Registrar el punto de restauración.
4. Reproducir el incidente sin modificar código.
5. Solicitar un diagnóstico a Claude Code.
6. Revisar y aprobar el diagnóstico.
7. Solicitar un plan de corrección.
8. Autorizar una corrección mínima.
9. Ejecutar las diez pruebas.
10. Revisar evidencia y aplicar la rúbrica.
11. Crear pull request únicamente si el resultado es aprobado.

## 13. Reversión

La reversión se realizará restaurando la rama al commit operativo registrado antes de la corrección o eliminando la rama del experimento.

## 14. Reglas de bloqueo

El experimento debe detenerse si:

- no se reproduce el incidente;
- Claude Code modifica código antes de completar el diagnóstico;
- propone borrar toda la funcionalidad de persistencia;
- cambia la clave `tasks`;
- modifica la interfaz;
- añade dependencias;
- modifica archivos no autorizados;
- no puede restaurarse el estado anterior;
- se realizan cambios directos en `main`.

## 15. Decisión previa

- Reproducción y diagnóstico: autorizados después de crear la rama.
- Implementación: no autorizada hasta revisar el diagnóstico y el plan.
- Merge a `main`: no autorizado hasta completar evaluación y pull request.