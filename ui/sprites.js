// ============================================================
// ВЕЙЛАН — СПРАЙТЫ (текстовые плашки + PNG-загрузка)
// ============================================================

const SPRITE_COLORS = {
  hero:   { bg: '#3a2a10', border: '#e8b84a', text: '#ffd870' },
  ally:   { bg: '#1a3a20', border: '#4a8a30', text: '#8ad04a' },
  enemy:  { bg: '#3a1010', border: '#8a2a2a', text: '#e05555' },
  boss:   { bg: '#2a0a3a', border: '#a04ad0', text: '#d08aff' },
  elite:  { bg: '#3a2a10', border: '#c0903a', text: '#ffd070' },
  item:   { bg: '#1a2030', border: '#4a6080', text: '#90b0d0' }
};

// ============================================================
// ТЕКСТОВЫЙ СПРАЙТ (заглушка)
// ============================================================

function renderSprite(kind, label, size) {
  const colors = SPRITE_COLORS[kind] || SPRITE_COLORS.enemy;
  const sz = size || 'medium';
  const heights = { small: 50, medium: 100, large: 150 };
  const fonts = { small: 11, medium: 14, large: 18 };

  const el = document.createElement('div');
  el.className = 'sprite-box sprite-' + kind;
  el.style.cssText =
    'display:flex;align-items:center;justify-content:center;' +
    'height:' + heights[sz] + 'px;' +
    'background:linear-gradient(180deg,' + colors.bg + ' 0%,#0a0805 100%);' +
    'border:2px solid ' + colors.border + ';' +
    'border-radius:4px;' +
    'color:' + colors.text + ';' +
    'font-family:Georgia,serif;font-weight:bold;' +
    'font-size:' + fonts[sz] + 'px;' +
    'letter-spacing:1px;text-align:center;' +
    'text-shadow:0 0 6px rgba(0,0,0,0.9);' +
    'padding:4px;overflow:hidden;word-break:break-word;' +
    'position:relative;';

  el.textContent = label || '?';
  return el;
}

// ============================================================
// PNG-СПРАЙТЫ
// ============================================================

function renderImgSprite(path, size) {
  if (!path) return null;
  const img = document.createElement('img');
  img.src = path;
  const sz = size || 64;
  img.style.cssText =
    'width:' + sz + 'px;height:' + sz + 'px;' +
    'display:block;margin:0 auto;' +
    'image-rendering:pixelated;image-rendering:crisp-edges;' +
    'object-fit:contain;';
  img.onerror = function() {
    // Если PNG не загрузился — подменяем на текстовый
    var parent = img.parentNode;
    if (parent) {
      var fallback = renderSprite('enemy', '?', 'medium');
      parent.replaceChild(fallback, img);
    }
  };
  return img;
}

// Спрайт героя (PNG если есть, иначе текстовая плашка)
function renderHeroSprite(hero, size) {
  if (window.HeroSprites && hero) {
    const path = HeroSprites.getHeroSpritePath(hero);
    if (path) {
      const img = renderImgSprite(path, size || 96);
      if (img) {
        try { applyEnhancementGlow(img, hero); } catch (e) {}
        return img;
      }
    }
  }
  return renderSprite('hero', hero ? hero.name : 'ГЕРОЙ', 'medium');
}

// ============================================================
// СВЕЧЕНИЕ ОТ ЗАТОЧКИ (как в Lineage 2)
// ============================================================
function applyEnhancementGlow(imgEl, hero) {
  if (!imgEl || !hero || !window.Inventory) return;

  imgEl.style.filter = '';
  imgEl.style.animation = '';

  // === ОРУЖИЕ (drop-shadow вокруг) ===
  var weaponEnh = 0;
  try {
    var w = Inventory.getEquippedItem('weapon');
    if (w && w.enhancement) weaponEnh = w.enhancement;
  } catch (e) {}

  if (weaponEnh >= 1) {
    var wColor, wBlur, wPulse = false;
    if (weaponEnh <= 3)      { wColor = 'rgba(255,255,255,0.55)'; wBlur = 4; }
    else if (weaponEnh <= 6) { wColor = 'rgba(120,255,120,0.85)'; wBlur = 8; }
    else if (weaponEnh <= 9) { wColor = 'rgba(90,180,255,0.9)';   wBlur = 10; }
    else if (weaponEnh <= 12){ wColor = 'rgba(180,90,255,0.95)';  wBlur = 12; }
    else                     { wColor = 'rgba(255,80,80,0.95)';   wBlur = 14; wPulse = true; }
    imgEl.style.filter =
      'drop-shadow(0 0 ' + wBlur + 'px ' + wColor + ') ' +
      'drop-shadow(0 0 ' + (wBlur * 2) + 'px ' + wColor + ')';
    imgEl.style.transition = 'filter 0.3s';
    if (wPulse) imgEl.style.animation = 'enhanceGlowPulse 1.4s ease-in-out infinite';
  }

}


