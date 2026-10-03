// ============================================================
// ВЕЙЛАН — ГЕРОЙ (создание, статы, level-up, смерть)
// ============================================================

// ============================================================
// СОЗДАНИЕ ПЕРСОНАЖА
// ============================================================

function validateHeroCreation(raceId, classId, name) {
  const errors = [];
  if (!RACES[raceId]) errors.push('Раса не найдена');
  if (!CLASSES[classId]) errors.push('Класс не найден');
  if (!name || name.trim().length < 2) errors.push('Имя слишком короткое (мин. 2 символа)');
  if (name && name.trim().length > 16) errors.push('Имя слишком длинное (макс. 16)');
  return { ok: errors.length === 0, errors };
}

function createHero(raceId, classId, name) {
  const race = RACES[raceId];
  const cls = CLASSES[classId];
  if (!race || !cls) return null;

  const hero = {
    name: name.trim(),
    raceId: raceId,
    classId: classId,
    level: 1,
    exp: 0,

    // Базовые значения (пересчитываются при level-up)
    baseHp: 0,
    baseMp: 0,
    baseSp: 0,

    // Текущие значения
    hp: 0, maxHp: 0,
    mp: 0, maxMp: 0,
    sp: 0, maxSp: 0,
    resonance: 0,

    gold: cls.startingGold || 50,

    // Скиллы класса
    skillIds: cls.skills.slice(),

    // Кулдауны и баффы (вне боя обычно пустые)
    skillCooldowns: {},
    buffs: [],

    // Позиция в мире
    position: { zoneId: 'camp', subId: 'ash' },

    // Флаги
    isDead: false,
    hasShard: {}  // shardId → true
  };

  recalcHeroStats(hero, true);  // true = восстановить HP/MP/SP в максимум
  return hero;
}

// ============================================================
// РАСЧЁТ СТАТОВ
// ============================================================

// Базовая характеристика от расы и класса
function getBaseStat(hero, stat) {
  if (!hero) return 0;
  const race = RACES[hero.raceId];
  const cls = CLASSES[hero.classId];
  if (!race || !cls) return 0;

  const raceStart = (race.startingStats && race.startingStats[stat]) || 0;
  const raceGrowth = (race.statGrowth && race.statGrowth[stat]) || 0;
  const clsBase = (cls.baseStats && cls.baseStats[stat]) || 0;
  const clsGrowth = (cls.statGrowth && cls.statGrowth[stat]) || 0;

  const raw = raceStart + raceGrowth * (hero.level - 1)
            + clsBase + clsGrowth * (hero.level - 1);

  // Множители расы и класса
  const multKey = stat + 'Mult';
  const raceMult = (race.bonuses && race.bonuses[multKey]) || 1;
  const clsMult = (cls.classBonus && cls.classBonus[multKey]) || 1;

  return Math.floor(raw * raceMult * clsMult);
}

// Бонус от экипировки (учитывает заточку, камни, сломанные предметы)
function getEquipmentStat(hero, stat) {
  if (!hero || !window.STATE || !window.STATE.equipped) return 0;
  if (!window.Inventory) return 0;
  let total = 0;
  const slots = ['weapon', 'chest', 'helmet', 'legs', 'cloak', 'ring1', 'ring2', 'amulet', 'belt'];

  for (const slot of slots) {
    const eq = Inventory.getEquippedItem(slot);
    if (!eq || !eq.item) continue;
    const item = eq.item;

    // Множитель сломанного оружия
    let mult = 1.0;
    if (item.type === 'weapon' && Inventory.isBroken(slot)) mult = 0.20;

    // Базовые статы предмета
    if (item.stats && item.stats[stat]) {
      total += Math.floor(item.stats[stat] * mult);
    }

    // Заточка — только для ATK (физ.) и DEF
    if (stat === 'atk' && eq.enhancement > 0) {
      const enhBonus = Math.floor((item.stats.atk || 0) * 0.08 * eq.enhancement * mult);
      total += enhBonus;
    }
    if (stat === 'def' && eq.enhancement > 0) {
      const enhBonus = Math.floor((item.stats.def || 0) * 0.08 * eq.enhancement * mult);
      total += enhBonus;
    }

    // Камни
    if (eq.gems && eq.gems.length > 0) {
      for (const gemId of eq.gems) {
        if (!gemId) continue;
        const gem = GEMS[gemId];
        if (!gem || !gem.stats) continue;
        if (gem.stats[stat]) {
          total += gem.stats[stat];
        }
      }
    }
  }
  return total;
}

