// ============================================================
// ВЕЙЛАН — ГОРОД (главный экран города с иконками зданий)
// ============================================================

function openCity(zoneId, settlementId) {
  const zone = ZONES[zoneId];
  if (!zone) {
    Toast.bad('Город не найден: ' + zoneId);
    return;
  }

  const screen = (window.UI && UI.screenRoot) ? UI.screenRoot : document.getElementById('screen');
  if (!screen) { console.error('Нет #screen'); return; }
  screen.innerHTML = '';

  // ========== ФОН (на #app) ==========
  var bgPath = (window.Backgrounds && Backgrounds.getZoneBackground)
    ? Backgrounds.getZoneBackground(zoneId)
    : null;
  if (bgPath) {
    var app = document.getElementById('app');
    if (app) {
      // Фон + затемняющий градиент СВЕРХУ
      app.style.backgroundImage =
        'radial-gradient(ellipse at top,rgba(10,8,4,0.5) 0%,rgba(5,4,2,0.75) 60%,rgba(2,1,0,0.85) 100%),' +
        'url(' + bgPath + ')';
      app.style.backgroundSize = 'cover, cover';
      app.style.backgroundPosition = 'center, center';
      app.style.backgroundAttachment = 'fixed, fixed';
    }
    // Очистка при смене вкладки
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

  // ========== Кнопка "Назад" ==========
  const backPanel = document.createElement('div');
  backPanel.className = 'panel';
  backPanel.style.cssText = 'padding:8px;';

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад к карте';
  backBtn.onclick = function() { UI.tab('map'); };
  backPanel.appendChild(backBtn);
  screen.appendChild(backPanel);

  // ========== Заголовок города ==========
  const titlePanel = document.createElement('div');
  titlePanel.className = 'panel';
  titlePanel.style.cssText = 'text-align:center;';

  const h1 = document.createElement('h2');
  h1.style.cssText = 'color:#e8b84a;font-size:16px;letter-spacing:2px;margin-bottom:8px;border:none;padding:0;';
  h1.textContent = zone.name || 'Город';
  titlePanel.appendChild(h1);

  const sub = document.createElement('p');
  sub.style.cssText = 'color:#6ab0e0;font-size:11px;margin-bottom:8px;';
  sub.textContent = zone.location || 'Локация';
  titlePanel.appendChild(sub);

  const lore = document.createElement('p');
  lore.style.cssText = 'color:#8a7a5a;font-size:12px;font-style:italic;line-height:1.6;padding:8px;border-top:1px solid #3a2a18;border-bottom:1px solid #3a2a18;';
  lore.textContent = zone.lore || 'Описание недоступно.';
  titlePanel.appendChild(lore);

  screen.appendChild(titlePanel);

  // ========== NPC в городе ==========
  if (window.NPCs && NPCs.getNPCsByLocation) {
    // Если открыта конкретная стоянка — фильтруем по ней
    // Иначе — NPC главного поселения (без settlement)
    var npcs;
    if (settlementId && NPCs.getNPCsBySettlement) {
      npcs = NPCs.getNPCsBySettlement(settlementId);
    } else if (NPCs.getNPCsByCity) {
      npcs = NPCs.getNPCsByCity(zoneId);
    } else {
      npcs = NPCs.getNPCsByLocation(zoneId);
    }
    if (npcs.length > 0) {
      var npcPanel = document.createElement('div');
      npcPanel.className = 'panel';

      var npcH2 = document.createElement('h2');
      npcH2.textContent = 'Обитатели';
      npcPanel.appendChild(npcH2);

      var npcGrid = document.createElement('div');
      npcGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;';

      npcs.forEach(function(npc) {
        var card = document.createElement('div');
        card.style.cssText =
          'background:rgba(10,12,18,0.5);border:1px solid #3a4258;border-radius:4px;' +
          'padding:6px;text-align:center;cursor:pointer;transition:all 0.15s;';
        card.onmouseover = function() { card.style.borderColor = '#c9a961'; };
        card.onmouseout = function() { card.style.borderColor = '#3a4258'; };

        var img = document.createElement('img');
        img.src = npc.sprite;
        img.style.cssText = 'width:48px;height:48px;object-fit:contain;image-rendering:pixelated;';
        img.onerror = function() { img.style.display = 'none'; };
        card.appendChild(img);

        var nm = document.createElement('div');
        nm.style.cssText = 'color:#c9a961;font-size:11px;font-weight:bold;margin-top:4px;';
        nm.textContent = npc.name;
        card.appendChild(nm);

        var ttl = document.createElement('div');
        ttl.style.cssText = 'color:#8a7a5a;font-size:9px;margin-top:2px;';
        ttl.textContent = npc.title;
        card.appendChild(ttl);

        card.onclick = function() { openNPCDialog(npc); };
        npcGrid.appendChild(card);
      });

      npcPanel.appendChild(npcGrid);
      screen.appendChild(npcPanel);
    }
  }

  // ========== Сетка зданий ==========
  const buildingsPanel = document.createElement('div');
  buildingsPanel.className = 'panel';

  const bH2 = document.createElement('h2');
  bH2.textContent = 'Постройки';
  buildingsPanel.appendChild(bH2);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;';

  // Постройки: сначала из зоны, потом из поселения
  let buildings = (zone.buildings && typeof zone.buildings === 'object') ? zone.buildings : {};
  if (Object.keys(buildings).length === 0 && window.Settlements) {
    var settlement = Settlements.getSettlement(zoneId);
    if (settlement && settlement.buildings) {
      // Преобразуем массив ['blacksmith', 'merchant'] в объект
      buildings = {};
      settlement.buildings.forEach(function(key) {
        buildings[key] = { key: key };
      });
    }
  }

  const buildingList = [
    { key: 'blacksmith', icon: 'sprites/icons/etc/BTN_etc_blacksmiths_frame_i00.png', name: 'Кузница', desc: 'Крафт, заточка, аугментация' },
    { key: 'merchant',   icon: 'sprites/icons/etc/BTN_etc_adena_i00.png',              name: 'Лавка',   desc: 'Купить или продать предметы' },
    { key: 'tavern',     icon: 'sprites/icons/etc/BTN_etc_wine_barrel_i00.png',        name: 'Таверна', desc: 'Наёмники для партии' },
    { key: 'board',      icon: 'sprites/icons/etc/BTN_etc_letter_envelope_i00.png',    name: 'Доска',   desc: 'Задания и квесты' }
  ];

  var hasAnyBuilding = false;

  buildingList.forEach(function(b) {
    const hasBuilding = !!buildings[b.key];
    if (!hasBuilding) return;
    hasAnyBuilding = true;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText =
      'padding:12px;text-align:center;cursor:pointer;' +
      'min-height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;';

    const icon = document.createElement('div');
    icon.style.cssText =
      'width:56px;height:56px;background:linear-gradient(180deg,rgba(58,42,24,0.7),rgba(26,18,8,0.7));' +
      'border:2px solid #8a6a2a;border-radius:6px;' +
      'display:flex;align-items:center;justify-content:center;' +
      'margin-bottom:8px;overflow:hidden;';
    var img = document.createElement('img');
    img.src = b.icon;
    img.style.cssText = 'width:80%;height:80%;object-fit:contain;image-rendering:pixelated;';
    img.onerror = function() {
      icon.innerHTML = '<span style="color:#e8b84a;font-weight:bold;font-size:14px;">?</span>';
    };
    icon.appendChild(img);
    card.appendChild(icon);

    const name = document.createElement('div');
    name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:13px;margin-bottom:4px;';
    name.textContent = b.name;
    card.appendChild(name);

    const desc = document.createElement('div');
    desc.style.cssText = 'color:#8a7a5a;font-size:10px;line-height:1.3;';
    desc.textContent = b.desc;
    card.appendChild(desc);

    card.onclick = function() { openBuilding(zoneId, b.key); };
    grid.appendChild(card);
  });

  if (!hasAnyBuilding) {
    const noB = document.createElement('p');
    noB.style.cssText = 'color:#8a7a5a;font-style:italic;font-size:12px;';
    noB.textContent = 'В этом городе пока нет доступных построек.';
    buildingsPanel.appendChild(noB);
  } else {
    buildingsPanel.appendChild(grid);
  }
  screen.appendChild(buildingsPanel);

  // ========== Подлокации (боевые зоны) ==========
  if (zone.sublocations && zone.sublocations.length > 0) {
    const subsPanel = document.createElement('div');
    subsPanel.className = 'panel';

    const subsH2 = document.createElement('h2');
    subsH2.textContent = 'Боевые подлокации';
    subsPanel.appendChild(subsH2);

    const subsInfo = document.createElement('p');
    subsInfo.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:8px;';
    subsInfo.textContent = 'Тапни, чтобы войти в бой. Победа над боссом открывает новые зоны.';
    subsPanel.appendChild(subsInfo);

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

      const lvl = document.createElement('div');
      lvl.style.cssText = 'color:#6ab0e0;font-size:11px;';
      lvl.textContent = 'ур. ' + sub.levelRange[0] + '-' + sub.levelRange[1];
      header.appendChild(lvl);

      card.appendChild(header);

      const info = document.createElement('div');
      info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-top:4px;';
      if (sub.boss) {
        info.textContent = 'Босс: ' + (MOBS[sub.boss] ? MOBS[sub.boss].name : sub.boss);
      } else {
        info.textContent = sub.mobs.length + ' видов мобов';
      }
      card.appendChild(info);

      const lore = document.createElement('div');
      lore.style.cssText = 'font-size:11px;color:#6a5a3a;font-style:italic;margin-top:4px;line-height:1.4;';
      lore.textContent = sub.lore;
      card.appendChild(lore);

      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.style.cssText = 'width:100%;font-size:11px;padding:6px;margin-top:8px;';
      btn.textContent = 'Войти в бой';
      btn.onclick = function() {
        enterSublocation(zoneId, sub.id);
      };
      card.appendChild(btn);

      subsPanel.appendChild(card);
    });

    screen.appendChild(subsPanel);
  }

  // ========== Подсказка ==========
  const hint = document.createElement('div');
  hint.className = 'panel';
  hint.innerHTML =
    '<h2>Подсказка</h2>' +
    '<p style="font-size:11px;color:#8a7a5a;">' +
    'Тапни по постройке, чтобы открыть.<br>' +
    'Кузница — крафт предметов, заточка экипировки, вставка камней.<br>' +
    'Лавка — купить зелья или продать ненужное.<br>' +
    'Подлокации — бои с мобами и боссами.' +
    '</p>';
  screen.appendChild(hint);
}

