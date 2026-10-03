// ============================================================
// ВЕЙЛАН — ЖУРНАЛ КВЕСТОВ
// Вкладка "Квесты": активные / завершённые
// ============================================================

(function() {

  var QUEST_STATE = {
    tab: 'active'   // 'active' | 'completed'
  };

  // ============================================================
  // ГЛАВНЫЙ РЕНДЕР
  // ============================================================

  function renderQuestTab(screen) {
    if (typeof STATE === 'undefined' || !STATE.hero) return;

    // Очищаем экран перед рендером
    screen.innerHTML = '';

    // === Вкладки ===
    var tabs = document.createElement('div');
    tabs.className = 'panel';
    tabs.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:6px;';

    ['active', 'completed'].forEach(function(t) {
      var b = document.createElement('button');
      b.className = 'btn';
      b.style.cssText = 'padding:8px;font-size:12px;' +
        (QUEST_STATE.tab === t ? 'background:linear-gradient(180deg,#3a5060 0%,#1e2430 100%);color:#c9a961;border-color:#8a6a2a;' : '');
      b.textContent = t === 'active' ? 'Активные' : 'Завершённые';
      b.onclick = function() {
        QUEST_STATE.tab = t;
        renderQuestTab(screen);
      };
      tabs.appendChild(b);
    });
    screen.appendChild(tabs);

    // === Список ===
    var list = (QUEST_STATE.tab === 'active')
      ? Quest.getActiveQuests()
      : Quest.getCompletedQuests();

    if (list.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'panel';
      empty.innerHTML = '<p style="color:#5a6070;font-size:12px;text-align:center;padding:20px;">' +
        (QUEST_STATE.tab === 'active' ? 'Нет активных квестов.' : 'Нет завершённых квестов.') + '</p>';
      screen.appendChild(empty);
      return;
    }

    list.forEach(function(item) {
      screen.appendChild(renderQuestCard(item));
    });
  }

  // ============================================================
  // КАРТОЧКА КВЕСТА
  // ============================================================

  function renderQuestCard(item) {
    var q = item.quest;
    var st = item.state;

    var card = document.createElement('div');
    card.className = 'panel';
    card.style.cssText = 'padding:10px;margin-bottom:8px;';

    // Заголовок — название
    var head = document.createElement('div');
    head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';

    var name = document.createElement('div');
    name.style.cssText = 'color:#c9a961;font-weight:bold;font-size:13px;';
    name.textContent = q.name;
    head.appendChild(name);

    var chapter = document.createElement('div');
    chapter.style.cssText = 'color:#5a6070;font-size:10px;';
    chapter.textContent = 'Глава ' + (q.chapter || '?');
    head.appendChild(chapter);

    card.appendChild(head);

    // Выдающий NPC
    if (q.giver && typeof NPCs !== 'undefined') {
      var giver = NPCs.getNPC(q.giver);
      if (giver) {
        var giverLine = document.createElement('div');
        giverLine.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:4px;';
        giverLine.textContent = 'Выдал: ' + giver.name + ' (' + giver.title + ')';
        card.appendChild(giverLine);
      }
    }

    // Описание
    if (q.desc) {
      var desc = document.createElement('div');
      desc.style.cssText = 'font-size:11px;color:#a89878;font-style:italic;line-height:1.5;margin-bottom:6px;';
      desc.textContent = q.desc;
      card.appendChild(desc);
    }

    // Прогресс (только для активных)
    if (st.status === 'active') {
      var progress = document.createElement('div');
      progress.style.cssText = 'font-size:11px;color:#b8b0a0;margin-bottom:6px;';

      var typeLabel = {
        kill:   'Убить',
        fetch:  'Собрать',
        talk:   'Поговорить с',
        reach:  'Добраться до'
      }[q.type] || q.type;

      var targetName = getTargetName(q.type, q.target);

      progress.innerHTML =
        '<div style="display:flex;justify-content:space-between;">' +
          '<span>' + typeLabel + ': ' + targetName + '</span>' +
          '<span style="color:' + ((st.progress || 0) >= q.count ? '#8ad08a' : '#b8b0a0') + ';">' +
            (st.progress || 0) + ' / ' + q.count +
          '</span>' +
        '</div>';

      card.appendChild(progress);

      // Прогресс-бар
      var bar = document.createElement('div');
      bar.style.cssText =
        'background:#000;border:1px solid #2a3440;border-radius:2px;height:6px;overflow:hidden;margin-bottom:6px;';
      var fill = document.createElement('div');
      var pct = Math.min(100, ((st.progress || 0) / q.count) * 100);
      fill.style.cssText = 'height:100%;width:' + pct + '%;background:linear-gradient(90deg,#3a5060,#8a6a2a);transition:width 0.3s;';
      bar.appendChild(fill);
      card.appendChild(bar);

      // Готово — показать
      if ((st.progress || 0) >= q.count) {
        var ready = document.createElement('div');
        ready.style.cssText = 'font-size:11px;color:#8ad08a;text-align:center;padding:4px;';
        ready.textContent = 'ГОТОВО К СДАЧЕ — вернись к ' + (q.giver && NPCs.getNPC(q.giver) ? NPCs.getNPC(q.giver).name : 'NPC');
        card.appendChild(ready);
      }
    } else {
      // Завершён — показать награды
      var done = document.createElement('div');
      done.style.cssText = 'font-size:11px;color:#5a6070;';
      done.textContent = 'Завершено';
      card.appendChild(done);
    }

    // Награды
    if (q.rewards) {
      var rew = document.createElement('div');
      rew.style.cssText = 'font-size:10px;color:#8a7a5a;margin-top:6px;border-top:1px solid #2a3440;padding-top:4px;';
      var parts = [];
      if (q.rewards.exp)  parts.push('+' + q.rewards.exp + ' опыта');
      if (q.rewards.gold) parts.push('+' + q.rewards.gold + ' золота');
      if (q.rewards.items) {
        q.rewards.items.forEach(function(it) {
          var itemName = it.itemId;
          if (typeof ITEMS !== 'undefined' && ITEMS[it.itemId]) {
            itemName = ITEMS[it.itemId].name;
          }
          parts.push(itemName + ' x' + (it.qty || 1));
        });
      }
      rew.textContent = 'Награда: ' + parts.join(', ');
      card.appendChild(rew);
    }

    return card;
  }

  // ============================================================
  // ПОЛУЧИТЬ ИМЯ ЦЕЛИ
  // ============================================================

  function getTargetName(type, target) {
    if (!target) return '?';
    if (type === 'kill' && typeof MOBS !== 'undefined' && MOBS[target]) return MOBS[target].name;
    if (type === 'fetch' && typeof ITEMS !== 'undefined' && ITEMS[target]) return ITEMS[target].name;
    if (type === 'talk' && typeof NPCs !== 'undefined' && NPCs.getNPC(target)) return NPCs.getNPC(target).name;
    if (type === 'reach') {
      // 1. Зона
      if (typeof ZONES !== 'undefined' && ZONES[target]) return ZONES[target].name;
      // 2. Подлокация (ищем во всех зонах)
      if (typeof ZONES !== 'undefined') {
        for (var zid in ZONES) {
          var z = ZONES[zid];
          if (z.sublocations) {
            for (var i = 0; i < z.sublocations.length; i++) {
              if (z.sublocations[i].id === target) {
                return z.sublocations[i].name + ' (' + z.name + ')';
              }
            }
          }
        }
      }
    }
    return target;
  }

  // ============================================================
  // ЭКСПОРТ
  // ============================================================

  window.QuestUI = {
    renderQuestTab: renderQuestTab
  };

  console.log('[quest-ui] загружен');
})();