// Бонус от осколков
function getShardStat(hero, stat) {
  if (!hero || !window.STATE || !window.STATE.shards) return 0;
  let total = 0;
  for (const shardId of window.STATE.shards) {
    const shard = ITEMS[shardId];
    if (!shard || !shard.bonus) continue;
    const multKey = stat + 'Mult';
    if (shard.bonus[multKey]) {
      // Простой флэт-бонус от осколков — не реализуем сейчас, только множители
    }
  }
  return total;
}

// Бонус от баффов
function getBuffStat(hero, stat) {
  if (!hero || !hero.buffs) return 0;
  let total = 0;
  for (const buff of hero.buffs) {
    if (buff.stats && buff.stats[stat]) total += buff.stats[stat];
  }
  return total;
}

// PvP-бонус к статам от ранга игрока
function getPvPStatBonus() {
  if (!window.STATE || !window.STATE.stats) return 0;
  const points = window.STATE.stats.pvpPoints || 0;
  const ranks = CONFIG.pvp.playerRanks;
  let bonus = 0;
  for (const r of ranks) {
    if (points >= r.minPoints) bonus = r.statBonus;
  }
  return bonus;
}

// Итоговая характеристика (с учётом PvP-бонуса)
function getPermanentStat(hero, stat) {
  if (!hero || !hero.permanent || !stat) return 0;
  return hero.permanent[stat] || 0;
}

function getEffectiveStat(hero, stat) {
  const base = getBaseStat(hero, stat)
       + getEquipmentStat(hero, stat)
       + getShardStat(hero, stat)
       + getBuffStat(hero, stat)
       + getPermanentStat(hero, stat);
  const pvpMult = 1 + getPvPStatBonus();
  return Math.floor(base * pvpMult);
}

// ============================================================
// ПЕРЕСЧЁТ ПРОИЗВОДНЫХ СТАТОВ
// ============================================================

function recalcHeroStats(hero, restoreFull) {
  if (!hero) return;

  const S = CONFIG.stats;
  const str = getEffectiveStat(hero, 'str');
  const dex = getEffectiveStat(hero, 'dex');
  const con = getEffectiveStat(hero, 'con');
  const int = getEffectiveStat(hero, 'int');
  const wit = getEffectiveStat(hero, 'wit');
  const men = getEffectiveStat(hero, 'men');

  // HP = база + CON*8 + уровень*15 + бонусы предметов + permanent
  const hpFromItems = getEquipmentStat(hero, 'hp');
  const hpFromPerm = getPermanentStat(hero, 'hp');
  const race = RACES[hero.raceId];
  const raceHpMult = (race && race.bonuses && race.bonuses.hpMult) || 1;

  hero.maxHp = Math.floor(
    (S.hpBase + con * S.hpPerCon + hero.level * S.hpPerLevel + hpFromItems + hpFromPerm) * raceHpMult
  );

  const mpFromItems = getEquipmentStat(hero, 'mp');
  const mpFromPerm = getPermanentStat(hero, 'mp');
  const raceMpMult = (race && race.bonuses && race.bonuses.mpMult) || 1;

  // Сетовые мультипликаторы HP/MP
  var setHpMult = 1.0;
  var setMpMult = 1.0;
  if (window.UniqueItems && UniqueItems.getSetBonuses) {
    var setB = UniqueItems.getSetBonuses(hero);
    for (var sn in setB) {
      var info = setB[sn];
      for (var ii = 0; ii < info.active.length; ii++) {
        var ef = info.active[ii].effects || {};
        if (ef.hpMult) setHpMult += ef.hpMult;
        if (ef.mpMult) setMpMult += ef.mpMult;
        if (ef.allMult) { setHpMult += ef.allMult; setMpMult += ef.allMult; }
      }
    }
  }

  hero.maxMp = Math.floor(
    (S.mpBase + int * S.mpPerInt + hero.level * S.mpPerLevel + mpFromItems + mpFromPerm) * raceMpMult * setMpMult
  );

  hero.maxSp = Math.floor(S.spBase + con * S.spPerCon + hero.level * 2 + getPermanentStat(hero, 'sp'));

  // Применяем HP-мультипликатор сета
  hero.maxHp = Math.floor(hero.maxHp * setHpMult);

  // Восстановление при создании / level-up
  if (restoreFull) {
    hero.hp = hero.maxHp;
    hero.mp = hero.maxMp;
    hero.sp = hero.maxSp;
  } else {
    hero.hp = Math.min(hero.hp, hero.maxHp);
    hero.mp = Math.min(hero.mp, hero.maxMp);
    hero.sp = Math.min(hero.sp, hero.maxSp);
  }
}

