// ============================================================
// ВЕЙЛАН — БОЕВОЙ ИНТЕРФЕЙС (Часть 1)
// Открытие боя, отрисовка поля, кнопки, тап по цели
// ============================================================

// ============================================================
// ГЛОБАЛЬНОЕ СОСТОЯНИЕ БОЯ
// ============================================================

window.BattleUI = {
  battle: null,
  selectedTargetId: null,
  onBattleEnd: null,
  el: null
};

// ============================================================
// ОТКРЫТИЕ БОЯ
// ============================================================

// options: { playerParty, enemyParty, zoneId, subId, isBoss, onEnd }
function openBattle(options) {
  const el = document.getElementById('battle');

  // Выбор фона ОДИН РАЗ при открытии боя
  // Приоритет: подлокация → зона → общий бой
  // С проверкой через Image() — если файла нет, берём следующий
  var candidates = [];

  // 1. Подлокация (например fortress_gate.png)
  if (options.zoneId && options.subId) {
    candidates.push('sprites/cities/' + options.zoneId + '_' + options.subId + '.png');
  }

  // 2. Зона (например fortress.png)
  if (options.zoneId) {
    candidates.push('sprites/cities/' + options.zoneId + '.png');
  }

  // 3. Общий фон (случайный)
  candidates.push(Math.random() < 0.5
    ? 'sprites/backgrounds/battle_bg.png'
    : 'sprites/backgrounds/battle_bg_2.png');

  // Ищем первый существующий
  BattleUI._currentBg = 'sprites/backgrounds/battle_bg.png';  // fallback по умолчанию
  candidates.forEach(function(path) {
    var testImg = new Image();
    testImg.onload = function() {
      if (BattleUI._pendingBgPath === path) {
        BattleUI._currentBg = path;
        // Обновляем фон в wrap, если бой уже отрисован
        var wrap = document.querySelector('#battle > div');
        if (wrap) {
          wrap.style.background = 'url(' + path + ') center center no-repeat';
          wrap.style.backgroundSize = 'contain';
          wrap.style.backgroundColor = '#000';
        }
      }
    };
    testImg.src = path;
  });

  // Запоминаем, какой путь проверяем (на случай, если сработает несколько)
  BattleUI._pendingBgPath = candidates[0];

  if (!el) {
    console.error('Нет #battle в HTML');
    Toast.bad('Ошибка: #battle не найден');
    return;
  }
  BattleUI.el = el;
  BattleUI.selectedTargetId = null;
  BattleUI.onBattleEnd = options.onEnd || null;

  // Эмбиент зоны: для Сердца Вейлана — жуткие голоса храма
  if (window.Audio_ && options.zoneId === 'heart') {
    Audio_.ambient('heart_voices', 'audio/ambient/heart_voices.mp3', 0.35);
  } else if (window.Audio_ && Audio_.stopAmbient) {
    Audio_.stopAmbient();
  }

  // Создаём бой через Combat
  const battle = Combat.createBattle(
    options.playerParty,
    options.enemyParty,
    {
      zoneId: options.zoneId,
      subId: options.subId,
      isBoss: options.isBoss || false
    }
  );

  BattleUI.battle = battle;

  // Запуск
  Combat.startBattle(battle);

  // Отрисовать
  renderBattle();

  // Показать оверлей
  el.classList.remove('hidden');

  // Если первый ход не у героя — запустить ИИ-ходы
  const cur = Combat.findUnit(battle, battle.currentUnitId);
  if (cur && !cur.isHero && window.BattleUI.processEnemyTurns) {
    setTimeout(function() { BattleUI.processEnemyTurns(battle); }, 400);
  }
}

// ============================================================
// ЗАКРЫТИЕ БОЯ
// ============================================================

