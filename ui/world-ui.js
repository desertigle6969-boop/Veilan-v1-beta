// ============================================================
// ВЕЙЛАН — МИР (SVG-карта, зоны, подлокации, вход в город)
// ============================================================

const WORLD_LAYOUT = {
  camp:     { x: 400, y: 250, r: 38, name: 'Лагерь',    color: '#8a6a2a' },
  forest:   { x: 580, y: 180, r: 36, name: 'Лес',       color: '#3a6a30' },
  mines:    { x: 220, y: 380, r: 36, name: 'Рудники',   color: '#6a5a3a' },
  ruins:    { x: 600, y: 340, r: 36, name: 'Руины',     color: '#6a4a2a' },
  temple:   { x: 710, y: 250, r: 34, name: 'Храм',      color: '#2a5a6a' },
  peaks:    { x: 520, y: 80,  r: 34, name: 'Пики',      color: '#5a8aa0' },
  forges:   { x: 120, y: 250, r: 34, name: 'Кузни',     color: '#8a3a1a' },
  swamp:    { x: 180, y: 130, r: 34, name: 'Топи',      color: '#4a5a2a' },
  bridge:   { x: 340, y: 90,  r: 32, name: 'Мост',      color: '#7a7a9a' },
  rift:     { x: 100, y: 420, r: 34, name: 'Разлом',    color: '#5a2a6a' },
  fortress: { x: 700, y: 420, r: 34, name: 'Крепость',  color: '#4a3a5a' },
  heart:    { x: 400, y: 440, r: 38, name: 'Сердце',    color: '#a05ad0' }
};

const WORLD_ROADS = [
  ['camp', 'forest'], ['camp', 'mines'], ['camp', 'bridge'], ['camp', 'ruins'],
  ['camp', 'heart'], ['forest', 'peaks'], ['forest', 'temple'], ['forest', 'ruins'],
  ['mines', 'swamp'], ['mines', 'rift'], ['mines', 'forges'], ['ruins', 'fortress'],
  ['temple', 'fortress'], ['peaks', 'bridge'], ['forges', 'swamp'], ['rift', 'heart'],
  ['fortress', 'heart']
];

const WORLD_RIVERS = [
  { path: 'M 200,100 Q 250,200 220,280 T 180,420' },
  { path: 'M 600,100 Q 550,200 580,300 T 620,420' },
  { path: 'M 100,300 Q 250,320 400,300 T 700,320' }
];

// ============================================================
// ГЛАВНАЯ ОТРИСОВКА
// ============================================================

function renderWorldTab(screen) {
  screen.innerHTML = '';

  // ========== СПИСОК ЗОН ==========
  const zonesPanel = document.createElement('div');
  zonesPanel.className = 'panel';

  const zonesH2 = document.createElement('h2');
  zonesH2.textContent = 'Зоны';
  zonesPanel.appendChild(zonesH2);

  if (typeof ZONES === 'undefined' || typeof Zone === 'undefined' || !Zone.getAllZones) {
    const err = document.createElement('p');
    err.style.cssText = 'color:#e05555;font-size:12px;';
    err.textContent = 'Данные зон не загружены';
    zonesPanel.appendChild(err);
    screen.appendChild(zonesPanel);
    return;
  }

  const zones = Zone.getAllZones();
  zones.forEach(function(z) {
    const unlocked = Zone.isZoneUnlocked(z.id);
    const isCurrent = STATE.hero && STATE.hero.position && STATE.hero.position.zoneId === z.id;
    const hasCity = z.buildings && Object.keys(z.buildings).length > 0;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText =
      'padding:10px;margin-bottom:8px;' +
      (unlocked ? 'cursor:pointer;' : 'opacity:0.5;cursor:not-allowed;') +
      (isCurrent ? 'border-color:#ffd700;box-shadow:0 0 10px rgba(232,184,74,0.4);' : '');

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';

    const name = document.createElement('div');
    name.style.cssText = 'color:' + (unlocked ? '#e8b84a' : '#8a7a5a') + ';font-weight:bold;font-size:13px;';
    name.textContent = z.name + (isCurrent ? ' [ТЕКУЩАЯ]' : '');
    header.appendChild(name);

    const level = document.createElement('div');
    level.style.cssText = 'color:#6ab0e0;font-size:11px;';
    level.textContent = 'ур. ' + z.levelRange[0] + '-' + z.levelRange[1];
    header.appendChild(level);

    card.appendChild(header);

    const info = document.createElement('div');
    info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-top:4px;';
    info.textContent = z.sublocations.length + ' подлокаций' +
                       (hasCity ? ' | город' : '') +
                       (unlocked ? '' : ' | ЗАКРЫТО: ' + (z.unlockCondition || 'неизвестно'));
    card.appendChild(info);

    if (unlocked) {
      card.onclick = function() {
        openZone(z.id);
      };
    }

    zonesPanel.appendChild(card);
  });

  screen.appendChild(zonesPanel);
}

