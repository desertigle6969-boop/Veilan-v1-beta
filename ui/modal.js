// ============================================================
// ВЕЙЛАН — МОДАЛЬНЫЕ ОКНА (создание героя, диалоги, подтверждения)
// ============================================================

let _modalEl = null;
let _modalOnClose = null;

function getModalEl() {
  if (_modalEl && document.body.contains(_modalEl)) return _modalEl;
  let el = document.getElementById('modal');
  if (!el) {
    el = document.createElement('div');
    el.id = 'modal';
    el.className = 'overlay hidden';
    document.body.appendChild(el);
  }
  _modalEl = el;
  return el;
}

// Проверка: DOM-элемент или нет
function isDOMNode(x) {
  return x && typeof x === 'object' && typeof x.nodeType === 'number';
}

// ============================================================
// БАЗОВАЯ МОДАЛКА
// open({ title, content, buttons, onClose, closable })
// ============================================================

function openModal(opts) {
  const o = opts || {};
  const el = getModalEl();
  el.innerHTML = '';

  // Фон модалки (если передан bg)
  if (o.bg) {
    el.style.backgroundImage = 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.65) 100%), url(' + o.bg + ')';
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
  } else {
    el.style.backgroundImage = '';
  }

  const inner = document.createElement('div');
  inner.className = 'overlay-inner';
  inner.style.animation = 'modalIn 0.2s';

  // Кнопка закрытия "X" (если closable !== false)
  if (o.closable !== false) {
    const closeX = document.createElement('button');
    closeX.textContent = '×';
    closeX.style.cssText =
      'position:absolute;top:8px;right:12px;' +
      'background:transparent;border:none;color:#8a7a5a;' +
      'font-size:13px;font-family:inherit;cursor:pointer;' +
      'line-height:1;padding:0 6px;z-index:10;';
    closeX.onmouseover = function() { closeX.style.color = '#e8b84a'; };
    closeX.onmouseout = function() { closeX.style.color = '#8a7a5a'; };
    closeX.onclick = function() { closeModal(); };
    inner.style.position = 'relative';
    inner.appendChild(closeX);
  }

  // Заголовок
  if (o.title) {
    const h = document.createElement('h2');
    h.style.cssText = 'color:#e8b84a;font-size:11px;letter-spacing:1.5px;margin-bottom:12px;border-bottom:1px solid #4a3a1e;padding-bottom:8px;';
    h.textContent = o.title;
    inner.appendChild(h);
  }

  // Контент
  const body = document.createElement('div');
  body.style.cssText = 'font-size:10px;line-height:1.6;color:#d4c8a8;margin-bottom:14px;' +
    'max-height:70vh;overflow-y:auto;padding-right:4px;';
  if (typeof o.content === 'string') {
    body.innerHTML = o.content;
  } else if (isDOMNode(o.content)) {
    body.appendChild(o.content);
  }
  inner.appendChild(body);

  // Кнопки
  if (o.buttons && o.buttons.length > 0) {
    const btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;';

    o.buttons.forEach(function(b) {
      const btn = document.createElement('button');
      btn.className = 'btn';
      if (b.type === 'primary') btn.classList.add('btn-primary');
      if (b.type === 'danger')  btn.classList.add('btn-danger');
      if (b.type === 'good')    btn.classList.add('btn-good');
      btn.textContent = b.text;
      if (b.disabled) {
        btn.disabled = true;
        btn.style.opacity = '0.4';
        btn.style.cursor = 'not-allowed';
      } else {
        btn.onclick = function() {
          // Если onClick вернёт false — не закрываем
          let shouldClose = (b.close !== false);
          if (b.onClick) {
            const r = b.onClick();
            if (r === false) shouldClose = false;
          }
          if (shouldClose) closeModal();
        };
      }
      btnWrap.appendChild(btn);
    });
    inner.appendChild(btnWrap);
  }

  el.appendChild(inner);
  el.classList.remove('hidden');

  // Закрытие по клику на оверлей (если closable !== false)
  el.onclick = function(e) {
    if (e.target === el && o.closable !== false) {
      closeModal();
    }
  };

  _modalOnClose = o.onClose || null;
}

function closeModal() {
  const el = getModalEl();
  var wasVisible = !el.classList.contains('hidden');
  if (wasVisible && window.SFX) SFX.play('close');
  el.classList.add('hidden');
  el.innerHTML = '';
  el.onclick = null;
  if (_modalOnClose) {
    const cb = _modalOnClose;
    _modalOnClose = null;
    try { cb(); } catch (e) { console.error(e); }
  }
}

// ============================================================
// ПОДТВЕРЖДЕНИЕ
// ============================================================

function confirmModal(text, onYes, onNo) {
  openModal({
    title: 'Подтверждение',
    content: '<p>' + (text || '') + '</p>',
    buttons: [
      {
        text: 'Нет', type: 'default',
        onClick: function() { if (onNo) onNo(); }
      },
      {
        text: 'Да', type: 'primary',
        onClick: function() { if (onYes) onYes(); }
      }
    ],
    closable: false
  });
}

