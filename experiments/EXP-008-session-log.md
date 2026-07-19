# EXP-008 — Registro de sesión

- Fecha de creación: 19 de julio de 2026
- Fecha de ejecución: 19 de julio de 2026
- Estado: cerrado y aprobado
- Rama: `pilot-003/exp-008-requirements`
- Código de aplicación modificado: no
- Pruebas modificadas: no

## 1. Línea base

- Paquete operativo de PILOT-003 integrado en `main`.
- TB-14 registrada.
- Plantillas de EXP-008 disponibles.
- Gate P3-1 aprobado por Hugo Cornejo Villena.
- Rama exclusiva creada desde `main`.

## 2. Objetivo ejecutado

Realizar una Domain Pressure Session para resolver ambigüedades funcionales de TB-14 y congelar requisitos sin introducir decisiones técnicas de implementación.

## 3. Resultado de la sesión

- Decisiones funcionales aprobadas: 24.
- Decisiones técnicas diferidas: 1.
- Preguntas funcionales bloqueantes abiertas: 0.
- Requisitos funcionales congelados: RF-01 a RF-22.
- Reglas e invariantes: RI-01 a RI-10.
- Casos límite obligatorios: 15.
- Código modificado: 0 archivos.
- Dependencias incorporadas: ninguna.

## 4. Decisiones principales

Se definieron:

- prioridades válidas;
- valores predeterminados para tareas antiguas y nuevas;
- tratamiento de prioridades inválidas;
- edición de prioridad;
- rechazo atómico;
- opciones y combinación de filtros;
- comportamiento bajo filtros activos;
- estados vacíos;
- conservación del orden;
- persistencia y restablecimiento de filtros;
- compatibilidad con datos existentes.

La representación interna de prioridades se difirió a EXP-009.

## 5. Commits relevantes

- `a0d5431` — autorización de inicio.
- commits documentales separados para decisiones funcionales y diferimiento técnico.
- `048967e` — congelamiento de requisitos.

Los hashes intermedios de decisiones se conservan en el historial Git de la rama.

## 6. Gates

| Gate | Estado | Fecha real | Evidencia |
|---|---|---|---|
| Gate 0 — artefactos previos disponibles | Cerrado | 19/07/2026 | Paquete operativo, TB-14 y plantillas integradas previamente en `main`. |
| Gate 1 — autorización humana | Cerrado | 19/07/2026 | Commit `a0d5431`. |
| Gate 2 — preguntas y decisiones completadas | Cerrado | 19/07/2026 | `EXP-008-pressure-session.md`; 24 decisiones funcionales y 1 diferida. |
| Gate 3 — requisitos congelados | Cerrado | 19/07/2026 | Commit `048967e`; `EXP-008-frozen-requirements.md`. |
| Gate 4 — evaluación y dashboard | Cerrado | 19/07/2026 | Evaluación versionada y dashboard actualizado en el commit `d6c0d5d`. |
| Gate 5 — cierre humano | Cerrado | 19/07/2026 | Aprobación registrada en el commit `6de8fda`. |

## 7. Evaluación

- Puntaje: **47/50**
- Resultado recomendado: aprobado.
- Archivo: `experiments/EXP-008-evaluation.md`

## 8. Excepciones

Ninguna.

## 9. Limitaciones y mejora metodológica

La sesión fue rigurosa, pero excesivamente fragmentada en microdecisiones individuales. Para sesiones futuras deberá agruparse un conjunto coherente de decisiones por bloque y aprobarse en lotes, sin reducir trazabilidad ni control humano.

## 10. Próximos pasos

1. Versionar esta evaluación y este registro.
2. Actualizar `docs/results-dashboard.md` en un commit separado.
3. Obtener aprobación humana del cierre de EXP-008.
4. Abrir pull request y verificar CI.
5. Integrar a `main`.
6. Solo después solicitar autorización para EXP-009.

## Aprobación humana de cierre

- Gate: P3-2 / Gate 5 de EXP-008
- Fecha: 19 de julio de 2026
- Decisión: EXP-008 queda aprobado con 47/50.
- Excepciones: ninguna.
- Observación metodológica: EXP-009 deberá reducir la fragmentación y presentar decisiones agrupadas por bloques coherentes.
- Resultado: autorizado para pasar al cierre documental y pull request.
- Autoriza: Hugo Cornejo Villena.
