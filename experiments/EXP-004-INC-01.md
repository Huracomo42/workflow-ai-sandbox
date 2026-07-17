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