// ============================================================
// ВЕЙЛАН — ДОСКА ЗАДАНИЙ
// Список NPC, их квесты: взять / сдать
// ============================================================

(function() {

  var BOARD_STATE = {
    zoneId: null
  };

  // ============================================================
  // ОТКРЫТИЕ
  // ============================================================

  function openBoard(zoneId) {
    BOARD_STATE.zoneId = zoneId || null;
    renderBoard();
  }

  function renderBoard() {
    var screen = (window.UI && UI.screenRoot) ? UI.screenRoot : document.getElementById('screen');
    if (!screen) return;
    screen.innerHTML = '';

    // === Фон ===
    var bgPath = (window.Backgrounds && Backgrounds.getZoneBackground)
      ? Backgrounds.getZoneBackground(BOARD_STATE.zoneId)
      : null;
    var app = document.getElementById('app');
    if (bgPath && app) {
      app.style.backgroundImage =
        'radial-gradient(ellipse at top,rgba(10,8,4,0.5) 0%,rgba(5,4,2,0.75) 60%,rgba(2,1,0,0.85) 100%),' +
        'url(' + bgPath + ')';
      app.style.backgroundSize = 'cover, cover';
      app.style.backgroundPosition = 'center, center';
      app.style.backgroundAttachment = 'fixed, fixed';
    }

    // === Кнопка Назад ===
    var backPanel = document.createElement('div');
    backPanel.className = 'panel';
    backPanel.style.cssText = 'padding:8px;';

    var backBtn = document.createElement('button');
    backBtn.className = 'btn';
    backBtn.textContent = 'Назад в город';
    backBtn.onclick = function() {
      if (window.CityUI && CityUI.openCity) CityUI.openCity(BOARD_STATE.zoneId);
      else UI.tab('map');
    };
    backPanel.appendChild(backBtn);
    screen.appendChild(backPanel);

    // === Заголовок ===
    var headPanel = document.createElement('div');
    headPanel.className = 'panel';
    headPanel.innerHTML = '<h2>Доска заданий</h2>' +
      '<p style="font-size:11px;color:#5a6070;">Слухи, просьбы, поручения. Тут начинается путь.</p>';
    screen.appendChild(headPanel);

    // === Список NPC и их квестов ===
    var npcs = (window.NPCs && NPCs.getNPCsByLocation)
      ? NPCs.getNPCsByLocation(BOARD_STATE.zoneId)
      : [];

    if (npcs.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'panel';
      empty.innerHTML = '<p style="color:#5a6070;font-size:12px;text-align:center;padding:20px;">Нет заданий в этой зоне.</p>';
      screen.appendChild(empty);
      return;
    }

    npcs.forEach(function(npc) {
      var panel = renderNPCBlock(npc);
      if (panel) screen.appendChild(panel);
    });
  }

  // ============================================================
  // БЛОК NPC
  // ============================================================

  function renderNPCBlock(npc) {
    var available = Quest.getAvailableQuests(npc.id);
    var active = getActiveByGiver(npc.id);
    var ready = active.filter(function(q) {
      return Quest.isQuestReadyToComplete(q.id);
    });

    // Не показываем только NPC вообще без диалога
    if (!npc.dialogue && !npc.dialogue.greeting) {
      // всё равно показываем — лор тоже важен
    }

    var panel = document.createElement('div');
    panel.className = 'panel';
    panel.style.cssText = 'padding:10px;margin-bottom:8px;';

    // Шапка NPC
    var head = document.createElement('div');
    head.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:8px;';

    // Спрайт NPC
    var npcIcon = document.createElement('div');
    npcIcon.style.cssText =
      'width:48px;height:48px;flex-shrink:0;background:rgba(10,12,18,0.7);' +
      'border:1px solid #3a4258;border-radius:4px;' +
      'display:flex;align-items:center;justify-content:center;overflow:hidden;';
    var img = document.createElement('img');
    img.src = npc.sprite;
    img.style.cssText = 'width:90%;height:90%;object-fit:contain;image-rendering:pixelated;';
    img.onerror = function() { npcIcon.innerHTML = '<span style="color:#5a6070;">?</span>'; };
    npcIcon.appendChild(img);
    head.appendChild(npcIcon);

    // Имя + роль
    var info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0;';
    info.innerHTML =
      '<div style="color:#c9a961;font-weight:bold;font-size:13px;">' + npc.name + '</div>' +
      '<div style="color:#8a7a5a;font-size:10px;margin-top:2px;">' + npc.title + '</div>' +
      '<div style="color:#5a6070;font-size:10px;margin-top:2px;font-style:italic;">' + npc.desc + '</div>' +
      (npc.personality && npc.personality.traits
        ? '<div style="color:#4a5a6a;font-size:9px;margin-top:3px;">' +
            npc.personality.traits.join(' · ') + '</div>'
        : '');
    head.appendChild(info);

    panel.appendChild(head);

    // Если квестов нет — подсказка
    if (available.length === 0 && active.length === 0) {
      var noQuests = document.createElement('div');
      noQuests.style.cssText =
        'font-size:11px;color:#5a6070;font-style:italic;padding:6px;' +
        'border-left:2px solid #2a3440;margin-top:4px;';
      noQuests.textContent = 'Нет заданий для тебя. Говорит мало, знает много.';
      panel.appendChild(noQuests);
    }

    // === КВЕСТЫ К СДАЧЕ ===
    ready.forEach(function(q) {
      panel.appendChild(renderQuestRow(q, 'ready', npc));
    });

    // === АКТИВНЫЕ (не готовые) ===
    active.forEach(function(q) {
      if (Quest.isQuestReadyToComplete(q.id)) return;  // уже в ready
      panel.appendChild(renderQuestRow(q, 'active', npc));
    });

    // === ДОСТУПНЫЕ ===
    available.forEach(function(q) {
      panel.appendChild(renderQuestRow(q, 'available', npc));
    });

    return panel;
  }

  function renderQuestRow(quest, status, npc) {
    var row = document.createElement('div');
    row.style.cssText =
      'background:rgba(10,12,18,0.5);border-left:2px solid ' +
      (status === 'ready' ? '#8ad08a' : (status === 'available' ? '#c9a961' : '#5a6070')) + ';' +
      'padding:6px 8px;margin-top:6px;border-radius:2px;';

    var head = document.createElement('div');
    head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';

    var name = document.createElement('div');
    name.style.cssText = 'font-size:12px;color:#d0d4d8;font-weight:bold;';
    name.textContent = quest.name;
    head.appendChild(name);

    var tag = document.createElement('div');
    tag.style.cssText = 'font-size:10px;';
    if (status === 'ready') {
      tag.style.color = '#8ad08a';
      tag.textContent = 'ГОТОВО К СДАЧЕ';
    } else if (status === 'active') {
      tag.style.color = '#8a7a5a';
      var st = STATE.quests[quest.id];
      tag.textContent = (st.progress || 0) + ' / ' + quest.count;
    } else {
      tag.style.color = '#c9a961';
      tag.textContent = 'НОВОЕ';
    }
    head.appendChild(tag);
    row.appendChild(head);

    // Описание
    var desc = document.createElement('div');
    desc.style.cssText = 'font-size:10px;color:#8a7a5a;margin-top:4px;line-height:1.4;';
    desc.textContent = quest.desc || '';
    row.appendChild(desc);

    // Кнопка
    var btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText = 'margin-top:6px;font-size:11px;padding:4px 12px;width:100%;';

    if (status === 'ready') {
      btn.textContent = 'Сдать квест';
      btn.classList.add('btn-good');
      btn.onclick = function() {
        var r = Quest.completeQuest(quest.id);
        if (r.ok) {
          Toast.good('Квест сдан: ' + quest.name);
          if (r.rewards) showRewards(r.rewards);
        } else {
          Toast.bad(r.reason || 'Ошибка');
        }
        renderBoard();
      };
    } else if (status === 'available') {
      btn.textContent = 'Взять квест';
      btn.classList.add('btn-primary');
      btn.onclick = function() {
        var r = Quest.acceptQuest(quest.id);
        if (!r.ok) {
          Toast.bad(r.reason || 'Не удалось');
          return;
        }
        renderBoard();
      };
    } else {
      btn.textContent = 'В процессе';
      btn.disabled = true;
      btn.style.opacity = '0.4';
    }

    row.appendChild(btn);

    // Диалог NPC (если есть)
    if (quest.dialog) {
      var dlg = document.createElement('div');
      dlg.style.cssText = 'font-size:10px;color:#6a7a8a;font-style:italic;margin-top:4px;padding-left:8px;border-left:1px solid #3a4258;';
      var key = status === 'ready' ? 'complete' : (status === 'active' ? 'progress' : 'start');
      dlg.textContent = '«' + (quest.dialog[key] || '') + '» — ' + npc.name;
      row.appendChild(dlg);
    }

    return row;
  }

  // ============================================================
  // АКТИВНЫЕ КВЕСТЫ ПО NPC
  // ============================================================

  function getActiveByGiver(npcId) {
    var result = [];
    if (!STATE.quests) return result;
    for (var qid in STATE.quests) {
      if (STATE.quests[qid].status !== 'active') continue;
      var q = QUESTS[qid];
      if (q && q.giver === npcId) result.push(q);
    }
    return result;
  }

  // ============================================================
  // ПОКАЗАТЬ НАГРАДЫ
  // ============================================================

  function showRewards(rewards) {
    if (!rewards) return;
    var lines = [];
    if (rewards.exp)  lines.push('+' + rewards.exp + ' опыта');
    if (rewards.gold) lines.push('+' + rewards.gold + ' золота');
    if (rewards.items) {
      rewards.items.forEach(function(it) {
        var nm = it.itemId;
        if (typeof ITEMS !== 'undefined' && ITEMS[it.itemId]) nm = ITEMS[it.itemId].name;
        lines.push(nm + ' x' + (it.qty || 1));
      });
    }
    // Небольшая пауза — чтобы не перекрывало предыдущий тост
    setTimeout(function() {
      Toast.loot('Получено: ' + lines.join(', '));
    }, 300);
  }

  // ============================================================
  // ЭКСПОРТ
  // ============================================================

  window.BoardUI = {
    openBoard: openBoard,
    renderBoard: renderBoard
  };

  console.log('[board-ui] загружен');
})();