// Спрайт моба (PNG если есть путь, иначе текстовая плашка)
function renderMobSprite(mobId, mobName, size, kind) {
  if (window.MobSprites) {
    const path = MobSprites.getMobSpritePath(mobId);
    if (path) {
      const img = renderImgSprite(path, size || 96);
      if (img) return img;
    }
  }
  return renderSprite(kind || 'enemy', mobName || mobId, size || 'medium');
}

// ============================================================
// ИКОНКИ ПРЕДМЕТОВ
// ============================================================

function iconOf(item) {
  if (!item) return '?';
  const t = item.type;
  if (t === 'weapon') return 'W';
  if (t === 'armor') return 'A';
  if (t === 'accessory') return 'R';
  if (t === 'consumable') return 'P';
  if (t === 'material') return 'M';
  if (t === 'shard') return 'S';
  if (t === 'book') return 'B';
  if (t === 'gem') return 'G';
  return '?';
}

function rarityColor(rarity) {
  const r = CONFIG.rarity[rarity];
  return r ? r.color : '#a0a0a0';
}

function rarityName(rarity) {
  const r = CONFIG.rarity[rarity];
  return r ? r.name : 'Обычное';
}

// ============================================================
// ПОЛОСКИ HP / РЕЗОНАНСА
// ============================================================

function hpBar(unit, width) {
  const w = width || 100;
  const pct = Math.max(0, Math.min(100, (unit.hp / unit.maxHp) * 100));
  const color = pct > 60 ? '#5aa020' : pct > 30 ? '#c09020' : '#c03030';

  const wrap = document.createElement('div');
  wrap.style.cssText =
    'display:inline-block;width:' + w + 'px;height:14px;' +
    'background:#000;border:1px solid #4a3a1e;border-radius:2px;' +
    'position:relative;overflow:hidden;vertical-align:middle;';

  const fill = document.createElement('div');
  fill.style.cssText =
    'height:100%;width:' + pct + '%;' +
    'background:linear-gradient(180deg,' + color + ' 0%,rgba(0,0,0,0.4) 100%);' +
    'transition:width 0.3s;';
  wrap.appendChild(fill);

  const txt = document.createElement('span');
  txt.style.cssText =
    'position:absolute;inset:0;text-align:center;' +
    'font-size:10px;line-height:14px;color:#fff;' +
    'text-shadow:0 0 2px #000,0 0 3px #000;' +
    'font-weight:bold;pointer-events:none;';
  txt.textContent = Math.max(0, Math.round(unit.hp)) + ' / ' + unit.maxHp;
  wrap.appendChild(txt);

  return wrap;
}

function resonanceBar(unit, width) {
  const w = width || 100;
  const pct = Math.max(0, Math.min(100, unit.resonance || 0));
  const color = unit.resonanceReady ? '#ffd700' : '#a04ad0';

  const wrap = document.createElement('div');
  wrap.style.cssText =
    'display:inline-block;width:' + w + 'px;height:8px;' +
    'background:#000;border:1px solid #4a3a1e;border-radius:2px;' +
    'position:relative;overflow:hidden;vertical-align:middle;';

  const fill = document.createElement('div');
  fill.style.cssText =
    'height:100%;width:' + pct + '%;' +
    'background:' + color + ';transition:width 0.3s;';
  if (unit.resonanceReady) fill.style.boxShadow = '0 0 6px #ffd700';
  wrap.appendChild(fill);

  return wrap;
}

// ============================================================
// ИКОНКИ СТАТУСОВ
// ============================================================