// ============================================================
// SVG-КАРТА
// ============================================================


// ============================================================
// ОТКРЫТИЕ ЗОНЫ
// ============================================================

function openZone(zoneId) {
  const zone = ZONES[zoneId];
  if (!zone) return;

  // Хаб с городом → открыть город
  if (zone.type === 'hub' && zone.buildings) {
    if (window.CityUI && CityUI.openCity) {
      CityUI.openCity(zoneId);
    } else {
      Toast.bad('city-ui.js не загружен');
      renderZoneSublocations(zoneId);
    }
    return;
  }

  // Обычная зона → список подлокаций
  renderZoneSublocations(zoneId);
}

function renderZoneSublocations(zoneId) {
  const zone = ZONES[zoneId];
  if (!zone) return;

  const screen = UI.screenRoot;
  screen.innerHTML = '';

  // ========== ФОН (на #app) ==========
  var bgPath = (window.Backgrounds && Backgrounds.getZoneBackground)
    ? Backgrounds.getZoneBackground(zoneId)
    : null;
  if (bgPath) {
    var app = document.getElementById('app');
    if (app) {
      app.style.backgroundImage =
        'radial-gradient(ellipse at top,rgba(10,8,4,0.5) 0%,rgba(5,4,2,0.75) 60%,rgba(2,1,0,0.85) 100%),' +
        'url(' + bgPath + ')';
      app.style.backgroundSize = 'cover, cover';
      app.style.backgroundPosition = 'center, center';
      app.style.backgroundAttachment = 'fixed, fixed';
    }
    if (window._bgCleanup) window._bgCleanup();
    window._bgCleanup = function() {
      if (app) {
        app.style.backgroundImage = '';
        app.style.backgroundSize = '';
        app.style.backgroundPosition = '';
        app.style.backgroundAttachment = '';
      }
    };
  }

  // Назад
  const backPanel = document.createElement('div');
  backPanel.className = 'panel';
  backPanel.style.cssText = 'padding:8px;';

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад к карте';
  backBtn.onclick = function() { render(); };
  backPanel.appendChild(backBtn);
  screen.appendChild(backPanel);

  // Заголовок
  const infoPanel = document.createElement('div');
  infoPanel.className = 'panel';

  const h2 = document.createElement('h2');
  h2.textContent = zone.name;
  infoPanel.appendChild(h2);

  const lvl = document.createElement('p');
  lvl.style.cssText = 'color:#6ab0e0;font-size:12px;margin-bottom:8px;';
  lvl.textContent = 'Уровни: ' + zone.levelRange[0] + '-' + zone.levelRange[1];
  infoPanel.appendChild(lvl);

  const lore = document.createElement('p');
  lore.style.cssText = 'color:#8a7a5a;font-size:12px;font-style:italic;line-height:1.5;';
  lore.textContent = zone.lore;
  infoPanel.appendChild(lore);

  screen.appendChild(infoPanel);

  // ========== Поселение (если есть) ==========
  if (window.Settlements && Settlements.getSettlement) {
    var settlement = Settlements.getSettlement(zoneId);
    if (settlement) {
      var setPanel = document.createElement('div');
      setPanel.className = 'panel';

      var setH2 = document.createElement('h2');
      setH2.textContent = 'Поселение';
      setPanel.appendChild(setH2);

      var card = document.createElement('div');
      card.style.cssText =
        'background:linear-gradient(180deg,rgba(40,50,60,0.7) 0%,rgba(15,20,25,0.85) 100%);' +
        'border:1px solid #5a4a2a;border-radius:4px;padding:12px;cursor:pointer;';

      var setHead = document.createElement('div');
      setHead.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';

      var setName = document.createElement('div');
      setName.style.cssText = 'color:#c9a961;font-weight:bold;font-size:14px;';
      setName.textContent = settlement.name;
      setHead.appendChild(setName);

      var setTag = document.createElement('div');
      setTag.style.cssText = 'color:#8a7a5a;font-size:10px;letter-spacing:1px;';
      setTag.textContent = 'ПОСЕЛЕНИЕ';
      setHead.appendChild(setTag);

      card.appendChild(setHead);

      var setSub = document.createElement('div');
      setSub.style.cssText = 'color:#6a8aaa;font-size:11px;margin-bottom:6px;';
      setSub.textContent = settlement.subtitle;
      card.appendChild(setSub);

      var setLore = document.createElement('div');
      setLore.style.cssText = 'color:#8a7a5a;font-size:11px;font-style:italic;line-height:1.4;margin-bottom:8px;';
      setLore.textContent = settlement.lore;
      card.appendChild(setLore);

      var setBtn = document.createElement('button');
      setBtn.className = 'btn btn-primary';
      setBtn.style.cssText = 'width:100%;font-size:12px;padding:6px;';
      setBtn.textContent = 'Войти в поселение';
      setBtn.onclick = function(e) {
        if (e) e.stopPropagation();
        if (window.CityUI && CityUI.openCity) {
          CityUI.openCity(zoneId);
        } else {
          Toast.bad('CityUI не загружен');
        }
      };
      card.appendChild(setBtn);

      card.onclick = function(e) {
        if (e && e.target === setBtn) return;
        if (window.CityUI && CityUI.openCity) CityUI.openCity(zoneId);
      };

      setPanel.appendChild(card);
      screen.appendChild(setPanel);
    }
  }

  // Подлокации
  const subsPanel = document.createElement('div');
  subsPanel.className = 'panel';

  const subsH2 = document.createElement('h2');
  subsH2.textContent = 'Подлокации';
  subsPanel.appendChild(subsH2);

  zone.sublocations.forEach(function(sub) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:10px;margin-bottom:8px;';

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';

    const name = document.createElement('div');
    name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:13px;';
    name.textContent = sub.name + (sub.boss ? ' [БОСС]' : '');
    header.appendChild(name);

    const lvl2 = document.createElement('div');
    lvl2.style.cssText = 'color:#6ab0e0;font-size:11px;';
    lvl2.textContent = 'ур. ' + sub.levelRange[0] + '-' + sub.levelRange[1];
    header.appendChild(lvl2);

    card.appendChild(header);

    const info = document.createElement('div');
    info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-top:4px;';
    info.textContent = sub.boss
      ? 'Босс: ' + (MOBS[sub.boss] ? MOBS[sub.boss].name : sub.boss)
      : (sub.mobs.length + ' видов мобов');
    card.appendChild(info);

    const lore2 = document.createElement('div');
    lore2.style.cssText = 'font-size:11px;color:#6a5a3a;font-style:italic;margin-top:4px;line-height:1.4;';
    lore2.textContent = sub.lore;
    card.appendChild(lore2);

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:6px;margin-top:8px;';

    const enterBtn = document.createElement('button');
    enterBtn.className = 'btn btn-primary';
    enterBtn.style.cssText = 'flex:1;font-size:11px;padding:6px;';
    enterBtn.textContent = 'Войти';
    enterBtn.onclick = function() {
      enterSublocation(zoneId, sub.id);
    };
    btnRow.appendChild(enterBtn);

    card.appendChild(btnRow);
    subsPanel.appendChild(card);
  });

  screen.appendChild(subsPanel);
}