// Производные боевые характеристики (с учётом заточки, камней, баффов)
function getDerivedStats(hero) {
  if (!hero) return {};

  const S = CONFIG.stats;
  const str = getEffectiveStat(hero, 'str');
  const dex = getEffectiveStat(hero, 'dex');
  const con = getEffectiveStat(hero, 'con');
  const int = getEffectiveStat(hero, 'int');
  const wit = getEffectiveStat(hero, 'wit');
  const men = getEffectiveStat(hero, 'men');

  // Оружие
  let weaponAtk = 0, weaponMag = 0;
  if (window.Inventory) {
    const w = Inventory.getEquippedItem('weapon');
    if (w && w.item && w.item.stats) {
      let mult = 1.0;
      if (Inventory.isBroken('weapon')) mult = 0.20;
      weaponAtk = Math.floor((w.item.stats.atk || 0) * mult);
      weaponMag = Math.floor((w.item.stats.mag || 0) * mult);
      // Заточка оружия — +8% к atk
      if (w.enhancement > 0) {
        weaponAtk += Math.floor(weaponAtk * 0.08 * w.enhancement);
        weaponMag += Math.floor(weaponMag * 0.08 * w.enhancement);
      }
    }
  }

  // Броня (все слоты)
  const armorDef = getEquipmentStat(hero, 'def') || 0;
  const armorMdef = getEquipmentStat(hero, 'mdef') || 0;

  // Бонусы камней, которые не в предмете (например, отдельные atk-камни — на будущее)
  const gemAtkBonus = 0;
  const gemMagBonus = 0;

  // Базовые значения
  var base = {
    atk: weaponAtk + gemAtkBonus + Math.floor(str * S.atkPerStr),
    mag: weaponMag + gemMagBonus + Math.floor(int * S.magPerInt),
    def: armorDef + Math.floor(con * S.defPerCon),
    mdef: armorMdef + Math.floor(men * S.mdefPerMen),
    spd: S.spdBase + Math.floor(dex * S.spdPerDex),
    crit: S.critBase + Math.floor(wit * S.critPerWit),
    eva: Math.floor(dex * CONFIG.combat.evaPerDex),
    acc: CONFIG.combat.baseAcc + Math.floor(dex * CONFIG.combat.accPerDex)
  };

  // === РАСОВЫЕ МНОЖИТЕЛИ ===
  var race = RACES[hero.raceId];
  if (race && race.bonuses) {
    var rb = race.bonuses;
    if (rb.atkMult) base.atk = Math.floor(base.atk * rb.atkMult);
    if (rb.magMult) base.mag = Math.floor(base.mag * rb.magMult);
    if (rb.defMult) base.def = Math.floor(base.def * rb.defMult);
    if (rb.spdMult) base.spd = Math.floor(base.spd * rb.spdMult);
  }

  // === КЛАССОВЫЕ МНОЖИТЕЛИ ===
  var cls = CLASSES[hero.classId];
  if (cls && cls.classBonus) {
    var cb = cls.classBonus;
    if (cb.atkMult) base.atk = Math.floor(base.atk * cb.atkMult);
    if (cb.magMult) base.mag = Math.floor(base.mag * cb.magMult);
    if (cb.defMult) base.def = Math.floor(base.def * cb.defMult);
    if (cb.spdMult) base.spd = Math.floor(base.spd * cb.spdMult);
  }

  // === СЕТОВЫЕ БОНУСЫ ===
  if (window.UniqueItems && UniqueItems.getSetBonuses) {
    var setBonuses = UniqueItems.getSetBonuses(hero);
    for (var setName in setBonuses) {
      var info = setBonuses[setName];
      for (var i = 0; i < info.active.length; i++) {
        var eff = info.active[i].effects || {};

        // Умножители (проценты)
        if (eff.atkMult) base.atk = Math.floor(base.atk * (1 + eff.atkMult));
        if (eff.magMult) base.mag = Math.floor(base.mag * (1 + eff.magMult));
        if (eff.defMult) base.def = Math.floor(base.def * (1 + eff.defMult));
        if (eff.mdefMult) base.mdef = Math.floor(base.mdef * (1 + eff.mdefMult));
        if (eff.spdMult) base.spd = Math.floor(base.spd * (1 + eff.spdMult));

        // Плоские
        if (eff.critBonus) base.crit += Math.floor(eff.critBonus * 100);
        if (eff.evaBonus) base.eva += Math.floor(eff.evaBonus * 100);
        if (eff.resBonus) base.resBonus = (base.resBonus || 0) + eff.resBonus;

        // "allMult" — ко всему
        if (eff.allMult) {
          base.atk  = Math.floor(base.atk  * (1 + eff.allMult));
          base.mag  = Math.floor(base.mag  * (1 + eff.allMult));
          base.def  = Math.floor(base.def  * (1 + eff.allMult));
          base.mdef = Math.floor(base.mdef * (1 + eff.allMult));
          base.spd  = Math.floor(base.spd  * (1 + eff.allMult));
        }

        // Флаги для боя (обрабатываются в combat.js)
        if (eff.lifesteal)     base.lifesteal     = (base.lifesteal || 0)     + eff.lifesteal;
        if (eff.hpOnKill)      base.hpOnKill      = (base.hpOnKill || 0)      + eff.hpOnKill;
        if (eff.stunOnCrit)    base.stunOnCrit    = (base.stunOnCrit || 0)    + eff.stunOnCrit;
        if (eff.goldMult)      base.goldMult      = (base.goldMult || 0)      + eff.goldMult;
        if (eff.expMult)       base.expMult       = (base.expMult || 0)       + eff.expMult;
        if (eff.bossRewardMult)base.bossRewardMult= (base.bossRewardMult || 0)+ eff.bossRewardMult;
        if (eff.bossDmgMult)   base.bossDmgMult   = (base.bossDmgMult || 0)   + eff.bossDmgMult;
        if (eff.gemDropBonus)  base.gemDropBonus  = (base.gemDropBonus || 0)  + eff.gemDropBonus;
      }
    }
  }

  return base;
}

