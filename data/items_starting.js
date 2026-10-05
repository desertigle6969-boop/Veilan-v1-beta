// ============================================================
// ВЕЙЛАН — СТАРТОВЫЕ ПРЕДМЕТЫ (worn)
// Слабые версии t1 — чтобы новичок мог выжить, но хотел крафтить
// Без бонусов (STR/DEX/INT/CON) — только чистый ATK/DEF
// ============================================================

const ITEMS_STARTING = {

  // ========== ОРУЖИЕ (60% от t1) ==========
  worn_sword:   { id:'worn_sword',   name:'Изношенный меч',     desc:'Зазубрен. Скоро сломается.',   type:'weapon', slot:'weapon', weaponType:'sword',     tier:0, rarity:'common', stats:{atk:5},              levelReq:1, classReq:['guardian','stormblade','spearman','runesmith','soulforged'], durability:100, cost:5,  bonuses:[], sprite:'sword_rusty' },
  worn_dagger:  { id:'worn_dagger',  name:'Изношенный кинжал',  desc:'Тупее, чем кажется.',           type:'weapon', slot:'weapon', weaponType:'dagger',    tier:0, rarity:'common', stats:{atk:4},              levelReq:1, classReq:['shadowhunter','beastmaster'], durability:100, cost:5,  bonuses:[], sprite:'dagger_bone' },
  worn_staff:   { id:'worn_staff',   name:'Изношенный посох',   desc:'Дерево треснуло.',              type:'weapon', slot:'weapon', weaponType:'staff',     tier:0, rarity:'common', stats:{mag:5},              levelReq:1, classReq:['pyromancer','cryomancer','conduit'], durability:100, cost:5,  bonuses:[], sprite:'staff_oak' },
  worn_spear:   { id:'worn_spear',   name:'Изношенное копьё',   desc:'Древко гнётся.',                type:'weapon', slot:'weapon', weaponType:'spear',     tier:0, rarity:'common', stats:{atk:6},              levelReq:1, classReq:['spearman','guardian','beastmaster','soulforged'], durability:100, cost:5,  bonuses:[], sprite:'spear_simple' },
  worn_axe:     { id:'worn_axe',     name:'Изношенный топор',   desc:'Ржавое лезвие.',                type:'weapon', slot:'weapon', weaponType:'axe',       tier:0, rarity:'common', stats:{atk:6},              levelReq:1, classReq:['stormblade','ironhorn'], durability:100, cost:5,  bonuses:[], sprite:'axe_hand' },
  worn_hammer:  { id:'worn_hammer',  name:'Изношенный молот',   desc:'Тяжёлый, но тупой.',            type:'weapon', slot:'weapon', weaponType:'hammer',    tier:0, rarity:'common', stats:{atk:7},              levelReq:1, classReq:['runesmith','guardian','soulforged','ironhorn'], durability:100, cost:5,  bonuses:[], sprite:'hammer_forge' },
  worn_bow:     { id:'worn_bow',     name:'Изношенный лук',     desc:'Тетива растянулась.',           type:'weapon', slot:'weapon', weaponType:'bow',       tier:0, rarity:'common', stats:{atk:5},              levelReq:1, classReq:['shadowhunter','beastmaster'], durability:100, cost:5,  bonuses:[], sprite:'bow_hunter' },
  worn_lute:    { id:'worn_lute',    name:'Изношенная лютня',   desc:'Фальшивит.',                    type:'weapon', slot:'weapon', weaponType:'lute',      tier:0, rarity:'common', stats:{mag:4},              levelReq:1, classReq:['windbard'], durability:100, cost:5,  bonuses:[], sprite:'lute_wood' },

  // ========== БРОНЯ: ЛЁГКАЯ (60% от t1) ==========
  worn_light_helm:  { id:'worn_light_helm',  name:'Рваный капюшон',      desc:'Видел лучшие дни.',   type:'armor', slot:'helmet', tier:0, rarity:'common', stats:{def:1}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'helm_cloth'   },
  worn_light_chest: { id:'worn_light_chest', name:'Рваная рубаха',       desc:'Дырявая.',            type:'armor', slot:'chest',  tier:0, rarity:'common', stats:{def:2}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'chest_cloth'  },
  worn_light_legs:  { id:'worn_light_legs',  name:'Рваные штаны',        desc:'Держатся на честном слове.', type:'armor', slot:'legs', tier:0, rarity:'common', stats:{def:1}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'legs_cloth'   },

  // ========== БРОНЯ: СРЕДНЯЯ (60% от t1) ==========
  worn_med_helm:  { id:'worn_med_helm',  name:'Потёртый капюшон',   desc:'Кожа потрескалась.',   type:'armor', slot:'helmet', tier:0, rarity:'common', stats:{def:2}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'helm_med_1'   },
  worn_med_chest: { id:'worn_med_chest', name:'Потёртый доспех',    desc:'Скрипит.',            type:'armor', slot:'chest',  tier:0, rarity:'common', stats:{def:3}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'chest_med_1'  },
  worn_med_legs:  { id:'worn_med_legs',  name:'Потёртые штаны',     desc:'Видел много дорог.',  type:'armor', slot:'legs',   tier:0, rarity:'common', stats:{def:2}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'legs_med_1'   },

  // ========== БРОНЯ: ТЯЖЁЛАЯ (60% от t1) ==========
  worn_heavy_helm:  { id:'worn_heavy_helm',  name:'Старый капюшон',   desc:'Мех вылез.',         type:'armor', slot:'helmet', tier:0, rarity:'common', stats:{def:3}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'helm_heavy_1'   },
  worn_heavy_chest: { id:'worn_heavy_chest', name:'Старый жилет',     desc:'Дырявый мех.',       type:'armor', slot:'chest',  tier:0, rarity:'common', stats:{def:4}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'chest_heavy_1'  },
  worn_heavy_legs:  { id:'worn_heavy_legs',  name:'Старые штаны',     desc:'Протёртые.',         type:'armor', slot:'legs',   tier:0, rarity:'common', stats:{def:3}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'legs_heavy_1'   },

  // ========== ПЛАЩ ==========
  worn_cloak:  { id:'worn_cloak',  name:'Рваный плащ',  desc:'Просто ткань.',  type:'armor', slot:'cloak', tier:0, rarity:'common', stats:{def:0}, levelReq:1, classReq:[], durability:100, cost:5, bonuses:[], sprite:'cloak_rag' }
};