// ============================================================
// ВХОД В ПОДЛОКАЦИЮ
// ============================================================

function enterSublocation(zoneId, subId) {
  var sub = (window.Zone && Zone.getSublocation) ? Zone.getSublocation(zoneId, subId) : null;
  if (!sub) {
    Toast.bad('Подлокация не найдена');
    return;
  }

  if (!STATE || !STATE.hero) {
    Toast.bad('Нет героя');
    return;
  }

  var hero = STATE.hero;
  var subName = sub.name || subId;

  // Проверка уровня
  if (sub.levelRange && hero.level + 5 < sub.levelRange[0]) {
    Toast.bad('Слишком опасно для твоего уровня');
    return;
  }

  // ===== Собрать playerParty =====
  var playerParty = [{ isHero: true, ref: hero }];

  // TODO: наёмники из STATE.party.mercs
  // (пока партии нет — только герой)

  // ===== Проверка PvP-встречи =====
  if (false && window.PvP && PvP.rollPvPEncounter) {
    var pvpChance = (CONFIG && CONFIG.pvp && CONFIG.pvp.encounterChance) || 0.15;
    if (Math.random() < pvpChance) {
      var pvpData = PvP.generatePvPHero(hero.level, zoneId);
      if (pvpData) {
        Toast.bad('Тебя поджидает ВРАГ-ИГРОК: ' + pvpData.name);
        var pvpEnemy = [{ isPvP: true, pvpData: pvpData }];
        startBattle(playerParty, pvpEnemy, zoneId, subId, false, subName);
        return;
      }
    }
  }

  // ===== Обычный бой =====
  var enemyParty = [];

  if (sub.boss) {
    // Босс + миньоны
    var boss = MOBS[sub.boss];
    if (!boss) {
      Toast.bad('Босс не найден: ' + sub.boss);
      return;
    }
    enemyParty.push({ mobId: sub.boss, hp: boss.hp, maxHp: boss.hp, isBoss: true });

    // 1-2 миньона
    if (sub.mobs && sub.mobs.length > 0) {
      var minionCount = 1 + Math.floor(Math.random() * 2);
      for (var i = 0; i < minionCount; i++) {
        var mobId = sub.mobs[Math.floor(Math.random() * sub.mobs.length)];
        var mob = MOBS[mobId];
        if (mob) {
          enemyParty.push({ mobId: mobId, hp: mob.hp, maxHp: mob.hp });
        }
      }
    }
  } else {
    // Обычные мобы
    if (!sub.mobs || sub.mobs.length === 0) {
      Toast.bad('Нет мобов в подлокации');
      return;
    }

    // 70% — 1 моб, 25% — 2 моба, 5% — 3 моба
    var roll = Math.random();
    var count = 1;
    if (roll < 0.05) count = 3;
    else if (roll < 0.30) count = 2;
    for (var j = 0; j < count; j++) {
      var mid = sub.mobs[Math.floor(Math.random() * sub.mobs.length)];
      var m = MOBS[mid];
      if (m) {
        enemyParty.push({ mobId: mid, hp: m.hp, maxHp: m.hp });
      }
    }
  }

  if (enemyParty.length === 0) {
    Toast.bad('Не удалось собрать врагов');
    return;
  }

  startBattle(playerParty, enemyParty, zoneId, subId, sub.boss ? true : false, subName);

  if (window.Zone && Zone.markSubVisited) {
    Zone.markSubVisited(zoneId, subId);
  }
}

// ============================================================
// ЗАПУСК БОЯ ЧЕРЕЗ BattleUI
// ============================================================

function startBattle(playerParty, enemyParty, zoneId, subId, isBoss, subName) {
  if (!window.BattleUI || !BattleUI.open) {
    Toast.bad('BattleUI не загружен');
    return;
  }

  Toast.info('Бой: ' + subName);

  BattleUI.open({
    playerParty: playerParty,
    enemyParty: enemyParty,
    zoneId: zoneId,
    subId: subId,
    isBoss: isBoss,
    onEnd: function(result) {
      // Результат боя обрабатывает battle-ui.js
      // Здесь только возврат в меню
      console.log('Бой завершён:', result);

      // Обновляем верхние полоски
      if (window.updateStatusBars) updateStatusBars();
      if (window.updateTopbar) updateTopbar();

      // Возвращаемся в текущую вкладку (Мир)
      if (window.UI && UI.tab) {
        UI.tab('map');
      }
    }
  });
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.WorldUI = {
  renderWorldTab: renderWorldTab,
  openZone: openZone,
  enterSublocation: enterSublocation,
};