// Обёртки для удобства
function getMaxHp(hero) { recalcHeroStats(hero, false); return hero.maxHp; }
function getMaxMp(hero) { recalcHeroStats(hero, false); return hero.maxMp; }
function getMaxSp(hero) { recalcHeroStats(hero, false); return hero.maxSp; }

// ============================================================
// ОПЫТ И LEVEL UP
// ============================================================

function gainExp(hero, amount) {
  if (!hero || hero.isDead) return { levelsGained: 0, expGained: 0 };

  // Бонус осколков на опыт
  let mult = 1.0;
  if (window.STATE && window.STATE.shards) {
    for (const shardId of window.STATE.shards) {
      const shard = ITEMS[shardId];
      if (shard && shard.bonus && shard.bonus.expMult) mult += shard.bonus.expMult;
    }
  }
  const finalExp = Math.floor(amount * mult);
  hero.exp += finalExp;

  let levelsGained = 0;
  while (hero.level < CONFIG.exp.maxLevel) {
    const need = expToNext(hero.level);
    if (hero.exp >= need) {
      hero.exp -= need;
      levelUp(hero);
      levelsGained++;
    } else {
      break;
    }
  }

  // Обновляем статистику
  if (window.STATE && window.STATE.stats) {
    // Опыт не считается отдельно, только по мобам
  }

  // ЗВУК ПОДНЯТИЯ УРОВНЯ (один раз, даже если +3 уровня за удар)
  if (levelsGained > 0 && window.SFX) {
    SFX.play('level_up');
  }

  return { levelsGained, expGained: finalExp };
}

function levelUp(hero) {
  hero.level++;
  recalcHeroStats(hero, true);  // восстановить HP/MP/SP
  // (позже — добавление новых скиллов класса при достижении уровня, если нужно)
}

// ============================================================
// УРОН / ЛЕЧЕНИЕ / РЕСУРСЫ
// ============================================================

// Возвращает { actual, died }
// soft-cap: моб не может ваншотить
function damageHero(hero, amount, sourceType) {
  if (!hero || hero.isDead) return { actual: 0, died: false };

  // Soft-cap против ваншота
  let capped = amount;
  if (sourceType === 'mob') {
    const maxDmg = Math.floor(hero.maxHp * 0.25);
    if (capped > maxDmg) capped = maxDmg;
  } else if (sourceType === 'elite') {
    const maxDmg = Math.floor(hero.maxHp * 0.35);
    if (capped > maxDmg) capped = maxDmg;
  } else if (sourceType === 'boss') {
    const maxDmg = Math.floor(hero.maxHp * 0.40);
    if (capped > maxDmg) capped = maxDmg;
  }
  // Минимум 5% HP
  const minDmg = Math.floor(hero.maxHp * 0.05);
  if (capped < minDmg && amount > 0) capped = minDmg;

  const actual = Math.min(capped, hero.hp);
  hero.hp -= actual;

  // Резонанс растёт от потерь
  hero.resonance = Math.min(
    CONFIG.combat.resonanceMax,
    hero.resonance + (actual / hero.maxHp) * 100 * CONFIG.combat.resonancePerHpLost
  );

  if (hero.hp <= 0) {
    hero.hp = 0;
    hero.isDead = true;
    // ЗВУК СМЕРТИ (женский/мужской по полу героя; по умолчанию — мужской)
    if (window.SFX) {
      var isFemale = hero.gender === 'female';
      SFX.play(isFemale ? 'death_female' : 'death_male');
    }
    return { actual, died: true };
  }
  return { actual, died: false };
}

function healHero(hero, amount) {
  if (!hero) return 0;
  const actual = Math.min(amount, hero.maxHp - hero.hp);
  hero.hp += actual;
  return actual;
}

function spendMp(hero, amount) {
  if (!hero || hero.mp < amount) return false;
  hero.mp -= amount;
  return true;
}

function spendSp(hero, amount) {
  if (!hero || hero.sp < amount) return false;
  hero.sp -= amount;
  return true;
}

// ============================================================
// СМЕРТЬ И ВОЗРОЖДЕНИЕ
// ============================================================

