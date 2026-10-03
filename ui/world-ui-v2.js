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

  // Всегда показываем список: поселение + подлокации
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

  // ========== ЕДИНЫЙ СПИСОК: поселения + боевые подлокации ==========
  var allPoints = [];

  // 1. Боевые подлокации
  if (zone.sublocations) {
    zone.sublocations.forEach(function(sub) {
      allPoints.push({
        kind: 'subloc',
        level: sub.levelRange ? sub.levelRange[0] : 0,
        data: sub
      });
    });
  }

  // 2. Поселения и стоянки
  if (window.Settlements && Settlements.SETTLEMENTS) {
    for (var sid in Settlements.SETTLEMENTS) {
      var st = Settlements.SETTLEMENTS[sid];
      if (st.zoneId !== zoneId) continue;
      allPoints.push({
        kind: 'settlement',
        level: st.level || (st.type === 'main' ? 5 : 3),
        data: st
      });
    }
  }

  // 3. Сортировка по уровню
  allPoints.sort(function(a, b) { return a.level - b.level; });

  // 4. Рендер единого списка
  var pointsPanel = document.createElement('div');
  pointsPanel.className = 'panel';

  var pointsH2 = document.createElement('h2');
  pointsH2.textContent = 'Локации зоны';
  pointsPanel.appendChild(pointsH2);

  allPoints.forEach(function(point) {
    var card;
    if (point.kind === 'settlement') {
      card = renderSettlementCard(point.data);
    } else {
      card = renderSublocationCard(point.data, zoneId);
    }
    pointsPanel.appendChild(card);
  });

  screen.appendChild(pointsPanel);
}

// ============================================================
// КАРТОЧКА БОЕВОЙ ПОДЛОКАЦИИ
// ============================================================
function renderSublocationCard(sub, zoneId) {
  var card = document.createElement('div');
  card.style.cssText =
    'background:linear-gradient(180deg,rgba(30,20,20,0.6) 0%,rgba(15,10,10,0.85) 100%);' +
    'border:1px solid #5a3a3a;border-left:3px solid #8a2a2a;border-radius:4px;padding:10px;margin-bottom:8px;';

  var header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;';

  var name = document.createElement('div');
  name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:13px;';
  name.textContent = sub.name + (sub.boss ? ' [БОСС]' : '');
  header.appendChild(name);

  var lvl = document.createElement('div');
  lvl.style.cssText = 'color:#6ab0e0;font-size:11px;';
  lvl.textContent = 'ур. ' + sub.levelRange[0] + '-' + sub.levelRange[1];
  header.appendChild(lvl);

  card.appendChild(header);

  var info = document.createElement('div');
  info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-top:4px;';
  info.textContent = sub.boss
    ? 'Босс: ' + (MOBS[sub.boss] ? MOBS[sub.boss].name : sub.boss)
    : (sub.mobs.length + ' видов мобов');
  card.appendChild(info);

  var lore = document.createElement('div');
  lore.style.cssText = 'font-size:11px;color:#6a5a3a;font-style:italic;margin-top:4px;line-height:1.4;';
  lore.textContent = sub.lore;
  card.appendChild(lore);

  var btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.style.cssText = 'width:100%;font-size:11px;padding:6px;margin-top:8px;';
  btn.textContent = 'Войти в бой';
  btn.onclick = function() { enterSublocation(zoneId, sub.id); };
  card.appendChild(btn);

  return card;
}

