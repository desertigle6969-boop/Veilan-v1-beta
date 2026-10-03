// ============================================================
// ВЕЙЛАН — УНИКАЛЬНЫЕ ПРЕДМЕТЫ (4 сета × 6 = 24)
// Сеты: Sanguine (3), Vesper (3.5), Dynasty (4), Draconic (5)
// Падают только с боссов определённых зон
// ============================================================

const ITEMS_UNIQUE = {

  // ============================================================
  // СЕТ 1 — SANGUINE (Кровавый) — tier 3 — Зоны 1-4
  // Боссы: bandit_leader, treant_fallen, golem_ancient, king_olden
  // Тема: жертва, кровь, ярость
  // ============================================================

  sanguine_sword: {
    id:'sanguine_sword', name:'Клинок Крови', type:'weapon', slot:'weapon',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Меч, пьющий кровь врагов.',
    lore:'Из рук Вожака Мародёров. Ещё тёплый.',
    stats:{ atk:12, str:5, crit:3 },
    cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'sword_steel'
  },
  sanguine_helmet: {
    id:'sanguine_helmet', name:'Шлем Крови', type:'armor', slot:'helmet',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Тяжёлый шлем, помнит удары.',
    lore:'Снят с павшего рыцаря.',
    stats:{ def:6, hp:8 }, cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'helm_steel'
  },
  sanguine_chest: {
    id:'sanguine_chest', name:'Броня Крови', type:'armor', slot:'chest',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Панцирь с рунами жертвы.',
    lore:'Внутри выцарапано чьё-то имя.',
    stats:{ def:10, hp:12 }, cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'chest_steel'
  },
  sanguine_legs: {
    id:'sanguine_legs', name:'Поножи Крови', type:'armor', slot:'legs',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Защищают даже в беге.',
    lore:'Не тяжелее, чем кажутся.',
    stats:{ def:7, spd:5 }, cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'legs_steel'
  },
  sanguine_cloak: {
    id:'sanguine_cloak', name:'Плащ Крови', type:'armor', slot:'cloak',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Багровый, как закат над полем.',
    lore:'Из шкур, снятых с врагов.',
    stats:{ def:5, eva:5 }, cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'cloak_mist'
  },
  sanguine_ring: {
    id:'sanguine_ring', name:'Кольцо Крови', type:'accessory', slot:'ring1',
    tier:3, rarity:'rare', set:'sanguine',
    desc:'Тёплое на ощупь.',
    lore:'Пульсирует в такт сердцу.',
    stats:{ str:3, crit:2 }, cost:0, levelReq:15, classReq:[], bonuses:[], sprite:'ring_ruby'
  },

  // ============================================================
  // СЕТ 2 — VESPER (Вечерний) — tier 3.5 (sublime) — Зоны 5-8
  // Боссы: leviathan_young, wyrm_frost, forge_titan, mora_avatar
  // Тема: лёд, тьма, скорость
  // ============================================================

  vesper_cutter: {
    id:'vesper_cutter', name:'Клинок Вечера', type:'weapon', slot:'weapon',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Режет воздух — и тьму.',
    lore:'Кузнецы Мора выковали лишь один.',
    stats:{ atk:14, dex:7, crit:5 },
    cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'dagger_pair'
  },
  vesper_helmet: {
    id:'vesper_helmet', name:'Венец Вечера', type:'armor', slot:'helmet',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Не даёт видеть страх.',
    lore:'Тот, кто носил — не боялся умереть.',
    stats:{ def:7, hp:10, spd:3 }, cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'helm_runed'
  },
  vesper_chest: {
    id:'vesper_chest', name:'Панцирь Вечера', type:'armor', slot:'chest',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Дышит как живой.',
    lore:'Снят с Молодого Левиафана.',
    stats:{ def:12, hp:15 }, cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'chest_runed'
  },
  vesper_legs: {
    id:'vesper_legs', name:'Поножи Вечера', type:'armor', slot:'legs',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Шаги неслышны.',
    lore:'Обёрнуты тканью с ледяных пиков.',
    stats:{ def:8, spd:7 }, cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'legs_runed'
  },
  vesper_cloak: {
    id:'vesper_cloak', name:'Плащ Вечера', type:'armor', slot:'cloak',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Сливается с туманом.',
    lore:'Из тени Тихих Топей.',
    stats:{ def:6, eva:8 }, cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'cloak_mist'
  },
  vesper_ring: {
    id:'vesper_ring', name:'Кольцо Вечера', type:'accessory', slot:'ring1',
    tier:3, rarity:'sublime', set:'apocalypse',
    desc:'Холодное как лёд.',
    lore:'Первый подарок Мора — небо.',
    stats:{ dex:4, crit:3 }, cost:0, levelReq:30, classReq:[], bonuses:[], sprite:'ring_silver'
  },

  // ============================================================
  // СЕТ 3 — DYNASTY (Династия) — tier 4 (epic) — Зоны 9-10
  // Боссы: storm_lord, devourer
  // Тема: знать, золото, власть
  // ============================================================

  dynasty_blade: {
    id:'dynasty_blade', name:'Клинок Династии', type:'weapon', slot:'weapon',
    tier:4, rarity:'epic', set:'void',
    desc:'Оружие тех, кто правил.',
    lore:'Тысячу лет пролежал в склепе.',
    stats:{ atk:18, str:8, crit:5 },
    cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'sword_dawn'
  },
  dynasty_crown: {
    id:'dynasty_crown', name:'Корона Династии', type:'armor', slot:'helmet',
    tier:4, rarity:'epic', set:'void',
    desc:'Тяжесть власти.',
    lore:'Короли умирают, венец — нет.',
    stats:{ def:9, hp:15, wit:5 }, cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'helm_elder'
  },
  dynasty_armor: {
    id:'dynasty_armor', name:'Броня Династии', type:'armor', slot:'chest',
    tier:4, rarity:'epic', set:'void',
    desc:'Пластины с гербами.',
    lore:'Помнит последний бой короля.',
    stats:{ def:15, hp:20 }, cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'chest_elder'
  },
  dynasty_greaves: {
    id:'dynasty_greaves', name:'Поножи Династии', type:'armor', slot:'legs',
    tier:4, rarity:'epic', set:'void',
    desc:'Шаги — как приговор.',
    lore:'Подошвы стёрты о камень трона.',
    stats:{ def:11, spd:8 }, cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'legs_elder'
  },
  dynasty_cloak: {
    id:'dynasty_cloak', name:'Плащ Династии', type:'armor', slot:'cloak',
    tier:4, rarity:'epic', set:'void',
    desc:'Тяжёлый от золота.',
    lore:'Расшит нитями из чужих корон.',
    stats:{ def:8, eva:10 }, cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'cloak_void'
  },
  dynasty_ring: {
    id:'dynasty_ring', name:'Кольцо Династии', type:'accessory', slot:'ring1',
    tier:4, rarity:'epic', set:'void',
    desc:'Печать древнего дома.',
    lore:'На внутренней стороне — имя.',
    stats:{ str:5, crit:5, def:3 }, cost:0, levelReq:50, classReq:[], bonuses:[], sprite:'ring_star'
  },

  // ============================================================
  // СЕТ 4 — DRACONIC (Драконий) — tier 5 (ascendant) — Зоны 11-12
  // Боссы: turn_avatar, turn_true
  // Тема: драконы, огонь, финал
  // ============================================================

  draconic_blade: {
    id:'draconic_blade', name:'Клинок Дракона', type:'weapon', slot:'weapon',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Выкован из чешуи. Горит без огня.',
    lore:'Последний подарок Тэрна этому миру.',
    stats:{ atk:25, str:12, crit:8 },
    cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'sword_dawn'
  },
  draconic_crown: {
    id:'draconic_crown', name:'Корона Дракона', type:'armor', slot:'helmet',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Рога истинного владыки.',
    lore:'Отломана от черепа Тэрна.',
    stats:{ def:12, hp:25, wit:8 }, cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'helm_elder'
  },
  draconic_armor: {
    id:'draconic_armor', name:'Броня Дракона', type:'armor', slot:'chest',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Чешуя, что не берёт сталь.',
    lore:'Не каждый выживет в ней.',
    stats:{ def:20, hp:30, con:5 }, cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'chest_elder'
  },
  draconic_greaves: {
    id:'draconic_greaves', name:'Поножи Дракона', type:'armor', slot:'legs',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Поступь титана.',
    lore:'Тэрн носил их, когда падал.',
    stats:{ def:15, spd:12 }, cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'legs_elder'
  },
  draconic_cloak: {
    id:'draconic_cloak', name:'Плащ Дракона', type:'armor', slot:'cloak',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Мембрана крыла.',
    lore:'Тэрн не нуждался в крыльях. И всё же они были.',
    stats:{ def:11, eva:15 }, cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'cloak_void'
  },
  draconic_ring: {
    id:'draconic_ring', name:'Кольцо Дракона', type:'accessory', slot:'ring1',
    tier:5, rarity:'ascendant', set:'draconic',
    desc:'Зрачок внутри камня.',
    lore:'Смотрит на тебя. Оценивает.',
    stats:{ str:8, crit:7, def:5 }, cost:0, levelReq:70, classReq:[], bonuses:[], sprite:'ring_star'
  }

};

