// ============================================================
// ВЕЙЛАН — ОБЪЕДИНЕНИЕ ЗОН (части 1 и 2)
// ============================================================

const ZONES = Object.assign({}, ZONES_PART1, ZONES_PART2);

// ============================================================
// ФУНКЦИИ РАБОТЫ С ЗОНАМИ
// ============================================================

function getZone(id) {
  return ZONES[id] || null;
}

function getSublocation(zoneId, subId) {
  const z = ZONES[zoneId];
  if (!z) return null;
  return z.sublocations.find(s => s.id === subId) || null;
}

function getAllZones() {
  return Object.values(ZONES);
}

function getUnlockedZones() {
  return Object.values(ZONES).filter(z => z.unlocked);
}

// Разблокировка зоны (вызывается при победе над боссом)
function unlockZone(zoneId) {
  const z = ZONES[zoneId];
  if (!z) return false;
  if (z.unlocked) return false;
  z.unlocked = true;

  // Синхронизация со STATE
  if (window.STATE && window.STATE.world) {
    if (!window.STATE.world.unlockedZones.includes(zoneId)) {
      window.STATE.world.unlockedZones.push(zoneId);
    }
  }
  return true;
}

// Проверка: разблокирована ли зона (по STATE, не по объекту)
function isZoneUnlocked(zoneId) {
  const z = ZONES[zoneId];
  if (!z) return false;
  if (z.unlocked) return true;
  if (!window.STATE || !window.STATE.world) return false;
  return window.STATE.world.unlockedZones.includes(zoneId);
}

// Проверка: посещена ли подлокация
function isSubVisited(zoneId, subId) {
  if (!window.STATE || !window.STATE.world) return false;
  const key = zoneId + ':' + subId;
  return window.STATE.world.visitedSubs.includes(key);
}

// Отметить подлокацию как посещённую
function markSubVisited(zoneId, subId) {
  if (!window.STATE || !window.STATE.world) return;
  const key = zoneId + ':' + subId;
  if (!window.STATE.world.visitedSubs.includes(key)) {
    window.STATE.world.visitedSubs.push(key);
  }
}

// Проверка: убит ли босс зоны
function isBossKilled(bossId) {
  if (!window.STATE || !window.STATE.world) return false;
  return window.STATE.world.killedBosses.includes(bossId);
}

// ============================================================
// КАРТА РАЗБЛОКИРОВКИ (какой босс открывает какую зону)
// ============================================================

const ZONE_UNLOCK_MAP = {
  forest:    'bandit_leader',
  mines:     'treant_fallen',
  ruins:     'golem_ancient',
  temple:    'king_olden',
  peaks:     'leviathan_young',
  forges:    'wyrm_frost',
  swamp:     'forge_titan',
  bridge:    'mora_avatar',
  rift:      'storm_lord',
  fortress:  'devourer',
  heart:     'turn_avatar'
};

// Проверка: разблокируется ли зона по текущему STATE
function checkZoneUnlock(zoneId) {
  const neededBoss = ZONE_UNLOCK_MAP[zoneId];
  if (!neededBoss) return false;
  return isBossKilled(neededBoss);
}

// Автоматическая разблокировка всех зон, чьи боссы убиты
function autoUnlockZones() {
  let unlocked = [];
  for (const zoneId in ZONE_UNLOCK_MAP) {
    if (!isZoneUnlocked(zoneId) && checkZoneUnlock(zoneId)) {
      unlockZone(zoneId);
      unlocked.push(zoneId);
    }
  }
  return unlocked;
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.Zone = {
  getZone,
  getSublocation,
  getAllZones,
  getUnlockedZones,
  unlockZone,
  isZoneUnlocked,
  isSubVisited,
  markSubVisited,
  isBossKilled,
  checkZoneUnlock,
  autoUnlockZones,
  ZONE_UNLOCK_MAP
};
