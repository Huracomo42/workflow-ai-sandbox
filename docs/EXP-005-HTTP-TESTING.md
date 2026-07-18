# EXP-005 — Ejecución de pruebas mediante HTTP

## Propósito

Ejecutar la suite del gestor de tareas bajo un origen HTTP local y demostrar que un fallo o una excepción en un caso no detiene los casos posteriores.

## Archivos del experimento

- `tests.html`
- `test-runner.js`
- `docs/EXP-005-HTTP-TESTING.md`

No se modifican `app.js`, `index.html` ni `styles.css`.

## Iniciar el servidor

La evidencia principal debe obtenerse mediante HTTP. No debe abrirse `tests.html` directamente con `file://`.

### Opción A — Windows administrado sin Python ni Node.js

Desde PowerShell, ubicado en la raíz del repositorio, ejecutar el siguiente bloque:

```powershell
$root = (Get-Location).Path
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()

Write-Host "Servidor activo en http://localhost:8000/"
Write-Host "Cierra esta ventana de PowerShell para detenerlo."

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $requestPath = [Uri]::UnescapeDataString(
        $context.Request.Url.AbsolutePath.TrimStart("/")
    )

    if ([string]::IsNullOrWhiteSpace($requestPath)) {
        $requestPath = "index.html"
    }

    $candidate = Join-Path $root $requestPath
    $fullPath = [System.IO.Path]::GetFullPath($candidate)

    if (-not $fullPath.StartsWith(
        $root,
        [System.StringComparison]::OrdinalIgnoreCase
    )) {
        $context.Response.StatusCode = 403
        $bytes = [System.Text.Encoding]::UTF8.GetBytes(
            "403 - Acceso denegado"
        )
    }
    elseif (Test-Path $fullPath -PathType Leaf) {
        $extension = [System.IO.Path]::GetExtension(
            $fullPath
        ).ToLowerInvariant()

        $contentType = switch ($extension) {
            ".html" { "text/html; charset=utf-8" }
            ".js"   { "text/javascript; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            default { "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $context.Response.StatusCode = 200
        $context.Response.ContentType = $contentType
    }
    else {
        $context.Response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes(
            "404 - Archivo no encontrado"
        )
    }

    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $context.Response.OutputStream.Close()
}
```

Para detener el servidor, cerrar la ventana de PowerShell que lo está ejecutando.

### Opción B — Entorno con Python disponible

Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

Para detener el servidor, volver a la terminal y presionar `Ctrl+C`.

## URL principal

```text
http://localhost:8000/tests.html
```

## Ejecuciones obligatorias

### 1. Suite normal

```text
http://localhost:8000/tests.html
```

Resultado esperado:

- los casos funcionales pasan;
- los controles que no corresponden al modo quedan como `NO EJECUTADO`;
- el estado general es `PASS CON NO EJECUTADOS`;
- `T005-FINAL` se ejecuta.

### 2. Fallo de aserción controlado

```text
http://localhost:8000/tests.html?mode=assertion-failure
```

Resultado esperado:

- `T005-CONTROL-ASSERT` queda en `FAIL`;
- los casos posteriores continúan;
- el estado general es `FAIL`;
- `T005-FINAL` se ejecuta.

### 3. Excepción controlada

```text
http://localhost:8000/tests.html?mode=exception
```

Resultado esperado:

- `T005-CONTROL-EXCEPTION` queda en `FAIL`;
- los casos posteriores continúan;
- el estado general es `FAIL`;
- `T005-FINAL` se ejecuta.

### 4. Clasificación de no ejecutado

```text
http://localhost:8000/tests.html?mode=skip
```

Resultado esperado:

- `T005-CONTROL-SKIP` queda en `NO EJECUTADO`;
- la razón es visible;
- el estado general es `PASS CON NO EJECUTADOS`;
- `T005-FINAL` se ejecuta.

## Resultados observados durante EXP-005

| Modo | PASS | FAIL | No ejecutado | Estado general | `T005-FINAL` |
|---|---:|---:|---:|---|---|
| Normal | 12 | 0 | 2 | PASS CON NO EJECUTADOS | Ejecutado |
| Assertion failure | 12 | 1 | 1 | FAIL | Ejecutado |
| Exception | 12 | 1 | 1 | FAIL | Ejecutado |
| Skip | 11 | 0 | 3 | PASS CON NO EJECUTADOS | Ejecutado |

## Evidencia que debe registrarse

Para cada ejecución:

- URL utilizada;
- fecha y hora;
- sistema operativo;
- navegador y versión;
- resumen total;
- resultado de `T005-FINAL`;
- captura o transcripción de resultados;
- limitaciones observadas.

## Criterio de éxito

EXP-005 demuestra aislamiento cuando un caso en `FAIL` o una excepción controlada no evita que `T005-FINAL` se ejecute y el resumen conserva todos los estados.

## Limitaciones conocidas

- La suite es deliberadamente ligera y funciona en el navegador.
- La automatización sin interfaz gráfica se evaluará en EXP-006.
- No se incorporó un framework de pruebas.
- En el equipo Windows usado para la validación, Python y Node.js no estaban disponibles por restricciones de la organización.
- Git advirtió que los finales de línea LF podrían convertirse a CRLF en el entorno Windows; esto no alteró el comportamiento observado.