function closeBattle() {
  // Остановить эмбиент зоны
  if (window.Audio_ && Audio_.stopAmbient) Audio_.stopAmbient();
  // Очистить слой значков — иначе они висят поверх панелей после боя
  var fx = document.getElementById('fx-layer');
  if (fx) fx.innerHTML = '';
  if (BattleUI.el) {
    BattleUI.el.classList.add('hidden');
    BattleUI.el.innerHTML = '';
  }
  BattleUI.battle = null;
  BattleUI.selectedTargetId = null;
}

// ============================================================
// ПОЛНАЯ ОТРИСОВКА БОЕВОГО ЭКРАНА
// ============================================================

function renderBattle() {
  const battle = BattleUI.battle;
  if (!battle) return;

  const el = BattleUI.el;
  el.innerHTML = '';

  // Общий контейнер
  const wrap = document.createElement('div');
  wrap.style.cssText =
    'max-width:800px;width:100%;height:100vh;height:100dvh;' +
    'display:flex;flex-direction:column;' +
    'background:url(' + (BattleUI._currentBg || 'sprites/backgrounds/battle_bg.png') + ') center center no-repeat;' +
    'background-size:contain;' +
    'background-color:#000;' +
    'border:2px solid #6a5a3a;' +
    'border-radius:4px;' +
    'box-sizing:border-box;' +
    'padding:8px;gap:6px;overflow:hidden;justify-content:flex-end;';

  // Spacer — пустое место сверху, прижимает всю группу вниз
  const spacerTop = document.createElement('div');
  spacerTop.style.cssText = 'flex:1 1 auto;min-height:0;';
  wrap.appendChild(spacerTop);

  // ===== ЧАТ (во всю ширину, сверху) =====
  const logEl = document.createElement('div');
  logEl.className = 'log';
  logEl.style.cssText =
    'flex-shrink:0;height:170px;overflow-y:auto;width:100%;' +
    'background:rgba(0,0,0,0.92);border:1px solid #3a2a18;border-radius:4px;' +
    'padding:6px;font-family:"Courier New",monospace;font-size:10px;line-height:1.4;';
  renderLog(logEl, battle);
  wrap.appendChild(logEl);

  // ===== МОБЫ (посередине) =====
  const enemiesPanel = document.createElement('div');
  enemiesPanel.style.cssText = 'flex-shrink:0;';
  renderEnemies(enemiesPanel, battle);
  wrap.appendChild(enemiesPanel);

  // ===== ГЕРОЙ + СОЮЗНИКИ (снизу) =====
  const alliesPanel = document.createElement('div');
  alliesPanel.style.cssText = 'flex-shrink:0;';
  renderAllies(alliesPanel, battle);
  wrap.appendChild(alliesPanel);

  // ===== КНОПКИ ДЕЙСТВИЙ =====
  const actionsEl = document.createElement('div');
  actionsEl.style.cssText = 'flex-shrink:0;';
  renderActions(actionsEl, battle);
  wrap.appendChild(actionsEl);

  el.appendChild(wrap);
}

// ============================================================
// ВРАГИ (верхняя часть)
// ============================================================