function openBuilding(zoneId, buildingKey) {
  switch (buildingKey) {
    case 'blacksmith': openBlacksmith(zoneId); break;
    case 'merchant':   openShop(zoneId); break;
    case 'tavern':     openTavern(zoneId); break;
    case 'board':      openBoard(zoneId); break;
    default: Toast.info('Эта постройка ещё не работает');
  }
}

// ============================================================
// КУЗНИЦА — ГЛАВНЫЙ ЭКРАН (3 вкладки)
// ============================================================

var BLACKSMITH_STATE = {
  tab: 'craft',  // 'craft' | 'enhance' | 'augment'
  zoneId: null
};

function openBlacksmith(zoneId) {
  BLACKSMITH_STATE.zoneId = zoneId;
  BLACKSMITH_STATE.tab = 'craft';
  renderBlacksmith();
}

function renderBlacksmith() {
  const screen = (window.UI && UI.screenRoot) ? UI.screenRoot : document.getElementById('screen');
  if (!screen) { console.error('Нет #screen'); return; }
  screen.innerHTML = '';

  // Заголовок + Назад
  const headerPanel = document.createElement('div');
  headerPanel.className = 'panel';
  headerPanel.style.cssText = 'padding:8px;';

  const backBtn = document.createElement('button');
  backBtn.className = 'btn';
  backBtn.textContent = 'Назад в город';
  backBtn.onclick = function() {
    if (BLACKSMITH_STATE.zoneId) {
      openCity(BLACKSMITH_STATE.zoneId);
    } else {
      UI.tab('map');
    }
  };
  headerPanel.appendChild(backBtn);

  const h2 = document.createElement('h2');
  h2.style.cssText = 'color:#e8b84a;font-size:15px;letter-spacing:2px;margin-top:8px;border:none;padding:0;';
  h2.textContent = 'Кузница';
  headerPanel.appendChild(h2);

  screen.appendChild(headerPanel);

  // Вкладки
  const tabsPanel = document.createElement('div');
  tabsPanel.className = 'panel';
  tabsPanel.style.cssText = 'padding:6px;display:flex;gap:6px;';

  const tabs = [
    { id: 'craft',   label: 'Крафт' },
    { id: 'enhance', label: 'Заточка' },
    { id: 'augment', label: 'Камень' }
  ];

  tabs.forEach(function(t) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.cssText = 'flex:1;padding:8px;font-size:12px;';
    if (BLACKSMITH_STATE.tab === t.id) {
      btn.classList.add('btn-primary');
    }
    btn.textContent = t.label;
    btn.onclick = function() {
      BLACKSMITH_STATE.tab = t.id;
      renderBlacksmith();
    };
    tabsPanel.appendChild(btn);
  });

  screen.appendChild(tabsPanel);

  // Содержимое вкладки
  if (BLACKSMITH_STATE.tab === 'craft')   renderCraftTab(screen);
  if (BLACKSMITH_STATE.tab === 'enhance') renderEnhanceTab(screen);
  if (BLACKSMITH_STATE.tab === 'augment') renderAugmentTab(screen);
}

