// ============================================================
// ВЕЙЛАН — РЕДКИЕ МОБЫ (Тайное ремесло)
// Элитные, редкий спавн, дропают "странные предметы"
// ============================================================

const MOBS_SECRET = {

  // ============================================================
  // ГЛАВА 1 — ЛАГЕРЬ СЕРЫХ ХОЛМОВ
  // ============================================================
  rat_matriarch: {
    id:'rat_matriarch', name:'Крыса-Матриарх', sprite:'RAT_MATRIARCH',
    level:7, type:'beast', zone:'camp', sub:'ash',
    hp:567, atk:41, def:18, spd:14, eva:12,
    exp:380, gold:95,
    skill:'beast_bite',
    lore:'Матриарх выросла в подвалах Лагеря — там, где Дросс хоронили своих после первой атаки Бездны. Она ела мёртвых три года. Клык помнит вкус каждого.',
    aiProfile:'elite',
    isSecret:true,
    spawnChance:0.005,
    loot:[
      { itemId:'strange_rat_king_tooth', chance:1.0, quantity:1 },
      { itemId:'mat_leather',            chance:0.8, quantity:3 },
      { itemId:'potion_hp_med',          chance:0.4, quantity:1 }
    ]
  },

  // ============================================================
  // ГЛАВА 2 — ШЕПЧУЩИЙ ЛЕС
  // ============================================================
  treant_renegade: {
    id:'treant_renegade', name:'Древень-Отступник', sprite:'TREANT_RENEGADE',
    level:13, type:'plant', zone:'forest', sub:'heart',
    hp:1053, atk:67, def:35, spd:9, eva:5,
    exp:850, gold:180,
    skill:'treant_smash',
    lore:'Древень-Отступник ушёл из своего круга после Раскола — не смог простить, что лес выжил, а Валдорн пал. Сок помнит его обиду. Приложи к уху — услышишь, как он повторяет имя короля Ольдена. Снова и снова.',
    aiProfile:'elite',
    isSecret:true,
    spawnChance:0.005,
    loot:[
      { itemId:'strange_black_sap', chance:1.0, quantity:1 },
      { itemId:'mat_thick_hide',    chance:0.6, quantity:2 },
      { itemId:'mat_essence',       chance:0.5, quantity:3 }
    ]
  },

  // ============================================================
  // ГЛАВА 3 — РУДНИКИ ХАННА
  // ============================================================
  blind_smith: {
    id:'blind_smith', name:'Слепой Кузнец', sprite:'BLIND_SMITH',
    level:21, type:'undead', zone:'mines', sub:'depths',
    hp:1957, atk:101, def:62, spd:11, eva:6,
    exp:1800, gold:340,
    skill:'hammer_strike',
    lore:'Кузнец был мастером Гранн — из тех, что ковали клинки для самого Ольдена. В ночь Раскола он ослеп — своими руками выжег глаза, чтоб не видеть, как Тэрн входит в город. С тех пор бродит в темноте. Глаз помнит всё, что он видел до того.',
    aiProfile:'elite',
    isSecret:true,
    spawnChance:0.005,
    loot:[
      { itemId:'strange_blind_eye', chance:1.0, quantity:1 },
      { itemId:'mat_mithril',       chance:0.6, quantity:2 },
      { itemId:'mat_steel_ore',     chance:0.7, quantity:4 }
    ]
  },

  // ============================================================
  // ГЛАВА 4 — РУИНЫ ВАЛДОРНА
  // ============================================================
  weeper: {
    id:'weeper', name:'Плакальщица', sprite:'WEEPER',
    level:27, type:'undead', zone:'ruins', sub:'courtyard',
    hp:2970, atk:136, def:78, spd:16, eva:14,
    exp:3400, gold:620,
    skill:'ghost_wail',
    lore:'Королева Астрид умерла за год до Раскола. Ольден похоронил её в склепе под тронным залом. Когда Тэрн вошёл, склеп вскрылся от удара — и она вышла. Триста лет ищет мужа по улицам. Не находит. Он на троне. Она — здесь.',
    aiProfile:'elite',
    isSecret:true,
    spawnChance:0.005,
    loot:[
      { itemId:'strange_tear_stone', chance:1.0, quantity:1 },
      { itemId:'mat_mithril',        chance:0.5, quantity:3 },
      { itemId:'mat_dust',           chance:0.7, quantity:2 },
      { itemId:'mat_essence',        chance:0.5, quantity:4 }
    ]
  }

};

window.MOBS_SECRET = MOBS_SECRET;
console.log('[mobs_secret] ' + Object.keys(MOBS_SECRET).length + ' редких мобов');