// ============================================================
// СЕТОВЫЕ БОНУСЫ
// ============================================================

const SET_BONUSES = {
  sanguine: {
    name: 'Sanguine',
    bonuses: [
      { pieces: 2, effects: { hpMult: 0.05 }, desc: '+5% HP' },
      { pieces: 3, effects: { atkMult: 0.05 }, desc: '+5% ATK' },
      { pieces: 4, effects: { lifesteal: 0.03 }, desc: '+3% вампиризма' },
      { pieces: 5, effects: { critBonus: 0.10 }, desc: '+10% CRIT' },
      { pieces: 6, effects: { allMult: 0.15, hpOnKill: 0.05 }, desc: '+15% ко всему, +5% HP при убийстве' }
    ]
  },
  apocalypse: {
    name: 'Apocalypse',
    bonuses: [
      { pieces: 2, effects: { spdMult: 0.05 }, desc: '+5% SPD' },
      { pieces: 3, effects: { evaBonus: 0.05 }, desc: '+5% EVA' },
      { pieces: 4, effects: { critDmgMult: 0.05 }, desc: '+5% крит. урон' },
      { pieces: 5, effects: { mdefMult: 0.10 }, desc: '+10% MDEF' },
      { pieces: 6, effects: { allMult: 0.15, stunOnCrit: 0.20 }, desc: '+15% ко всему, 20% шанс оглушить при крите' }
    ]
  },
  void: {
    name: 'Void',
    bonuses: [
      { pieces: 2, effects: { defMult: 0.05 }, desc: '+5% DEF' },
      { pieces: 3, effects: { goldMult: 0.10 }, desc: '+10% золота с мобов' },
      { pieces: 4, effects: { resBonus: 0.05 }, desc: '+5% резонанс' },
      { pieces: 5, effects: { expMult: 0.10 }, desc: '+10% опыта' },
      { pieces: 6, effects: { allMult: 0.15, bossRewardMult: 0.20 }, desc: '+15% ко всему, +20% наград с боссов' }
    ]
  },
  draconic: {
    name: 'Draconic',
    bonuses: [
      { pieces: 2, effects: { hpMult: 0.05 }, desc: '+5% HP' },
      { pieces: 3, effects: { mpMult: 0.05 }, desc: '+5% MP' },
      { pieces: 4, effects: { atkMult: 0.05, magMult: 0.05 }, desc: '+5% ATK и MAG' },
      { pieces: 5, effects: { critDmgMult: 0.10 }, desc: '+10% крит. урон' },
      { pieces: 6, effects: { allMult: 0.15, bossDmgMult: 0.10, gemDropBonus: 0.05 }, desc: '+15% ко всему, +10% урона по боссам, +5% шанс дропа камней' }
    ]
  }
};