// ============================================================
// ВКЛАДКА "КРАФТ"
// ============================================================

function renderCraftTab(screen) {
  const panel = document.createElement('div');
  panel.className = 'panel';

  const h2 = document.createElement('h2');
  h2.textContent = 'Крафт предметов';
  panel.appendChild(h2);

  if (!window.Recipes || !Recipes.getAllRecipes) {
    panel.innerHTML += '<p style="color:#e05555;">Рецепты не загружены</p>';
    screen.appendChild(panel);
    return;
  }

  const all = Recipes.getAllRecipes();
  const hero = STATE ? STATE.hero : null;

  if (!hero) {
    panel.innerHTML += '<p style="color:#e05555;">Герой не найден</p>';
    screen.appendChild(panel);
    return;
  }

  const available = all.filter(function(r) { return r.levelReq <= hero.level; });

  if (available.length === 0) {
    panel.innerHTML += '<p style="color:#8a7a5a;font-style:italic;">Нет рецептов для твоего уровня</p>';
    screen.appendChild(panel);
    return;
  }

  const info = document.createElement('p');
  info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:8px;';
  info.textContent = 'Доступно рецептов: ' + available.length + ' из ' + all.length;
  panel.appendChild(info);

  // Список рецептов
  available.forEach(function(recipe) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:10px;margin-bottom:8px;';

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;';

    const leftPart = document.createElement('div');
    leftPart.style.cssText = 'display:flex;align-items:center;gap:8px;flex:1;min-width:0;';

    // Иконка результата
    const resultIconBox = document.createElement('div');
    resultIconBox.style.cssText =
      'width:32px;height:32px;background:rgba(10,8,5,0.8);' +
      'border:1px solid #4a3a1e;border-radius:3px;' +
      'display:flex;align-items:center;justify-content:center;flex-shrink:0;';
    var resultId = recipe.result ? (recipe.result.itemId || recipe.result.id) : (recipe.output || null);
    var iconPath = resultId && window.ItemIcons && ItemIcons.getItemIcon ? ItemIcons.getItemIcon(resultId) : null;
    if (iconPath) {
      resultIconBox.innerHTML = '<img src="' + iconPath + '" style="width:80%;height:80%;object-fit:contain;image-rendering:pixelated;">';
    } else {
      resultIconBox.innerHTML = '<span style="color:#8a7a5a;font-size:10px;">?</span>';
    }
    leftPart.appendChild(resultIconBox);

    const name = document.createElement('div');
    name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:12px;';
    name.textContent = recipe.name;
    leftPart.appendChild(name);

    header.appendChild(leftPart);

    const tier = document.createElement('div');
    tier.style.cssText = 'color:#6ab0e0;font-size:10px;';
    tier.textContent = 'Тир ' + recipe.tier;
    header.appendChild(tier);

    card.appendChild(header);

    // Материалы
    const mats = document.createElement('div');
    mats.style.cssText = 'font-size:10px;color:#8a7a5a;margin-bottom:6px;line-height:1.5;';
    var matText = [];
    recipe.materials.forEach(function(m) {
      var item = ITEMS[m.itemId];
      var have = (window.Inventory && Inventory.countItem) ? Inventory.countItem(m.itemId) : 0;
      var needQty = m.quantity;
      var enough = have >= needQty;
      var color = enough ? '#6ad06a' : '#e05555';
      matText.push('<span style="color:' + color + ';">' + (item ? item.name : m.itemId) + ' ' + have + '/' + needQty + '</span>');
    });
    mats.innerHTML = matText.join('<br>');
    card.appendChild(mats);

    // Цена
    const gold = document.createElement('div');
    gold.style.cssText = 'font-size:11px;color:#e8b84a;margin-bottom:6px;';
    gold.textContent = 'Золото: ' + recipe.gold;
    card.appendChild(gold);

    // Кнопка
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.cssText = 'width:100%;font-size:11px;padding:6px;';
    btn.textContent = 'Создать';
    btn.onclick = function() {
      var check = (window.Craft && Craft.canCraft) ? Craft.canCraft(recipe.id) : { ok: false, reason: 'Craft.js не загружен' };
      if (!check.ok) {
        Toast.bad(check.reason || 'Нельзя создать');
        return;
      }
      var result = Craft.craft(recipe.id);
      if (!result.ok) {
        Toast.bad(result.reason || 'Ошибка');
        return;
      }
      if (result.success) {
        Toast.good('Создано: ' + result.itemName);
      } else {
        Toast.bad(result.reason || 'Провал крафта');
      }
      renderBlacksmith();
    };
    card.appendChild(btn);

    panel.appendChild(card);
  });

  screen.appendChild(panel);
}

