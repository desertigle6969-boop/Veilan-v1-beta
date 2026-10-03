// ============================================================
// ВЕЙЛАН — ВКЛАДКА "СУМКА"
// Сетка 30 слотов, карточка предмета, надеть/использовать/выбросить
// ============================================================

(function() {
  if (!window.Inventory) {
    console.warn('[inventory-ui] Inventory не загружен');
    return;
  }

  var MAX_SLOTS = 30;

  // Цвета по редкости
  var RARITY_COLORS = {
    common:    '#8a7a5a',
    uncommon:  '#5a9a2a',
    rare:      '#3a88ff',
    sublime:   '#3ad0c8',   // бирюзовый — Vesper
    epic:      '#a04ad0',
    ascendant: '#d4a04a',   // кроваво-золотой — Draconic
    legendary: '#e8b84a'
  };

  function getRarityColor(item) {
    return RARITY_COLORS[item.rarity] || RARITY_COLORS.common;
  }

  // Получить путь к иконке предмета
  function getItemIcon(item) {
    if (!item) return null;
    if (window.ItemIcons && ItemIcons.getItemIcon) {
      return ItemIcons.getItemIcon(item.id);
    }
    return null;
  }

  // ============================================================
  // ГЛАВНЫЙ РЕНДЕР ВКЛАДКИ
  // ============================================================

  function renderInventoryTab(screen) {
    var hero = STATE && STATE.hero;
    if (!hero) return;

    var inv = Inventory.getInventoryList();
    var free = MAX_SLOTS - inv.length;

    // === Верхняя строка ===
    var top = document.createElement('div');
    top.className = 'panel';
    top.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px 12px;';
    top.innerHTML =
      '<div style="font-size:12px;color:#8a7a5a;">Занято: <span style="color:#e8b84a;">' + inv.length + ' / ' + MAX_SLOTS + '</span></div>' +
      '<div style="font-size:12px;color:#8a7a5a;">Золото: <span style="color:#e8b84a;">' + hero.gold + '</span></div>';
    screen.appendChild(top);

    // === Сетка 5×6 ===
    var grid = document.createElement('div');
    grid.className = 'panel';
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(5,56px);gap:4px;padding:6px;justify-content:center;';

    for (var i = 0; i < MAX_SLOTS; i++) {
      grid.appendChild(renderSlot(inv[i], i));
    }
    screen.appendChild(grid);
  }

  // ============================================================
  // ОДИН СЛОТ
  // ============================================================

  function renderSlot(slotData, index) {
    var cell = document.createElement('div');
    cell.style.cssText =
      'width:56px;height:56px;background:rgba(10,8,5,0.8);' +
      'border:1px solid #2a1f14;border-radius:3px;' +
      'display:flex;align-items:center;justify-content:center;' +
      'position:relative;overflow:hidden;cursor:pointer;';

    if (!slotData || !slotData.item) {
      // Пустой слот
      cell.style.opacity = '0.4';
      return cell;
    }

    var item = slotData.item;
    var color = getRarityColor(item);

    // Рамка по редкости
    cell.style.borderColor = color;
    cell.style.boxShadow = 'inset 0 0 6px ' + color + '44';

    // Иконка (PNG или заглушка)
    var icon = document.createElement('div');
    icon.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;';
    var iconPath = getItemIcon(item);
    if (iconPath) {
      var img = document.createElement('img');
      img.src = iconPath;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;image-rendering:pixelated;display:block;';
      img.onerror = function() {
        icon.innerHTML = '<span style="font-size:20px;color:' + color + ';">?</span>';
      };
      icon.appendChild(img);
    } else {
      // Заглушка — первая буква названия
      icon.innerHTML = '<span style="font-size:18px;color:' + color + ';font-weight:bold;">' +
        (item.name ? item.name.charAt(0) : '?') + '</span>';
    }
    cell.appendChild(icon);

    // Количество
    if (slotData.quantity > 1) {
      var qty = document.createElement('div');
      qty.style.cssText =
        'position:absolute;bottom:1px;right:2px;font-size:10px;' +
        'color:#fff;text-shadow:0 0 2px #000,0 0 3px #000;font-weight:bold;';
      qty.textContent = slotData.quantity;
      cell.appendChild(qty);
    }

    // Заточка
    if (slotData.enhancement > 0) {
      var enh = document.createElement('div');
      enh.style.cssText =
        'position:absolute;top:1px;left:2px;font-size:9px;' +
        'color:#e8b84a;text-shadow:0 0 2px #000;font-weight:bold;';
      enh.textContent = '+' + slotData.enhancement;
      cell.appendChild(enh);
    }

    // Тап — карточка
    cell.onclick = function() {
      openItemCard(slotData);
    };

    return cell;
  }

  // ============================================================
  // КАРТОЧКА ПРЕДМЕТА
  // ============================================================

  function openItemCard(slotData) {
    var item = slotData.item;
    if (!item) return;
    var color = getRarityColor(item);

    var container = document.createElement('div');

    // Иконка + название
    var header = document.createElement('div');
    header.style.cssText = 'text-align:center;margin-bottom:10px;';

    var iconBox = document.createElement('div');
    iconBox.style.cssText =
      'width:80px;height:80px;margin:0 auto 8px;' +
      'background:rgba(10,8,5,0.8);border:2px solid ' + color + ';' +
      'border-radius:4px;display:flex;align-items:center;justify-content:center;';
    var cardIconPath = getItemIcon(item);
    if (cardIconPath) {
      iconBox.innerHTML = '<img src="' + cardIconPath + '" style="width:80%;height:80%;object-fit:contain;image-rendering:pixelated;">';
    } else {
      iconBox.innerHTML = '<span style="font-size:32px;color:' + color + ';">?</span>';
    }
    header.appendChild(iconBox);

    var nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:15px;color:' + color + ';font-weight:bold;letter-spacing:1px;';
    nameEl.textContent = item.name + (slotData.enhancement > 0 ? ' +' + slotData.enhancement : '');
    header.appendChild(nameEl);

    var typeEl = document.createElement('div');
    typeEl.style.cssText = 'font-size:11px;color:#8a7a5a;margin-top:4px;';
    typeEl.textContent = (item.type || '?') + (item.tier ? ' / Тир ' + item.tier : '');
    header.appendChild(typeEl);

    if (slotData.quantity > 1) {
      var qEl = document.createElement('div');
      qEl.style.cssText = 'font-size:11px;color:#d4c8a8;margin-top:2px;';
      qEl.textContent = 'Количество: ' + slotData.quantity;
      header.appendChild(qEl);
    }

    container.appendChild(header);

    // Статы
    if (item.stats) {
      var statsBox = document.createElement('div');
      statsBox.style.cssText =
        'background:rgba(0,0,0,0.3);border:1px solid #2a1f14;' +
        'border-radius:3px;padding:6px 8px;margin-bottom:10px;font-size:12px;';
      var statNames = {
        atk: 'АТК', def: 'DEF', mag: 'MAG', mdef: 'MDEF',
        str: 'СИЛ', dex: 'ЛОВ', con: 'ТЕЛ', int: 'РАЗ', wit: 'ВОЛ', men: 'ДУХ',
        hp: 'HP', mp: 'MP', sp: 'SP', spd: 'SPD', crit: 'CRIT', eva: 'EVA', acc: 'ACC'
      };
      var statLines = [];
      for (var k in item.stats) {
        var v = item.stats[k];
        if (v) statLines.push('<div style="display:flex;justify-content:space-between;"><span style="color:#8a7a5a;">' + (statNames[k] || k) + '</span><span style="color:#e8b84a;">+' + v + '</span></div>');
      }
      statsBox.innerHTML = statLines.join('') || '<div style="color:#8a7a5a;">Нет статов</div>';
      container.appendChild(statsBox);
    }

    // Описание
    if (item.desc) {
      var descEl = document.createElement('div');
      descEl.style.cssText = 'font-size:11px;color:#a89878;line-height:1.5;margin-bottom:10px;font-style:italic;';
      descEl.textContent = item.desc;
      container.appendChild(descEl);
    }

    // Прочность
    if (slotData.durability !== undefined && slotData.durability !== null) {
      var durEl = document.createElement('div');
      durEl.style.cssText = 'font-size:11px;color:#8a7a5a;margin-bottom:10px;';
      durEl.textContent = 'Прочность: ' + slotData.durability;
      container.appendChild(durEl);
    }

    // Кнопки
    var buttons = [];

    // Надеть (если экипировка)
    var isEquip = ['weapon','armor','helmet','chest','legs','cloak','ring','amulet','belt'].indexOf(item.type) !== -1
                || item.slot;
    if (isEquip) {
      buttons.push({
        text: 'Надеть',
        type: 'good',
        onClick: function() {
          var r = Inventory.equipItem(slotData.index);
          if (r && r.ok === false) {
            Toast.bad(r.reason || 'Не удалось надеть');
            return false;
          }
          Toast.good('Надето: ' + item.name);
          Save.saveState();
          UI.tab('inv');
        }
      });
    }

    // Использовать (расходник)
    if (item.type === 'consumable') {
      buttons.push({
        text: 'Использовать',
        type: 'good',
        onClick: function() {
          var r = Inventory.useItem(slotData.itemId);
          if (r && r.ok === false) {
            Toast.bad(r.reason || 'Не удалось использовать');
            return false;
          }
          Toast.good('Использовано: ' + item.name);
          Save.saveState();
          UI.tab('inv');
        }
      });
    }

    // Выбросить
    buttons.push({
      text: 'Выбросить',
      type: 'danger',
      onClick: function() {
        var r = Inventory.removeByUid(slotData.uid, slotData.quantity || 1);
        Toast.info('Выброшено: ' + item.name);
        Save.saveState();
        UI.tab('inv');
      }
    });

    buttons.push({ text: 'Закрыть', type: 'default' });

    Modal.open({
      title: null,
      content: container,
      buttons: buttons
    });
  }

  // ============================================================
  // ЭКСПОРТ
  // ============================================================

  window.InventoryUI = {
    renderInventoryTab: renderInventoryTab
  };

  console.log('[inventory-ui] загружен');
})();