// ============================================================
// ПРИВЯЗКА К БОССАМ (какой босс дропает какие предметы сета)
// ============================================================

const BOSS_UNIQUE_DROPS = {
  // Сет 1: Sanguine (4 босса)
  bandit_leader:    ['sanguine_sword', 'sanguine_helmet', 'sanguine_chest'],
  treant_fallen:    ['sanguine_legs', 'sanguine_cloak'],
  golem_ancient:    ['sanguine_ring', 'sanguine_chest'],
  king_olden:       ['sanguine_sword', 'sanguine_legs', 'sanguine_ring'],
  // Сет 2: Apocalypse (4 босса)
  leviathan_young:  ['vesper_cutter', 'vesper_chest'],
  wyrm_frost:       ['vesper_helmet', 'vesper_legs'],
  forge_titan:      ['vesper_cloak', 'vesper_ring'],
  mora_avatar:      ['vesper_cutter', 'vesper_helmet', 'vesper_chest', 'vesper_legs', 'vesper_cloak', 'vesper_ring'],
  // Сет 3: Void (2 босса)
  storm_lord:       ['dynasty_blade', 'dynasty_crown', 'dynasty_armor'],
  devourer:         ['dynasty_greaves', 'dynasty_cloak', 'dynasty_ring'],
  // Сет 4: Draconic (2 босса)
  turn_avatar:      ['draconic_blade', 'draconic_crown', 'draconic_armor'],
  turn_true:        ['draconic_greaves', 'draconic_cloak', 'draconic_ring']
};

