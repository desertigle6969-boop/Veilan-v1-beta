// ============================================================
// ВЕЙЛАН — ВРАГИ-ПК (симуляция игроков)
// ============================================================

const PVP_NAMES = [
  'Voldrik', 'Selena', 'Kharn', 'Ingrid', 'Askold',
  'Helga', 'Torvald', 'Sigrun', 'Bjorn', 'Astrid',
  'Ragnar', 'Freya', 'Olaf', 'Ingvar', 'Svanhild',
  'Brand', 'Hrodgar', 'Gudrun', 'Eyrik', 'Skadi',
  'Leif', 'Tyra', 'Hakon', 'Aslaug', 'Sigurd',
  'Hilda', 'Morgan', 'Isolde', 'Tristan', 'Vivien'
];

const PVP_TITLES = [
  '', '', '', '',
  'the Bold', 'the Silent', 'the Swift', 'the Cruel',
  'the Wise', 'the Lost', 'the Mad', 'the Cold'
];

function generatePvPName() {
  const name = PVP_NAMES[Math.floor(Math.random() * PVP_NAMES.length)];
  const title = PVP_TITLES[Math.floor(Math.random() * PVP_TITLES.length)];
  return title ? name + ' ' + title : name;
}

// ============================================================
// РАНГИ
// ============================================================

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Выбор ранга врага по зоне
function rollEnemyRank(zoneId) {
  const zoneTable = CONFIG.pvp.zoneRanks[zoneId];
  if (!zoneTable) return 'bronze';

  // Собираем пул с весами
  const pool = [];
  for (const rank in zoneTable) {
    const weight = zoneTable[rank];
    for (let i = 0; i < weight; i++) pool.push(rank);
  }

  if (pool.length === 0) return 'bronze';
  return pickRandom(pool);
}

// Получить объект ранга врага (с множителями)
function getEnemyRankData(rankId) {
  const mult = CONFIG.pvp.rankStatMult[rankId] || CONFIG.pvp.rankStatMult.bronze;
  const goldMult = CONFIG.pvp.goldMult[rankId] || 2.0;
  return { id: rankId, mult: mult, goldMult: goldMult };
}

// Ранг игрока по очкам
function getPlayerRank(points) {
  const ranks = CONFIG.pvp.playerRanks;
  let result = ranks[0];
  for (const r of ranks) {
    if (points >= r.minPoints) result = r;
  }
  return result;
}

// Бонус к статам от PvP-ранга игрока
function getPlayerStatBonus() {
  if (!window.STATE || !window.STATE.stats) return 0;
  const points = window.STATE.stats.pvpPoints || 0;
  const rank = getPlayerRank(points);
  return rank.statBonus;
}

// ============================================================
// ГЕНЕРАЦИЯ ПК
// ============================================================

