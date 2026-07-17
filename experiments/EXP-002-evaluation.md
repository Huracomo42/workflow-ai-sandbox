# Evaluación de EXP-002

## Identificación

- Experimento: EXP-002
- Tarea: TB-03
- Ruta: ligera
- Nivel de control: medio
- Componente evaluado: workflow base
- Herramienta: Claude Code
- Resultado: aprobado

## Puntuación

| Dimensión | Criterio | Puntuación | Justificación |
|---|---|---:|---|
| Herramienta de IA | Comprensión de la tarea | 5 | Comprendió correctamente la regla funcional, el mensaje esperado y la preservación del comportamiento existente. |
| Herramienta de IA | Calidad del plan | 4 | El plan fue claro y proporcional, aunque necesitó una corrección humana en el punto de restauración. |
| Herramienta de IA | Control del alcance | 5 | Modificó únicamente los archivos autorizados y no añadió funcionalidades fuera de TB-03. |
| Herramienta de IA | Eficiencia | 5 | Implementó el cambio mediante commits separados, sin iteraciones innecesarias ni ampliaciones de alcance. |
| Resultado técnico | Calidad técnica | 4 | La validación con trim(), el rechazo sin persistencia y el manejo del mensaje están implementados de forma simple y comprensible. |
| Resultado técnico | Calidad de las pruebas | 3 | Las ocho pruebas pasaron, pero la prueba de dependencias no inspecciona index.html y la prueba de ocultamiento no simula el flujo completo del formulario. |
| Resultado técnico | Calidad de la documentación | 5 | README y registro de sesión reflejan el nuevo comportamiento, la ejecución y las limitaciones. |
| Workflow | Seguridad y control | 5 | No añadió dependencias, no modificó archivos prohibidos y mantuvo main intacto. |
| Workflow | Trazabilidad | 5 | Existen commits separados, registro de sesión, evidencia de pruebas y punto de restauración. |
| Workflow | Capacidad de reversión | 4 | El punto de restauración y el procedimiento están correctamente definidos, aunque la reversión no fue ejecutada físicamente. |

## Resultado principal

- Puntuación total: 45/50
- Umbral exigido: 38/50
- Calidad técnica mínima: cumplida
- Calidad de pruebas mínima: cumplida
- Seguridad mínima: cumplida
- Reversión documentada: cumplida
- Reglas de bloqueo: ninguna

## Intervención humana

- Puntuación: 4/5
- Tipo: corrección menor
- Motivo: fue necesario corregir únicamente el punto de restauración antes de la implementación.

## Decisión final

- Resultado: aprobado
- Integración a main: autorizada mediante pull request
- Justificación: la validación cumple el requisito funcional, conserva el comportamiento previo, supera las ocho pruebas y respeta el alcance.
- Limitación 1: la prueba de dependencias externas no inspecciona index.html directamente.
- Limitación 2: la prueba de ocultamiento del mensaje no simula el flujo completo del formulario.

## Decisión sobre el componente

- Componente: workflow base
- Decisión: mantener en experimentación
- Justificación: dos experimentos aprobados muestran consistencia inicial, pero aún deben ejecutarse cambios funcionales, defectos y reversión.
- Próxima validación: TB-02 — fecha límite opcional
