// ============================================================
// ВЕЙЛАН — ДИАЛОГ С NPC
// Красивое окно: портрет, имя, реплика, действия
// ============================================================

(function() {

  function openNPCDialog(npc) {
    if (!npc) return;

    // Квест-событие: поговорили с NPC
    if (window.Quest && Quest.onNPCTalked && npc.id) {
      Quest.onNPCTalked(npc.id);
    }

    var container = document.createElement('div');
    container.style.cssText = 'text-align:center;';

    // === Портрет ===
    var portraitWrap = document.createElement('div');
    portraitWrap.style.cssText =
      'width:120px;height:120px;margin:0 auto 12px;' +
      'background:radial-gradient(ellipse at center,rgba(30,40,60,0.6) 0%,rgba(10,12,20,0.9) 100%);' +
      'border:2px solid #5a4a2a;border-radius:6px;' +
      'display:flex;align-items:center;justify-content:center;' +
      'box-shadow:0 0 20px rgba(201,169,97,0.2);';

    var img = document.createElement('img');
    img.src = npc.sprite;
    img.style.cssText = 'width:90%;height:90%;object-fit:contain;image-rendering:pixelated;';
    img.onerror = function() { portraitWrap.innerHTML = '<span style="color:#5a6070;font-size:40px;">?</span>'; };
    portraitWrap.appendChild(img);
    container.appendChild(portraitWrap);

    // === Имя + титул ===
    var name = document.createElement('div');
    name.style.cssText = 'color:#c9a961;font-weight:bold;font-size:15px;letter-spacing:1px;';
    name.textContent = npc.name;
    container.appendChild(name);

    var title = document.createElement('div');
    title.style.cssText = 'color:#8a7a5a;font-size:11px;margin-bottom:8px;';
    title.textContent = npc.title + (npc.race ? ' · ' + npc.race : '');
    container.appendChild(title);

    // === Черты характера ===
    if (npc.personality && npc.personality.traits) {
      var traits = document.createElement('div');
      traits.style.cssText = 'color:#5a6a7a;font-size:10px;font-style:italic;margin-bottom:12px;';
      traits.textContent = npc.personality.traits.join(' · ');
      container.appendChild(traits);
    }

    // === Реплика ===
    var speech = document.createElement('div');
    speech.style.cssText =
      'background:rgba(0,0,0,0.4);border-left:3px solid #5a4a2a;' +
      'padding:10px 12px;margin:12px 0;text-align:left;' +
      'font-style:italic;font-size:12px;color:#d0d4d8;line-height:1.5;' +
      'white-space:pre-line;';
    var greeting = (npc.dialogue && npc.dialogue.greeting) ? npc.dialogue.greeting : '...';
    speech.textContent = '«' + greeting + '»';
    container.appendChild(speech);

    // === Описание ===
    if (npc.desc) {
      var desc = document.createElement('div');
      desc.style.cssText = 'font-size:10px;color:#5a6070;line-height:1.4;margin-bottom:12px;';
      desc.textContent = npc.desc;
      container.appendChild(desc);
    }

    // === Доступные/активные квесты у этого NPC ===
    var available = (window.Quest && Quest.getAvailableQuests) ? Quest.getAvailableQuests(npc.id) : [];
    var active = getActiveByGiver(npc.id);
    var ready = active.filter(function(q) { return Quest.isQuestReadyToComplete(q.id); });

    // Кнопки
    var buttons = [];

    // Сдать — если есть готовые
    if (ready.length > 0) {
      buttons.push({
        text: 'Сдать: ' + ready[0].name,
        type: 'good',
        onClick: function() {
          var r = Quest.completeQuest(ready[0].id);
          if (r.ok) {
            Toast.good('Квест сдан: ' + ready[0].name);
            Modal.close();
          } else {
            Toast.bad(r.reason || 'Ошибка');
          }
        }
      });
    }

    // Взять — если есть доступные
    if (available.length > 0) {
      buttons.push({
        text: 'Взять: ' + available[0].name,
        type: 'primary',
        onClick: function() {
          var r = Quest.acceptQuest(available[0].id);
          if (r.ok) {
            Modal.close();
          } else {
            Toast.bad(r.reason || 'Не удалось');
          }
        }
      });
    }

    // Просто поговорить — если нет квестов
    if (available.length === 0 && ready.length === 0 && active.length === 0) {
      buttons.push({
        text: 'Слушать',
        type: 'default',
        onClick: function() {
          if (npc.personality && npc.personality.secret) {
            Toast.info('«' + npc.personality.secret + '»');
          } else {
            Toast.info('«...»');
          }
        }
      });
    }

    // В процессе — если есть, но не готовы
    if (active.length > ready.length) {
      var notReady = active.filter(function(q) { return !Quest.isQuestReadyToComplete(q.id); });
      if (notReady.length > 0) {
        buttons.push({
          text: 'В процессе: ' + notReady[0].name,
          type: 'default',
          onClick: function() {
            // Ничего — просто информация
          }
        });
      }
    }

    buttons.push({ text: 'Уйти', type: 'default' });

    Modal.open({
      title: null,
      content: container,
      buttons: buttons
    });
  }

  function getActiveByGiver(npcId) {
    var result = [];
    if (!window.STATE || !STATE.quests) return result;
    for (var qid in STATE.quests) {
      if (STATE.quests[qid].status !== 'active') continue;
      var q = (window.QUESTS && QUESTS[qid]) ? QUESTS[qid] : null;
      if (q && q.giver === npcId) result.push(q);
    }
    return result;
  }

  // Экспорт
  window.NPCDialog = {
    open: openNPCDialog
  };

  // Глобальная функция для вызова из city-ui
  window.openNPCDialog = openNPCDialog;

  console.log('[npc-dialog] загружен');
})();