function generatePvPHero(heroLevel, zoneId) {
  const level = Math.max(1, heroLevel);
  const rankId = rollEnemyRank(zoneId);
  const rankData = getEnemyRankData(rankId);

  // Случайная раса (без скрытых) и класс (совместимый с расой)
  const raceIds = Object.keys(RACES).filter(function(id) {
    return !RACES[id].hidden;
  });
  const raceId = pickRandom(raceIds);
  const race = RACES[raceId];

  const classIds = Object.keys(CLASSES).filter(function(id) {
    var c = CLASSES[id];
    if (!c.raceReq || c.raceReq.length === 0) return true;
    return c.raceReq.indexOf(raceId) !== -1;
  });
  const classId = pickRandom(classIds);
  const cls = CLASSES[classId];

  const skillIds = (cls.skills || []).slice();

  // Базовые статы от расы+класса
  function stat(name) {
    const rs = (race.startingStats && race.startingStats[name]) || 0;
    const rg = (race.statGrowth && race.statGrowth[name]) || 0;
    const cb = (cls.baseStats && cls.baseStats[name]) || 0;
    const cg = (cls.statGrowth && cls.statGrowth[name]) || 0;
    return Math.floor(rs + rg * (level - 1) + cb + cg * (level - 1));
  }

  const str = stat('str');
  const dex = stat('dex');
  const con = stat('con');
  const int = stat('int');
  const wit = stat('wit');
  const men = stat('men');

  const S = CONFIG.stats;
  const M = rankData.mult;

  // HP / MP
  const hpMult = (race.bonuses && race.bonuses.hpMult) || 1;
  const mpMult = (race.bonuses && race.bonuses.mpMult) || 1;

  const baseHp = (S.hpBase + con * S.hpPerCon + level * S.hpPerLevel) * hpMult;
  const baseMp = (S.mpBase + int * S.mpPerInt + level * S.mpPerLevel) * mpMult;

  const maxHp = Math.floor(baseHp * M.hp);
  const maxMp = Math.floor(baseMp);
  const maxSp = Math.floor(S.spBase + con * S.spPerCon + level * 2);

  // Производные (с бонусами класса и ранга)
  const clsAtkMult = (cls.classBonus && cls.classBonus.atkMult) || 1;
  const clsMagMult = (cls.classBonus && cls.classBonus.magMult) || 1;
  const clsDefMult = (cls.classBonus && cls.classBonus.defMult) || 1;
  const raceAtkMult = (race.bonuses && race.bonuses.atkMult) || 1;
  const raceMagMult = (race.bonuses && race.bonuses.magMult) || 1;
  const raceDefMult = (race.bonuses && race.bonuses.defMult) || 1;

  const atk = Math.floor(str * S.atkPerStr * clsAtkMult * raceAtkMult * M.atk);
  const mag = Math.floor(int * S.magPerInt * clsMagMult * raceMagMult * M.atk);
  const def = Math.floor(con * S.defPerCon * clsDefMult * raceDefMult * M.def);
  const mdef = Math.floor(men * S.mdefPerMen * clsDefMult * raceDefMult * M.def);
  const spd = S.spdBase + Math.floor(dex * S.spdPerDex);
  const crit = S.critBase + Math.floor(wit * S.critPerWit);
  const eva = Math.floor(dex * CONFIG.combat.evaPerDex);

  return {
    id: 'pvp_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    name: generatePvPName(),
    raceId, classId,
    raceName: race.name,
    className: cls.name,
    level: level,
    rankId: rankId,
    rankMult: M,
    hp: maxHp, maxHp: maxHp,
    mp: maxMp, maxMp: maxMp,
    sp: maxSp, maxSp: maxSp,
    atk, mag, def, mdef, spd, crit, eva,
    acc: 100,
    skillIds: skillIds
  };
}

// ============================================================
// ЮНИТ ДЛЯ БОЯ
// ============================================================

function createPvPUnit(pvpData) {
  const expMult = CONFIG.pvp.expMult || 2.5;
  const goldMult = pvpData.rankMult && pvpData.rankMult.goldMult
    ? pvpData.rankMult.goldMult
    : (CONFIG.pvp.goldMult[pvpData.rankId] || 2.0);

  return {
    unitId: 'enemy_' + pvpData.id,
    isEnemy: true,
    isPvP: true,
    isBoss: false,
    isElite: pvpData.rankId === 'platinum' || pvpData.rankId === 'legend',
    name: pvpData.name,
    sprite: 'PVP',
    level: pvpData.level,

    hp: pvpData.hp, maxHp: pvpData.maxHp,
    mp: pvpData.mp, maxMp: pvpData.maxMp,
    sp: pvpData.sp, maxSp: pvpData.maxSp,

    atk: pvpData.atk,
    mag: pvpData.mag,
    def: pvpData.def,
    mdef: pvpData.mdef,
    spd: pvpData.spd,
    crit: pvpData.crit,
    eva: pvpData.eva,
    acc: pvpData.acc || 100,

    skillIds: pvpData.skillIds || [],

    exp: Math.floor((15 + pvpData.level * 8) * expMult),
    gold: Math.floor((3 + pvpData.level * 1.2) * goldMult),

    loot: generatePvPLoot(pvpData.level, pvpData.rankId),
    aiProfile: 'pvp',
    rankId: pvpData.rankId,

    resonance: 0,
    buffs: [],
    statuses: [],
    defending: false,
    resonanceReady: false,
    _resonanceBuffActive: false,

    pvpMeta: {
      raceId: pvpData.raceId,
      classId: pvpData.classId,
      raceName: pvpData.raceName,
      className: pvpData.className,
      rankId: pvpData.rankId
    }
  };
}