function renderEnemies(container, battle) {
  const title = document.createElement('div');
  title.style.cssText = 'font-size:10px;color:#8a7a5a;letter-spacing:1px;margin-bottom:4px;text-transform:uppercase;';
  title.textContent = 'Противники';
  container.appendChild(title);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;justify-content:center;flex-wrap:wrap;';

  battle.enemyUnits.forEach(function(u) {
    const card = document.createElement('div');
    card.setAttribute('data-unit-id', u.unitId);
    var isTarget = BattleUI.selectedTargetId === u.unitId;
    var accentColor = isTarget ? '#5ad0ff' : '#5a3a3a';
    card.style.cssText =
      'flex:0 0 auto;width:110px;cursor:pointer;' +
      'background:linear-gradient(180deg,#1e1410 0%,#0a0505 100%);' +
      'padding:8px 6px;position:relative;' +
      'transition:all 0.15s;' +
      (isTarget ? 'border:2px solid #5ad0ff;box-shadow:0 0 14px #5ad0ff;' : 'border:2px solid transparent;') +
      (u.hp <= 0 ? 'opacity:0.3;filter:grayscale(1);' : '');

    // Боковые скобки
    var bracketL = document.createElement('div');
    bracketL.style.cssText =
      'position:absolute;left:0;top:8px;bottom:8px;width:2px;' +
      'background:linear-gradient(180deg,transparent,' + accentColor + ',transparent);';
    card.appendChild(bracketL);

    var bracketR = document.createElement('div');
    bracketR.style.cssText =
      'position:absolute;right:0;top:8px;bottom:8px;width:2px;' +
      'background:linear-gradient(180deg,transparent,' + accentColor + ',transparent);';
    card.appendChild(bracketR);

    // Спрайт моба
    const spriteWrap = document.createElement('div');
    spriteWrap.style.cssText = 'text-align:center;';
    var sprite;
    if (window.Sprite && Sprite.renderMobSprite) {
      try { sprite = Sprite.renderMobSprite(u.mobId, u.name, 44); } catch (e) { sprite = null; }
    }
    if (sprite) {
      spriteWrap.appendChild(sprite);
    } else {
      spriteWrap.innerHTML = '<div style="font-size:24px;padding:18px;">?</div>';
    }
    // Корона для босса
    if (u.isBoss) {
      var crown = document.createElement('img');
      crown.src = 'sprites/icons/fx/crown.png';
      crown.style.cssText = 'width:22px;height:22px;object-fit:contain;image-rendering:pixelated;display:block;margin:0 auto 2px;filter:drop-shadow(0 0 4px rgba(232,184,74,0.8));';
      spriteWrap.insertBefore(crown, spriteWrap.firstChild);
    }
    card.appendChild(spriteWrap);

    // Имя
    const name = document.createElement('div');
    name.style.cssText = 'font-size:10px;color:#e8b84a;text-align:center;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    name.textContent = u.name;
    card.appendChild(name);

    // HP-полоска
    const hpBar = document.createElement('div');
    hpBar.style.cssText = 'height:8px;background:#000;border:1px solid #4a3a1e;border-radius:2px;margin-top:2px;overflow:hidden;position:relative;';
    const hpFill = document.createElement('div');
    const pct = Math.max(0, Math.min(100, (u.hp / u.maxHp) * 100));
    hpFill.style.cssText = 'height:100%;width:' + pct + '%;background:linear-gradient(90deg,#8a0000,#e0334a);transition:width 0.3s;';
    hpBar.appendChild(hpFill);
    card.appendChild(hpBar);

    // HP текст
    const hpTxt = document.createElement('div');
    hpTxt.style.cssText = 'font-size:9px;color:#fff;text-align:center;text-shadow:0 0 2px #000;';
    hpTxt.textContent = Math.max(0, Math.round(u.hp)) + ' / ' + u.maxHp;
    card.appendChild(hpTxt);

    // Статусы
    if (u.statuses && u.statuses.length > 0 && window.Sprite && Sprite.statusIcons) {
      const st = Sprite.statusIcons(u);
      if (st) card.appendChild(st);
    }

    // Обёртка для всплывающих цифр
    var floaters = document.createElement('div');
    floaters.className = 'floaters';
    floaters.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:visible;';
    card.appendChild(floaters);

    // Тап по врагу — выбор цели
    card.onclick = function() {
      if (u.hp <= 0) {
        Toast.bad('Этот враг уже мёртв');
        return;
      }
      BattleUI.selectedTargetId = u.unitId;
      renderBattle();
      Toast.info('Цель: ' + u.name);
    };

    row.appendChild(card);
  });

  container.appendChild(row);
}

