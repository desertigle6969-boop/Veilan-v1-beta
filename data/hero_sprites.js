// ============================================================
// ВЕЙЛАН — КАРТА СПРАЙТОВ ГЕРОЯ
// 4 категории брони × 8 тиров = 32 спрайта
// Категории: light (ткань), medium (кожа), heavy (тяжёлая), veryheavy (эпик)
// Тиры: t1..t6 (обычные), t7 (уники Sanguine/Vesper/Dynasty), t8 (Draconic)
// ============================================================

const HERO_SPRITE_ASSIGN = {
  light: {
    t1: 23, t2: 28, t3: 2,  t4: 16, t5: 8,  t6: 11, t7: 36, t8: 13
  },
  medium: {
    t1: 23, t2: 18, t3: 10, t4: 17, t5: 26, t6: 27, t7: 31, t8: 30
  },
  heavy: {
    t1: 10, t2: 8,  t3: 11, t4: 13, t5: 16, t6: 17, t7: 19, t8: 20
  },
  veryheavy: {
    t1: 22, t2: 34, t3: 35, t4: 36, t5: 4,  t6: 32, t7: 29, t8: 37
  }
};

// Определить категорию брони по tier (1..6) или по уникальности
function getArmorCategory(tier, isUnique) {
  if (isUnique) return 'veryheavy';
  if (tier <= 2) return 'light';
  if (tier <= 4) return 'medium';
  if (tier === 5) return 'heavy';
  return 'veryheavy';
}

// Определить номер спрайта: категория + тир
function getSpriteNumber(category, tier, isDraconic) {
  var cat = HERO_SPRITE_ASSIGN[category];
  if (!cat) return null;
  if (isDraconic) return cat.t8;
  if (tier > 6) return cat.t7;
  return cat['t' + tier] || cat.t1;
}

// Главная функция: путь к спрайту героя
function getHeroSpritePath(hero) {
  if (!hero) return null;

  var tier = 1;
  var isUnique = false;
  var isDraconic = false;

  if (window.Inventory) {
    var eq = Inventory.getEquippedItem('chest');
    if (eq && eq.item) {
      tier = eq.item.tier || 1;
      if (eq.item.set) isUnique = true;
      if (eq.item.set === 'draconic') isDraconic = true;
    }
  }

  var category = getArmorCategory(tier, isUnique);

  // === РАСОВЫЕ СПРАЙТЫ (орки, бездушные) ===
  var raceId = hero.raceId;
  if (raceId === 'orc') {
    var orcTier = Math.max(1, Math.min(8, tier));
    return 'sprites/units/heroes_orc_new/orc_t' + orcTier + '.png';
  }
  if (raceId === 'soulless') {
    var slTier = Math.max(1, Math.min(8, tier));
    return 'sprites/units/heroes_soulless_new/soulless_t' + slTier + '.png';
  }
  if (raceId === 'minotaur') {
    var minTier = Math.max(1, Math.min(8, tier));
    return 'sprites/units/heroes_minotaur_new/minotaur_t' + minTier + '.png';
  }

  // НОВЫЕ спрайты (обычная броня — не уники)
  if (!isUnique && !isDraconic) {
    var cl = Math.max(1, Math.min(8, tier));
    if (category === 'light')  return 'sprites/units/heroes_light_new/light_t' + cl + '.png';
    if (category === 'medium') return 'sprites/units/heroes_medium_new/medium_t' + cl + '.png';
    if (category === 'heavy')  return 'sprites/units/heroes_heavy_new/heavy_t' + cl + '.png';
  }

  // === НОВЫЕ СПРАЙТЫ УНИКОВ (veryheavy по сетам) ===
  if (isUnique && eq && eq.item) {
    var setId = eq.item.set;
    var UNIQUE_SETS = ['sanguine', 'apocalypse', 'void', 'draconic'];
    if (setId && UNIQUE_SETS.indexOf(setId) !== -1) {
      return 'sprites/units/heroes_veryheavy_new/' + setId + '.png';
    }
  }

  // СТАРЫЕ спрайты (fallback, если сет не из списка)
  var num = getSpriteNumber(category, tier, isDraconic);
  if (!num) return null;

  var numStr = String(num).padStart(3, '0');
  return 'sprites/units/heroes_' + category + '/heroes_' + category + '_' + numStr + '.png';
}

// Старые функции — для совместимости
function getHeroSpriteTier(hero) {
  if (!hero || !window.Inventory) return 'light';
  var eq = Inventory.getEquippedItem('chest');
  if (!eq || !eq.item) return 'light';
  var tier = eq.item.tier || 1;
  var isUnique = !!eq.item.set;
  return getArmorCategory(tier, isUnique);
}

function getHeroSpriteCategory(tier, isUnique) {
  return getArmorCategory(tier, isUnique);
}

window.HeroSprites = {
  HERO_SPRITE_ASSIGN: HERO_SPRITE_ASSIGN,
  getHeroSpritePath: getHeroSpritePath,
  getHeroSpriteTier: getHeroSpriteTier,
  getHeroSpriteCategory: getHeroSpriteCategory,
  getSpriteNumber: getSpriteNumber
};

console.log('[hero_sprites] загружен (32 спрайта)');