// ============================================================
// ЛУТ
// ============================================================

function generatePvPLoot(level, rankId) {
  const drops = [];

  // Материалы (40%)
  if (Math.random() < 0.40) {
    const mats = ['mat_iron_ore', 'mat_steel_ore', 'mat_leather', 'mat_thick_hide', 'mat_essence', 'mat_mithril', 'mat_dust'];
    drops.push({ itemId: pickRandom(mats), chance: 1.0, quantity: 1 + Math.floor(Math.random() * 3) });
  }

  // Камни (10% + бонус)
  const bonusMap = { bronze: 0, silver: 0.05, gold: 0.10, platinum: 0.15, legend: 0.25 };
  const gemChance = 0.10 + (bonusMap[rankId] || 0);
  if (Math.random() < gemChance) {
    const tier = level < 15 ? 1 : level < 40 ? 2 : 3;
    const pool = Object.values(GEMS).filter(g => g.tier === tier);
    if (pool.length > 0) drops.push({ itemId: pickRandom(pool).id, chance: 1.0, quantity: 1 });
  }

  // Зелья (25%)
  if (Math.random() < 0.25) {
    const potions = ['potion_hp_med', 'potion_mp_med', 'potion_hp_large', 'potion_mp_large'];
    drops.push({ itemId: pickRandom(potions), chance: 1.0, quantity: 1 });
  }

  return drops;
}

// ============================================================
// ВСТРЕЧА
// ============================================================

function rollPvPEncounter(zoneId, subId, heroLevel) {
  const chance = CONFIG.pvp.encounterChance;
  if (Math.random() > chance) return null;
  return generatePvPHero(heroLevel, zoneId);
}

// ============================================================
// ОБРАБОТКА ПОБЕДЫ/ПОРАЖЕНИЯ В PVP
// ============================================================

// Вызывается при победе над ПК
function onPvPKill(pvpUnit) {
  if (!pvpUnit || !pvpUnit.isPvP || !window.STATE) return { points: 0 };

  const rankId = pvpUnit.rankId || (pvpUnit.pvpMeta && pvpUnit.pvpMeta.rankId) || 'bronze';
  const points = CONFIG.pvp.pointsOnKill[rankId] || 1;

  if (!window.STATE.stats) window.STATE.stats = {};
  if (!window.STATE.stats.pvpKills) {
    window.STATE.stats.pvpKills = { bronze: 0, silver: 0, gold: 0, platinum: 0, legend: 0 };
  }
  if (window.STATE.stats.pvpPoints === undefined) window.STATE.stats.pvpPoints = 0;
  if (window.STATE.stats.pvpWins === undefined) window.STATE.stats.pvpWins = 0;

  window.STATE.stats.pvpKills[rankId] = (window.STATE.stats.pvpKills[rankId] || 0) + 1;
  const oldPoints = window.STATE.stats.pvpPoints;
  window.STATE.stats.pvpPoints += points;
  window.STATE.stats.pvpWins++;

  // Проверка повышения ранга
  const oldRank = getPlayerRank(oldPoints);
  const newRank = getPlayerRank(window.STATE.stats.pvpPoints);
  const rankUp = oldRank.id !== newRank.id;

  return {
    points: points,
    totalPoints: window.STATE.stats.pvpPoints,
    rankId: newRank.id,
    rankName: newRank.name,
    rankUp: rankUp
  };
}

// Вызывается при поражении от ПК
function onPvPDeath() {
  if (!window.STATE || !window.STATE.stats) return { lost: 0 };

  const current = window.STATE.stats.pvpPoints || 0;
  const lost = Math.floor(current * CONFIG.pvp.deathPointsLoss);

  window.STATE.stats.pvpPoints = Math.max(0, current - lost);
  window.STATE.stats.pvpLosses = (window.STATE.stats.pvpLosses || 0) + 1;

  return { lost: lost, totalPoints: window.STATE.stats.pvpPoints };
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.PvP = {
  PVP_NAMES,
  PVP_TITLES,
  generatePvPName,
  rollEnemyRank,
  getEnemyRankData,
  getPlayerRank,
  getPlayerStatBonus,
  generatePvPHero,
  createPvPUnit,
  generatePvPLoot,
  rollPvPEncounter,
  onPvPKill,
  onPvPDeath
};