// ============================================================
// ПОДСВЕТКА ВЫБРАННОЙ ЦЕЛИ (без полной перерисовки)
// ============================================================
function updateTargetHighlight() {
  var battle = BattleUI.battle;
  if (!battle || !BattleUI.el) return;
  
  // Находим все карточки врагов и перекрашиваем рамку
  var enemies = BattleUI.el.querySelectorAll('div[data-unit-id]');
  enemies.forEach(function(card) {
    var uid = card.getAttribute('data-unit-id');
    if (uid === BattleUI.selectedTargetId) {
      card.style.borderColor = '#ffffff';
      card.style.boxShadow = '0 0 14px rgba(255,255,255,0.6)';
    } else {
      card.style.borderColor = 'transparent';
      card.style.boxShadow = 'none';
    }
  });
}

// ============================================================
// ПОРЯДОК ХОДА
// ============================================================

function renderTurnOrder(container, battle) {
  const label = document.createElement('div');
  label.style.cssText = 'font-size:10px;color:#8a7a5a;letter-spacing:1px;margin-bottom:4px;';
  label.textContent = 'ОЧЕРЕДЬ ХОДА';
  container.appendChild(label);

  if (!battle.turnOrder || battle.turnOrder.length === 0) {
    Combat.calculateTurnOrder(battle);
  }

  const list = document.createElement('div');
  list.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap;';

  battle.turnOrder.forEach(function(uid, idx) {
    const u = Combat.findUnit(battle, uid);
    if (!u || u.hp <= 0) return;

    const chip = document.createElement('div');
    const isCurrent = battle.currentUnitId === uid;
    chip.style.cssText =
      'padding:3px 8px;border-radius:10px;font-size:10px;' +
      'background:' + (isCurrent ? '#6a4a20' : (u.isEnemy ? '#3a1010' : '#1a3a20')) + ';' +
      'border:1px solid ' + (isCurrent ? '#ffd700' : (u.isEnemy ? '#8a2a2a' : '#4a8a30')) + ';' +
      'color:' + (isCurrent ? '#ffd700' : '#d4c8a8') + ';' +
      'white-space:nowrap;';
    chip.textContent = (idx + 1) + '. ' + u.name + ' (Р:' + Math.floor(u.resonance || 0) + ')';
    list.appendChild(chip);
  });

  container.appendChild(list);
}

// ============================================================
// ЛОГ БОЯ
// ============================================================

function renderLog(container, battle) {
  const log = battle.log || [];
  const recent = log.slice(-12);

  recent.forEach(function(entry) {
    const div = document.createElement('div');
    div.style.cssText = 'padding:1px 0;border-bottom:1px solid rgba(74,58,30,0.15);';

    var color = '#d4c8a8';
    if (entry.type === 'dmg') color = '#e05555';
    else if (entry.type === 'heal') color = '#6ad06a';
    else if (entry.type === 'crit') color = '#ffcc44';
    else if (entry.type === 'sys') color = '#6ab0e0';
    else if (entry.type === 'loot') color = '#c090e0';
    else if (entry.type === 'warn') color = '#e08040';
    else if (entry.type === 'miss') color = '#888';

    div.style.color = color;
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.gap = '4px';

    // Если есть иконка скилла — рисуем перед текстом
    if (entry.icon) {
      var ico = document.createElement('img');
      ico.src = entry.icon;
      ico.style.cssText = 'width:16px;height:16px;flex-shrink:0;image-rendering:pixelated;border:1px solid #4a3a1e;border-radius:2px;';
      ico.onerror = function() { this.style.display = 'none'; };
      div.appendChild(ico);
    }

    var txt = document.createElement('span');
    txt.textContent = '[' + entry.turn + '] ' + entry.text;
    txt.style.cssText = 'flex:1;min-width:0;';
    div.appendChild(txt);

    container.appendChild(div);
  });

  // Прокрутить вниз
  setTimeout(function() {
    container.scrollTop = container.scrollHeight;
  }, 50);
}

// ============================================================
// СОЮЗНИКИ (низ)
// ============================================================

