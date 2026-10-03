// ============================================================
// ВЕЙЛАН — СОХРАНЕНИЕ (единый STATE в localStorage)
// Версия 1.0 — с uid для предметов
// ============================================================

const SAVE_VERSION = 1;
const SAVE_KEY = 'veilan_save_v1';

function createEmptyState() {
  return {
    version: SAVE_VERSION,
    timestamp: Date.now(),

    hero: null,

    // Счётчик уникальных id предметов
    _nextUid: 1,

    // ВАЖНО: equipped хранит НЕ itemId, а uid предмета из inventory
    equipped: {
      weapon: null,
      chest: null,
      helmet: null,
      legs: null,
      cloak: null,
      ring1: null,
      ring2: null,
      amulet: null,
      belt: null
    },

    // Формат предмета:
    // { uid, itemId, quantity, durability?, enhancement?, gems? }
    inventory: [],

    shards: [],

    quests: {},

    world: {
      unlockedZones: ['camp'],
      visitedSubs: ['camp:ash'],
      killedBosses: [],
      eventsDone: []
    },

    party: {
      mercs: []
    },

    stats: {
      playtimeSec: 0,
      mobsKilled: 0,
      bossesKilled: 0,
      deaths: 0,
      goldEarned: 0,
      goldSpent: 0,
      itemsFound: 0,
      itemsSold: 0,
      // PvP
      pvpPoints: 0,
      pvpKills: { bronze: 0, silver: 0, gold: 0, platinum: 0, legend: 0 },
      pvpWins: 0,
      pvpLosses: 0
    },

    settings: {
      sound: true,
      animSpeed: 1.0,
      autoSaveIntervalSec: 30
    }
  };
}

// ============================================================
// ГЕНЕРАЦИЯ UID
// ============================================================

function getNextUid() {
  if (!window.STATE) return null;
  if (window.STATE._nextUid === undefined) window.STATE._nextUid = 1;
  const uid = 'it_' + window.STATE._nextUid;
  window.STATE._nextUid++;
  return uid;
}

// ============================================================
// СОХРАНЕНИЕ / ЗАГРУЗКА
// ============================================================

function saveState() {
  try {
    if (!window.STATE) return false;
    window.STATE.timestamp = Date.now();
    window.STATE.version = SAVE_VERSION;
    localStorage.setItem(SAVE_KEY, JSON.stringify(window.STATE));
    return true;
  } catch (e) {
    console.error('[save] ошибка сохранения:', e);
    return false;
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return migrateState(JSON.parse(raw));
  } catch (e) {
    console.error('[save] ошибка загрузки:', e);
    return null;
  }
}

function migrateState(state) {
  if (!state || typeof state !== 'object') return createEmptyState();

  var empty = createEmptyState();

  // Рекурсивное дополнение: если в state нет поля из empty — берём из empty
  function deepFill(target, template) {
    if (target === null || target === undefined) return template;
    if (Array.isArray(template)) {
      return Array.isArray(target) ? target : template;
    }
    if (typeof template === 'object') {
      if (typeof target !== 'object' || Array.isArray(target)) return template;
      for (var key in template) {
        if (!Object.prototype.hasOwnProperty.call(template, key)) continue;
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = JSON.parse(JSON.stringify(template[key]));
        } else {
          target[key] = deepFill(target[key], template[key]);
        }
      }
      return target;
    }
    // Примитив: если target не того типа — берём template
    if (typeof target !== typeof template) return template;
    return target;
  }

  state = deepFill(state, empty);

  // Гарантируем version и uid
  state.version = state.version || SAVE_VERSION;
  state._nextUid = state._nextUid || 1;

  // Миграция предметов — добиваем поля
  if (Array.isArray(state.inventory)) {
    state.inventory = state.inventory.map(function(item) {
      if (!item.uid) item.uid = 'it_' + (state._nextUid++);
      if (item.enhancement === undefined) item.enhancement = 0;
      if (!item.gems) item.gems = [null, null, null];
      if (item.durability === undefined && item.itemId && typeof ITEMS !== 'undefined' && ITEMS[item.itemId]) {
        var it = ITEMS[item.itemId];
        if (it.durability) item.durability = it.durability;
      }
      return item;
    });
  }

  // Миграция рас: старые 5 человеческих → human, naga → minotaur
  if (state.hero) {
    var OLD_HUMAN_RACES = ['valdorn', 'aelvin', 'drossk', 'grann', 'sirrh'];
    if (state.hero.raceId && OLD_HUMAN_RACES.indexOf(state.hero.raceId) !== -1) {
      console.log('[save] миграция расы:', state.hero.raceId, '→ human');
      state.hero.raceId = 'human';
    }
    if (state.hero.raceId === 'naga') {
      console.log('[save] миграция расы: naga → minotaur');
      state.hero.raceId = 'minotaur';
    }
  }

  // Миграция постоянных бафов героя
  if (state.hero) {
    if (!state.hero.permanent) state.hero.permanent = {};
    if (state.hero.path === undefined) state.hero.path = null;
    if (!state.hero.consumedSecrets) state.hero.consumedSecrets = {};
    if (state.hero.hp === undefined) state.hero.hp = 1;
    if (state.hero.mp === undefined) state.hero.mp = 0;
    if (state.hero.sp === undefined) state.hero.sp = 0;
    if (!Array.isArray(state.hero.skillIds)) state.hero.skillIds = [];
    if (!state.hero.skillCooldowns) state.hero.skillCooldowns = {};

    var PERM_STATS = ['str','dex','con','int','men','wit','atk','def','mag','crit','hp','mp','sp'];
    for (var pi = 0; pi < PERM_STATS.length; pi++) {
      var ps = PERM_STATS[pi];
      if (typeof state.hero.permanent[ps] !== 'number') state.hero.permanent[ps] = 0;
    }
  }

  return state;
}

