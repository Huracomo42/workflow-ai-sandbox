# EXP-006 — GitHub Actions en pull requests

## Objetivo

Validar que la suite del proyecto se ejecute automáticamente al abrir o actualizar un pull request y que GitHub Actions detecte resultados incorrectos.

## Cambio realizado

Se incorporó el workflow:

`.github/workflows/tests.yml`

El workflow:

- se activa en pull requests hacia `main`;
- descarga el repositorio;
- prepara Python;
- levanta un servidor HTTP local;
- ejecuta la suite en Chromium headless;
- verifica el estado general de la suite;
- confirma la ejecución de `T005-FINAL`;
- detiene el servidor al finalizar.

## Evidencia observada

### Ejecución inicial

Resultado: PASS.

GitHub Actions ejecutó correctamente `Browser tests / test` al abrir el pull request.

### Prueba roja controlada

Se modificó temporalmente la expectativa del estado general:

`PASS CON NO EJECUTADOS`

por una expectativa incorrecta:

`PASS`

Resultado: FAIL.

GitHub Actions detectó la discrepancia y el pull request mostró el check en rojo.

### Recuperación

Se restauró la expectativa correcta.

Resultado: PASS.

GitHub Actions volvió a ejecutar la suite automáticamente y el check regresó a verde.

## Criterios de éxito

- El workflow se activa en pull requests: cumplido.
- La suite se ejecuta automáticamente: cumplido.
- Un error intencional produce un check rojo: cumplido.
- La corrección produce nuevamente un check verde: cumplido.
- La aplicación no fue modificada: cumplido.

## Resultado

EXP-006 aprobado.

GitHub Actions queda validado como mecanismo de verificación automática para cambios futuros, incluyendo integraciones de skills, repositorios y componentes externos.
