# Evaluación — EXP-004 / INC-01

## 1. Identificación

- Experimento: EXP-004
- Caso: INC-01
- Nombre: Recuperación ante datos corruptos en localStorage
- Ruta: incidente
- Nivel de control: medio
- Responsable: Hugo Cornejo Villena
- Fecha: 17 de julio de 2026
- Rama evaluada: `incident/EXP-004-corrupt-localstorage`
- Punto de restauración operativo: `a2d2edd7934a30c22867ae641216e3c4b5d1ee65`

## 2. Resultado ejecutivo

El experimento fue ejecutado satisfactoriamente.

Se reprodujo un incidente real causado por contenido JSON inválido en la clave `tasks` de `localStorage`. El diagnóstico identificó correctamente que `JSON.parse()` generaba una excepción no controlada dentro de `loadTasks()`.

La corrección aplicada fue mínima y localizada. Después de la implementación:

- el contenido corrupto deja de bloquear la aplicación;
- `loadTasks()` devuelve una lista vacía;
- el contenido inválido es reemplazado por `[]`;
- el usuario puede volver a crear, listar y completar tareas;
- las funcionalidades anteriores permanecen operativas.

También se ejecutó una reversión real mediante `git revert`, se confirmó la reaparición del incidente y luego se restauró la corrección mediante otro commit trazable.

## 3. Evidencia principal

### Diagnóstico

- Incidente reproducido antes de la corrección: sí
- Error observado: `SyntaxError`
- Función causante: `loadTasks()`
- Expresión causante: `JSON.parse(raw)`
- Causa técnica identificada: ausencia de control de excepciones
- Impacto identificado: bloqueo de renderizado, creación y completado de tareas

### Implementación

- Archivo principal modificado: `app.js`
- Tipo de cambio: manejo de excepción mediante `try/catch`
- Clave de almacenamiento modificada: no
- Sistema de almacenamiento reemplazado: no
- Interfaz modificada: no
- Dependencias añadidas: ninguna

### Pruebas finales

- Resultado: 11/11 PASS
- Navegador: Microsoft Edge headless
- Incluye las diez pruebas obligatorias
- Incluye prueba adicional de cadena vacía corrupta
- El incidente original ya no produce una excepción no controlada

### Reversión

- Commit de corrección: `5bde328`
- Commit de reversión: `2885d47020a2e0f0db846b0084db5dd92968393d`
- Commit de restauración: `1790afd82645ca97ae1aa493b6a931418633c953`
- Método utilizado: `git revert`
- Historial reescrito: no
- Force push utilizado: no
- Resultado durante la reversión: el incidente reapareció
- Resultado después de restaurar: 11/11 PASS

## 4. Evaluación por criterio

| Criterio | Puntaje máximo | Puntaje obtenido | Observación |
|---|---:|---:|---|
| Reproducción controlada del incidente | 5 | 5 | El fallo fue reproducido sobre el código real antes de implementar cambios. |
| Calidad del diagnóstico | 10 | 10 | Se identificaron mensaje, función, expresión, causa, impacto y alcance. |
| Adecuación de la solución | 10 | 10 | La corrección fue mínima, localizada y coherente con el incidente. |
| Preservación del alcance | 5 | 5 | Solo se modificaron los cuatro archivos autorizados. |
| Calidad de las pruebas | 10 | 9 | Se obtuvieron 11/11 PASS. La prueba de dependencias mantiene una limitación conocida bajo `file://`. |
| Documentación y trazabilidad | 5 | 5 | Se registraron diagnóstico, implementación, riesgos, pruebas y decisiones. |
| Reversibilidad | 5 | 5 | Se ejecutó una reversión real y una restauración trazable mediante commits. |

## 5. Puntaje final

**49/50**

## 6. Limitaciones conocidas

1. La corrección controla JSON sintácticamente inválido, pero no valida que un JSON válido produzca específicamente un array.
2. La prueba automática de dependencias externas sobre `index.html` conserva la limitación de origen cruzado bajo `file://`.
3. Durante la reversión, una excepción no controlada interrumpió el resto del script de pruebas después de los primeros fallos. Esto confirmó el impacto real del incidente, pero impidió ejecutar seis pruebas posteriores en ese estado revertido.

## 7. Cumplimiento de criterios de aceptación

- Incidente reproducido antes de corregirlo: cumplido
- Causa identificada: cumplido
- Diez pruebas obligatorias superadas: cumplido
- Prueba adicional de cadena vacía superada: cumplido
- Corrección limitada a `loadTasks()`: cumplido
- Sin cambios fuera de alcance: cumplido
- Sin dependencias nuevas: cumplido
- Punto de restauración registrado: cumplido
- Reversión real ejecutada: cumplido
- Restauración verificada: cumplido
- Evidencia documentada: cumplido

## 8. Decisión

**APROBADO**

EXP-004 cumple los objetivos técnicos y metodológicos definidos para la ruta de incidente con nivel de control medio.

## 9. Recomendaciones

- Mantener `git revert` como mecanismo preferido para reversión trazable.
- Mejorar posteriormente el ejecutor de pruebas para que un fallo individual no interrumpa las pruebas restantes.
- Evaluar en un experimento futuro la validación del tipo de dato resultante de `JSON.parse()`.
- Sustituir progresivamente las pruebas bajo `file://` por un entorno local servido mediante HTTP.

## 10. Autorización siguiente

Se autoriza:

- registrar el cierre de EXP-004;
- crear el pull request;
- revisar los cambios finales;
- integrar a `main` si el pull request no presenta observaciones;
- eliminar la rama después del merge.

No se autoriza todavía el merge hasta completar la revisión del pull request.