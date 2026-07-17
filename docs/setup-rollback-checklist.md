# Checklist de instalación y reversión

## Objetivo

Asegurar que cada experimento pueda instalarse, ejecutarse y revertirse de forma controlada y reproducible.

## 1. Preparación del entorno

- [ ] El repositorio fue clonado correctamente.
- [ ] Se confirmó la rama de trabajo.
- [ ] La rama fue creada desde la versión aprobada de `main`.
- [ ] No existen cambios locales sin registrar.
- [ ] Se registró el commit inicial.
- [ ] Se verificó la versión de Git.
- [ ] Se verificó la versión del lenguaje o runtime.
- [ ] Se verificó la disponibilidad de las herramientas necesarias.
- [ ] No se utilizarán credenciales reales.
- [ ] No existe información confidencial en el entorno.

## 2. Instalación

- [ ] Las instrucciones de instalación están documentadas.
- [ ] Las dependencias están declaradas en archivos controlados por versión.
- [ ] La instalación se realizó sin errores.
- [ ] No se instalaron dependencias fuera del alcance aprobado.
- [ ] Se registraron las versiones instaladas.
- [ ] Se verificó que la aplicación inicia correctamente.
- [ ] Se ejecutaron las pruebas iniciales.
- [ ] Se registró el resultado de las pruebas iniciales.

## 3. Punto de restauración

- [ ] Se identificó el commit inicial.
- [ ] Se creó una rama exclusiva para el experimento.
- [ ] Se confirmó que `main` no será modificada directamente.
- [ ] Se verificó que el estado inicial puede recuperarse.
- [ ] Se registró el método de reversión previsto.

## 4. Ejecución controlada

- [ ] Existe una ficha de experimento aprobada.
- [ ] El alcance permitido está claramente definido.
- [ ] El alcance no permitido está claramente definido.
- [ ] Se inició el registro de sesión.
- [ ] El plan de la IA fue revisado antes de ejecutar cambios.
- [ ] Los cambios se realizaron únicamente en la rama del experimento.
- [ ] Cada cambio relevante quedó registrado.
- [ ] Se ejecutaron las pruebas requeridas.
- [ ] Se guardaron logs y evidencias.

## 5. Verificación posterior

- [ ] La aplicación inicia correctamente.
- [ ] Las pruebas automatizadas fueron superadas.
- [ ] Se realizaron las verificaciones manuales necesarias.
- [ ] No existen cambios fuera del alcance.
- [ ] La documentación fue actualizada.
- [ ] Se revisaron los archivos modificados.
- [ ] Se aplicó la rúbrica de evaluación.
- [ ] No se activó ninguna regla de bloqueo.

## 6. Reversión

- [ ] Se identificó el cambio que debe revertirse.
- [ ] Se confirmó el punto de restauración.
- [ ] Se guardó la evidencia del estado previo.
- [ ] Se ejecutó el método de reversión aprobado.
- [ ] Se verificó que los archivos regresaron al estado esperado.
- [ ] Se reinstalaron dependencias si fue necesario.
- [ ] La aplicación volvió a iniciar correctamente.
- [ ] Las pruebas iniciales volvieron a superarse.
- [ ] Se documentó cualquier pérdida o efecto residual.
- [ ] Se registró la reversión en el registro de sesión.

## 7. Cierre

- [ ] Las evidencias están completas.
- [ ] La ficha de experimento fue actualizada.
- [ ] La rúbrica fue completada.
- [ ] Se emitió una decisión.
- [ ] Se definió el próximo paso.
- [ ] La rama fue conservada o eliminada según la decisión.
- [ ] `main` permanece estable.

## Datos de control

- Experimento:
- Responsable:
- Rama:
- Commit inicial:
- Commit final:
- Método de reversión:
- Fecha:
- Resultado:
