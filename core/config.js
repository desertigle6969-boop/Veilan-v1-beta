// ============================================================
// ВЕЙЛАН — ГЛОБАЛЬНЫЙ КОНФИГ
// ============================================================

const CONFIG = {

  exp: {
    base: 100,
    power: 2.2,
    maxLevel: 80,
    mobExpMult: 1.0,
    questExpShare: 0.30,
    sideQuestExpShare: 0.08,
    deathExpPenalty: 0.10
  },

  gold: {
    mobBase: 3,
    mobPerLevel: 1.2,
    eliteMult: 5,
    bossMult: 50,
    deathGoldPenalty: 0.20,
    sellPriceShare: 0.25
  },

  rarity: {
    common:    { weight: 650, color: '#a0a0a0', name: 'Обычное',     statMult: 1.0 },
    uncommon:  { weight: 250, color: '#5ad05a', name: 'Необычное',   statMult: 1.15 },
    rare:      { weight: 70,  color: '#5aa0ff', name: 'Редкое',      statMult: 1.40 },
    epic:      { weight: 25,  color: '#b060ff', name: 'Эпическое',   statMult: 1.80 },
    legendary: { weight: 5,   color: '#ffb020', name: 'Легендарное', statMult: 2.50 }
  },

  combat: {
    critMult: 1.8,
    dmgVarianceMin: 0.90,
    dmgVarianceMax: 1.10,
    backstabMult: 1.5,
    weaknessMult: 1.3,
    resonanceMult: 1.3,

    resonanceMax: 100,
    resonancePerHpLost: 0.2,
    resonancePerHit: 5,
    resonancePerCrit: 8,
    resonancePerSkill: 3,
    resonancePerKill: 10,
    resonancePerDefend: 5,
    resonancePassiveDivisor: 10,

    resonanceCostPerTurnHero: 0,
    resonanceCostPerTurnMerc: 0,
    resonanceCostPerTurnMob: 20,
    resonanceUltCost: 40,

    startingResonanceHero: 0,
    startingResonanceMerc: 0,
    startingResonanceMob: 0,
    startingResonanceElite: 0,
    startingResonanceBoss: 0,

    resonanceTiers: [
      { min: 75, atk: 0.10, def: 0.10, crit: 5, label: 'Пламя Зари' },
      { min: 50, atk: 0.05, def: 0.05, crit: 0, label: 'Отклик' },
      { min: 25, atk: 0.05, def: 0.00, crit: 0, label: 'Искра' },
      { min: 0,  atk: 0.00, def: 0.00, crit: 0, label: 'Покой' }
    ],

    baseAcc: 95,
    evaPerDex: 0.4,
    accPerDex: 0.3
  },

  party: {
    maxSize: 4,
    mercGoldShare: 0.20,
    mercHireBaseCost: 100,
    mercHireCostPerLevel: 25,
    mercDeathPenalty: 0.50,
    mercLoyaltyMax: 100,
    mercLoyaltyDecayPerFight: 2,
    mercFoodCost: 15,
    mercDesertAtLoyalty: 20
  },

  regen: {
    hpOutCombatPct: 0.01,
    mpOutCombatPct: 0.01,
    hpOutCombatTick: 10000,
    mpOutCombatTick: 10000,
    spPerTurnInCombat: 0.10
  },

  economy: {
    potionDailyStock: 5,
    potionRestockHours: 24,
    repairCostPerPoint: 3,
    maxDurability: 100,
    durabilityPerHits: 50
  },

  save: {
    key: 'veilan_save_v1',
    autoSaveInterval: 30000,
    version: 1
  },

  stats: {
    hpBase: 50,
    hpPerCon: 8,
    hpPerLevel: 15,
    mpBase: 30,
    mpPerInt: 5,
    mpPerLevel: 8,
    spBase: 100,
    spPerCon: 2,
    atkPerStr: 0.8,
    magPerInt: 1.0,
    defPerCon: 0.4,
    mdefPerMen: 0.5,
    spdBase: 10,
    spdPerDex: 0.3,
    critBase: 5,
    critPerWit: 0.5
  },

  enhancement: {
    maxLevel: 16,
    statBonusPerLevel: 0.08,
    costBase: 100,
    costPerLevel: 0.20,
    tiers: [
      { from: 0,  to: 3,  success: 1.00, fail: 'none' },
      { from: 4,  to: 6,  success: 0.80, fail: 'minus1' },
      { from: 7,  to: 9,  success: 0.60, fail: 'reset' },
      { from: 10, to: 12, success: 0.40, fail: 'destroy' },
      { from: 13, to: 16, success: 0.20, fail: 'destroy' }
    ]
  },

  augmentation: {
    maxSlots: 3,
    extractChanceKeep: 0.50,
    extractChanceDestroy: 0.30,
    extractChanceBack: 0.20
  },

  craft: {
    baseSuccessPenalty: 0.05,
    successBonusPerPlayerLevel: 0.02,
    maxRecipesPerLevel: 20
  },

  pvp: {
    encounterChance: 0.15,
    pointsOnKill: { bronze: 1, silver: 5, gold: 15, platinum: 50, legend: 200 },
    playerRanks: [
      { id: 'bronze',   name: 'Бронза',   minPoints: 0,     statBonus: 0.00 },
      { id: 'silver',   name: 'Серебро',  minPoints: 200,   statBonus: 0.02 },
      { id: 'gold',     name: 'Золото',   minPoints: 1000,  statBonus: 0.05 },
      { id: 'platinum', name: 'Платина',  minPoints: 4000,  statBonus: 0.10 },
      { id: 'legend',   name: 'Легенда',  minPoints: 12000, statBonus: 0.20 }
    ],
    zoneRanks: {
      camp:     { bronze: 100, silver: 0,  gold: 0,  platinum: 0,  legend: 0 },
      forest:   { bronze: 80,  silver: 20, gold: 0,  platinum: 0,  legend: 0 },
      mines:    { bronze: 40,  silver: 60, gold: 0,  platinum: 0,  legend: 0 },
      ruins:    { bronze: 0,   silver: 70, gold: 30, platinum: 0,  legend: 0 },
      temple:   { bronze: 0,   silver: 40, gold: 60, platinum: 0,  legend: 0 },
      peaks:    { bronze: 0,   silver: 0,  gold: 80, platinum: 20, legend: 0 },
      forges:   { bronze: 0,   silver: 0,  gold: 50, platinum: 50, legend: 0 },
      swamp:    { bronze: 0,   silver: 0,  gold: 30, platinum: 70, legend: 0 },
      bridge:   { bronze: 0,   silver: 0,  gold: 0,  platinum: 80, legend: 20 },
      rift:     { bronze: 0,   silver: 0,  gold: 0,  platinum: 40, legend: 60 },
      fortress: { bronze: 0,   silver: 0,  gold: 0,  platinum: 20, legend: 80 },
      heart:    { bronze: 0,   silver: 0,  gold: 0,  platinum: 0,  legend: 100 }
    },
    rankStatMult: {
      bronze:   { hp: 3.0, atk: 1.8, def: 1.5 },
      silver:   { hp: 3.5, atk: 2.0, def: 1.7 },
      gold:     { hp: 4.0, atk: 2.3, def: 2.0 },
      platinum: { hp: 4.5, atk: 2.6, def: 2.3 },
      legend:   { hp: 5.0, atk: 3.0, def: 2.5 }
    },
    deathPointsLoss: 0.10,
    goldMult: { bronze: 2.0, silver: 2.5, gold: 3.0, platinum: 4.0, legend: 5.0 },
    expMult: 2.5
  }

};

// ============================================================
// ФУНКЦИИ
// ============================================================

function expToNext(level) {
  if (level >= CONFIG.exp.maxLevel) return Infinity;
  return Math.floor(CONFIG.exp.base * Math.pow(level, CONFIG.exp.power));
}

function expTotalToLevel(level) {
  let total = 0;
  for (let i = 1; i < level; i++) total += expToNext(i);
  return total;
}

function rollRarity(bonusWeights) {
  const bonuses = bonusWeights || {};
  const weights = {};
  for (const key in CONFIG.rarity) {
    weights[key] = CONFIG.rarity[key].weight + (bonuses[key] || 0);
  }
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (const key in weights) {
    roll -= weights[key];
    if (roll <= 0) return key;
  }
  return 'common';
}
