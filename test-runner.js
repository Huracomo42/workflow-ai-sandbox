(function () {
  'use strict';

  const STATUS = Object.freeze({
    PASS: 'PASS',
    FAIL: 'FAIL',
    NOT_RUN: 'NO EJECUTADO'
  });

  const mode = new URLSearchParams(window.location.search).get('mode') || 'normal';
  const resultsList = document.getElementById('results');
  const summaryElement = document.getElementById('summary');
  const indexFrame = document.getElementById('index-frame');
  const results = [];

  function resetStorage() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'La condición esperada no se cumplió.');
    }
  }

  function findExternalRefs(doc) {
    return Array.from(doc.querySelectorAll('script[src], link[href]'))
      .map((element) => element.getAttribute('src') || element.getAttribute('href'))
      .filter((reference) => /^(https?:)?\/\//i.test(reference));
  }

  function waitForFrame(frame) {
    return new Promise((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        reject(new Error('El iframe no terminó de cargar dentro del tiempo esperado.'));
      }, 5000);

      function finish() {
        window.clearTimeout(timeoutId);
        resolve();
      }

      if (frame.contentDocument && frame.contentDocument.readyState === 'complete') {
        finish();
        return;
      }

      frame.addEventListener('load', finish, { once: true });
      frame.addEventListener(
        'error',
        () => {
          window.clearTimeout(timeoutId);
          reject(new Error('No se pudo cargar index.html en el iframe.'));
        },
        { once: true }
      );
    });
  }

  function renderResult(result) {
    const item = document.createElement('li');
    item.className =
      result.status === STATUS.PASS
        ? 'pass'
        : result.status === STATUS.FAIL
          ? 'fail'
          : 'not-run';

    const detail = result.detail ? ` (${result.detail})` : '';
    item.textContent = `${result.status} - ${result.id}: ${result.name}${detail}`;
    resultsList.appendChild(item);
  }

  function renderSummary() {
    const totals = results.reduce(
      (accumulator, result) => {
        accumulator.total += 1;
        if (result.status === STATUS.PASS) accumulator.passed += 1;
        if (result.status === STATUS.FAIL) accumulator.failed += 1;
        if (result.status === STATUS.NOT_RUN) accumulator.notRun += 1;
        return accumulator;
      },
      { total: 0, passed: 0, failed: 0, notRun: 0 }
    );

    const suitePassed = totals.failed === 0;
    const generalStatus =
      suitePassed && totals.notRun > 0 ? 'PASS CON NO EJECUTADOS' : suitePassed ? 'PASS' : 'FAIL';

    summaryElement.classList.remove('suite-pass', 'suite-fail');
    summaryElement.classList.add(suitePassed ? 'suite-pass' : 'suite-fail');
    summaryElement.textContent =
      `Estado general: ${generalStatus} | ` +
      `Total: ${totals.total} | PASS: ${totals.passed} | ` +
      `FAIL: ${totals.failed} | NO EJECUTADO: ${totals.notRun} | Modo: ${mode}`;

    document.title = `${generalStatus} — Pruebas EXP-005`;
    document.documentElement.dataset.testStatus = suitePassed ? 'pass' : 'fail';
    document.documentElement.dataset.testGeneralStatus = generalStatus;
    document.documentElement.dataset.testTotals = JSON.stringify(totals);
  }

  async function runCase(testCase) {
    if (testCase.skipWhen && testCase.skipWhen()) {
      const result = {
        id: testCase.id,
        name: testCase.name,
        status: STATUS.NOT_RUN,
        detail: testCase.skipReason || 'Dependencia no satisfecha.'
      };
      results.push(result);
      renderResult(result);
      return;
    }

    try {
      if (testCase.beforeEach) await testCase.beforeEach();
      await testCase.run();
      const result = {
        id: testCase.id,
        name: testCase.name,
        status: STATUS.PASS,
        detail: ''
      };
      results.push(result);
      renderResult(result);
    } catch (error) {
      const result = {
        id: testCase.id,
        name: testCase.name,
        status: STATUS.FAIL,
        detail: error instanceof Error ? error.message : String(error)
      };
      results.push(result);
      renderResult(result);
    } finally {
      try {
        if (testCase.afterEach) await testCase.afterEach();
      } catch (cleanupError) {
        const cleanupResult = {
          id: `${testCase.id}-CLEANUP`,
          name: `Limpieza posterior a ${testCase.name}`,
          status: STATUS.FAIL,
          detail: cleanupError instanceof Error ? cleanupError.message : String(cleanupError)
        };
        results.push(cleanupResult);
        renderResult(cleanupResult);
      }
    }
  }

  const storageIsolation = {
    beforeEach: resetStorage,
    afterEach: resetStorage
  };

  const editIsolation = {
    beforeEach() {
      resetStorage();
      cancelEditTask();
    },
    afterEach() {
      resetStorage();
      cancelEditTask();
    }
  };

  const testCases = [
    {
      id: 'T005-01',
      name: 'Un almacenamiento vacío devuelve []',
      ...storageIsolation,
      run() {
        const value = loadTasks();
        assert(Array.isArray(value) && value.length === 0, 'Se esperaba un arreglo vacío.');
      }
    },
    {
      id: 'T005-02',
      name: 'Un JSON válido sigue cargándose correctamente',
      ...storageIsolation,
      run() {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([{ id: '1', title: 'Tarea válida', completed: false, dueDate: '' }])
        );
        const value = loadTasks();
        assert(
          Array.isArray(value) && value.length === 1 && value[0].title === 'Tarea válida',
          'La tarea válida no se recuperó correctamente.'
        );
      }
    },
    {
      id: 'T005-03',
      name: 'Un JSON corrupto no lanza una excepción no controlada',
      ...storageIsolation,
      run() {
        localStorage.setItem(STORAGE_KEY, '{datos-corruptos');
        loadTasks();
      }
    },
    {
      id: 'T005-04',
      name: 'Un JSON corrupto devuelve [] y reemplaza el contenido',
      ...storageIsolation,
      run() {
        localStorage.setItem(STORAGE_KEY, '{datos-corruptos');
        const value = loadTasks();
        assert(Array.isArray(value) && value.length === 0, 'Se esperaba recuperación como [].');
        assert(localStorage.getItem(STORAGE_KEY) === '[]', 'El contenido corrupto no fue reemplazado.');
      }
    },
    {
      id: 'T005-05',
      name: 'Se puede crear una tarea después de la recuperación',
      ...storageIsolation,
      run() {
        localStorage.setItem(STORAGE_KEY, '{datos-corruptos');
        loadTasks();
        const created = createTask('Tarea tras recuperación', '');
        assert(created !== null && loadTasks().length === 1, 'No se pudo crear la tarea.');
      }
    },
    {
      id: 'T005-06',
      name: 'La validación del título vacío sigue funcionando',
      ...storageIsolation,
      run() {
        const created = createTask('', '');
        assert(created === null && loadTasks().length === 0, 'Se aceptó un título vacío.');
      }
    },
    {
      id: 'T005-07',
      name: 'La fecha límite opcional sigue almacenándose correctamente',
      ...storageIsolation,
      run() {
        const created = createTask('Tarea con fecha', '2026-08-01');
        assert(created !== null && created.dueDate === '2026-08-01', 'La fecha no se almacenó.');
      }
    },
    {
      id: 'T005-08',
      name: 'Marcar una tarea como completada sigue funcionando',
      ...storageIsolation,
      run() {
        const created = createTask('Tarea para completar', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');
        completeTask(created.id);
        const completed = loadTasks().find((task) => task.id === created.id);
        assert(Boolean(completed) && completed.completed === true, 'La tarea no quedó completada.');
      }
    },
    {
      id: 'T005-09',
      name: 'Una cadena vacía se recupera como []',
      ...storageIsolation,
      run() {
        localStorage.setItem(STORAGE_KEY, '');
        const value = loadTasks();
        assert(Array.isArray(value) && value.length === 0, 'Se esperaba recuperación como [].');
        assert(localStorage.getItem(STORAGE_KEY) === '[]', 'La cadena vacía no fue reemplazada.');
      }
    },
    {
      id: 'T005-10',
      name: 'No se añadieron dependencias externas en index.html',
      async run() {
        await waitForFrame(indexFrame);
        const frameDocument = indexFrame.contentDocument || indexFrame.contentWindow.document;
        const references = findExternalRefs(frameDocument);
        assert(references.length === 0, `Referencias externas: ${references.join(', ')}`);
      }
    },
    {
      id: 'T007-01',
      name: 'Activar edición inline y guardar persiste título y fecha (CA-01, CA-02)',
      ...editIsolation,
      run() {
        const created = createTask('Tarea pendiente', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');

        const list = document.createElement('ul');
        renderTasks(list);

        const editButton = Array.from(list.querySelectorAll('button')).find(
          (btn) => btn.dataset.editId === created.id
        );
        assert(Boolean(editButton), 'No se encontró el botón Editar para la tarea.');
        editButton.click();

        const titleInput = list.querySelector(`input[data-edit-title="${created.id}"]`);
        const dueDateInput = list.querySelector(`input[data-edit-due-date="${created.id}"]`);
        assert(
          Boolean(titleInput) && Boolean(dueDateInput),
          'No se activó el modo edición inline para la tarea.'
        );

        titleInput.value = 'Tarea editada';
        titleInput.dispatchEvent(new Event('input'));
        dueDateInput.value = '2026-09-01';
        dueDateInput.dispatchEvent(new Event('input'));

        const saveButton = list.querySelector(`button[data-save-id="${created.id}"]`);
        assert(Boolean(saveButton), 'No se encontró el botón Guardar.');
        saveButton.click();

        const reloaded = loadTasks().find((t) => t.id === created.id);
        assert(
          Boolean(reloaded) && reloaded.title === 'Tarea editada' && reloaded.dueDate === '2026-09-01',
          'La edición no se persistió correctamente.'
        );
      }
    },
    {
      id: 'T007-02',
      name: 'Editar una tarea completada conserva su estado completado (CA-08)',
      ...editIsolation,
      run() {
        const created = createTask('Tarea completada', '');
        assert(created !== null, 'No se pudo crear la tarea previa.');
        completeTask(created.id);

        beginEditTask(created.id);
        const draft = getEditingDraft();
        assert(Boolean(draft), 'No se activó el borrador de edición.');
        draft.title = 'Tarea completada editada';

        const saved = saveEditTask();
        assert(saved !== null && saved.completed === true, 'La tarea dejó de estar completada.');

        const reloaded = loadTasks().find((t) => t.id === created.id);
        assert(
          Boolean(reloaded) && reloaded.title === 'Tarea completada editada' && reloaded.completed === true,
          'La edición no conservó el estado completado.'
        );
      }
    },
    {
      id: 'T007-03',
      name: 'Un título inválido rechaza el guardado completo, incluida la fecha (CA-03)',
      ...editIsolation,
      run() {
        const created = createTask('Original', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');

        beginEditTask(created.id);
        const draft = getEditingDraft();
        draft.title = '   ';
        draft.dueDate = '2026-09-01';

        const saved = saveEditTask();
        assert(saved === null, 'Se aceptó un título inválido.');

        const reloaded = loadTasks().find((t) => t.id === created.id);
        assert(
          Boolean(reloaded) && reloaded.title === 'Original' && reloaded.dueDate === '2026-08-01',
          'La tarea original no permaneció intacta tras el rechazo.'
        );
        assert(getEditingDraft() !== null, 'El borrador debía permanecer activo tras el rechazo.');
      }
    },
    {
      id: 'T007-04',
      name: 'Una fecha inválida rechaza el guardado completo, incluido el título (CA-04)',
      ...editIsolation,
      run() {
        const created = createTask('Original', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');

        beginEditTask(created.id);
        const draft = getEditingDraft();
        draft.title = 'Editado';
        draft.dueDate = 'fecha-invalida';

        const saved = saveEditTask();
        assert(saved === null, 'Se aceptó una fecha inválida.');

        const reloaded = loadTasks().find((t) => t.id === created.id);
        assert(
          Boolean(reloaded) && reloaded.title === 'Original' && reloaded.dueDate === '2026-08-01',
          'La tarea original no permaneció intacta tras el rechazo.'
        );
        assert(getEditingDraft() !== null, 'El borrador debía permanecer activo tras el rechazo.');
      }
    },
    {
      id: 'T007-05',
      name: 'Solo una tarea puede estar en modo edición a la vez (CA-05)',
      ...editIsolation,
      run() {
        const first = createTask('Primera', '');
        const second = createTask('Segunda', '');
        assert(first !== null && second !== null, 'No se pudieron crear las tareas previas.');

        beginEditTask(first.id);
        assert(getEditingDraft().id === first.id, 'No se activó la edición de la primera tarea.');

        beginEditTask(second.id);
        const draft = getEditingDraft();
        assert(
          Boolean(draft) && draft.id === second.id,
          'Debía existir un único borrador activo, correspondiente a la segunda tarea.'
        );
      }
    },
    {
      id: 'T007-06',
      name: 'Mientras se edita, localStorage no se modifica hasta confirmar (CA-06)',
      ...editIsolation,
      run() {
        const created = createTask('Original', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');
        const before = localStorage.getItem(STORAGE_KEY);

        beginEditTask(created.id);
        const draft = getEditingDraft();
        draft.title = 'Cambiado en el borrador';
        draft.dueDate = '2026-10-10';

        const during = localStorage.getItem(STORAGE_KEY);
        assert(during === before, 'localStorage cambió antes de confirmar el guardado.');
      }
    },
    {
      id: 'T007-07',
      name: 'Cancelar la edición descarta el borrador sin alterar localStorage (CA-07)',
      ...editIsolation,
      run() {
        const created = createTask('Original', '2026-08-01');
        assert(created !== null, 'No se pudo crear la tarea previa.');
        const before = localStorage.getItem(STORAGE_KEY);

        beginEditTask(created.id);
        const draft = getEditingDraft();
        draft.title = 'No debería guardarse';

        cancelEditTask();
        assert(getEditingDraft() === null, 'El borrador debía eliminarse al cancelar.');

        const after = localStorage.getItem(STORAGE_KEY);
        assert(after === before, 'localStorage se modificó al cancelar la edición.');

        const reloaded = loadTasks().find((t) => t.id === created.id);
        assert(Boolean(reloaded) && reloaded.title === 'Original', 'El título original se alteró al cancelar.');
      }
    },
    {
      id: 'T007-08',
      name: 'El id de la tarea no cambia tras editar (CA-09)',
      ...editIsolation,
      run() {
        const created = createTask('Original', '');
        assert(created !== null, 'No se pudo crear la tarea previa.');

        beginEditTask(created.id);
        const draft = getEditingDraft();
        draft.title = 'Editada';
        draft.dueDate = '2026-08-01';

        const saved = saveEditTask();
        assert(saved !== null && saved.id === created.id, 'El id cambió tras editar.');

        const all = loadTasks();
        assert(all.length === 1 && all[0].id === created.id, 'El id de la tarea persistida cambió.');
      }
    },
    {
      id: 'T007-09',
      name: 'La edición de tareas no añadió referencias externas en index.html (CA-10)',
      async run() {
        await waitForFrame(indexFrame);
        const frameDocument = indexFrame.contentDocument || indexFrame.contentWindow.document;
        const references = findExternalRefs(frameDocument);
        assert(references.length === 0, `Referencias externas: ${references.join(', ')}`);
      }
    },
    {
      id: 'T005-CONTROL-ASSERT',
      name: 'Fallo de aserción controlado no detiene la suite',
      skipWhen: () => mode !== 'assertion-failure',
      skipReason: 'Solo se ejecuta con ?mode=assertion-failure.',
      run() {
        assert(false, 'Fallo de aserción introducido deliberadamente.');
      }
    },
    {
      id: 'T005-CONTROL-EXCEPTION',
      name: 'Excepción controlada no detiene la suite',
      skipWhen: () => mode !== 'exception',
      skipReason: 'Solo se ejecuta con ?mode=exception.',
      run() {
        throw new Error('Excepción introducida deliberadamente.');
      }
    },
    {
      id: 'T005-CONTROL-SKIP',
      name: 'Clasificación explícita de no ejecutado',
      skipWhen: () => mode === 'skip',
      skipReason: 'Dependencia simulada no disponible.',
      run() {
        assert(true);
      }
    },
    {
      id: 'T005-FINAL',
      name: 'El caso final se ejecuta después de los controles',
      run() {
        assert(true);
      }
    }
  ];

  async function runSuite() {
    resultsList.innerHTML = '';
    results.length = 0;

    for (const testCase of testCases) {
      await runCase(testCase);
    }

    renderSummary();
  }

  runSuite().catch((error) => {
    summaryElement.classList.add('suite-fail');
    summaryElement.textContent = `FAIL crítico del ejecutor: ${error.message}`;
    document.documentElement.dataset.testStatus = 'fail';
  });
})();
