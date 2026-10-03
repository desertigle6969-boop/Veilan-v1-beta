// ============================================================
// ВЕЙЛАН — РЕЦЕПТЫ ОРУЖИЯ (40)
// ============================================================

const RECIPES_WEAPON = {

  // ========== МЕЧИ ==========
  recipe_sword_rusty:    { id:'recipe_sword_rusty',    name:'Ржавый меч',         result:{itemId:'sword_rusty',   quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:20,   successChance:0.95, materials:[{itemId:'mat_iron_ore', quantity:8}, {itemId:'mat_leather', quantity:3}] },
  recipe_sword_iron:     { id:'recipe_sword_iron',     name:'Железный меч',       result:{itemId:'sword_iron',    quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:120,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:13}, {itemId:'mat_leather', quantity:5}] },
  recipe_sword_steel:    { id:'recipe_sword_steel',    name:'Гранёный клинок',    result:{itemId:'sword_steel',   quantity:1}, category:'weapon', tier:3, levelReq:22, gold:600,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:20}, {itemId:'mat_essence', quantity:8}, {itemId:'mat_steel_ore', quantity:13}] },
  recipe_sword_dawn:     { id:'recipe_sword_dawn',     name:'Клинок Зари',        result:{itemId:'sword_dawn',    quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2500, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:50}, {itemId:'mat_dust', quantity:25}, {itemId:'mat_essence', quantity:20}] },

  // ========== КИНЖАЛЫ ==========
  recipe_dagger_bone:    { id:'recipe_dagger_bone',    name:'Костяной кинжал',    result:{itemId:'dagger_bone',   quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:18,   successChance:0.95, materials:[{itemId:'mat_leather', quantity:5}, {itemId:'mat_iron_ore', quantity:3}] },
  recipe_dagger_dark:    { id:'recipe_dagger_dark',    name:'Тёмный кинжал',      result:{itemId:'dagger_dark',   quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:110,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:8}, {itemId:'mat_essence', quantity:3}, {itemId:'mat_leather', quantity:5}] },
  recipe_dagger_pair:    { id:'recipe_dagger_pair',    name:'Парные клинки',      result:{itemId:'dagger_pair',   quantity:1}, category:'weapon', tier:3, levelReq:22, gold:550,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:15}, {itemId:'mat_essence', quantity:10}, {itemId:'mat_thick_hide', quantity:5}] },
  recipe_dagger_shadow:  { id:'recipe_dagger_shadow',  name:'Клык Тени',          result:{itemId:'dagger_shadow', quantity:3}, category:'weapon', tier:4, levelReq:45, gold:2200, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:45}, {itemId:'mat_dust', quantity:30}, {itemId:'mat_essence', quantity:15}] },

  // ========== ПОСОХИ ==========
  recipe_staff_oak:      { id:'recipe_staff_oak',      name:'Дубовый посох',      result:{itemId:'staff_oak',     quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:20,   successChance:0.95, materials:[{itemId:'mat_leather', quantity:3}, {itemId:'mat_iron_ore', quantity:3}, {itemId:'mat_essence', quantity:3}] },
  recipe_staff_rune:     { id:'recipe_staff_rune',     name:'Рунный посох',       result:{itemId:'staff_rune',    quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:130,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:8}, {itemId:'mat_essence', quantity:8}] },
  recipe_staff_crystal:  { id:'recipe_staff_crystal',  name:'Хрустальный посох',  result:{itemId:'staff_crystal', quantity:3}, category:'weapon', tier:3, levelReq:22, gold:650,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:20}, {itemId:'mat_essence', quantity:15}, {itemId:'mat_dust', quantity:5}] },
  recipe_staff_elder:    { id:'recipe_staff_elder',    name:'Посох Предтеч',      result:{itemId:'staff_elder',   quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2800, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:55}, {itemId:'mat_dust', quantity:38}, {itemId:'mat_essence', quantity:25}] },

  // ========== КОПЬЯ ==========
  recipe_spear_simple:   { id:'recipe_spear_simple',   name:'Простое копьё',      result:{itemId:'spear_simple',  quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:22,   successChance:0.95, materials:[{itemId:'mat_iron_ore', quantity:10}, {itemId:'mat_leather', quantity:3}] },
  recipe_spear_guard:    { id:'recipe_spear_guard',    name:'Копьё стражи',       result:{itemId:'spear_guard',   quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:125,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:15}, {itemId:'mat_leather', quantity:5}] },
  recipe_spear_dragon:   { id:'recipe_spear_dragon',   name:'Драконье копьё',     result:{itemId:'spear_dragon',  quantity:1}, category:'weapon', tier:3, levelReq:22, gold:620,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:25}, {itemId:'mat_essence', quantity:8}, {itemId:'mat_thick_hide', quantity:8}] },
  recipe_spear_sky:      { id:'recipe_spear_sky',      name:'Прокол Небес',       result:{itemId:'spear_sky',     quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2600, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:63}, {itemId:'mat_dust', quantity:30}, {itemId:'mat_essence', quantity:20}] },

  // ========== ТОПОРЫ ==========
  recipe_axe_hand:       { id:'recipe_axe_hand',       name:'Ржавый топор',       result:{itemId:'axe_hand',      quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:20,   successChance:0.95, materials:[{itemId:'mat_iron_ore', quantity:10}, {itemId:'mat_leather', quantity:3}] },
  recipe_axe_war:        { id:'recipe_axe_war',        name:'Боевой топор',       result:{itemId:'axe_war',       quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:120,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:15}, {itemId:'mat_leather', quantity:3}] },
  recipe_axe_storm:      { id:'recipe_axe_storm',      name:'Секира Шторма',      result:{itemId:'axe_storm',     quantity:1}, category:'weapon', tier:3, levelReq:22, gold:600,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:25}, {itemId:'mat_essence', quantity:10}, {itemId:'mat_dust', quantity:5}] },
  recipe_axe_rage:       { id:'recipe_axe_rage',       name:'Топор Ярости',       result:{itemId:'axe_rage',      quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2500, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:60}, {itemId:'mat_dust', quantity:38}, {itemId:'mat_essence', quantity:25}] },

  // ========== МОЛОТЫ ==========
  recipe_hammer_forge:   { id:'recipe_hammer_forge',   name:'Кузнечный молот',    result:{itemId:'hammer_forge',  quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:25,   successChance:0.95, materials:[{itemId:'mat_iron_ore', quantity:13}, {itemId:'mat_leather', quantity:3}] },
  recipe_hammer_war:     { id:'recipe_hammer_war',     name:'Боевой молот',       result:{itemId:'hammer_war',    quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:130,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:18}, {itemId:'mat_leather', quantity:3}] },
  recipe_hammer_rune:    { id:'recipe_hammer_rune',    name:'Рунный молот',       result:{itemId:'hammer_rune',   quantity:1}, category:'weapon', tier:3, levelReq:22, gold:680,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:30}, {itemId:'mat_essence', quantity:13}, {itemId:'mat_steel_ore', quantity:13}] },
  recipe_hammer_elder:   { id:'recipe_hammer_elder',   name:'Молот Предтеч',      result:{itemId:'hammer_elder',  quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2800, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:70}, {itemId:'mat_dust', quantity:45}, {itemId:'mat_essence', quantity:30}] },

  // ========== ЛУКИ ==========
  recipe_bow_hunter:     { id:'recipe_bow_hunter',     name:'Охотничий лук',      result:{itemId:'bow_hunter',    quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:18,   successChance:0.95, materials:[{itemId:'mat_leather', quantity:8}, {itemId:'mat_iron_ore', quantity:3}] },
  recipe_bow_composite:  { id:'recipe_bow_composite',  name:'Композитный лук',    result:{itemId:'bow_composite', quantity:3}, category:'weapon', tier:2, levelReq:8,  gold:115,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:8}, {itemId:'mat_leather', quantity:10}, {itemId:'mat_thick_hide', quantity:5}] },
  recipe_bow_long:       { id:'recipe_bow_long',       name:'Длинный лук',        result:{itemId:'bow_long',      quantity:1}, category:'weapon', tier:3, levelReq:22, gold:580,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:15}, {itemId:'mat_thick_hide', quantity:13}, {itemId:'mat_essence', quantity:8}] },
  recipe_bow_storm:      { id:'recipe_bow_storm',      name:'Лук Шторма',         result:{itemId:'bow_storm',     quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2400, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:38}, {itemId:'mat_dust', quantity:30}, {itemId:'mat_thick_hide', quantity:25}] },

  // ========== ТРЕЗУБЦЫ ==========
  recipe_trident_coral:  { id:'recipe_trident_coral',  name:'Коралловый трезубец',result:{itemId:'trident_coral', quantity:3}, category:'weapon', tier:1, levelReq:1,  gold:22,   successChance:0.95, materials:[{itemId:'mat_leather', quantity:5}, {itemId:'mat_iron_ore', quantity:5}] },
  recipe_trident_harpoon:{ id:'recipe_trident_harpoon',name:'Гарпун',             result:{itemId:'trident_harpoon',quantity:1},category:'weapon', tier:2, levelReq:8,  gold:125,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:13}, {itemId:'mat_essence', quantity:5}, {itemId:'mat_leather', quantity:5}] },
  recipe_trident_deep:   { id:'recipe_trident_deep',   name:'Трезубец глубин',    result:{itemId:'trident_deep',  quantity:1}, category:'weapon', tier:3, levelReq:22, gold:640,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:23}, {itemId:'mat_essence', quantity:13}, {itemId:'mat_dust', quantity:5}] },
  recipe_trident_ocean:  { id:'recipe_trident_ocean',  name:'Копьё Океана',       result:{itemId:'trident_ocean', quantity:3}, category:'weapon', tier:4, levelReq:45, gold:2600, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:50}, {itemId:'mat_dust', quantity:38}, {itemId:'mat_essence', quantity:25}] },

  // ========== ЛЮТНИ ==========
  recipe_lute_wood:      { id:'recipe_lute_wood',      name:'Деревянная лютня',   result:{itemId:'lute_wood',     quantity:1}, category:'weapon', tier:1, levelReq:1,  gold:20,   successChance:0.95, materials:[{itemId:'mat_leather', quantity:5}, {itemId:'mat_iron_ore', quantity:3}] },
  recipe_lute_bard:      { id:'recipe_lute_bard',      name:'Бардовская лютня',   result:{itemId:'lute_bard',     quantity:1}, category:'weapon', tier:2, levelReq:8,  gold:120,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:5}, {itemId:'mat_leather', quantity:8}, {itemId:'mat_essence', quantity:5}] },
  recipe_lute_wind:      { id:'recipe_lute_wind',      name:'Лютня Ветров',       result:{itemId:'lute_wind',     quantity:1}, category:'weapon', tier:3, levelReq:22, gold:600,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:13}, {itemId:'mat_essence', quantity:15}, {itemId:'mat_dust', quantity:5}] },
  recipe_lute_veilan:    { id:'recipe_lute_veilan',    name:'Песнь Вейлана',      result:{itemId:'lute_veilan',   quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2500, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:38}, {itemId:'mat_dust', quantity:50}, {itemId:'mat_essence', quantity:30}] },

  // ========== ПАРНЫЕ КЛИНКИ ==========
  recipe_twinblade_knives:{ id:'recipe_twinblade_knives',name:'Парные ножи',     result:{itemId:'twinblade_knives',quantity:1},category:'weapon',tier:1, levelReq:1,  gold:22,   successChance:0.95, materials:[{itemId:'mat_iron_ore', quantity:8}, {itemId:'mat_leather', quantity:5}] },
  recipe_twinblade_storm:{ id:'recipe_twinblade_storm',name:'Клинки Бури',       result:{itemId:'twinblade_storm',quantity:1},category:'weapon',tier:2, levelReq:8,  gold:120,  successChance:0.90, materials:[{itemId:'mat_steel_ore', quantity:13}, {itemId:'mat_leather', quantity:5}, {itemId:'mat_essence', quantity:3}] },
  recipe_twinblade_vortex:{ id:'recipe_twinblade_vortex',name:'Вихрь',           result:{itemId:'twinblade_vortex',quantity:1},category:'weapon',tier:3, levelReq:22, gold:620,  successChance:0.75, materials:[{itemId:'mat_mithril', quantity:23}, {itemId:'mat_essence', quantity:13}, {itemId:'mat_dust', quantity:5}] },
  recipe_twinblade_fury:{ id:'recipe_twinblade_fury',  name:'Ярость Шторма',      result:{itemId:'twinblade_fury',quantity:1}, category:'weapon', tier:4, levelReq:45, gold:2500, successChance:0.50, materials:[{itemId:'mat_mithril', quantity:55}, {itemId:'mat_dust', quantity:38}, {itemId:'mat_essence', quantity:25}] }

};