// ============================================================
// ВКЛАДКА "ЗАТОЧКА"
// ============================================================

function renderEnhanceTab(screen) {
  const panel = document.createElement('div');
  panel.className = 'panel';

  const h2 = document.createElement('h2');
  h2.textContent = 'Заточка экипировки';
  panel.appendChild(h2);

  if (!window.Craft || !Craft.ENHANCE_SLOTS) {
    panel.innerHTML += '<p style="color:#e05555;">Craft.js не загружен</p>';
    screen.appendChild(panel);
    return;
  }

  const info = document.createElement('p');
  info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:8px;';
  info.textContent = 'Тапни по слоту, чтобы заточить. Уровни +0 до +16. Стоимость растёт.';
  panel.appendChild(info);

  Craft.ENHANCE_SLOTS.forEach(function(slotName) {
    const eq = (window.Inventory && Inventory.getEquippedItem) ? Inventory.getEquippedItem(slotName) : null;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:10px;margin-bottom:8px;' + (eq ? 'cursor:pointer;' : 'opacity:0.5;');

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;';

    const name = document.createElement('div');
    name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:12px;';
    if (eq) {
      name.textContent = eq.item.name + (eq.enhancement > 0 ? ' +' + eq.enhancement : '');
    } else {
      name.textContent = 'Слот: ' + slotName;
    }
    header.appendChild(name);

    const slotLabel = document.createElement('div');
    slotLabel.style.cssText = 'color:#6ab0e0;font-size:10px;';
    slotLabel.textContent = slotName;
    header.appendChild(slotLabel);

    card.appendChild(header);

    if (eq) {
      var check = (window.Craft && Craft.canEnhance) ? Craft.canEnhance(slotName) : { ok: false, reason: 'Craft недоступен' };
      var subInfo = document.createElement('div');
      subInfo.style.cssText = 'font-size:10px;color:#8a7a5a;margin-bottom:4px;';

      if (check.ok) {
        var tier = Craft.getEnhancementTier(eq.enhancement || 0);
        var successPct = Math.round(tier.success * 100);
        subInfo.innerHTML =
          'Текущий: +' + (eq.enhancement || 0) + '<br>' +
          'Стоимость: ' + check.cost + ' з.<br>' +
          'Шанс успеха: ' + successPct + '%<br>' +
          'При провале: ' + (tier.fail === 'none' ? 'ничего' :
                              tier.fail === 'minus1' ? 'заточка -1' :
                              tier.fail === 'reset' ? 'сброс в 0' :
                              tier.fail === 'destroy' ? 'ПРЕДМЕТ СЛОМАЕТСЯ' : '?');
      } else {
        subInfo.innerHTML = '<span style="color:#e05555;">' + check.reason + '</span>';
      }
      card.appendChild(subInfo);

      card.onclick = function() {
        var r = Craft.enhance(slotName);
        if (!r.ok) {
          Toast.bad(r.reason || 'Ошибка');
          return;
        }
        if (r.success) {
          Toast.good(r.message);
        } else {
          Toast.bad(r.message);
        }
        renderBlacksmith();
      };
    }

    panel.appendChild(card);
  });

  screen.appendChild(panel);
}