function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    return true;
  } catch (e) {
    console.error('[save] ошибка удаления:', e);
    return false;
  }
}

// ============================================================
// ЭКСПОРТ / ИМПОРТ
// ============================================================

function exportSaveToText() {
  try {
    if (!window.STATE) return null;
    return btoa(unescape(encodeURIComponent(JSON.stringify(window.STATE))));
  } catch (e) {
    console.error('[save] ошибка экспорта:', e);
    return null;
  }
}

function importSaveFromText(text) {
  try {
    const json = decodeURIComponent(escape(atob(text.trim())));
    const parsed = JSON.parse(json);
    const migrated = migrateState(parsed);
    if (!migrated.hero) return false;
    window.STATE = migrated;
    saveState();
    return true;
  } catch (e) {
    console.error('[save] ошибка импорта:', e);
    return false;
  }
}

// ============================================================
// АВТОСОХРАНЕНИЕ
// ============================================================

let autoSaveTimer = null;

function startAutoSave() {
  stopAutoSave();
  const sec = (window.STATE && window.STATE.settings && window.STATE.settings.autoSaveIntervalSec) || 30;
  autoSaveTimer = setInterval(() => {
    if (window.STATE && window.STATE.hero) saveState();
  }, sec * 1000);
}

function stopAutoSave() {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
    autoSaveTimer = null;
  }
}

function hasSave() {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch (e) {
    return false;
  }
}

// ============================================================
// ЭКСПОРТ
// ============================================================

// ============================================================
// РЕГЕН ВНЕ БОЯ (HP +2 каждые 3 сек)
// ============================================================

let regenTimer = null;

function startOutOfCombatRegen() {
  stopOutOfCombatRegen();
  regenTimer = setInterval(() => {
    // В бою не регеним
    if (window.BattleUI && window.BattleUI.battle) return;
    const hero = window.STATE && window.STATE.hero;
    if (!hero) return;
    if (hero.hp === undefined || hero.maxHp === undefined) return;
    if (hero.hp <= 0) return;
    if (hero.hp >= hero.maxHp) return;
    hero.hp = Math.min(hero.maxHp, hero.hp + 2);
    // Обновить UI, если открыт
    if (window.Render && Render.refresh) Render.refresh();
  }, 3000);
}

function stopOutOfCombatRegen() {
  if (regenTimer) {
    clearInterval(regenTimer);
    regenTimer = null;
  }
}

window.Save = {
  startOutOfCombatRegen: startOutOfCombatRegen,
  stopOutOfCombatRegen: stopOutOfCombatRegen,
  createEmptyState,
  getNextUid,
  saveState,
  loadState,
  deleteSave,
  exportSaveToText,
  importSaveFromText,
  startAutoSave,
  stopAutoSave,
  hasSave,
  SAVE_KEY,
  SAVE_VERSION
};

// Автозапуск регена вне боя
setTimeout(function() { startOutOfCombatRegen(); }, 1000);