function dieHero(hero) {
  if (!hero) return;

  // Штрафы
  const expLoss = Math.floor(expToNext(hero.level) * CONFIG.exp.deathExpPenalty);
  hero.exp = Math.max(0, hero.exp - expLoss);

  const goldLoss = Math.floor(hero.gold * CONFIG.gold.deathGoldPenalty);
  hero.gold -= goldLoss;

  // Статистика
  if (window.STATE && window.STATE.stats) {
    window.STATE.stats.deaths++;
  }

  hero.isDead = true;
  hero.hp = 0;

  // Сохраняем потерю
  return { expLoss, goldLoss };
}

function respawnHero(hero) {
  if (!hero) return;
  hero.isDead = false;
  hero.hp = Math.floor(hero.maxHp * 0.30);
  hero.mp = Math.floor(hero.maxMp * 0.30);
  hero.sp = Math.floor(hero.maxSp * 0.30);
  hero.resonance = 0;

  // Возврат в стартовую зону
  hero.position = { zoneId: 'camp', subId: 'ash' };

  // Чистим кулдауны и баффы
  hero.skillCooldowns = {};
  hero.buffs = [];
}

// ============================================================
// ОСКОЛКИ ЗАРИ
// ============================================================

function applyShard(hero, shardId) {
  if (!hero) return false;
  const shard = ITEMS[shardId];
  if (!shard || shard.type !== 'shard') return false;

  if (!hero.hasShard) hero.hasShard = {};
  if (hero.hasShard[shardId]) return false;  // уже применён

  hero.hasShard[shardId] = true;

  // В STATE.shards
  if (window.STATE && window.STATE.shards) {
    if (!window.STATE.shards.includes(shardId)) {
      window.STATE.shards.push(shardId);
    }
  }

  recalcHeroStats(hero, false);
  return true;
}

// ============================================================
// СКИЛЛЫ ГЕРОЯ
// ============================================================

function getHeroSkills(hero) {
  if (!hero || !hero.skillIds) return [];
  return hero.skillIds.map(id => SKILLS[id]).filter(s => !!s);
}

function addSkillToHero(hero, skillId) {
  if (!hero || !SKILLS[skillId]) return false;
  if (hero.skillIds.includes(skillId)) return false;
  hero.skillIds.push(skillId);
  return true;
}

function canUseSkill(hero, skillId) {
  const skill = SKILLS[skillId];
  if (!skill) return { ok: false, reason: 'Скилл не найден' };

  const cd = (hero.skillCooldowns && hero.skillCooldowns[skillId]) || 0;
  if (cd > 0) return { ok: false, reason: 'Кулдаун: ' + cd + ' ход(ов)' };

  if (skill.cost.mp && hero.mp < skill.cost.mp) return { ok: false, reason: 'Не хватает MP' };
  if (skill.cost.sp && hero.sp < skill.cost.sp) return { ok: false, reason: 'Не хватает SP' };
  if (skill.cost.res && hero.resonance < skill.cost.res) return { ok: false, reason: 'Не хватает Резонанса' };

  return { ok: true };
}

// ============================================================
// ЭКИПИРОВКА — базовые запросы
// ============================================================

function getEquippedItems(hero) {
  if (!window.STATE || !window.STATE.equipped) return [];
  const items = [];
  for (const slot in window.STATE.equipped) {
    const eq = window.STATE.equipped[slot];
    if (eq && eq.itemId && ITEMS[eq.itemId]) {
      items.push(ITEMS[eq.itemId]);
    }
  }
  return items;
}

function getTotalItemBonus(hero, statName) {
  return getEquipmentStat(hero, statName);
}

// ============================================================
// ЭКСПОРТ
// ============================================================

window.Hero = {
  validateHeroCreation,
  createHero,
  getBaseStat,
  getEffectiveStat,
  getPvPStatBonus,
  getDerivedStats,
  recalcHeroStats,
  getMaxHp, getMaxMp, getMaxSp,
  gainExp, levelUp,
  damageHero, healHero,
  spendMp, spendSp,
  dieHero, respawnHero,
  applyShard,
  getHeroSkills, addSkillToHero, canUseSkill,
  getEquippedItems, getTotalItemBonus
};
