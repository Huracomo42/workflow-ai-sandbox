# EXP-008 — Evaluación

- Piloto: PILOT-003
- Experimento: EXP-008
- Tarea: TB-14 — Priorización y filtrado de tareas
- Fecha real de evaluación: 19 de julio de 2026
- Estado: evaluado, pendiente de cierre humano
- Umbral: 40/50
- Mínimos obligatorios:
  - comprensión del problema ≥ 4/5;
  - trazabilidad ≥ 4/5;
  - control del alcance ≥ 4/5;
  - ninguna pregunta bloqueante abierta.

## 1. Resultado por criterio

| Criterio | Puntaje /5 | Evidencia |
|---|---:|---|
| Comprensión del problema | 5 | Se definieron prioridades, estados, filtros, compatibilidad, casos límite y reglas de rechazo en `EXP-008-pressure-session.md` y `EXP-008-frozen-requirements.md`. |
| Calidad del plan | 4 | La ficha y el paquete operativo definieron actividades, gates y artefactos antes de la sesión. La secuencia fue correcta, aunque la sesión se ejecutó mediante múltiples microdecisiones y pudo consolidarse en menos iteraciones. |
| Control del alcance | 5 | No se modificó código ni pruebas; las decisiones técnicas se difirieron explícitamente a EXP-009. |
| Calidad del artefacto | 5 | Los requisitos congelados separan definiciones, requisitos, invariantes, compatibilidad, casos límite, exclusiones y decisiones técnicas diferidas. |
| Verificabilidad | 5 | Los requisitos son observables y pueden convertirse en criterios y pruebas durante EXP-009. |
| Calidad de validación | 4 | Se presionaron múltiples escenarios funcionales y de compatibilidad. No hubo prototipo ni validación con usuarios, lo cual está fuera del alcance de EXP-008. |
| Documentación | 5 | Existen ficha, registro de presión, requisitos congelados, registro de sesión y evaluación separada. |
| Gestión de riesgos | 4 | Se trataron compatibilidad, datos inválidos, persistencia parcial, filtros y estados vacíos. Los riesgos técnicos concretos se difirieron correctamente a EXP-009. |
| Trazabilidad | 5 | Las decisiones funcionales 1 a 24 y la decisión diferida 15 se consolidaron en requisitos identificados RF-01 a RF-22 y reglas RI-01 a RI-10. |
| Capacidad de corrección | 5 | Las decisiones quedan versionadas en commits separados y cualquier cambio futuro exige nueva aprobación sin reescritura de historial. |

## 2. Puntaje total

- Total: **47/50**
- Umbral requerido: **40/50**
- Comprensión del problema: **5/5**
- Control del alcance: **5/5**
- Trazabilidad: **5/5**
- Preguntas bloqueantes abiertas: **0**

## 3. Reglas de bloqueo

No se activó ninguna regla de bloqueo.

## 4. Limitaciones

- La representación interna de prioridades no fue definida; corresponde a EXP-009.
- No se determinó todavía la estructura exacta de persistencia.
- No se definió aún la distribución modular ni los archivos a modificar.
- No se validó una solución técnica ni se modificó la aplicación.
- La sesión produjo un número alto de commits documentales; es trazable, pero deberá evaluarse si esa granularidad es eficiente.

## 5. Decisión recomendada

**Aprobar EXP-008 con 47/50.**

El experimento cumplió sus criterios de aceptación, preservó la separación entre requisitos y diseño técnico, no modificó código y dejó requisitos congelados suficientemente completos para iniciar EXP-009.

La aprobación final corresponde a Hugo Cornejo Villena y debe registrarse antes de autorizar EXP-009.