const STATUS_ICONS = {
  burn:    { char: 'ОГ', color: '#ff5522' },
  poison:  { char: 'ЯД', color: '#88ff44' },
  bleed:   { char: 'КР', color: '#cc2233' },
  freeze:  { char: 'ЛД', color: '#66ccff' },
  stun:    { char: 'ОГ', color: '#ffdd44' },
  shock:   { char: 'ШК', color: '#44ddff' },
  silence: { char: 'НМ', color: '#aa44cc' },
  slow:    { char: 'ЗМ', color: '#66aaff' },
  blind:   { char: 'СЛ', color: '#888888' },
  regen:   { char: 'РЕ', color: '#44ff88' },
  shield:  { char: 'ЩТ', color: '#88aaff' },
  rage:    { char: 'ЯР', color: '#ff6644' },
  atk_up:  { char: 'АТ', color: '#ffaa44' },
  def_up:  { char: 'ЗЩ', color: '#aaccff' },
  atk_down:{ char: 'А-', color: '#cc4444' },
  def_down:{ char: 'З-', color: '#cc4444' }
};

function statusIcons(unit) {
  if (!unit || !unit.statuses || unit.statuses.length === 0) return null;
  const wrap = document.createElement('div');
  wrap.style.cssText =
    'display:flex;gap:2px;justify-content:center;margin-top:2px;font-size:9px;';
  for (const s of unit.statuses) {
    const el = document.createElement('span');
    el.title = s.id + ' (' + s.duration + ')';
    const info = STATUS_ICONS[s.id] || { char: '?', color: '#888' };
    el.textContent = info.char;
    el.style.cssText =
      'display:inline-block;padding:1px 3px;' +
      'background:rgba(0,0,0,0.7);' +
      'border:1px solid ' + info.color + ';' +
      'border-radius:2px;color:' + info.color + ';' +
      'font-weight:bold;letter-spacing:0.5px;';
    wrap.appendChild(el);
  }
  return wrap;
}

// ============================================================
// ЭКСПОРТ
// ============================================================

// ============================================================
// ИКОНКА ПРЕДМЕТА (PNG из sprites/icons/ или буква)
// ============================================================

function itemBadge(item, size) {
  if (!item) return null;

  const sz = size || 36;
  const color = rarityColor(item.rarity);
  const el = document.createElement('div');
  el.style.cssText =
    'display:inline-flex;align-items:center;justify-content:center;' +
    'width:' + sz + 'px;height:' + sz + 'px;' +
    'background:linear-gradient(180deg,#2e2114 0%,#1a1208 100%);' +
    'border:2px solid ' + color + ';' +
    'border-radius:3px;' +
    'position:relative;overflow:hidden;flex-shrink:0;';

  // Проверяем, есть ли PNG-иконка
  var iconPath = null;
  if (window.ItemIcons && ItemIcons.getItemIcon) {
    iconPath = ItemIcons.getItemIcon(item.id);
  }

  if (iconPath) {
    var img = document.createElement('img');
    img.src = iconPath;
    img.style.cssText =
      'width:100%;height:100%;object-fit:cover;' +
      'image-rendering:pixelated;image-rendering:crisp-edges;';
    img.onerror = function() {
      if (img.parentNode) img.parentNode.removeChild(img);
      el.textContent = iconOf(item);
      el.style.color = color;
      el.style.fontFamily = 'Georgia,serif';
      el.style.fontWeight = 'bold';
      el.style.fontSize = Math.floor(sz * 0.4) + 'px';
      el.style.textShadow = '0 0 4px rgba(0,0,0,0.9)';
    };
    el.appendChild(img);
  } else {
    el.textContent = iconOf(item);
    el.style.color = color;
    el.style.fontFamily = 'Georgia,serif';
    el.style.fontWeight = 'bold';
    el.style.fontSize = Math.floor(sz * 0.4) + 'px';
    el.style.textShadow = '0 0 4px rgba(0,0,0,0.9)';
  }

  el.title = item.name;
  return el;
}

window.Sprite = {
  renderSprite,
  itemBadge,
  renderImgSprite,
  renderHeroSprite,
  renderMobSprite,
  iconOf,
  rarityColor,
  rarityName,
  hpBar,
  resonanceBar,
  statusIcons,
  STATUS_ICONS
};
