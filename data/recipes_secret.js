// ============================================================
// ВЕЙЛАН — ТАЙНЫЕ РЕЦЕПТЫ (аксессуары + свитки)
// Открываются при наличии "странного предмета" у игрока
// ============================================================

const RECIPES_SECRET = {

  // ============================================================
  // ГЛАВА 1 — ЛАГЕРЬ (странный предмет: strange_rat_king_tooth)
  // ============================================================

  recipe_secret_amulet_rat: {
    id: 'recipe_secret_amulet_rat',
    name: 'Амулет Матриарха',
    result: { itemId: 'amulet_rat_king', quantity: 1 },
    category: 'secret', tier: 2, levelReq: 5,
    gold: 300, successChance: 0.85,
    unlockItem: 'strange_rat_king_tooth',
    materials: [
      { itemId: 'strange_rat_king_tooth', quantity: 1 },
      { itemId: 'mat_leather', quantity: 10 },
      { itemId: 'mat_iron_ore', quantity: 15 }
    ]
  },

  recipe_secret_ring_bone: {
    id: 'recipe_secret_ring_bone',
    name: 'Кольцо Подвала',
    result: { itemId: 'ring_bone_rat', quantity: 1 },
    category: 'secret', tier: 2, levelReq: 5,
    gold: 250, successChance: 0.85,
    unlockItem: 'strange_rat_king_tooth',
    materials: [
      { itemId: 'strange_rat_king_tooth', quantity: 1 },
      { itemId: 'mat_leather', quantity: 8 },
      { itemId: 'mat_iron_ore', quantity: 10 }
    ]
  },

  recipe_secret_scroll_hp: {
    id: 'recipe_secret_scroll_hp',
    name: 'Свиток Неугасающей Плоти',
    result: { itemId: 'scroll_permanent_hp', quantity: 1 },
    category: 'secret', tier: 2, levelReq: 5,
    gold: 500, successChance: 0.70,
    unlockItem: 'strange_rat_king_tooth',
    materials: [
      { itemId: 'strange_rat_king_tooth', quantity: 1 },
      { itemId: 'mat_essence', quantity: 5 },
      { itemId: 'mat_dust', quantity: 3 }
    ]
  },

  // ============================================================
  // ГЛАВА 2 — ЛЕС (странный предмет: strange_black_sap)
  // ============================================================

  recipe_secret_amulet_sap: {
    id: 'recipe_secret_amulet_sap',
    name: 'Амулет Отступника',
    result: { itemId: 'amulet_black_sap', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 10,
    gold: 700, successChance: 0.80,
    unlockItem: 'strange_black_sap',
    materials: [
      { itemId: 'strange_black_sap', quantity: 1 },
      { itemId: 'mat_essence', quantity: 10 },
      { itemId: 'mat_thick_hide', quantity: 5 }
    ]
  },

  recipe_secret_ring_forest: {
    id: 'recipe_secret_ring_forest',
    name: 'Кольцо Тихого Круга',
    result: { itemId: 'ring_forest_whisper', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 10,
    gold: 600, successChance: 0.80,
    unlockItem: 'strange_black_sap',
    materials: [
      { itemId: 'strange_black_sap', quantity: 1 },
      { itemId: 'mat_essence', quantity: 8 },
      { itemId: 'mat_steel_ore', quantity: 12 }
    ]
  },

  recipe_secret_scroll_atk: {
    id: 'recipe_secret_scroll_atk',
    name: 'Свиток Незаживающей Раны',
    result: { itemId: 'scroll_permanent_atk', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 10,
    gold: 1000, successChance: 0.65,
    unlockItem: 'strange_black_sap',
    materials: [
      { itemId: 'strange_black_sap', quantity: 1 },
      { itemId: 'mat_essence', quantity: 12 },
      { itemId: 'mat_dust', quantity: 5 }
    ]
  },

  // ============================================================
  // ГЛАВА 3 — ПЕЩЕРЫ (странный предмет: strange_blind_eye)
  // ============================================================

  recipe_secret_amulet_eye: {
    id: 'recipe_secret_amulet_eye',
    name: 'Амулет Слепого Кузнеца',
    result: { itemId: 'amulet_blind_eye', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 18,
    gold: 1500, successChance: 0.75,
    unlockItem: 'strange_blind_eye',
    materials: [
      { itemId: 'strange_blind_eye', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 10 },
      { itemId: 'mat_essence', quantity: 15 }
    ]
  },

  recipe_secret_belt_chain: {
    id: 'recipe_secret_belt_chain',
    name: 'Пояс Гранн',
    result: { itemId: 'belt_cave_chain', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 18,
    gold: 1300, successChance: 0.75,
    unlockItem: 'strange_blind_eye',
    materials: [
      { itemId: 'strange_blind_eye', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 8 },
      { itemId: 'mat_steel_ore', quantity: 20 }
    ]
  },

  recipe_secret_scroll_def: {
    id: 'recipe_secret_scroll_def',
    name: 'Свиток Каменной Кожи',
    result: { itemId: 'scroll_permanent_def', quantity: 1 },
    category: 'secret', tier: 3, levelReq: 18,
    gold: 2000, successChance: 0.60,
    unlockItem: 'strange_blind_eye',
    materials: [
      { itemId: 'strange_blind_eye', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 12 },
      { itemId: 'mat_dust', quantity: 8 }
    ]
  },

  // ============================================================
  // ГЛАВА 4 — РУИНЫ (странный предмет: strange_tear_stone)
  // ============================================================

  recipe_secret_amulet_tear: {
    id: 'recipe_secret_amulet_tear',
    name: 'Амулет Слезы Ольдена',
    result: { itemId: 'amulet_olden_tear', quantity: 1 },
    category: 'secret', tier: 4, levelReq: 24,
    gold: 3000, successChance: 0.70,
    unlockItem: 'strange_tear_stone',
    materials: [
      { itemId: 'strange_tear_stone', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 15 },
      { itemId: 'mat_essence', quantity: 20 },
      { itemId: 'mat_dust', quantity: 10 }
    ]
  },

  recipe_secret_ring_ash: {
    id: 'recipe_secret_ring_ash',
    name: 'Кольцо Тронного Пепла',
    result: { itemId: 'ring_throne_ash', quantity: 1 },
    category: 'secret', tier: 4, levelReq: 24,
    gold: 2800, successChance: 0.70,
    unlockItem: 'strange_tear_stone',
    materials: [
      { itemId: 'strange_tear_stone', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 12 },
      { itemId: 'mat_dust', quantity: 8 }
    ]
  },

  recipe_secret_scroll_crit: {
    id: 'recipe_secret_scroll_crit',
    name: 'Свиток Слепого Удара',
    result: { itemId: 'scroll_permanent_crit', quantity: 1 },
    category: 'secret', tier: 4, levelReq: 24,
    gold: 4000, successChance: 0.55,
    unlockItem: 'strange_tear_stone',
    materials: [
      { itemId: 'strange_tear_stone', quantity: 1 },
      { itemId: 'mat_mithril', quantity: 20 },
      { itemId: 'mat_essence', quantity: 25 },
      { itemId: 'mat_dust', quantity: 15 }
    ]
  }

};

window.RECIPES_SECRET = RECIPES_SECRET;
console.log('[recipes_secret] ' + Object.keys(RECIPES_SECRET).length + ' рецептов');