// ============================================================
// ВКЛАДКА "АУГМЕНТАЦИЯ"
// ============================================================

function renderAugmentTab(screen) {
  const panel = document.createElement('div');
  panel.className = 'panel';

  const h2 = document.createElement('h2');
  h2.textContent = 'Вставка камней';
  panel.appendChild(h2);

  if (!window.Craft || !Craft.ENHANCE_SLOTS) {
    panel.innerHTML += '<p style="color:#e05555;">Craft.js не загружен</p>';
    screen.appendChild(panel);
    return;
  }

  const info = document.createElement('p');
  info.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:8px;';
  info.textContent = 'Вставь камни в экипировку. Максимум 3 камня. Извлечение с риском.';
  panel.appendChild(info);

  Craft.ENHANCE_SLOTS.forEach(function(slotName) {
    const eq = (window.Inventory && Inventory.getEquippedItem) ? Inventory.getEquippedItem(slotName) : null;
    if (!eq) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'padding:10px;margin-bottom:8px;';

    const name = document.createElement('div');
    name.style.cssText = 'color:#e8b84a;font-weight:bold;font-size:12px;margin-bottom:6px;';
    name.textContent = eq.item.name;
    card.appendChild(name);

    // Камни
    const gems = eq.gems || [null, null, null];
    const gemRow = document.createElement('div');
    gemRow.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;';

    gems.forEach(function(gemId, i) {
      const slot = document.createElement('div');
      slot.style.cssText =
        'flex:1;height:40px;background:#0a0805;border:2px solid ' +
        (gemId ? '#8a6a2a' : '#3a2a18') + ';border-radius:4px;' +
        'display:flex;align-items:center;justify-content:center;' +
        'font-size:10px;color:' + (gemId ? '#e8b84a' : '#4a3a1e') + ';';
      slot.textContent = gemId
        ? ((window.GEMS && GEMS[gemId]) ? GEMS[gemId].name.split(' ')[0] : '?')
        : '·';
      if (gemId) {
        slot.onclick = function() {
          var r = Craft.extractGem(slotName, i);
          if (!r.ok) {
            Toast.bad(r.reason || 'Ошибка');
            return;
          }
          Toast.info(r.message || 'Извлечено');
          renderBlacksmith();
        };
      }
      gemRow.appendChild(slot);
    });

    card.appendChild(gemRow);

    // Список камней в сумке
    var gemList = [];
    if (window.GEMS) {
      Object.keys(GEMS).forEach(function(gid) {
        var have = (window.Inventory && Inventory.countItem) ? Inventory.countItem(gid) : 0;
        if (have > 0) gemList.push({ id: gid, gem: GEMS[gid], count: have });
      });
    }

    if (gemList.length === 0) {
      var noGems = document.createElement('p');
      noGems.style.cssText = 'font-size:10px;color:#8a7a5a;font-style:italic;';
      noGems.textContent = 'Нет камней в сумке';
      card.appendChild(noGems);
    } else {
      var gemPickRow = document.createElement('div');
      gemPickRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;';

      gemList.forEach(function(g) {
        var gbtn = document.createElement('button');
        gbtn.className = 'btn';
        gbtn.style.cssText = 'font-size:10px;padding:4px 6px;';
        gbtn.textContent = g.gem.name + ' (' + g.count + ')';
        gbtn.onclick = function() {
          var free = Craft.firstFreeGemSlot(slotName);
          if (free === -1) {
            Toast.bad('Все слоты заняты');
            return;
          }
          var r = Craft.insertGem(slotName, g.id);
          if (!r.ok) {
            Toast.bad(r.reason || 'Ошибка');
            return;
          }
          Toast.good('Вставлено: ' + g.gem.name);
          renderBlacksmith();
        };
        gemPickRow.appendChild(gbtn);
      });

      card.appendChild(gemPickRow);
    }

    panel.appendChild(card);
  });

  screen.appendChild(panel);
}

// ============================================================
// ЭКСПОРТ (дополнение)
// ============================================================



function openShop(zoneId) {
  if (window.ShopUI && ShopUI.openShop) {
    ShopUI.openShop(zoneId);
  } else {
    Toast.bad('ShopUI не загружен');
  }
}

function openTavern(zoneId) {
  Toast.info('Таверна — в разработке (позже)');
}

function openBoard(zoneId) {
  if (window.BoardUI && BoardUI.openBoard) {
    BoardUI.openBoard(zoneId);
  } else {
    Toast.bad('BoardUI не загружен');
  }
}

window.CityUI = {
  openCity: openCity,
  openBuilding: openBuilding,
  openBlacksmith: openBlacksmith,
  openShop: openShop,
  openTavern: openTavern,
  openBoard: openBoard,
  renderBlacksmith: renderBlacksmith,
  renderCraftTab: renderCraftTab,
  renderEnhanceTab: renderEnhanceTab,
  renderAugmentTab: renderAugmentTab
};