// ============================================================
// СОЗДАНИЕ ГЕРОЯ (3 ШАГА)
// ============================================================

const CREATION_STATE = {
  raceId: null,
  classId: null,
  name: ''
};

function startCharacterCreation(onComplete) {
  // Сохраняем фон для шагов создания
  window._creationBg = 'sprites/backgrounds/character_creation.png';
  if (typeof RACES === 'undefined' || typeof CLASSES === 'undefined') {
    Toast && Toast.bad('Ошибка: данные рас/классов не загружены');
    if (onComplete) onComplete(null);
    return;
  }
  CREATION_STATE.raceId = null;
  CREATION_STATE.classId = null;
  CREATION_STATE.name = '';
  renderRaceStep(onComplete);
}

// ----- ШАГ 1: РАСА -----
function renderRaceStep(onComplete) {
  const races = Object.values(RACES).filter(function(r) { return !r.hidden; });
  const body = document.createElement('div');

  const intro = document.createElement('p');
  intro.style.cssText = 'color:#8a7a5a;font-style:italic;margin-bottom:14px;font-size:10px;';
  intro.textContent = 'Ты — Безымянный, выпавший из разлома. Кровь помнит то, что разум забыл. Выбери свою расу.';
  body.appendChild(intro);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;gap:8px;';

  races.forEach(function(r) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'cursor:pointer;padding:10px;';

    const bonusText = [];
    if (r.bonuses) {
      if (r.bonuses.hpMult  && r.bonuses.hpMult  !== 1) bonusText.push('HP '  + (r.bonuses.hpMult  > 1 ? '+' : '') + Math.round((r.bonuses.hpMult  - 1) * 100) + '%');
      if (r.bonuses.mpMult  && r.bonuses.mpMult  !== 1) bonusText.push('MP '  + (r.bonuses.mpMult  > 1 ? '+' : '') + Math.round((r.bonuses.mpMult  - 1) * 100) + '%');
      if (r.bonuses.atkMult && r.bonuses.atkMult !== 1) bonusText.push('ATK ' + (r.bonuses.atkMult > 1 ? '+' : '') + Math.round((r.bonuses.atkMult - 1) * 100) + '%');
      if (r.bonuses.defMult && r.bonuses.defMult !== 1) bonusText.push('DEF ' + (r.bonuses.defMult > 1 ? '+' : '') + Math.round((r.bonuses.defMult - 1) * 100) + '%');
      if (r.bonuses.spdMult && r.bonuses.spdMult !== 1) bonusText.push('SPD ' + (r.bonuses.spdMult > 1 ? '+' : '') + Math.round((r.bonuses.spdMult - 1) * 100) + '%');
      if (r.bonuses.magMult && r.bonuses.magMult !== 1) bonusText.push('MAG ' + (r.bonuses.magMult > 1 ? '+' : '') + Math.round((r.bonuses.magMult - 1) * 100) + '%');
      if (r.bonuses.menMult && r.bonuses.menMult !== 1) bonusText.push('MEN ' + (r.bonuses.menMult > 1 ? '+' : '') + Math.round((r.bonuses.menMult - 1) * 100) + '%');
      if (r.bonuses.witMult && r.bonuses.witMult !== 1) bonusText.push('WIT ' + (r.bonuses.witMult > 1 ? '+' : '') + Math.round((r.bonuses.witMult - 1) * 100) + '%');
      if (r.bonuses.intMult && r.bonuses.intMult !== 1) bonusText.push('INT ' + (r.bonuses.intMult > 1 ? '+' : '') + Math.round((r.bonuses.intMult - 1) * 100) + '%');
    }

    card.innerHTML =
      '<div class="name">' + r.name + ' <span style="color:#8a7a5a;font-size:10px;">(' + r.race + ')</span></div>' +
      '<div class="desc">' + r.desc + '</div>' +
      (bonusText.length ? '<div style="margin-top:6px;font-size:10px;color:#6ab0e0;">' + bonusText.join(' | ') + '</div>' : '');

    card.onclick = function() {
      CREATION_STATE.raceId = r.id;
      renderClassStep(onComplete);
    };

    grid.appendChild(card);
  });

  body.appendChild(grid);

  openModal({
    title: 'Создание героя — Шаг 1 из 3: Раса',
    content: body,
    bg: window._creationBg,
    buttons: [
      { text: 'Отмена', type: 'danger', onClick: function() { if (onComplete) onComplete(null); } }
    ],
    closable: false
  });
}

