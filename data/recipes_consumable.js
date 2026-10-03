// ============================================================
// ВЕЙЛАН — РЕЦЕПТЫ РАСХОДНИКОВ (15)
// Зелья, руны, свитки
// ============================================================

const RECIPES_CONSUMABLE = {

  // ========== ЗЕЛЬЯ HP (3) ==========
  recipe_potion_hp_small: {
    id:'recipe_potion_hp_small', name:'Малое зелье HP',
    result:{itemId:'potion_hp_small', quantity:5},
    category:'consumable', tier:1, levelReq:1, gold:15,
    successChance:0.95,
    materials:[{itemId:'mat_essence', quantity:3}, {itemId:'mat_leather', quantity:3}]
  },
  recipe_potion_hp_med: {
    id:'recipe_potion_hp_med', name:'Среднее зелье HP',
    result:{itemId:'potion_hp_med', quantity:5},
    category:'consumable', tier:2, levelReq:15, gold:60,
    successChance:0.90,
    materials:[{itemId:'mat_essence', quantity:8}, {itemId:'mat_thick_hide', quantity:3}]
  },
  recipe_potion_hp_large: {
    id:'recipe_potion_hp_large', name:'Большое зелье HP',
    result:{itemId:'potion_hp_large', quantity:5},
    category:'consumable', tier:3, levelReq:30, gold:180,
    successChance:0.80,
    materials:[{itemId:'mat_essence', quantity:15}, {itemId:'mat_dust', quantity:5}]
  },

  // ========== ЗЕЛЬЯ MP (3) ==========
  recipe_potion_mp_small: {
    id:'recipe_potion_mp_small', name:'Малое зелье MP',
    result:{itemId:'potion_mp_small', quantity:5},
    category:'consumable', tier:1, levelReq:1, gold:18,
    successChance:0.95,
    materials:[{itemId:'mat_essence', quantity:3}, {itemId:'mat_iron_ore', quantity:3}]
  },
  recipe_potion_mp_med: {
    id:'recipe_potion_mp_med', name:'Среднее зелье MP',
    result:{itemId:'potion_mp_med', quantity:5},
    category:'consumable', tier:2, levelReq:15, gold:70,
    successChance:0.90,
    materials:[{itemId:'mat_essence', quantity:10}, {itemId:'mat_steel_ore', quantity:5}]
  },
  recipe_potion_mp_large: {
    id:'recipe_potion_mp_large', name:'Большое зелье MP',
    result:{itemId:'potion_mp_large', quantity:5},
    category:'consumable', tier:3, levelReq:30, gold:200,
    successChance:0.80,
    materials:[{itemId:'mat_essence', quantity:18}, {itemId:'mat_dust', quantity:8}]
  },

  // ========== ЗЕЛЬЯ SP (2) ==========
  recipe_potion_sp_small: {
    id:'recipe_potion_sp_small', name:'Малое зелье SP',
    result:{itemId:'potion_sp_small', quantity:5},
    category:'consumable', tier:1, levelReq:1, gold:20,
    successChance:0.95,
    materials:[{itemId:'mat_essence', quantity:5}]
  },
  recipe_potion_sp_large: {
    id:'recipe_potion_sp_large', name:'Большое зелье SP',
    result:{itemId:'potion_sp_large', quantity:5},
    category:'consumable', tier:3, levelReq:25, gold:100,
    successChance:0.85,
    materials:[{itemId:'mat_essence', quantity:13}, {itemId:'mat_dust', quantity:5}]
  },

  // ========== РУНЫ (5) ==========
  recipe_rune_rage: {
    id:'recipe_rune_rage', name:'Руна Ярости',
    result:{itemId:'rune_rage', quantity:3},
    category:'consumable', tier:2, levelReq:10, gold:100,
    successChance:0.90,
    materials:[{itemId:'mat_essence', quantity:10}, {itemId:'mat_steel_ore', quantity:5}]
  },
  recipe_rune_stone: {
    id:'recipe_rune_stone', name:'Руна Камня',
    result:{itemId:'rune_stone', quantity:3},
    category:'consumable', tier:2, levelReq:10, gold:100,
    successChance:0.90,
    materials:[{itemId:'mat_essence', quantity:10}, {itemId:'mat_iron_ore', quantity:8}]
  },
  recipe_rune_wind: {
    id:'recipe_rune_wind', name:'Руна Ветра',
    result:{itemId:'rune_wind', quantity:3},
    category:'consumable', tier:3, levelReq:25, gold:220,
    successChance:0.80,
    materials:[{itemId:'mat_essence', quantity:15}, {itemId:'mat_dust', quantity:8}]
  },
  recipe_rune_accuracy: {
    id:'recipe_rune_accuracy', name:'Руна Точности',
    result:{itemId:'rune_accuracy', quantity:3},
    category:'consumable', tier:2, levelReq:15, gold:130,
    successChance:0.85,
    materials:[{itemId:'mat_essence', quantity:13}, {itemId:'mat_thick_hide', quantity:5}]
  },
  recipe_rune_life: {
    id:'recipe_rune_life', name:'Руна Жизни',
    result:{itemId:'rune_life', quantity:3},
    category:'consumable', tier:3, levelReq:30, gold:250,
    successChance:0.75,
    materials:[{itemId:'mat_essence', quantity:20}, {itemId:'mat_dust', quantity:10}]
  },

  // ========== СВИТКИ (2) ==========
  recipe_scroll_return: {
    id:'recipe_scroll_return', name:'Свиток Возврата',
    result:{itemId:'scroll_return', quantity:3},
    category:'consumable', tier:1, levelReq:1, gold:30,
    successChance:0.95,
    materials:[{itemId:'mat_essence', quantity:5}, {itemId:'mat_leather', quantity:5}]
  },
  recipe_scroll_cleanse: {
    id:'recipe_scroll_cleanse', name:'Свиток Очищения',
    result:{itemId:'scroll_cleanse', quantity:3},
    category:'consumable', tier:2, levelReq:15, gold:80,
    successChance:0.85,
    materials:[{itemId:'mat_essence', quantity:10}, {itemId:'mat_dust', quantity:3}]
  }

};