// ============================================================
// КАРТОЧКА ПОСЕЛЕНИЯ / СТОЯНКИ
// ============================================================
function renderSettlementCard(settlement) {
  var isMain = settlement.type === 'main';

  var card = document.createElement('div');
  card.style.cssText =
    'background:linear-gradient(180deg,rgba(30,40,50,0.7) 0%,rgba(15,20,25,0.85) 100%);' +
    'border:1px solid #5a4a2a;border-left:3px solid ' + (isMain ? '#c9a961' : '#5a8a8a') + ';' +
    'border-radius:4px;padding:10px;margin-bottom:8px;cursor:pointer;';

  var header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;';

  var name = document.createElement('div');
  name.style.cssText = 'color:#c9a961;font-weight:bold;font-size:13px;';
  name.textContent = settlement.name;
  header.appendChild(name);

  var tag = document.createElement('div');
  tag.style.cssText = 'color:#8a7a5a;font-size:10px;letter-spacing:1px;';
  tag.textContent = isMain ? 'ПОСЕЛЕНИЕ' : 'СТОЯНКА';
  header.appendChild(tag);

  card.appendChild(header);

  var sub = document.createElement('div');
  sub.style.cssText = 'color:#6a8aaa;font-size:11px;margin-bottom:6px;';
  sub.textContent = settlement.subtitle;
  card.appendChild(sub);

  var lore = document.createElement('div');
  lore.style.cssText = 'color:#8a7a5a;font-size:11px;font-style:italic;line-height:1.4;margin-bottom:8px;';
  lore.textContent = settlement.lore;
  card.appendChild(lore);

  var btn = document.createElement('button');
  btn.className = 'btn btn-primary';
  btn.style.cssText = 'width:100%;font-size:11px;padding:6px;';
  btn.textContent = isMain ? 'Войти в поселение' : 'Подойти';
  btn.onclick = function(e) {
    if (e) e.stopPropagation();
    if (window.CityUI && CityUI.openCity) {
      CityUI.openCity(settlement.zoneId, settlement.id);
    }
  };
  card.appendChild(btn);

  card.onclick = function() {
    if (window.CityUI && CityUI.openCity) {
      CityUI.openCity(settlement.zoneId, settlement.id);
    }
  };

  return card;
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

  // Квест-событие: достигли зоны и подлокации (квесты reach)
  if (window.Quest && Quest.onZoneReached) {
    Quest.onZoneReached(zoneId);
    Quest.onZoneReached(subId);
    Quest.onZoneReached(zoneId + ':' + subId);
  }

  // Проверка уровня
  if (sub.levelRange && hero.level + 5 < sub.levelRange[0]) {
    Toast.bad('Слишком опасно для твоего уровня');
    return;
  }

  // Проверка ключа (для подлокаций с requiredKey)
  if (sub.requiredKey) {
    if (!window.Inventory || !Inventory.hasItem(sub.requiredKey, 1)) {
      var keyItem = (window.ITEMS && ITEMS[sub.requiredKey]) ? ITEMS[sub.requiredKey].name : sub.requiredKey;
      Toast.bad('Нужен ключ: ' + keyItem);
      return;
    }
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

  // ===== СПАВН РЕДКОГО МОБА (Тайное ремесло) =====
  // Шанс 0.5% — один из мобов подменяется редким из той же зоны
  if (!sub.boss && window.MOBS_SECRET && enemyParty.length > 0) {
    var secretMobId = null;
    var secretCandidates = [];
    for (var smid in MOBS_SECRET) {
      if (MOBS_SECRET[smid].zone === zoneId) {
        // Не спавним, если уже убит (защита от дюпа)
        if (window.Secrets && Secrets.canSpawnSecretMob && !Secrets.canSpawnSecretMob(STATE.hero, smid)) {
          continue;
        }
        secretCandidates.push(smid);
      }
    }
    if (secretCandidates.length > 0) {
      secretMobId = secretCandidates[Math.floor(Math.random() * secretCandidates.length)];
    }
    if (secretMobId && Math.random() < 0.005) {
      var secretMob = MOBS[secretMobId];
      if (secretMob) {
        // Подменяем первого обычного моба на редкого
        var slot = Math.floor(Math.random() * enemyParty.length);
        enemyParty[slot] = {
          mobId: secretMobId,
          hp: secretMob.hp,
          maxHp: secretMob.hp,
          isSecret: true
        };
        Toast.info('Что-то не так. Воздух стал тяжёлым...');
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

// ============================================================
// ВСЕ ПОСЕЛЕНИЯ ЗОНЫ (главное + малые стоянки)
// ============================================================

function getZoneSettlements(zoneId) {
  var result = [];
  if (!window.Settlements || !Settlements.SETTLEMENTS) return result;
  for (var id in Settlements.SETTLEMENTS) {
    var s = Settlements.SETTLEMENTS[id];
    if (s.zoneId === zoneId) result.push(s);
  }
  // Сначала главные, потом малые
  result.sort(function(a, b) {
    if (a.type === 'main' && b.type !== 'main') return -1;
    if (b.type === 'main' && a.type !== 'main') return 1;
    return 0;
  });
  return result;
}