// ============================================================
// ЭКСПОРТ + регистрация в ITEMS
// ============================================================

// Регистрируем в общий ITEMS
if (typeof ITEMS !== 'undefined') {
  for (var uid in ITEMS_UNIQUE) {
    ITEMS[uid] = ITEMS_UNIQUE[uid];
  }
}

window.UniqueItems = {
  ITEMS_UNIQUE: ITEMS_UNIQUE,
  SET_BONUSES: SET_BONUSES,
  BOSS_UNIQUE_DROPS: BOSS_UNIQUE_DROPS,

  // Получить бонусы сета для героя
  getSetBonuses: function(hero) {
    if (!hero) return {};
    var equipped = window.STATE && window.STATE.equipped ? window.STATE.equipped : {};
    var setCount = {};

    // Считаем сколько предметов каждого сета надето
    for (var slot in equipped) {
      var eq = equipped[slot];
      if (!eq || !eq.itemId) continue;
      var item = ITEMS[eq.itemId];
      if (item && item.set) {
        setCount[item.set] = (setCount[item.set] || 0) + 1;
      }
    }

    // Собираем активные бонусы
    var result = {};
    for (var setName in setCount) {
      var count = setCount[setName];
      var setDef = SET_BONUSES[setName];
      if (!setDef) continue;

      result[setName] = { count: count, active: [] };
      for (var i = 0; i < setDef.bonuses.length; i++) {
        var bonus = setDef.bonuses[i];
        if (count >= bonus.pieces) {
          result[setName].active.push(bonus);
        }
      }
    }
    return result;
  },

  // Сколько предметов сета надето
  getSetCount: function(setName) {
    var hero = window.STATE && window.STATE.hero;
    var bonuses = this.getSetBonuses(hero);
    return bonuses[setName] ? bonuses[setName].count : 0;
  }
};