function renderAllies(container, battle) {
  const title = document.createElement('div');
  title.style.cssText = 'font-size:10px;color:#8a7a5a;letter-spacing:1px;margin-bottom:4px;text-transform:uppercase;';
  title.textContent = 'Твоя партия';
  container.appendChild(title);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:6px;justify-content:center;flex-wrap:wrap;';

  battle.playerUnits.forEach(function(u) {
    const card = document.createElement('div');
    card.setAttribute('data-unit-id', u.unitId);
    var allyAccent = u.isHero ? '#c9a961' : '#7a8a5a';
    card.style.cssText =
      'flex:0 0 auto;width:90px;position:relative;' +
      'background:linear-gradient(180deg,#141a10 0%,#050a05 100%);' +
      'padding:6px 4px;' +
      (u.isHero ? 'box-shadow:0 0 12px rgba(201,169,97,0.35);' : '') +
      (u.hp <= 0 ? 'opacity:0.3;filter:grayscale(1);' : '');

    // Боковые скобки
    var allyBL = document.createElement('div');
    allyBL.style.cssText =
      'position:absolute;left:0;top:8px;bottom:8px;width:2px;' +
      'background:linear-gradient(180deg,transparent,' + allyAccent + ',transparent);';
    card.appendChild(allyBL);

    var allyBR = document.createElement('div');
    allyBR.style.cssText =
      'position:absolute;right:0;top:8px;bottom:8px;width:2px;' +
      'background:linear-gradient(180deg,transparent,' + allyAccent + ',transparent);';
    card.appendChild(allyBR);

    // Обёртка для всплывающих цифр
    var floaters = document.createElement('div');
    floaters.className = 'floaters';
    floaters.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:visible;';
    card.appendChild(floaters);

    // Спрайт героя или союзника
    const spriteWrap = document.createElement('div');
    spriteWrap.style.cssText = 'text-align:center;';
    var sprite;
    if (u.isHero && window.Sprite && Sprite.renderHeroSprite) {
      try { sprite = Sprite.renderHeroSprite(u.ref, 44); } catch (e) { sprite = null; }
    }
    if (sprite) {
      spriteWrap.appendChild(sprite);
    } else {
      spriteWrap.innerHTML = '<div style="font-size:24px;padding:18px;">?</div>';
    }
    card.appendChild(spriteWrap);

    // Имя
    const name = document.createElement('div');
    name.style.cssText = 'font-size:10px;color:#ffd700;text-align:center;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;';
    name.textContent = u.name;
    card.appendChild(name);

    // HP
    const hpBar = document.createElement('div');
    hpBar.style.cssText = 'height:8px;background:#000;border:1px solid #4a3a1e;border-radius:2px;margin-top:2px;overflow:hidden;';
    const hpFill = document.createElement('div');
    const pct = Math.max(0, Math.min(100, (u.hp / u.maxHp) * 100));
    hpFill.style.cssText = 'height:100%;width:' + pct + '%;background:linear-gradient(90deg,#8a0000,#e0334a);transition:width 0.3s;';
    hpBar.appendChild(hpFill);
    card.appendChild(hpBar);

    const hpTxt = document.createElement('div');
    hpTxt.style.cssText = 'font-size:9px;color:#fff;text-align:center;text-shadow:0 0 2px #000;';
    hpTxt.textContent = Math.max(0, Math.round(u.hp)) + ' / ' + u.maxHp;
    card.appendChild(hpTxt);

    // MP
    const mpBar = document.createElement('div');
    mpBar.style.cssText = 'height:5px;background:#000;border:1px solid #4a3a1e;border-radius:2px;margin-top:2px;overflow:hidden;';
    const mpFill = document.createElement('div');
    const mpPct = u.maxMp ? Math.max(0, Math.min(100, (u.mp / u.maxMp) * 100)) : 0;
    mpFill.style.cssText = 'height:100%;width:' + mpPct + '%;background:linear-gradient(90deg,#0a2a6a,#3a88ff);';
    mpBar.appendChild(mpFill);
    card.appendChild(mpBar);

    // Резонанс
    if (u.isHero) {
      const resBar = document.createElement('div');
      resBar.style.cssText = 'height:5px;background:#000;border:1px solid #4a3a1e;border-radius:2px;margin-top:2px;overflow:hidden;';
      const resFill = document.createElement('div');
      const resPct = Math.max(0, Math.min(100, u.resonance || 0));
      resFill.style.cssText = 'height:100%;width:' + resPct + '%;background:linear-gradient(90deg,#4a1a6a,#b05ae0);transition:width 0.3s;';
      if (u.resonanceReady) resFill.style.boxShadow = '0 0 6px #ffd700';
      resBar.appendChild(resFill);
      card.appendChild(resBar);

      const resTxt = document.createElement('div');
      resTxt.style.cssText = 'font-size:8px;color:#d08aff;text-align:center;';
      resTxt.textContent = 'РЕЗ ' + Math.floor(u.resonance || 0) + '/100';
      card.appendChild(resTxt);
    }

    // Статусы
    if (u.statuses && u.statuses.length > 0 && window.Sprite && Sprite.statusIcons) {
      const st = Sprite.statusIcons(u);
      if (st) card.appendChild(st);
    }

    row.appendChild(card);
  });

  container.appendChild(row);
}