// ----- ШАГ 2: КЛАСС -----
function renderClassStep(onComplete) {
  const allClasses = Object.values(CLASSES);
  const raceId = CREATION_STATE.raceId;
  // Фильтр по расе: если у класса raceReq и раса не подходит — скрываем
  const classes = allClasses.filter(function(c) {
    if (!c.raceReq || c.raceReq.length === 0) return true;
    return c.raceReq.indexOf(raceId) !== -1;
  });
  const body = document.createElement('div');

  const race = RACES[CREATION_STATE.raceId];
  const intro = document.createElement('p');
  intro.style.cssText = 'color:#8a7a5a;font-style:italic;margin-bottom:14px;font-size:10px;';
  intro.textContent = 'Ты — ' + (race ? race.name : '?') + '. Теперь выбери свой путь.';
  body.appendChild(intro);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;gap:8px;max-height:400px;overflow-y:auto;';

  classes.forEach(function(c) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'cursor:pointer;padding:10px;';

    card.innerHTML =
      '<div class="name">' + c.name + ' <span style="color:#8a7a5a;font-size:10px;">(' + c.role + ')</span></div>' +
      '<div class="desc">' + c.desc + '</div>';

    card.onclick = function() {
      CREATION_STATE.classId = c.id;
      renderNameStep(onComplete);
    };

    grid.appendChild(card);
  });

  body.appendChild(grid);

  openModal({
    title: 'Создание героя — Шаг 2 из 3: Класс',
    content: body,
    bg: window._creationBg,
    buttons: [
      { text: 'Назад', type: 'default', onClick: function() { renderRaceStep(onComplete); } },
      { text: 'Отмена', type: 'danger', onClick: function() { if (onComplete) onComplete(null); } }
    ],
    closable: false
  });
}

// ----- ШАГ 3: ИМЯ -----
function renderNameStep(onComplete) {
  const body = document.createElement('div');

  const race = RACES[CREATION_STATE.raceId];
  const cls = CLASSES[CREATION_STATE.classId];

  const info = document.createElement('p');
  info.style.cssText = 'margin-bottom:14px;font-size:10px;';
  info.innerHTML = 'Ты — <b style="color:#e8b84a;">' + (race ? race.name : '?') + ' ' + (cls ? cls.name : '?') + '</b>. Осталось только имя.';
  body.appendChild(info);

  const label = document.createElement('label');
  label.style.cssText = 'display:block;margin-bottom:6px;color:#8a7a5a;font-size:10px;';
  label.textContent = 'Имя (2-16 символов):';
  body.appendChild(label);

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 16;
  input.placeholder = 'Аскольд';
  input.style.cssText =
    'width:100%;padding:10px;background:#0a0805;' +
    'border:2px solid #4a3a1e;border-radius:4px;' +
    'color:#e8b84a;font-size:11px;font-family:inherit;' +
    'text-align:center;letter-spacing:1px;box-sizing:border-box;';
  body.appendChild(input);

  const err = document.createElement('p');
  err.style.cssText = 'color:#e05555;font-size:10px;margin-top:8px;min-height:18px;';
  body.appendChild(err);

  setTimeout(function() { try { input.focus(); } catch(e){} }, 100);

  function tryCreate() {
    const name = input.value.trim();
    const check = Hero.validateHeroCreation(CREATION_STATE.raceId, CREATION_STATE.classId, name);

    if (!check.ok) {
      err.textContent = check.errors.join(', ');
      return;
    }

    CREATION_STATE.name = name;
    const hero = Hero.createHero(CREATION_STATE.raceId, CREATION_STATE.classId, name);

    if (!hero) {
      err.textContent = 'Не удалось создать героя';
      return;
    }

    if (onComplete) onComplete(hero);
    closeModal();
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tryCreate();
  });

  openModal({
    title: 'Создание героя — Шаг 3 из 3: Имя',
    content: body,
    bg: window._creationBg,
    buttons: [
      { text: 'Назад', type: 'default', onClick: function() { renderClassStep(onComplete); } },
      { text: 'Начать игру', type: 'good', close: false, onClick: tryCreate }
    ],
    closable: false
  });
}

// ============================================================
// ДИАЛОГ С NPC
// ============================================================

function openDialog(opts) {
  const o = opts || {};
  const body = document.createElement('div');

  if (o.npc) {
    const npcName = document.createElement('p');
    npcName.style.cssText = 'color:#e8b84a;font-weight:bold;margin-bottom:6px;font-size:11px;';
    npcName.textContent = o.npc;
    body.appendChild(npcName);
  }

  const text = document.createElement('p');
  text.style.cssText = 'line-height:1.7;font-style:italic;';
  text.textContent = o.text || '';
  body.appendChild(text);

  const buttons = [];
  if (o.options && o.options.length > 0) {
    o.options.forEach(function(opt, i) {
      buttons.push({
        text: opt.text,
        type: i === 0 ? 'primary' : 'default',
        close: opt.close,
        onClick: opt.onClick
      });
    });
  } else {
    buttons.push({ text: 'Ок', type: 'primary' });
  }

  openModal({
    title: o.title || 'Диалог',
    content: body,
    buttons: buttons,
    closable: o.closable !== false
  });
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.Modal = {
  open: openModal,
  close: closeModal,
  confirm: confirmModal,
  characterCreation: startCharacterCreation,
  dialog: openDialog
};