// ============================================================
// КНОПКИ ДЕЙСТВИЙ
// ============================================================

function renderActions(container, battle) {
  // Проверка: сейчас ход игрока?
  const current = Combat.findUnit(battle, battle.currentUnitId);
  const isHeroTurn = current && current.isHero && current.hp > 0;

  const hint = document.createElement('div');
  hint.style.cssText = 'font-size:10px;color:#8a7a5a;text-align:center;margin-bottom:4px;';
  if (isHeroTurn) {
    hint.textContent = 'Твой ход. Выбери цель тапом, потом действие.';
  } else if (current) {
    hint.textContent = 'Ход: ' + current.name;
  }
  container.appendChild(hint);

  const row = document.createElement('div');
  row.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:4px;';

  const actions = [
    { id: 'attack',  label: 'Атака',   color: '#8a2a2a' },
    { id: 'skill',   label: 'Скилл',   color: '#4a2a8a' },
    { id: 'item',    label: 'Предмет', color: '#2a5a2a' },
    { id: 'defend',  label: 'Защита',  color: '#4a4a4a' },
    { id: 'flee',    label: 'Сдаться', color: '#6a4a20' }
  ];

  actions.forEach(function(a) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText =
      'padding:14px 6px;font-size:14px;min-height:56px;' +
      'background:linear-gradient(180deg,' + a.color + ',#0a0805);' +
      'border:1px solid #6a5a3a;color:#d4c8a8;font-weight:bold;' +
      'letter-spacing:0.5px;';
    btn.textContent = a.label;
    btn.disabled = !isHeroTurn;

    if (!isHeroTurn) {
      btn.style.opacity = '0.4';
      btn.style.cursor = 'not-allowed';
    }

    btn.onclick = function() {
      if (BattleUI.handleAction) BattleUI.handleAction(a.id);
      else handleAction(a.id);
    };

    row.appendChild(btn);
  });

  container.appendChild(row);

  // Воспроизводим отложенные боевые эффекты (цифры урона, вспышки)
  if (window.Combat && Combat.flushBattleEffects) {
    setTimeout(function() {
      Combat.flushBattleEffects();
      if (Combat.flushBattleIcons) Combat.flushBattleIcons();
    }, 0);
  }
}

// ============================================================
// ОБРАБОТКА ДЕЙСТВИЙ (заглушки — реализуем в Части 2)
// ============================================================

function handleAction(actionId) {
  // Часть 2 — здесь будет реальная логика
  Toast.info('Действие: ' + actionId + ' (реализация в Части 2)');
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.BattleUI.open = openBattle;
window.BattleUI.close = closeBattle;
window.BattleUI.render = renderBattle;


